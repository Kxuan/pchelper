/**
 * Created by Xuan on 2014/11/29.
 */

defineClass('SwitcherBase', 'SwitcherSimple', {
    imgData: null,
    /**
     *
     * @param {CanvasRenderingContext2D} c
     */
    init: function (c) {
        this.imgData = c.getImageData(0, 0, c.canvas.width, c.canvas.height);

    },
    /**
     * @param {CanvasRenderingContext2D} c
     * @return {boolean}
     */
    Render: function (c) {
        this._super(c);
        if (this.imgData === null) return true;
        //c.putImageData(this.imgData, 0, 0, 0, 0, c.canvas.width, c.canvas.height);
        return false;
    }
});