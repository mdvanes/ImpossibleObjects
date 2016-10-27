/* jshint esnext:true */
((THREE) => {
    let camera, scene, renderer, mesh, canvasSquareSize, startAnimation;

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

    const addBlockWithLogoMesh = scene => {
        // Working basic block with image of logo
        let geometry = new THREE.BoxBufferGeometry( 30, 166, 200 ); // depth, height, width
        let localMesh = new THREE.Mesh( geometry, getMeshFaceMaterial() );

        localMesh.rotation.y = degToRad(90); // Rotation in radians
        scene.add( localMesh );
        return localMesh;
    };

    // TODO make this a pure function (do not pass scene, return promise?)
    const addExternalMesh = scene => {
        // https://github.com/mrdoob/three.js/blob/dev/examples/webgl_loader_json_blender.html
        // Doesn't work, maybe the one above (json_blender)
        // https://github.com/mrdoob/three.js/blob/dev/examples/webgl_loader_obj.html
        // var onProgress = function ( xhr ) {
        //     if ( xhr.lengthComputable ) {
        //         var percentComplete = xhr.loaded / xhr.total * 100;
        //         console.log( Math.round(percentComplete, 2) + '% downloaded' );
        //     }
        // };

        // var onError = function ( xhr ) {};

        // var manager = new THREE.LoadingManager();
        // manager.onProgress = function ( item, loaded, total ) {
        //     console.log( item, loaded, total );
        // };
        //var loader = new THREE.JSONLoader( manager );
        var loader = new THREE.JSONLoader();
        loader.load( 'logotest1.json', function ( geometry1, materials1) {
            console.log('JSONLoader', geometry1, materials1);

            //let geometry = new THREE.BoxBufferGeometry( 30, 166, 200 ); // depth, height, width
            let texture1 = new THREE.TextureLoader().load( 'texture/crate.gif' );
            let material1 = new THREE.MeshBasicMaterial( { map: texture1 } );
            mesh = new THREE.Mesh( geometry1, material1 );

            mesh.rotation.x = degToRad(90); // Rotation in radians
            mesh.scale.set(50,50,50);
            mesh.position.x = 200;
            mesh.position.y = 60;
            scene.add( mesh );
    
            // object.traverse( function ( child ) {
            //     if ( child instanceof THREE.Mesh ) {
            //         child.material.map = texture;
            //     }
            // } );
            // object.position.y = - 95;
            // scene.add( object );
        }/*, onProgress, onError*/ );
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

        // Test overlapping objects
        // let mesh2 = new THREE.Mesh( geometry, material );
        // mesh2.rotation.y = degToRad(90); // Rotation in radians
        // mesh2.position.y = 100;
        // mesh2.position.z = -50;
        // scene.add( mesh2 );

        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setClearColor(0x000000, 0.6);
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
        if(startAnimation && mesh.rotation.x > degToRad(65)) {
            mesh.rotation.x -= 0.01;
        } else if(startAnimation) {
            setTimeout(() => mesh.rotation.x = degToRad(90), 800);
            startAnimation = false;
        }
        renderer.render( scene, camera );
    };

    init();
    animate();

})(window.THREE);