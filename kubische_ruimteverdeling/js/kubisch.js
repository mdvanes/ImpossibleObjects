(function () {
    'use strict';

    // Basic WebGL demo wrapped in a closure exposed on the threeCube namespace

    var threeCube = {};

    // revolutions per second
    var angularSpeed = 0.2;
    var lastTime = 0;

    threeCube.angle = 0;

    // this function is executed on each animation frame
    threeCube.animate = function () {
        // update
        var time = (new Date()).getTime();
        var timeDiff = time - lastTime;
        var angleChange = angularSpeed * timeDiff * 2 * Math.PI / 5000;
        cube.rotation.y += angleChange;
        //cube.rotation.y = threeCube.angle;
        lastTime = time;

        // render
        renderer.render(scene, camera);

        // request new frame
        requestAnimationFrame(function () {
            threeCube.animate();
        });
    };

    /* Start: Three.js configuration */

    // renderer
    var renderer = new THREE.WebGLRenderer();
    var renderWidth = 350;
    var renderHeight = 155;
    renderer.setSize(renderWidth, renderHeight);
    document.querySelector('.threejs').appendChild(renderer.domElement);

    // camera
    var camera = new THREE.PerspectiveCamera(45, renderWidth / renderHeight, 1, 1000);
    camera.position.z = 500;
    camera.rotation.z = 1;

    // scene
    var scene = new THREE.Scene();

    // cube (width, height, depth)
    var cube = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 150), new THREE.MeshBasicMaterial({
        wireframe: true,
        color: 'blue'
    }));
    cube.rotation.x = Math.PI * 0.1;
    scene.add(cube);

    /* End: Three.js configuration */

    window.threeCube = threeCube;
})();

(function () {
    'use strict';

    // Basic WebGL demo wrapped in a closure exposed on the threeCube namespace

    var kubisch = {};

    // revolutions per second
    var angularSpeed = 0.2;
    var lastTime = 0;

    kubisch.angle = 0;

    // this function is executed on each animation frame
    kubisch.animate = function () {
        // update
        var time = (new Date()).getTime();
        var timeDiff = time - lastTime;
        var angleChange = angularSpeed * timeDiff * 2 * Math.PI / 5000;
        //cube.rotation.y += angleChange;
        //camera.position.x += angleChange;
        lastTime = time;

        // render
        renderer.render(scene, camera);

        // request new frame
        requestAnimationFrame(function () {
            kubisch.animate();
        });
    };

    /* Start: Three.js configuration */

    // renderer
    //var renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    var renderer = new THREE.WebGLRenderer({antialias: true});
    var renderWidth = 500;
    var renderHeight = 400;
    renderer.setSize(renderWidth, renderHeight);
    document.querySelector('.threejs').appendChild(renderer.domElement);

    // camera
    var camera = new THREE.PerspectiveCamera(45, renderWidth / renderHeight, 1, 3000);
    //camera.position.z = 1000;
    camera.position.set( 1000, 250, 1500); // x,y,z
    camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
//    camera.rotation.z = 1;

    // scene
    var scene = new THREE.Scene();

    for(var yi = -25; yi < 25; yi++) {
        for(var xi = -25; xi < 25; xi++) {
            // cube (width, height, depth)
            var cube = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 200), new THREE.MeshBasicMaterial({
                wireframe: true,
                color: '#444'
            }));
            //cube.rotation.x = Math.PI * 0.1;
            cube.position.x = xi * 300;
            cube.position.y = yi * 300;
            scene.add(cube);
        }
    }

    /* End: Three.js configuration */

    window.kubisch = kubisch;
})();

(function() {
    'use strict';


    threeCube.animate();
    kubisch.animate();
})();
