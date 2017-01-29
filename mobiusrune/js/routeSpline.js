/* jshint esnext:true */
window.mobiusrune = (mobiusrune => {

    const getRouteSpline = _ => {
        // var curve = new THREE.CatmullRomCurve3( [
        // docs: https://threejs.org/docs/api/extras/curves/SplineCurve3.html
        const routeSpline = new THREE.SplineCurve3([
                             // x   y   z
            // new THREE.Vector3( -30, -20, 250 ),
            // new THREE.Vector3( -10, 10, 150 ),
            // new THREE.Vector3( 10, 10, 150 ),
            // new THREE.Vector3( 30, -20, 250 )

            new THREE.Vector3( 0, 0, 250 ),
            new THREE.Vector3( -30, -20, 250 ),
            new THREE.Vector3( -70, -40, 117 ), // left bottom (in)
            new THREE.Vector3( -50, 55, 109 ), // left top
            new THREE.Vector3( 75, -55, 108 ), // right bottom
            new THREE.Vector3( 50, 60, 117 ), // right top
            new THREE.Vector3( -65, -40, 119 ), // left bottom (out)

            //new THREE.Vector3( -10, 10, 150 ),
            //new THREE.Vector3( 10, 10, 150 ),
            new THREE.Vector3( -30, -20, 250 ),
            new THREE.Vector3( 0, 0, 250 )
        ]);
        
        return routeSpline;
    };

    const getRouteDebugLine = routeSpline => {
        const material = new THREE.LineBasicMaterial({
            color: 0xff00f0,
        });
        
        const geometry = new THREE.Geometry();
        geometry.vertices = routeSpline.getPoints(100).map(point => point);
        
        return new THREE.Line(geometry, material);
    };

    mobiusrune.getRouteSpline = getRouteSpline;
    mobiusrune.getRouteDebugLine = getRouteDebugLine;

    return mobiusrune;
})(window.mobiusrune || {});