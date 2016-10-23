/* jshint esnext:true */
((THREE) => {
    let camera, scene, renderer, mesh, canvasSquareSize, startAnimation;

    const getCanvasSquareSize = () => window.innerWidth / 3;

    const updateDimensions = () => {
        camera.aspect = 1; // window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        const size = getCanvasSquareSize();
        renderer.setSize( size, size );
    };

    // Degrees e.g. 90 convert to radians: 90 * Math.PI / 180;
    const degToRad = rad => rad * Math.PI / 180;

    const init = function() {
        startAnimation = false;
        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.z = 250;
        scene = new THREE.Scene();
        let texture = new THREE.TextureLoader().load( 'img/texture.gif' );
        let geometry = new THREE.BoxBufferGeometry( 30, 200, 200 );
        let material = new THREE.MeshBasicMaterial( { map: texture } );
        mesh = new THREE.Mesh( geometry, material );
        mesh.rotation.y = degToRad(90); // Rotation in radians
        scene.add( mesh );

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
        //console.log(mesh.rotation.x);
        if(startAnimation && mesh.rotation.x > degToRad(-55)) {
            mesh.rotation.x -= 0.01;
            //mesh.rotation.y += 0.01;
        } else {
            startAnimation = false;
        }
        renderer.render( scene, camera );
    };

    init();
    animate();

})(window.THREE);