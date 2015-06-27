/**
 * Created by Xuan on 2014/11/27.
 */

defineClass('ControlBase', 'ControlPolygon', {
    radius: 0,
    sides: 0,
    background: 'blue',
    points: null,
    init: function (radius, sides, style) {
        this._super();
        this.radius = radius;
        this.sides = sides;
        if (style)
            this.background = style;
        this.makePoints();
    },
    Dispose: function () {
        delete this.points;
        this._super();
    },
    /**
     * Check the point on
     * @param {Number} x
     * @param {Number} y
     * @returns {boolean}
     */
    IsPointIn: function (x, y) {
        //If the point is so far from this control, just return false.
        x -= this.radius;
        y -= this.radius;
        if (x * x + y * y > this.radius * this.radius) {
            return false;
        }

        var i, j;
        var count1 = 0;
        var count2 = 0;
        for (i = 0, j = this.points.length - 1; i < this.points.length; j = i++) {
            var value = (x - this.points[j].x) * (this.points[i].y - this.points[j].y)
                - (y - this.points[j].y) * (this.points[i].x - this.points[j].x);
            if (value > 0)
                ++count1;
            else if (value < 0)
                ++count2;
        }

        return 0 == count1 || 0 == count2;
    },
    makePoints: function () {
        this.points = [];
        var a = (Math.PI * 2) / this.sides;
        this.width = this.height = 2 * this.radius;
        this.points.push({x: this.radius, y: 0});
        for (var i = 1; i < this.sides; i++) {
            this.points.push({x: this.radius * Math.cos(a * i), y: this.radius * Math.sin(a * i)});
        }
    },
    /**
     *
     * @param {CanvasRenderingContext2D} c
     * @return {boolean}
     */
    Render: function (c) {
        if (this.points.length < 3) return false;
        this.startRender(c);
        c.beginPath();
        c.translate(this.radius, this.radius);
        //c.rotate(startAngle);
        c.moveTo(this.points[0].x, this.points[0].y);
        for (var i = 1; i < this.sides; i++) {
            c.lineTo(this.points[i].x, this.points[i].y);
        }
        c.closePath();
        if (this.background instanceof HTMLImageElement) {
            c.clip();
            c.drawImage(this.bgImg, -this.radius, -this.radius, 2 * this.radius, 2 * this.radius);
        } else {
            c.fillStyle = this.background;
            c.fill();
        }

        this.endRender(c);
        return true;
    }
});