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
    var renderWidth = 600;
    var renderHeight = 600;
    renderer.setSize(renderWidth, renderHeight);
    document.querySelector('.threejs').appendChild(renderer.domElement);

    // camera
    var camera = new THREE.PerspectiveCamera(45, renderWidth / renderHeight, 1, 3000);
    //camera.position.z = 1000;
    camera.position.set( 1000, 350, 1500); // x,y,z
    camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
//    camera.rotation.z = 1;

    // scene
    var scene = new THREE.Scene();

    var spacing = 500;
    for(var zi = -3; zi < 3; zi++) {

        for(var yi = -3; yi < 3; yi++) {

            var bar = new THREE.Mesh(new THREE.CubeGeometry(3000, 15, 15), new THREE.MeshBasicMaterial({
                //wireframe: true,
                color: '#33f'
            }));
            //bar.position.x = xi * spacing;
            bar.position.y = yi * spacing;
            bar.position.z = zi * spacing;
            scene.add(bar);

            var bar2 = new THREE.Mesh(new THREE.CubeGeometry(15, 3000, 15), new THREE.MeshBasicMaterial({
                //wireframe: true,
                color: '#3f3'
            }));
            //bar.position.x = xi * spacing;
            bar2.position.y = yi * spacing;
            bar2.position.z = zi * spacing;
            scene.add(bar2);

            for(var xi = -3; xi < 3; xi++) {
                // cube (width, height, depth)
                var cube = new THREE.Mesh(new THREE.CubeGeometry(100, 100, 100), new THREE.MeshBasicMaterial({
                    //wireframe: true,
                    color: '#ddd'
                }));
                //cube.rotation.x = Math.PI * 0.1;
                cube.position.x = xi * spacing;
                cube.position.y = yi * spacing;
                cube.position.z = zi * spacing;
                scene.add(cube);
            }
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
