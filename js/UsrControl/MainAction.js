/**
 * Created by xuan on 14-11-27.
 */

defineClass('ControlPolygon', 'ControlMainAction', {
    text: null,
    action: null,
    init: function (text, action) {
        this._super(100, 6, "white");
        this.alpha = 0.25;
        this.text = text;
        this.action = action;
        this.cursor = 'Hand';
        this.on('mouseover', this.onMouseOver, this);
        this.on('mouseout', this.onMouseOut, this);
    },
    onMouseOver: function (sender) {
        var light = 0.25, direction = 0.01;
        sender.lastInterval = setInterval(function () {
            if (sender.parent === null)
                clearInterval(sender.lastInterval);
            light += direction;
            if (light > 0.6) {
                direction = -0.01;
            } else if (light <= 0.25) {
                direction = 0.01;
            }
            sender.alpha = light;
        }, 20);
    },
    onMouseOut: function (sender) {
        if (undefined !== sender.lastInterval) {
            clearInterval(sender.lastInterval);
            delete sender.lastInterval;
        }
        sender.alpha = 0.25;
    },
    /**
     *
     * @param {CanvasRenderingContext2D} c
     * @return {boolean}
     */
    Render: function (c) {
        if (!this._super(c)) {
            return false;
        }
        this.startRender(c, {
            applyAlpha: false
        });
        c.font = this.radius / 3 + 'px "Microsoft YaHei"';
        var mWidth = c.measureText(this.text).width;
        c.fillText(this.text, (this.width - mWidth) / 2, (this.height + this.radius / 6) / 2, 2 * this.radius);
        this.endRender(c);
        return true;
    }
});