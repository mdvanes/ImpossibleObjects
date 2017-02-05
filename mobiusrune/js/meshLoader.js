/* jshint esnext:true */
window.mobiusrune = (mobiusrune => {

    // Could improve by returning Promise
    const getLogoMesh = cb => {
        const cacheBustId = 2;
        const jsonPath = 'mdlogo2.json?v=' + cacheBustId;
        const loader = new THREE.JSONLoader();
        loader.load( jsonPath, ( geometry, materials) => {
            const texture = new THREE.TextureLoader().load( 'texture/mdlogo-texture.png?v=' + cacheBustId );
            const material = new THREE.MeshBasicMaterial( { map: texture } );
            const mesh = new THREE.Mesh( geometry, material );

            geometry.center(); // Auto set the (rotation) center of the geometry

            mesh.rotation.x = mobiusrune.degToRad(90); // Rotation in radians
            mesh.scale.set(20,20,20);
            cb(mesh);
        });
    };

    mobiusrune.getLogoMesh = getLogoMesh;

    return mobiusrune;
})(window.mobiusrune || {});