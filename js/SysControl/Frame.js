/**
 * Created by Xuan on 2014/11/26.
 */

defineClass('ControlContainer', 'ControlFrame', {
    FocusControl: null,
    init: function () {
        this._super();
        this.on('mousemove', this.postMouseEvent, {self: this, event: 'mousemove'});
        this.on('mousedown', this.postMouseEvent, {self: this, event: 'mousedown'});
        this.on('mouseup', this.postMouseEvent, {self: this, event: 'mouseup'});
        this.on('click', this.postMouseEvent, {self: this, event: 'click'});
        this.on('dblclick', this.postMouseEvent, {self: this, event: 'dblclick'});
        this.on('mousewheel', this.postMouseEvent, {self: this, event: 'mousewheel'});

        this.on('keydown', this.postKeyEvent, {self: this, event: 'keydown'});
        this.on('keyup', this.postKeyEvent, {self: this, event: 'keyup'});
        this.on('keypress', this.postKeyEvent, {self: this, event: 'keypress'});
    },
    Dispose: function () {
        this.off('mousemove', this.postMouseEvent);
        this.off('mousedown', this.postMouseEvent);
        this.off('mouseup', this.postMouseEvent);
        this.off('click', this.postMouseEvent);
        this.off('dblclick', this.postMouseEvent);
        this.off('mousewheel', this.postMouseEvent);

        this.on('keydown', this.postKeyEvent);
        this.on('keyup', this.postKeyEvent);
        this.on('keypress', this.postKeyEvent);
        this.RemoveAll(true);
        this._super();
    },
    Remove: function (control) {
        if (control === this.FocusControl)
            this.FocusControl = null;
        this._super(control);
    },
    RemoveAll: function (dispose) {
        this.FocusControl = null;
        this._super(dispose);
    },
    postMouseEvent: function (sender, x, y) {
        var self = this.self,
            event = this.event,
            arg = Array.prototype.slice.call(arguments, 0),
            children = sender.controls.slice(0);
        while (children.length > 0) {
            var i = children.pop();
            if (i !== undefined && !i.ignorePointer && i.IsPointIn(x - i.X, y - i.Y)) {
                arg[1] = x - i.X;
                arg[2] = y - i.Y;

                if (self.FocusControl !== i) {
                    var oldFocusControl = self.FocusControl;
                    self.FocusControl = i;
                    if (oldFocusControl !== null) {
                        arg[0] = 'mouseout';
                        oldFocusControl.fire.apply(oldFocusControl, arg);
                    }
                    arg[0] = 'mouseover';
                    i.fire.apply(i, arg);
                }

                arg[0] = event;
                return i.fire.apply(i, arg);
            }
        }
        return true;
    },
    postKeyEvent: function (sender, keyCode, extraInfo) {
        if (this.self.FocusControl) {
            return this.self.FocusControl.fire(this.event, keyCode, extraInfo);
        }
        return true;
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
     *
     * @param {CanvasRenderingContext2D} c
     * @return {boolean}
     */
    Render: function (c) {
        this.startRender(c);
        try {
            var maxDrawHeight = this.height;
            c.beginPath();
            c.rect(0, 0, this.width, this.height);
            c.clip();
            c.closePath();
            this.controls.forEach(function (i) {
                if (i.Y + i.height < 0 || i.Y > maxDrawHeight) return;
                if (!i.Render(c))
                    return false;
            });
        } finally {
            this.endRender(c);
        }
        return true;
    }
});