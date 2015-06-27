/**
 * Created by Xuan on 2014/11/30.
 */
defineClass('ControlBase', 'ControlPlane', {
    style: 'black',
    init: function (style) {
        this._super();
        this.style = style;
    },
    /**
     * @return {boolean}
     */
    IsPointIn: function (x, y) {
        return x >= 0 && x <= this.width &&
            y >= 0 && y <= this.height;
    },
    /**
     * @return {boolean}
     */
    Render: function (c) {
        if (!this._super())return false;
        this.startRender(c);
        try {
            c.fillStyle = this.style;
            c.fillRect(0, 0, this.width, this.height);
        } finally {
            this.endRender(c);
        }
        return true;
    }
});