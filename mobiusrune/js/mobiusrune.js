/* jshint esnext:true */
((THREE, mobiusrune) => {
    let camera, scene, renderer, mesh, canvasSquareSize, startAnimation;

    const getCanvasSquareSize = () => { 
        if(window.innerWidth > window.innerHeight) {
            return window.innerHeight * 0.9;
        } else {
            return window.innerWidth * 0.9;
        }
    };

    const updateDimensions = () => {
        camera.aspect = 1;
        camera.updateProjectionMatrix();
        const size = getCanvasSquareSize();
        renderer.setSize( size, size );
    };

    const init = () => {
        startAnimation = false;
        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.z = 250;
        scene = new THREE.Scene();

        mobiusrune.getLogoMesh(logoMesh => {
            mesh = logoMesh;
            scene.add( mesh );
        });

        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setClearColor(0x303030, 1.0);
        renderer.setPixelRatio( window.devicePixelRatio );

        updateDimensions();
        document.body.appendChild( renderer.domElement );
        window.addEventListener( 'resize', onWindowResize, false );
        window.addEventListener( 'click', activateAnimation, false );
        window.addEventListener( 'dblclick', activateDblClickAnimation, false );
    };

    const onWindowResize = () => updateDimensions();

    const activateAnimation = event => {
        event.preventDefault();
        setTimeout(function() {
            if(!startAnimation) {
                startAnimation = true;
                new TWEEN.Tween( mesh.rotation )
                    .to({ 
                        z: mesh.rotation.z + mobiusrune.degToRad(360)
                    }, 3800 )
                    .easing( TWEEN.Easing.Quadratic.EaseOut)
                    .onComplete(function() {
                        startAnimation = false;
                    })
                    .start();
            }
        }, 300);
    };

    const activateDblClickAnimation = event => {
        event.preventDefault();
        if(!startAnimation) {
            startAnimation = true;
            new TWEEN.Tween( mesh.rotation )
                .to({ 
                    z: mesh.rotation.z + mobiusrune.degToRad(1080)
                }, 1200 )
                .easing( TWEEN.Easing.Quadratic.EaseOut)
                .onComplete(function() {
                    startAnimation = false;
                })
                .start();
        }
    };

    const animate = () => {
        requestAnimationFrame( animate );
        TWEEN.update();
        renderer.render( scene, camera );
    };

    init();
    animate();

})(window.THREE, window.mobiusrune || {});