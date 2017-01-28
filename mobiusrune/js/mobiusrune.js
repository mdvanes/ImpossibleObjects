/* jshint esnext:true */
((THREE, mobiusrune) => {
    let camera, scene, renderer, mesh, canvasSquareSize, startAnimation, routeSpline;

    const getCanvasSquareSize = () => { 
        if(window.innerWidth > window.innerHeight) {
            return window.innerHeight * 0.9;
        } else {
            console.log(window.innerWidth * 0.9);
            return window.innerWidth * 0.9;
        }
    };

    const updateDimensions = () => {
        camera.aspect = 1; // window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        const size = getCanvasSquareSize();
        renderer.setSize( size, size );
    };

    // Degrees e.g. 90 convert to radians: 90 * Math.PI / 180;
    const degToRad = rad => rad * Math.PI / 180;

    const getMeshFaceMaterial = () => {
        let logoTexture = new THREE.TextureLoader().load( 'texture/logo.png' );
        let logoMaterial = new THREE.MeshBasicMaterial( { map: logoTexture } );
        let crateTexture = new THREE.TextureLoader().load( 'texture/crate.gif' );
        let crateMaterial = new THREE.MeshBasicMaterial( { map: crateTexture } );
        return new THREE.MeshFaceMaterial( [crateMaterial, logoMaterial, crateMaterial, crateMaterial, crateMaterial, crateMaterial] );
    };

    const getMeshFaceMaterial2 = () => {
        let logoTexture = new THREE.TextureLoader().load( 'texture/logo.png' );
        let logoMaterial = new THREE.MeshBasicMaterial( { map: logoTexture } );
        let crateTexture = new THREE.TextureLoader().load( 'texture/crate.gif' );
        let crateMaterial = new THREE.MeshBasicMaterial( { map: crateTexture } );
        return new THREE.MeshFaceMaterial( [logoMaterial, logoMaterial, crateMaterial, crateMaterial, 
            crateMaterial, logoMaterial,crateMaterial, crateMaterial,
            crateMaterial, logoMaterial,crateMaterial, crateMaterial,
            crateMaterial, logoMaterial] );
    };

    const addBlockWithLogoMesh = scene => {
        // Working basic block with image of logo
        let geometry = new THREE.BoxBufferGeometry( 30, 166, 200 ); // depth, height, width
        let localMesh = new THREE.Mesh( geometry, getMeshFaceMaterial() );

        localMesh.rotation.y = degToRad(90); // Rotation in radians
        scene.add( localMesh );
        return localMesh;
    };

    // TODO move along path: https://codepen.io/wiledal/pen/WvNvEq
    // TODO set center of rotation for the logo in the center. It's already in the center in Blender.

    // TODO make this a pure function (do not pass scene as param, return promise?)
    const addExternalMesh = scene => {
        // https://github.com/mrdoob/three.js/blob/dev/examples/webgl_loader_json_blender.html
        // Doesn't work, maybe the one above (json_blender)
        // https://github.com/mrdoob/three.js/blob/dev/examples/webgl_loader_obj.html
        //const jsonPath = 'logotest1.json';
        //const jsonPath = 'cube.json';
        const jsonPath = 'mdlogo2.json?v=1';
        const loader = new THREE.JSONLoader();
        loader.load( jsonPath, ( geometry, materials) => {
            console.log('JSONLoader', geometry, materials);

            // Fix material, see https://github.com/mrdoob/three.js/blob/dev/examples/webgl_loader_json_blender.html
            //const texture = new THREE.TextureLoader().load( 'texture/crate.gif' );
            //const texture = new THREE.TextureLoader().load( 'texture/logo.png' );
            //const texture = new THREE.TextureLoader().load( 'texture/logotest1-texture.png' );
            const texture = new THREE.TextureLoader().load( 'texture/mdlogo-texture.png?v=1' );
            //console.log('jsonloadertex', texture);
            const material = new THREE.MeshBasicMaterial( { map: texture } );
            mesh = new THREE.Mesh( geometry, material );
            //mesh = new THREE.Mesh( geometry, getMeshFaceMaterial2() );

            mesh.rotation.x = degToRad(90); // Rotation in radians
            mesh.scale.set(20,20,20);
            //mesh.position.x = 200;
            //mesh.position.y = 60;
            scene.add( mesh );    
        });
    };

    const init = function() {
        startAnimation = false;
        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.z = 250;
        scene = new THREE.Scene();

        // let texture = new THREE.TextureLoader().load( 'img/texture2.png' );
        // let geometry = new THREE.BoxBufferGeometry( 30, 166, 200 ); // depth, height, width
        // let material = new THREE.MeshBasicMaterial( { map: texture } );
        // mesh = new THREE.Mesh( geometry, material );

        //mesh = addBlockWithLogoMesh(scene);
        addExternalMesh(scene);

        routeSpline = mobiusrune.getRouteSpline();
        scene.add(mobiusrune.getRouteDebugLine(routeSpline));

        // Test overlapping objects
        // let mesh2 = new THREE.Mesh( geometry, material );
        // mesh2.rotation.y = degToRad(90); // Rotation in radians
        // mesh2.position.y = 100;
        // mesh2.position.z = -50;
        // scene.add( mesh2 );

        renderer = new THREE.WebGLRenderer({ alpha: true });
        //renderer.setClearColor(0x000000, 0.6);
        renderer.setClearColor(0x303030, 1.0);
        renderer.setPixelRatio( window.devicePixelRatio );

        updateDimensions();
        document.body.appendChild( renderer.domElement );
        window.addEventListener( 'resize', onWindowResize, false );
        window.addEventListener( 'click', activateAnimation, false );
    };

    const onWindowResize = () => updateDimensions();

    // TODO should be if clicked three times within 1 second
    const activateAnimation = () => {
        //console.warn('activateAnimation');
        // TODO should check if animation is already busy
        startAnimation = true;
    };

    const animate = function() {
        requestAnimationFrame( animate );
        //console.log((mesh.rotation.x * 180) / Math.PI);
        // Basic
        // if(startAnimation && mesh.rotation.x > degToRad(-55)) {
        //     mesh.rotation.x -= 0.01;
        // } else if(startAnimation) {
        //     setTimeout(() => mesh.rotation.x = 0, 800);
        //     startAnimation = false;
        // }
        // Jsonloader
        if(startAnimation && mesh.rotation.x > degToRad(-15)) {
            //mesh.rotation.x -= 0.01;
            // Determine the next step on the path and return whether to continue the animation
            startAnimation = mobiusrune.setCameraOnSplinePath(camera, routeSpline);
        } else if(startAnimation) {
            setTimeout(() => mesh.rotation.x = degToRad(90), 800);
            startAnimation = false;
        }

        renderer.render( scene, camera );
    };

    init();
    console.log(camera.position);
    animate();

})(window.THREE, window.mobiusrune || {});