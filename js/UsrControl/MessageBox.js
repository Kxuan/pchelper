/**
 * Created by Xuan on 2014/11/30.
 */
defineClass('ControlFrame', 'ControlMessageBox', {
    keyMasker: null,
    keyLabelTips: null,
    passwordOk: null,
    init: function (msg) {
        this._super();
        this.keyMasker = new ControlPlane('black');
        this.keyMasker.SetPosition(0, 0);
        this.keyMasker.SetSize(canvasEl.width, canvasEl.height);
        this.keyMasker.alpha = 0.7;
        this.Append(this.keyMasker);

        this.keyLabelTips = new ControlLabel(msg);
        this.keyLabelTips.style = "white";
        this.keyLabelTips.height = 50;
        this.keyLabelTips.ignorePointer = true;
        stage.context.save();
        stage.context.font = "50px Arial";
        var width = stage.context.measureText(msg).width;
        stage.context.restore();
        this.keyLabelTips.SetPosition((canvasEl.width - width) / 2, canvasEl.height / 2 - 100);
        this.Append(this.keyLabelTips);

        this.passwordOk = new ControlImage('image/cronHalt/ok.png');
        this.passwordOk.SetPosition((canvasEl.width - this.passwordOk.width) / 2, canvasEl.height / 2 + this.passwordOk.height + 50);
        this.passwordOk.cursor = 'Hand';
        this.passwordOk.on('click', this.onOk, this);
        this.Append(this.passwordOk);
    },
    onOk: function () {
        this.parent.Remove(this);
        this.Dispose();
    }
});