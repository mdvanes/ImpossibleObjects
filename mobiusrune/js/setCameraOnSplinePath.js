/* jshint esnext:true */
window.mobiusrune = (function(mobiusrune){
    let camPosIndex = 0;

    const setCameraOnSplinePath = (camera, routeSpline) => {
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

    mobiusrune.setCameraOnSplinePath = setCameraOnSplinePath;

    return mobiusrune;
})(window.mobiusrune || {});