;(function() {
    // TODO possible to resize the cubes, so all distances should be relative

    var settings = {
        height: 90,
        width: 100
    };
    //settings.vOffset = settings.height / 2;
    settings.hOffset = settings.width / 2;

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

    var init = function() {
        var $canvas = $('<canvas></canvas>');
        $canvas.css('border', '1px solid black');
        var canvas = $canvas[0];
        canvas.height = 600;
        canvas.width = 600;
        var ctx = canvas.getContext('2d');
        $('.reutersvard').append($canvas);

        // ctx.fillStyle = 'green';
        // ctx.fillRect(20, 10, 100, 100);
        // ctx.clearRect(10, 50, 20, 20);


        //new Cube(ctx, 10, 50);
        var verticalDistance = 1.35 * settings.width;
        var horizontalDistance = 0.75 * settings.width;

        // var ribsRight = [0, 1, 2, 3];
        // var ribsRightCenters = ribsRight.map(function(index) {

        // });
        var ribsRight, ribsBottom, ribsLeft, cubeCenters, i;
        cubeCenters = [];//[[300, 0],[300 + horizontalDistance, verticalDistance],[300 + (horizontalDistance * 2), verticalDistance * 2]];

        ribsRight = [];
        for(i = 0; i < 4; i++) {
            //var coords = [];
            var x = 300 + (horizontalDistance * i);
            var y = verticalDistance * i;
            ribsRight.push([x,y]);
        }
        cubeCenters = cubeCenters.concat(ribsRight);

        ribsBottom = [];
        for(i = 1; i < 4; i++) {
            // TODO scope
            var x1 = (300 + (horizontalDistance * 3)) - (horizontalDistance * i * 2);
            //console.log('ribsbottom', x1);
            var y1 = (verticalDistance * 3);
            ribsBottom.push([x1,y1]);
        }
        cubeCenters = cubeCenters.concat(ribsBottom);

        ribsLeft = [];
        for(i = 2; i > 0; i--) {
            // TODO scope
            var x2 = 300 - (horizontalDistance * i);
            //console.log('ribsbottom', x1);
            var y2 = verticalDistance * i;
            ribsLeft.push([x2,y2]);
        }
        cubeCenters = cubeCenters.concat(ribsLeft);

        //console.log('cub',cubeCenters);
        cubeCenters.map(function(coords) {
            //console.log(coords);
            new Cube(ctx, coords[0], coords[1]);
        });

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
        left = 300 + horizontalDistance;
        top = verticalDistance;
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