/**
 * Created by Xuan on 2014/11/29.
 */

defineClass('ControlFrame', 'ControlList', {
    scrollTop: 0,
    scrollHeight: 0,
    entryHeight: 40,
    init: function (entryHeight) {
        this._super();
        this.entryHeight = entryHeight;
        this.on('mousewheel', this.onMouseWheel, this);
    },
    onMouseWheel: function (sender, x, y, dx, dy, dz) {
        if (dy > 0) {
            if (this.scrollTop + this.height + dy > this.scrollHeight) {
                this.scrollTop = this.scrollHeight - this.height;
                this.ResetControlPosition();
                return;
            }
        } else if (dy < 0) {
            if (this.scrollTop + dy < 0) {
                this.scrollTop = 0;
                this.ResetControlPosition();
                return;
            }
        } else
            return;
        this.scrollTop += dy;
        this.ResetControlPosition();
    },
    /**
     * APPEND control into this container
     * @param control
     */
    Append: function (control) {
        this._super(control);
        control.SetPosition(control.X, this.scrollHeight - this.scrollTop);
        this.scrollHeight += this.entryHeight;
    },
    /**
     * REMOVE control from this container
     * @param control
     */
    Remove: function (control) {
        this._super(control);
        this.ResetControlPosition();
    },
    ResetControlPosition: function () {
        var Y = -this.scrollTop,
            entryHeight = this.entryHeight;
        this.controls.forEach(function (i) {
            i.SetPosition(i.X, Y);
            Y += entryHeight;
        });
    },
    /**
     * @return {boolean}
     */
    Render: function (c) {
        if (!this._super(c))
            return false;
        if (this.scrollHeight > this.height) {
            this.startRender(c);
            try {
                c.globalAlpha = 0.5;
                c.fillStyle = 'gray';
                c.fillRect(this.width - 10, 1, 10 - 1, this.height - 2);
                c.fillStyle = 'white';
                c.globalAlpha = 0.8;
                c.fillRect(
                    this.width - 10,
                    (this.scrollTop / (this.scrollHeight - this.height)) * (this.height - 22),
                    10 - 1,
                    20);
            } finally {
                this.endRender(c);
            }

        }
    }
});