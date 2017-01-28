/* jshint esnext:true */
window.mobiusrune = ((mobiusrune) => {

    // Degrees e.g. 90 convert to radians: 90 * Math.PI / 180;
    const degToRad = rad => rad * Math.PI / 180;

    mobiusrune.degToRad = degToRad;

    return mobiusrune;
})(window.mobiusrune || {});