/* jshint esnext:true */
window.mobiusrune = ((mobiusrune) => {

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

    mobiusrune = mobiusrune || {};
    mobiusrune.getRouteSpline = getRouteSpline;
    mobiusrune.getRouteDebugLine = getRouteDebugLine;

    return mobiusrune;
})(window.mobiusrune || {});