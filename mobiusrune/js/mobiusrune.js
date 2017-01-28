/* jshint esnext:true */
((THREE) => {
    let camera, scene, renderer, mesh, canvasSquareSize, startAnimation, routeSpline;

    // TODO refactor
    let camPosIndex = 0;
    // const randomPoints = [];
    // // for ( let i = 0; i < 100; i ++ ) {
    // //     randomPoints.push(
    // //         new THREE.Vector3(
    // //             Math.random() * 200 - 100, 
    // //             Math.random() * 200 - 100, 
    // //             Math.random() * 200 - 100)
    // //     );
    // // }
    // // let foo = 250;
    // // let nx = 0;
    // // let ny = 0;
    // // for ( let i = 0; i < 100; i ++ ) {
    // //     foo -= 1;
    // //     nx -= 1;
    // //     ny -= 1;
    // //     randomPoints.push(
    // //         new THREE.Vector3(
    // //             nx, 
    // //             ny, 
    // //             foo )
    // //     );
    // // }
    // randomPoints.push(new THREE.Vector3(0,0,250));
    // randomPoints.push(new THREE.Vector3(0,50,200));
    // randomPoints.push(new THREE.Vector3(0,0,150));
    // randomPoints.push(new THREE.Vector3(0,0,100));
    // // randomPoints.push(new THREE.Vector3(-25,-25,100));
    // // randomPoints.push(new THREE.Vector3(-250,-150,50));
    // // randomPoints.push(new THREE.Vector3(150,150,50));
    // console.log(randomPoints);
    // //const spline = new THREE.SplineCurve3(randomPoints);
    // let spline = new THREE.CatmullRomCurve3(randomPoints);

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

    const addTestCurve = _ => {
        // var curve = new THREE.CatmullRomCurve3( [
        //     new THREE.Vector3( -100, 0, -110 ),
        //     new THREE.Vector3( -50, 5, -105 ),
        //     new THREE.Vector3( 0, 0, -100 ),
        //     new THREE.Vector3( 50, -5, -105 ),
        //     new THREE.Vector3( 100, 0, -110 )
        // ]);

        // var geometry = new THREE.Geometry();
        // geometry.vertices = curve.getPoints( 50 );

        // var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
        // const mesh = new THREE.Mesh(geometry, material);
        // console.log('test curve', mesh);
        // return mesh;


        // docs: https://threejs.org/docs/api/extras/curves/SplineCurve3.html

        const spline1 = new THREE.SplineCurve3([

                             // x   y   z

            // new THREE.Vector3( -30, -20, 250 ),
            // new THREE.Vector3( -10, 10, 150 ),
            // new THREE.Vector3( 10, 10, 150 ),
            // new THREE.Vector3( 30, -20, 250 )


            new THREE.Vector3( 0, 0, 250 ),
            new THREE.Vector3( -30, -20, 250 ),
            new THREE.Vector3( -60, -30, 150 ),
            new THREE.Vector3( -30, 35, 148 ),
            new THREE.Vector3( 50, -35, 146 ),
            new THREE.Vector3( 40, 50, 144 ),
            new THREE.Vector3( -65, -40, 142 ),

            //new THREE.Vector3( -10, 10, 150 ),
            //new THREE.Vector3( 10, 10, 150 ),
            new THREE.Vector3( -30, -20, 250 ),
            new THREE.Vector3( 0, 0, 250 )

        ]);
        
        var material = new THREE.LineBasicMaterial({
            color: 0xff00f0,
        });
        
        var geometry = new THREE.Geometry();
        for(var i = 0; i < spline1.getPoints(100).length; i++){
            geometry.vertices.push(spline1.getPoints(100)[i]);  
        }

        routeSpline = spline1;
        
        var line = new THREE.Line(geometry, material);
        return line;
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

        scene.add(addTestCurve());

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

    const setCameraOnSplinePath = _ => {
        // Source: working cube along spline path http://jsfiddle.net/SCXNQ/891/
        const fragmentSize = 1000; // default 10000, higher is slower
        camPosIndex++;
        if (camPosIndex > fragmentSize) {
            camPosIndex = 0;
            return false;
        }
        var camPos = routeSpline.getPoint(camPosIndex / fragmentSize);
        var camRot = routeSpline.getTangent(camPosIndex / fragmentSize);

        camera.position.x = camPos.x;
        camera.position.y = camPos.y;
        camera.position.z = camPos.z;

        //console.log(camRot);
        // camera.rotation.x = camRot.x;
        // camera.rotation.y = camRot.y;
        // camera.rotation.z = camRot.z;

        camera.lookAt(routeSpline.getPoint((camPosIndex+1) / fragmentSize));
        // TODO while z between 250 and 150, increase x rot from 0 to 0.7
        //camera.rotation.x = camera.position.z > 150 ? 0 : 0.7;
        if(camera.position.z <= 150) {
            camera.rotation.x = 0.7;
        } else if(camera.position.z >= 180) {
            camera.rotation.x = 0;
        } else {
            var r = ((180 - camera.position.z) / 30) * 0.7;
            camera.rotation.x = r;
        }
        camera.rotation.y = 0;
        camera.rotation.z = 0;
        return true;
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
            startAnimation = setCameraOnSplinePath();
        } else if(startAnimation) {
            setTimeout(() => mesh.rotation.x = degToRad(90), 800);
            startAnimation = false;
        }

        renderer.render( scene, camera );
    };

    init();
    console.log(camera.position);
    animate();

})(window.THREE);