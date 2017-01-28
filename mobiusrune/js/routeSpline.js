/* jshint esnext:true */
window.mobiusrune = (function(mobiusrune){

    const getRouteSpline = _ => {
        // var curve = new THREE.CatmullRomCurve3( [
        //     new THREE.Vector3( -100, 0, -110 ),
        //     new THREE.Vector3( -50, 5, -105 ),
        //     new THREE.Vector3( 0, 0, -100 ),
        //     new THREE.Vector3( 50, -5, -105 ),
        //     new THREE.Vector3( 100, 0, -110 )
        // ]);

        // var geometry = new THREE.Geometry();
        // geometry.vertices = curve.getPoints( 50 );

        // var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
        // const mesh = new THREE.Mesh(geometry, material);
        // console.log('test curve', mesh);
        // return mesh;


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

        // var material = new THREE.LineBasicMaterial({
        //     color: 0xff00f0,
        // });
        
        // var geometry = new THREE.Geometry();
        // for(var i = 0; i < spline1.getPoints(100).length; i++){
        //     geometry.vertices.push(spline1.getPoints(100)[i]);  
        // }

        // routeSpline = spline1;
        
        // var line = new THREE.Line(geometry, material);
        // return line;
    };

    const getRouteDebugLine = routeSpline => {
        const material = new THREE.LineBasicMaterial({
            color: 0xff00f0,
        });
        
        const geometry = new THREE.Geometry();
        // for(let i = 0; i < routeSpline.getPoints(100).length; i++){
        //     geometry.vertices.push(routeSpline.getPoints(100)[i]);  
        // }

        geometry.vertices = routeSpline.getPoints(100).map(point => point);

        //routeSpline = spline1;
        
        return new THREE.Line(geometry, material);
        //return line;
    };

    mobiusrune = mobiusrune || {};
    mobiusrune.getRouteSpline = getRouteSpline;
    mobiusrune.getRouteDebugLine = getRouteDebugLine;

    return mobiusrune;
})(window.mobiusrune || {});