/**
 * Created by Xuan on 2014/11/28.
 */
defineClass('SwitcherBase', 'SwitcherFadeOut', {
    imgData: null,
    alpha: 1,
    /**
     *
     * @param {CanvasRenderingContext2D} c
     */
    init: function (c) {
        this.imgData = new Image();
        //this.imgData.src = c.getImageData(0, 0, c.canvas.width, c.canvas.height);
        this.imgData.src = c.canvas.toDataURL("image/jpeg", 0.5);
    },
    /**
     * @param {CanvasRenderingContext2D} c
     * @return {boolean}
     */
    Render: function (c) {
        this._super(c);
        if (this.imgData === null) return true;
        this.alpha -= 0.1;
        if (this.alpha <= 0) return false;
        c.save();
        c.globalAlpha = this.alpha;
        c.drawImage(this.imgData, 0, 0, c.canvas.width, c.canvas.height);
        c.restore();
        return true;
    }
});