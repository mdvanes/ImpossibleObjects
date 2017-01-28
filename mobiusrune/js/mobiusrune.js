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

    const init = () => {
        startAnimation = false;
        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.z = 250;
        scene = new THREE.Scene();

        // let texture = new THREE.TextureLoader().load( 'img/texture2.png' );
        // let geometry = new THREE.BoxBufferGeometry( 30, 166, 200 ); // depth, height, width
        // let material = new THREE.MeshBasicMaterial( { map: texture } );
        // mesh = new THREE.Mesh( geometry, material );

        //mesh = addBlockWithLogoMesh(scene);
        mobiusrune.getLogoMesh(logoMesh => {
            mesh = logoMesh;
            scene.add( mesh );
        });

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

    const animate = () => {
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
        if(startAnimation && mesh.rotation.x > mobiusrune.degToRad(-15)) {
            //mesh.rotation.x -= 0.01;
            // Determine the next step on the path and return whether to continue the animation
            startAnimation = mobiusrune.setCameraOnSplinePath(camera, routeSpline);
        } else if(startAnimation) {
            setTimeout(() => mesh.rotation.x = mobiusrune.degToRad(90), 800);
            startAnimation = false;
        }

        renderer.render( scene, camera );
    };

    init();
    console.log(camera.position);
    animate();

})(window.THREE, window.mobiusrune || {});