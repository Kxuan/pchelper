/**
 * Created by Xuan on 2014/11/29.
 */

defineClass('ControlBase', 'ControlEraseFileRecord', {
    filename: null,
    Status: 'Waiting',
    init: function (filename) {
        this._super();
        this.filename = filename;
        this.height = 20;
        this.width = 540;
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
            c.fillStyle = 'black';
            c.font = this.height + 'px Arial';
            c.fillText(this.filename, 0, this.height, this.width - 125);
            switch (this.Status) {
                case 'Waiting':
                    c.fillStyle = 'white';
                    c.fillText('等待', this.width - 125, this.height, 125);
                    break;
                case 'Processing':
                    c.fillStyle = 'orange';
                    c.fillText('处理中', this.width - 125, this.height, 125);
                    break;
                case 'OK':
                    c.fillStyle = 'lime';
                    c.fillText('成功', this.width - 125, this.height, 125);
                    break;
                default :
                    if (typeof this.Status == "number") {
                        c.fillStyle = 'hsl(' + (this.Status / 100 * 60 + 60) + ',100%,77%)';
                        c.fillText(this.Status + '％', this.width - 125, this.height, 125);
                    } else {
                        c.fillStyle = 'red';
                        c.fillText(this.Status, this.width - 125, this.height, 125);
                    }
                    break;
            }
        } finally {
            this.endRender(c);
        }
        return true;
    }
});