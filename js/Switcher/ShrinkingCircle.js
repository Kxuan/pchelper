/**
 * Created by Xuan on 2014/12/1.
 */
defineClass('SwitcherBase', 'SwitcherShrinkingCircle', {
    imgData: null,
    radius: 0,
    /**
     *
     * @param {CanvasRenderingContext2D} c
     */
    init: function (c) {
        this.imgData = new Image();
        //this.imgData.src = c.getImageData(0, 0, c.canvas.width, c.canvas.height);
        this.imgData.src = c.canvas.toDataURL("image/jpeg", 0.5);
        this.radius = Math.max(c.canvas.height, c.canvas.width);
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
        c.arc(c.canvas.width / 2, c.canvas.height / 2, this.radius, 0, Math.PI * 2);
        c.closePath();
        c.strokeStyle = 'gray';
        c.stroke();
        c.clip();
        c.drawImage(this.imgData, 0, 0, c.canvas.width, c.canvas.height);
        c.restore();
        this.radius -= 15;
        return this.radius > 0;
    }
});