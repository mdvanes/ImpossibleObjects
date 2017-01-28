/* jshint esnext:true */
window.mobiusrune = (mobiusrune => {

    // TODO move along path: https://codepen.io/wiledal/pen/WvNvEq
    // TODO set center of rotation for the logo in the center. It's already in the center in Blender.

    // TODO make this a pure function (do not pass scene as param, return promise?)
    const getLogoMesh = cb => {
        // https://github.com/mrdoob/three.js/blob/dev/examples/webgl_loader_json_blender.html
        // Doesn't work, maybe the one above (json_blender)
        // https://github.com/mrdoob/three.js/blob/dev/examples/webgl_loader_obj.html
        //const jsonPath = 'logotest1.json';
        //const jsonPath = 'cube.json';
        const jsonPath = 'mdlogo2.json?v=1';
        const loader = new THREE.JSONLoader();
        loader.load( jsonPath, ( geometry, materials) => {
            console.log('JSONLoader', geometry, materials);

            // Fix material, see https://github.com/mrdoob/three.js/blob/dev/examples/webgl_loader_json_blender.html
            //const texture = new THREE.TextureLoader().load( 'texture/crate.gif' );
            //const texture = new THREE.TextureLoader().load( 'texture/logo.png' );
            //const texture = new THREE.TextureLoader().load( 'texture/logotest1-texture.png' );
            const texture = new THREE.TextureLoader().load( 'texture/mdlogo-texture.png?v=1' );
            //console.log('jsonloadertex', texture);
            const material = new THREE.MeshBasicMaterial( { map: texture } );
            const mesh = new THREE.Mesh( geometry, material );
            //mesh = new THREE.Mesh( geometry, getMeshFaceMaterial2() );

            mesh.rotation.x = mobiusrune.degToRad(90); // Rotation in radians
            mesh.scale.set(20,20,20);
            //mesh.position.x = 200;
            //mesh.position.y = 60;
            //scene.add( mesh );
            cb(mesh);
        });
    };

    // const getMeshFaceMaterial = () => {
    //     let logoTexture = new THREE.TextureLoader().load( 'texture/logo.png' );
    //     let logoMaterial = new THREE.MeshBasicMaterial( { map: logoTexture } );
    //     let crateTexture = new THREE.TextureLoader().load( 'texture/crate.gif' );
    //     let crateMaterial = new THREE.MeshBasicMaterial( { map: crateTexture } );
    //     return new THREE.MeshFaceMaterial( [crateMaterial, logoMaterial, crateMaterial, crateMaterial, crateMaterial, crateMaterial] );
    // };

    // const getMeshFaceMaterial2 = () => {
    //     let logoTexture = new THREE.TextureLoader().load( 'texture/logo.png' );
    //     let logoMaterial = new THREE.MeshBasicMaterial( { map: logoTexture } );
    //     let crateTexture = new THREE.TextureLoader().load( 'texture/crate.gif' );
    //     let crateMaterial = new THREE.MeshBasicMaterial( { map: crateTexture } );
    //     return new THREE.MeshFaceMaterial( [logoMaterial, logoMaterial, crateMaterial, crateMaterial, 
    //         crateMaterial, logoMaterial,crateMaterial, crateMaterial,
    //         crateMaterial, logoMaterial,crateMaterial, crateMaterial,
    //         crateMaterial, logoMaterial] );
    // };

    // const addBlockWithLogoMesh = scene => {
    //     // Working basic block with image of logo
    //     let geometry = new THREE.BoxBufferGeometry( 30, 166, 200 ); // depth, height, width
    //     let localMesh = new THREE.Mesh( geometry, getMeshFaceMaterial() );

    //     localMesh.rotation.y = degToRad(90); // Rotation in radians
    //     scene.add( localMesh );
    //     return localMesh;
    // };

    mobiusrune.getLogoMesh = getLogoMesh;

    return mobiusrune;
})(window.mobiusrune || {});