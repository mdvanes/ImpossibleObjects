/* jshint esnext:true */
window.mobiusrune = (mobiusrune => {
    let camPosIndex = 0;

    let tangent = new THREE.Vector3();
    let axis = new THREE.Vector3();
    let up = new THREE.Vector3(0, 1, 0);

    var velocity = 0;
    var progress = 0;
    var clock = new THREE.Clock();
    var lookAt = new THREE.Vector3();

    var curve = ( function () {
        var vector = new THREE.Vector3();
        var vector2 = new THREE.Vector3();
        return {
            getPointAt: function ( t ) {
                t *= Math.PI;
                var x = Math.sin(t * 4) * Math.cos(t * 6) * 1000;
                var y = Math.cos(t * 8) * 80 + Math.cos(t * 20 * Math.sin(t)) * 40 + 200;
                var z = Math.sin(t * 5) * Math.sin(t * 3) * 1000;
                return vector.set( x, y, z );
            },
            getTangentAt: function ( t ) {
                var delta = 0.0001;
                var t1 = Math.max( 0, t - delta );
                var t2 = Math.min( 1, t + delta );
                return vector2.copy( this.getPointAt ( t2 ) ).sub( this.getPointAt( t1 ) ).normalize();
            }
        };
    } )();

    const setCameraOnSplinePath = (camera, routeSpline) => {
        // Source: working cube along spline path http://jsfiddle.net/SCXNQ/891/

        // Keeping the camera straight up
        // http://stackoverflow.com/questions/18400667/three-js-object-following-a-spline-path-rotation-tanget-issues-constant-sp
        const fragmentSize = 1000; // default 10000, higher is slower
        camPosIndex++;
        if (camPosIndex > fragmentSize) {
            camPosIndex = 0;
            return false;
        }
        let camPos = routeSpline.getPoint(camPosIndex / fragmentSize);
        let camRot = routeSpline.getTangent(camPosIndex / fragmentSize);

        camera.position.copy(camPos);

        // https://github.com/takahirox/takahirox.github.io/blob/master/three.js.mmdeditor/examples/webvr_rollercoaster.html


        // http://stackoverflow.com/questions/11179327/orient-objects-rotation-to-a-spline-point-tangent-in-three-js
        //tangent = routeSpline.getTangentAt( camPosIndex / fragmentSize ).normalize();
        // tangent = camRot.normalize();
        // axis.crossVectors(up, tangent).normalize();
        // let radians = Math.acos(up.dot(tangent));
        // camera.quaternion.setFromAxisAngle(axis, radians);

        //console.log(camRot);
        // camera.rotation.x = camRot.x;
        // camera.rotation.y = camRot.y;
        // camera.rotation.z = camRot.z;

        //camera.lookAt(routeSpline.getPoint((camPosIndex+1) / fragmentSize));

        // camera.rotation.y = 0;
        // camera.rotation.z = 0;
        // // While z between 250 and 150, increase x rot from 0 to targetRotation
        const targetRotation = mobiusrune.degToRad(80); //0.7;
        if(camera.position.z <= 120) {
            camera.rotation.x = targetRotation;
            camera.rotation.y = 0; //mobiusrune.degToRad(camPosIndex);
            camera.rotation.z = 0; //mobiusrune.degToRad(-30);

            //camera.lookAt(routeSpline.getPoint((camPosIndex+1) / fragmentSize));

            // var delta = clock.getDelta() * 60;
            // progress += velocity * delta;
            // progress = progress % 1;
            // tangent.copy( curve.getTangentAt( progress ) );
            // velocity -= tangent.y * 0.0000015 * delta;
            // velocity = Math.max( velocity, 0.00004 );
            // camera.lookAt( lookAt.copy( camPos ).sub( tangent ) );
        } else if(camera.position.z >= 150) {
            camera.rotation.x = 0;
        } else {
            var r = ((150 - camera.position.z) / 30) * targetRotation;
            camera.rotation.x = r;
        }
        return true;
    };

    mobiusrune.setCameraOnSplinePath = setCameraOnSplinePath;

    return mobiusrune;
})(window.mobiusrune || {});