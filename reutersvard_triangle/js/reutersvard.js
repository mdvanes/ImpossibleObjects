;(function() {
    // TODO possible to resize the cubes, so all distances should be relative

    var settings = {
        height: 90, // block height
        width: 100, // block width
        canvasDimension: 600 // canvas width and height
    };
    //settings.vOffset = settings.height / 2;
    settings.hOffset = settings.width / 2;
    settings.canvasCenter = settings.canvasDimension / 2;
    settings.verticalDistance = 1.35 * settings.width;
    settings.horizontalDistance = 0.75 * settings.width;

    var Cube = function(ctx, left, top) {
        //console.log('new cube ', left, top);
        //ctx.fillRect(left, top, 100, 100);

        // var width = settings.width;
        // var offset = settings.hOffset; //settings.width / 2;

        var topPlane = new Path2D();
        topPlane.moveTo(left, top);
        topPlane.lineTo(left + settings.width, top);
        topPlane.lineTo(left + settings.width + settings.hOffset, top + 90);
        topPlane.lineTo(left + settings.hOffset, top + 90);
        // 60 degrees

        //ctx.stroke(topPlane);
        ctx.fillStyle = '#FFD700';
        ctx.fill(topPlane);

        var rightPlane = new Path2D();
        rightPlane.moveTo(left + settings.hOffset, top + 90);
        rightPlane.lineTo(left + settings.width + settings.hOffset, top + 90);
        rightPlane.lineTo(left + settings.width, top + 180);
        rightPlane.lineTo(left, top + 180);
        // 60 degrees

        //ctx.stroke(topPlane);
        ctx.fillStyle = '#008080';
        ctx.fill(rightPlane);

        var leftPlane = new Path2D();
        leftPlane.moveTo(left, top);
        leftPlane.lineTo(left + settings.hOffset, top + 90);
        leftPlane.lineTo(left, top + 180);
        leftPlane.lineTo(left - settings.hOffset, top + 90);

        ctx.fillStyle = '#FF6347';
        ctx.fill(leftPlane);
    };

    var getRibsRight = function() {
        var ribs = [];
        for(var i = 0; i < 4; i++) {
            //var coords = [];
            var x = settings.canvasCenter + (settings.horizontalDistance * i);
            var y = settings.verticalDistance * i;
            ribs.push([x,y]);
        }
        return ribs;        
    };

    // TODO enable strict mode

    var getRibsBottom = function() {
        var ribs = [];
        for(var i = 1; i < 4; i++) {
            // TODO scope
            var x = (settings.canvasCenter + (settings.horizontalDistance * 3)) - (settings.horizontalDistance * i * 2);
            //console.log('ribsbottom', x1);
            var y = (settings.verticalDistance * 3);
            ribs.push([x,y]);
        }
        return ribs;
    };

    var getRibsLeft = function() {
        var ribs = [];
        for(var i = 2; i > 0; i--) {
            // TODO scope
            var x = settings.canvasCenter - (settings.horizontalDistance * i);
            var y = settings.verticalDistance * i;
            ribs.push([x,y]);
        }
        return ribs;
    };

    var init = function() {
        // Prepare canvas
        var $canvas = $('<canvas></canvas>');
        $canvas.css('border', '1px solid black');
        var canvas = $canvas[0];
        canvas.height = settings.canvasDimension;
        canvas.width = settings.canvasDimension;
        var ctx = canvas.getContext('2d');
        $('.reutersvard').append($canvas);

        // Make a list of all the normal cubes
        var cubeCenters = [];
        cubeCenters = cubeCenters.concat(getRibsRight());
        cubeCenters = cubeCenters.concat(getRibsBottom());
        cubeCenters = cubeCenters.concat(getRibsLeft());

        //console.log('cub',cubeCenters);
        cubeCenters.map(function(coords) {
            //console.log(coords);
            new Cube(ctx, coords[0], coords[1]);
        });

        // Add special planes
        // TODO to function
        // TODO to relative
        var left = 300;
        var top = 0;
        var offset = settings.width / 2;
        var extraLeftPlane = new Path2D();
        // TODO reuse from Cube
        extraLeftPlane.moveTo(left, top);
        extraLeftPlane.lineTo(left + offset, top + 90);
        extraLeftPlane.lineTo(left, top + 180);
        extraLeftPlane.lineTo(left - offset, top + 90);

        ctx.fillStyle = '#FF6347';
        ctx.fill(extraLeftPlane);

        var extraRightPlane = new Path2D();
        extraRightPlane.moveTo(left + offset, top + 90);
        extraRightPlane.lineTo(left + (settings.width/2) + offset, top + 90);
        extraRightPlane.lineTo(left + (settings.width/2), top + 180);
        extraRightPlane.lineTo(left, top + 180);

        ctx.fillStyle = '#008080';
        ctx.fill(extraRightPlane);

        // TODO reuse ribsRight function?
        left = 300 + settings.horizontalDistance;
        top = settings.verticalDistance;
        offset = settings.width / 2;
        var extraLeftPlane2 = new Path2D();
        extraLeftPlane2.moveTo(left, top);
        extraLeftPlane2.lineTo(left + offset, top + 90);
        extraLeftPlane2.lineTo(left, top + 180);
        extraLeftPlane2.lineTo(left - offset, top + 90);

        ctx.fillStyle = '#FF6347';
        ctx.fill(extraLeftPlane2);
    };

    $(document).ready(function(){
        init();
    });
})();