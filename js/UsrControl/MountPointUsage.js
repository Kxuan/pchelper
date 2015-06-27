/**
 * Created by Xuan on 2014/12/1.
 */
defineClass('ControlBase', 'ControlMountPointUsage', {
    info: null,
    style: 'black',
    init: function (info) {
        this._super();
        this.info = info;
        this.height = 30;
        this.width = 340;
    },
    /**
     * Check the point on
     * @param {Number} x
     * @param {Number} y
     * @returns {boolean}
     */
    IsPointIn: function (x, y) {
        return x >= 0 && x <= this.width &&
            y >= 0 && y <= this.height;
    },
    /**
     * @param {CanvasRenderingContext2D} c
     * @return {boolean}
     */
    Render: function (c) {
        this.startRender(c);
        try {
            c.fillStyle = this.style;
            c.font = this.height + 'px Arial';
            c.strokeStyle = 'black';
            c.lineWidth = 2.5;
            c.strokeText(this.info.point, 0, this.height, 200);
            c.strokeText(this.info.usage, 201, this.height, 69);
            c.strokeText(this.info.available, 271, this.height, 69);
            c.fillText(this.info.point, 0, this.height, 200);
            c.fillText(this.info.usage, 201, this.height, 69);
            c.fillText(this.info.available, 271, this.height, 69);

        } finally {
            this.endRender(c);
        }
        return true;
    }
});