/**
 * Created by Xuan on 2014/11/26.
 */

defineClass('ControlFrame', 'ControlScreen', {
    Switcher: null,
    init: function (switcher) {
        this._super();
        this.cursor = "Arrow";
        this.Switcher = switcher;
    },
    controlFlyOut: function (ctl, dstX, dstY) {
        var xDone = false, yDone = false;
        if (ctl.exitFrameIndex === undefined) {
            ctl.exitFrameIndex = 1;
        }
        var step = ctl.exitFrameIndex++,
            dx = dstX - ctl.X,
            dy = dstY - ctl.Y;
        if (Math.abs(dx) < step) {
            ctl.X = dstX;
            xDone = true;
        } else {
            if (dx > 0) {
                ctl.X += step;
            } else {
                ctl.X -= step;
            }
        }
        if (Math.abs(dy) < step) {
            ctl.Y = dstY;
            yDone = true;
        } else {
            if (dy > 0) {
                ctl.Y += step;
            } else {
                ctl.Y -= step;
            }
        }
        return xDone && yDone;
    },
    controlFlyIn: function (ctl, dstX, dstY) {
        var xDone = false, yDone = false;
        var dx = (dstX - ctl.X) / 10,
            dy = (dstY - ctl.Y) / 10;
        if (Math.abs(dx) < 0.01) {
            ctl.X = dstX;
            xDone = true;
        } else {
            ctl.X += dx;
        }
        if (Math.abs(dy) < 0.01) {
            ctl.Y = dstY;
            yDone = true;
        } else {
            ctl.Y += dy;
        }
        return xDone && yDone;
    },
});