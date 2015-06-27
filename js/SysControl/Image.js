/**
 * Created by Xuan on 2014/11/26.
 */

defineClass('ControlBase', 'ControlImage', {
    imgEl: null,
    autoSize: true,
    init: function (src) {
        this._super();
        this.Load(src);
    },
    Load: function (src) {
        this.imgEl = loadImage(src);
        if (this.autoSize) {
            this.width = this.imgEl.naturalWidth;
            this.height = this.imgEl.naturalHeight;
        }
    },
    Dispose: function () {
        this.imgEl = null;
        this._super();
    },
    SetSize: function (width, height) {
        this.autoSize = false;
        this.width = width;
        this.height = height;
        if (!this.layoutFreezed)
            this.fire('resize', width, height);
    },
    /**
     * Image complete Status
     * @returns {boolean}
     */
    IsComplete: function () {
        return this.imgEl.complete;
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
        if (!this.imgEl.complete) {
            debugLog(this.imgEl.src + ' was not complete. You should load this image an startup!');
            return true;
        }
        this.startRender(c);
        try {
            if (this.width == 0 && this.height == 0 && this.autoSize) {
                this.width = this.imgEl.naturalWidth;
                this.height = this.imgEl.naturalHeight;
            }
            c.drawImage(this.imgEl, 0, 0, this.width, this.height);
        } catch (ex) {
            debugLog('Image Load Fail')
        } finally {
            this.endRender(c);
        }
        return true;
    }
});