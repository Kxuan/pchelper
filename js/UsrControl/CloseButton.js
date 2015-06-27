/**
 * Created by Xuan on 2014/11/27.
 */

defineClass('ControlImage', 'ControlCloseButton', {
    init: function () {
        this._super('image/stage/close-normal.png');
        this.SetSize(37, 22);
        this.cursor = 'Hand';
        this.on('click', function () {
            node.quit();
        });
    }
});