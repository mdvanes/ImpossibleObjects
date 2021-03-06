;(function() {
    'use strict';

    var ctx = null;

    var settings = {
        height: 90, // block height = width * 0.9
        width: 100, // block width
        canvasDimension: 600, // canvas width and height
        topMargin: 10,
        // colors: {
        //     top: '#FFD700',
        //     right: '#008080',
        //     left: '#FF6347'
        // },
        //useStroke: false
        // colors: {
        //     top: 'white',
        //     right: 'white',
        //     left: '#ccc'
        // },
        // useStroke: true
        colors: {
            top: '#ddd',
            right: '#ccc',
            left: '#bbb'
        },
        useStroke: false
    };
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
        var y = settings.topMargin + settings.verticalDistance * i;
        return [x,y];
    };

    // TODO combine into Ribs object? or Ribs Util with range and getXCubeCoord?
    var getBottomCubeCoord = function(i) {
        var x = (settings.canvasCenter + (settings.horizontalDistance * 3)) - (settings.horizontalDistance * i * 2);
        var y = settings.topMargin + (settings.verticalDistance * 3);
        return [x,y];
    };

    var getLeftCubeCoord = function(i) {
        var x = settings.canvasCenter - (settings.horizontalDistance * i);
        var y = settings.topMargin + settings.verticalDistance * i;
        return [x,y];
    };

    // The Exception
    var getHalfRightPlane = function(coords) {
        var left = coords[0];
        var top = coords[1];
        var plane = new Path2D();
        plane.moveTo(left + settings.hOffset, top + settings.height);
        plane.lineTo(left + (settings.width/2) + settings.hOffset, top + settings.height);
        plane.lineTo(left + (settings.width/2), top + (settings.height * 2));
        plane.lineTo(left, top + (settings.height * 2));
        return plane;
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

        // Add the normal cubes
        cubeCenters.map(function(coords) {
            var cube = new Cube(ctx, coords[0], coords[1]);
            cube.draw();
        });

        var extraCube1Coord = getRightCubeCoord(0);
        var extraCube1 = new Cube(ctx, extraCube1Coord[0], extraCube1Coord[1]);
        // TODO cube.drawPlane is independent from cube and should be on Cube?
        extraCube1.drawPlane(extraCube1.getLeftPlane(), settings.colors.left);

        var extraHalfRightPlane = getHalfRightPlane(extraCube1Coord);
        // Don't use drawPlane here because never draw stroke //extraCube1.drawPlane(extraHalfRightPlane, settings.colors.right);
        ctx.fillStyle = settings.colors.right;
        ctx.fill(extraHalfRightPlane);

        // Draw extra left plane for Cube 2
        var extraCube2Coord = getRightCubeCoord(1);
        var extraCube2 = new Cube(ctx, extraCube2Coord[0], extraCube2Coord[1]);
        extraCube2.drawPlane(extraCube2.getLeftPlane(), settings.colors.left);
    };

    var init = function() {
        // Prepare canvas
        var $canvas = $('<canvas></canvas>');
        $canvas.css('background-color', '#fff');
        var canvas = $canvas[0];
        canvas.height = settings.canvasDimension + 5;
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