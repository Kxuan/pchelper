/**
 * Created by Xuan on 2014/12/1.
 */
defineClass('SwitcherBase', 'SwitcherFlyOut', {
    imgData: null,
    x: 0,
    y: 0,
    directionX: 0,
    directionY: 0,
    frameIndex: 0,
    /**
     *
     * @param {CanvasRenderingContext2D} c
     */
    init: function (c) {
        this.imgData = new Image();
        //this.imgData.src = c.getImageData(0, 0, c.canvas.width, c.canvas.height);
        this.imgData.src = c.canvas.toDataURL("image/jpeg", 0.5);
        do {
            var rx = Math.random(),
                ry = Math.random();
            if (rx < 0.33) this.directionX = -1;
            else if (rx > 0.66) this.directionX = 1;
            else this.directionX = 0;
            if (ry < 0.33) this.directionY = -1;
            else if (ry > 0.66) this.directionY = 1;
            else this.directionY = 0;
        } while (this.directionX == 0 && this.directionY == 0);
    },
    /**
     * @param {CanvasRenderingContext2D} c
     * @return {boolean}
     */
    Render: function (c) {
        this._super(c);
        this.frameIndex++;
        if (this.imgData === null) return true;
        c.drawImage(this.imgData, this.x, this.y, c.canvas.width, c.canvas.height);
        this.x += (1 + this.frameIndex * 2) * this.directionX;
        this.y += (1 + this.frameIndex * 2) * this.directionY;
        if (this.directionX > 0 && this.x > c.canvas.width)
            return false;
        if (this.directionX < 0 && -this.x > c.canvas.width)
            return false;
        if (this.directionY > 0 && this.y > c.canvas.height)
            return false;
        if (this.directionY > 0 && -this.y > c.canvas.height)
            return false;
        return true;
    }
});