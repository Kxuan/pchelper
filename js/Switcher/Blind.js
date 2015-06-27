/**
 * Created by Xuan on 2014/12/1.
 */
defineClass('SwitcherBase', 'SwitcherBlind', {
    imgData: null,
    blockWidth: 100,
    frameStepWidth: 1,
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
        c.save();
        c.beginPath();
        for (var x = 0; x < c.canvas.width; x += this.blockWidth) {
            c.rect(x, 0, this.blockWidth - this.frameStepWidth, c.canvas.height);
        }
        c.clip();
        c.drawImage(this.imgData, 0, 0, c.canvas.width, c.canvas.height);
        c.closePath();
        c.restore();
        this.frameStepWidth += 5;
        return this.frameStepWidth < this.blockWidth;
    }
});