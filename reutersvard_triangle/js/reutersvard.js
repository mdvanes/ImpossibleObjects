;(function() {
    'use strict';
    // TODO possible to resize the cubes, so all distances should be relative

    var ctx = null;

    var settings = {
        height: 90, // block height = width - 0.9
        width: 100, // block width
        canvasDimension: 600, // canvas width and height
        colors: {
            top: '#FFD700',
            right: '#008080',
            left: '#FF6347'
        },
        useStroke: false
    };
    // settings.hOffset = settings.width / 2;
    // settings.canvasCenter = settings.canvasDimension / 2;
    // settings.verticalDistance = 1.35 * settings.width;
    // settings.horizontalDistance = 0.75 * settings.width;
    settings.hOffset = null;
    settings.canvasCenter = null;
    settings.verticalDistance = null;
    settings.horizontalDistance = null;

    var Cube = function(ctx, left, top) {
        this.left = left;
        this.top = top;
        this.ctx = ctx;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;

        this.topPlane = this.getTopPlane();
        this.rightPlane = this.getRightPlane();
        this.leftPlane = this.getLeftPlane();
    };

    Cube.prototype.draw = function() {
        this.drawPlane(this.topPlane, settings.colors.top);
        this.drawPlane(this.rightPlane, settings.colors.right);
        this.drawPlane(this.leftPlane, settings.colors.left);
    };

    Cube.prototype.getTopPlane = function() {
        var plane = new Path2D();
        plane.moveTo(this.left, this.top);
        plane.lineTo(this.left + settings.width, this.top);
        plane.lineTo(this.left + settings.width + settings.hOffset, this.top + settings.height);
        plane.lineTo(this.left + settings.hOffset, this.top + settings.height);
        return plane;        
    };

    Cube.prototype.getRightPlane = function() {
        var plane = new Path2D();
        plane.moveTo(this.left + settings.hOffset, this.top + settings.height);
        plane.lineTo(this.left + settings.width + settings.hOffset, this.top + settings.height);
        plane.lineTo(this.left + settings.width, this.top + (settings.height * 2));
        plane.lineTo(this.left, this.top + (settings.height * 2));
        return plane;
    };

    Cube.prototype.getLeftPlane = function() {
        var plane = new Path2D();
        plane.moveTo(this.left, this.top);
        plane.lineTo(this.left + settings.hOffset, this.top + settings.height);
        plane.lineTo(this.left, this.top + (settings.height * 2));
        plane.lineTo(this.left - settings.hOffset, this.top + settings.height);
        return plane;
    };

    Cube.prototype.drawPlane = function(plane, color) {
        this.ctx.fillStyle = color;
        this.ctx.fill(plane);
        if(settings.useStroke) {
            this.ctx.stroke(plane);
        }
    };

    /*
    // var getRibsRight = function() {
    //     var indexes = range(0,3);
    //     return indexes.map(getRightCubeCoord);
    // };

    // var getRibsBottom = function() {
    //     var ribs = [];
    //     for(var i = 1; i < 4; i++) {
    //         var x = (settings.canvasCenter + (settings.horizontalDistance * 3)) - (settings.horizontalDistance * i * 2);
    //         var y = (settings.verticalDistance * 3);
    //         ribs.push([x,y]);
    //     }
    //     return ribs;
    // };

    // var getRibsLeft = function() {
    //     var ribs = [];
    //     for(var i = 2; i > 0; i--) {
    //         var x = settings.canvasCenter - (settings.horizontalDistance * i);
    //         var y = settings.verticalDistance * i;
    //         ribs.push([x,y]);
    //     }
    //     return ribs;
    // };
    */


    // Create an array with the integers from start to end
    var range = function(start, end) {
        var r = [];
        for(var i = start; i <= end; i++) {
            r.push(i);
        }
        return r;
    };

    var getRightCubeCoord = function(i) {
        var x = settings.canvasCenter + (settings.horizontalDistance * i);
        var y = settings.verticalDistance * i;
        return [x,y];
    };

    // TODO combine into Ribs object? or Ribs Util with range and getXCubeCoord?
    var getBottomCubeCoord = function(i) {
        var x = (settings.canvasCenter + (settings.horizontalDistance * 3)) - (settings.horizontalDistance * i * 2);
        var y = (settings.verticalDistance * 3);
        return [x,y];
    };

    var getLeftCubeCoord = function(i) {
        var x = settings.canvasCenter - (settings.horizontalDistance * i);
        var y = settings.verticalDistance * i;
        return [x,y];
    };

    var draw = function() {
        settings.hOffset = settings.width / 2;
        settings.canvasCenter = settings.canvasDimension / 2;
        settings.verticalDistance = 1.35 * settings.width;
        settings.horizontalDistance = 0.75 * settings.width;

        ctx.clearRect(0, 0, settings.canvasDimension + settings.width, settings.canvasDimension);

        // TODO rename cubeCoords or cubeTopLeft
        // Make a list of all the normal cubes
        var cubeCenters = [];
        cubeCenters = cubeCenters.concat(range(0,3).map(getRightCubeCoord));
        cubeCenters = cubeCenters.concat(range(1,3).map(getBottomCubeCoord));
        cubeCenters = cubeCenters.concat([2,1].map(getLeftCubeCoord));
        // cubeCenters = cubeCenters.concat(range(0,3).map(getRightCubeCoord));//getRibsRight());
        // cubeCenters = cubeCenters.concat(getRibsBottom());
        // cubeCenters = cubeCenters.concat(getRibsLeft());

        // Add the normal cubes
        cubeCenters.map(function(coords) {
            var cube = new Cube(ctx, coords[0], coords[1]);
            cube.draw();
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

        // Draw extra left plane for Cube 2
        // left = settings.canvasCenter + settings.horizontalDistance;
        // top = settings.verticalDistance;
        // var extraCube2 = new Cube(ctx, left, top);
        var extraCube2Coord = getRightCubeCoord(1);
        var extraCube2 = new Cube(ctx, extraCube2Coord[0], extraCube2Coord[1]);
        var extraLeftPlane2 = extraCube2.getLeftPlane();
        extraCube2.drawPlane(extraLeftPlane2, settings.colors.left);
        // left = 300 + settings.horizontalDistance;
        // top = settings.verticalDistance;
        // offset = settings.width / 2;
        // var extraLeftPlane2 = new Path2D();
        // extraLeftPlane2.moveTo(left, top);
        // extraLeftPlane2.lineTo(left + offset, top + 90);
        // extraLeftPlane2.lineTo(left, top + 180);
        // extraLeftPlane2.lineTo(left - offset, top + 90);

        // ctx.fillStyle = 'red';
        // ctx.fill(extraLeftPlane2);
    };

    var init = function() {
        // Prepare canvas
        var $canvas = $('<canvas></canvas>');
        //$canvas.css('border', '1px solid black');
        $canvas.css('background-color', '#fff');
        var canvas = $canvas[0];
        canvas.height = settings.canvasDimension;
        canvas.width = settings.canvasDimension + settings.width;
        ctx = canvas.getContext('2d');
        $('.reutersvard').append($canvas);
        draw(ctx);
    };

    $(document).ready(function() {
        $('#cubeSize').val(100);
        init();

        $('#cubeSize').change(function() {
            settings.width = parseInt($(this).val(), 10);
            settings.height = settings.width * 0.9;
            draw();
        });
    });
})();