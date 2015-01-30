// TODO fade out to the back ("fog", see http://threejs.org/examples/webgl_geometry_terrain_fog.html)

(function () {
    'use strict';

    // Basic WebGL demo wrapped in a closure exposed on the threeCube namespace
    var renderer, scene, camera;

    var kubisch = {};

    // revolutions per second
    var settings = {
        spacing: 500, // block spacing
        sceneDepth: 3000,
        cameraLookAt: null
    };
    var angularSpeed = 0.2;
    var lastTime = 0;

    kubisch.angle = 0;

    kubisch.isShiftingOn = false;
    kubisch.isRotateOn = false;

    // this function is executed on each animation frame
    var animate = function() {
        // update
        // var time = (new Date()).getTime();
        // var timeDiff = time - lastTime;
        // var angleChange = angularSpeed * timeDiff * 2 * Math.PI / 5000;
        //cube.rotation.y += angleChange;
        //lastTime = time;

        // Shifting
        if(kubisch.isShiftingOn) {
            camera.position.x += 1;
        }
        if(kubisch.isRotateOn) {
            // TODO a circle on the x/z plane
            camera.position.x += 1;
            camera.position.z -= 1;
            camera.lookAt( settings.cameraLookAt );
        }

        // render
        renderer.render(scene, camera);

        // request new frame
        requestAnimationFrame(function () {
            animate();
        });
    };

    var createCube = function(xi,yi,zi) {
        // cube (width, height, depth)
        var cube = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), new THREE.MeshBasicMaterial({
            //wireframe: true,
            color: '#ddd'
        }));
        //cube.rotation.x = Math.PI * 0.1;
        cube.position.x = xi * settings.spacing;
        cube.position.y = yi * settings.spacing;
        cube.position.z = zi * settings.spacing;
        return cube;
    };

    var createBar = function(xi,yi,zi,axisName) {
        var widthHeight = 15;
        var width, height, depth, x, y, z;
        if(axisName === 'z') {
            width = widthHeight;
            height = widthHeight;
            depth = settings.sceneDepth;
            x = xi * settings.spacing;
            y = yi * settings.spacing;
            z = 0;
        } else if(axisName === 'x') {
            width = settings.sceneDepth;
            height = widthHeight;
            depth = widthHeight;
            x = 0;
            y = yi * settings.spacing;
            z = zi * settings.spacing;
        } else {
            // y axis
            width = widthHeight;
            height = settings.sceneDepth;
            depth = widthHeight;
            x = xi * settings.spacing;
            y = 0;
            z = zi * settings.spacing;
        }
        var bar = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), new THREE.MeshBasicMaterial({
            //wireframe: true,
            color: '#33f'
        }));
        bar.position.x = x;
        bar.position.y = y;
        bar.position.z = z;
        scene.add(bar);
    };

    var addElements = function() {
        var spacing = 500;
        var min = -3;
        var max = 3;
        var test = 0; // TODO remove
        for(var zi = min; zi < max; zi++) {
            for(var yi = min; yi < max; yi++) {
                for(var xi = min; xi < max; xi++) {
                    scene.add(createCube(xi,yi,zi));
                    // add bars along the x axis
                    if(xi === min) {
                        createBar(xi,yi,zi,'x');
                    }
                    // add bars along the y axis
                    if(yi === min) {
                        createBar(xi,yi,zi,'y'); // TODO replace 'y' by enum Bar.Y. Make Bar an object.
                    }
                    // add bars along the z axis
                    if(zi === min) {
                        createBar(xi,yi,zi,'z');
                        test++;
                    }
                }
            }
        }
        console.log('amount of bars on z axis: ' + test);
    };

    kubisch.init = function() {
        // renderer
        //var renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        renderer = new THREE.WebGLRenderer({antialias: true});
        var renderWidth = 600;
        var renderHeight = 600;
        renderer.setSize(renderWidth, renderHeight);
        document.querySelector('.kubisch').appendChild(renderer.domElement);

        // camera
        camera = new THREE.PerspectiveCamera(45, renderWidth / renderHeight, 1, settings.sceneDepth);
        //camera.position.z = 1000;
        camera.position.set( 500, 500, 1000); // x,y,z
        settings.cameraLookAt = new THREE.Vector3( -100, -150, 0 );
        camera.lookAt( settings.cameraLookAt );
    //    camera.rotation.z = 1;

        // scene
        scene = new THREE.Scene();

        addElements();
        animate();
    };

    window.kubisch = kubisch;
})();

(function() {
    'use strict';

    var $buttonShifting = $('<button>toggle shifting</button>');
    $buttonShifting.click(function() {
        kubisch.isShiftingOn = !kubisch.isShiftingOn;
    });
    $('body').append($buttonShifting);

    var $buttonRotate = $('<button>toggle rotate (spiral out)</button>');
    $buttonRotate.click(function() {
        kubisch.isRotateOn = !kubisch.isRotateOn;
    });
    $('body').append($buttonRotate);

    //threeCube.animate();
    kubisch.init();
})();
