/**
 * Created by Xuan on 2014/11/27.
 */

defineClass('ControlImage', 'ControlBackButton', {
    init: function () {
        this._super('image/stage/back.png');
        this.SetSize(128, 128);
        this.cursor = 'Button';
        this.on('click', function () {
            stage.LoadScreen(ScreenMain);
        });
        this.on('mouseover', function () {
            this.alpha = 0.9;
        }, this);
        this.on('mouseout', function () {
            this.alpha = 0.5;
        }, this);
        this.alpha = 0.5;
    }
});