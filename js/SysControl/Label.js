/**
 * Created by Xuan on 2014/11/26.
 */
defineClass('ControlBase', 'ControlLabel', {
    digitImgEl: [
        loadImage('image/digit/0.png'),
        loadImage('image/digit/1.png'),
        loadImage('image/digit/2.png'),
        loadImage('image/digit/3.png'),
        loadImage('image/digit/4.png'),
        loadImage('image/digit/5.png'),
        loadImage('image/digit/6.png'),
        loadImage('image/digit/7.png'),
        loadImage('image/digit/8.png'),
        loadImage('image/digit/9.png')
    ],
    style: 'black',
    text: null,
    font: 'Arial',
    padding: 0,
    /**
     * @note autoWidth and strokeStyle will be ignored by Number Label!
     */
    autoWidth: true,
    strokeStyle: null,
    strokeWidth: 1,
    /**
     *
     * @param text
     */
    init: function (text) {
        this._super();
        this.height = 20;
        this.text = text;
        this.cursor = 'IBeam';
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
            if (typeof this.text == "string") {
                c.fillStyle = this.style;
                c.font = this.height + 'px ' + this.font;
                var text = this.text;
                if (this.padding > text.length) {
                    var spacing = '';
                    for (var i = text.length; i < this.padding; i++) {
                        spacing += ' ';
                    }
                    text = spacing + text;
                }
                if (this.autoWidth)
                    this.width = c.measureText(text).width;
                if (this.strokeStyle) {
                    c.strokeStyle = this.strokeStyle;
                    c.lineWidth = this.strokeWidth;
                    c.strokeText(text, 0, this.height, this.width)
                }
                c.fillText(text, 0, this.height, this.width);

            } else if (typeof this.text == "number") {
                var digits = [],
                    num = parseInt(this.text),
                    width = 0,
                    neg = false;
                if (num < 0) {
                    num = -num;
                    neg = true;
                }
                do {
                    digits.push(num % 10);
                } while ((num = parseInt(num / 10)) > 0);
                for (var i = digits.length; i < this.padding; i++) {
                    digits.push(0);
                }
                if (neg) {
                    c.font = this.height + "px" + this.font;
                    c.fillText('-', px, this.height);
                    width = c.measureText('-').width + 1;
                }
                while (digits.length > 0) {
                    var digit = digits.pop(),
                        digitEl = this.digitImgEl[digit],
                        digitWidth = this.height / digitEl.naturalHeight * digitEl.naturalWidth;
                    c.drawImage(digitEl, width, 0, digitWidth, this.height);
                    width += digitWidth;
                }
                this.width = width;
            } else {
                return false;
            }
        } finally {
            this.endRender(c);
        }
        return true;
    }
});