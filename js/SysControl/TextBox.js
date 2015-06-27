/**
 * Created by Xuan on 2014/11/30.
 */

defineClass('ControlBase', 'ControlTextBox', {
    text: null,
    SelectStart: 0,
    SelectWidth: 0,
    textStart: 0,
    init: function (text) {
        this._super();
        this.height = 20;
        this.text = text;
        this.cursor = 'IBeam';
        this.on('keydown', this.onKeyDown, this);
        this.on('keypress', this.onKeyPress, this);
    },
    onKeyDown: function (sender, code, extra) {
        switch (code) {
            case 8://BackSpace
                if (this.SelectWidth == 0 && this.text.length > 0)
                    this.SelectWidth = 1;
                if (this.SelectWidth < 0) {
                    this.text =
                        this.text.substr(0, this.SelectStart) +
                        this.text.substr(this.SelectStart + this.SelectWidth);
                } else {
                    this.text =
                        this.text.substr(0, this.SelectStart - this.SelectWidth) +
                        this.text.substr(this.SelectStart);
                    this.SelectStart -= this.SelectWidth;
                }
                this.SelectWidth = 0;

                break;
            default :
                break;
        }
    },
    onKeyPress: function (sender, code, extra) {
        switch (code) {
            case 8:
                break;
            default :
                if (this.SelectWidth != 0) {
                    if (this.SelectWidth < 0) {
                        this.text =
                            this.text.substr(0, this.SelectStart) +
                            this.text.substr(this.SelectStart + this.SelectWidth);
                    } else {
                        this.text =
                            this.text.substr(0, this.SelectStart - this.SelectWidth) +
                            this.text.substr(this.SelectStart);
                        this.SelectStart -= this.SelectWidth;
                    }
                    this.SelectWidth = 0;
                }
                this.text += String.fromCharCode(extra.charCode);
                this.SelectStart++;
                break;
        }
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
    renderFrameIndex: 0,
    /**
     *
     * @param {CanvasRenderingContext2D} c
     * @return {boolean}
     */
    Render: function (c) {
        this.startRender(c);
        this.renderFrameIndex++;
        try {
            c.fillStyle = 'white';
            c.fillRect(0, 0, this.width, this.height);
            c.strokeStyle = 'black';
            c.rect(0, 0, this.width, this.height);
            c.stroke();
            c.fillStyle = "black";
            c.font = this.height + 'px Arial';
            c.beginPath();
            c.rect(1, 1, this.width - 2, this.height - 2);
            c.clip();
            var text = this.text.substr(this.textStart);
            c.fillText(text, 0, this.height * 0.9);
            if (this.parent.FocusControl === this &&
                this.renderFrameIndex % 60 >= 30) {
                var pos = this.SelectStart - this.textStart,
                    leftStr = text.substr(0, pos),
                    width = c.measureText(leftStr).width;
                c.fillRect(width, 1, 2, this.height - 2);
            }
        } finally {
            this.endRender(c);
        }
        return true;
    }
});