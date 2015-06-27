/**
 * Created by Xuan on 2014/11/28.
 */

defineClass('ScreenChild', 'ScreenStartupTime', {
    textCtl: null,
    startupSecond: null,
    percentageCtl: null,
    init: function () {
        this._super(new ControlImage('image/startupTime/title.png'));
        this.Switcher = SwitcherFlyOut;
        this.textCtl = new ControlImage('image/startupTime/text.png');
        this.Append(this.textCtl);
        this.startupSecond = new ControlLabel(node.StartupTime());
        this.startupSecond.height = 50;
        this.Append(this.startupSecond);
        this.percentageCtl = new ControlLabel(node.baifenbi());
        this.percentageCtl.height = 40;
        this.Append(this.percentageCtl);
        this.on('screen-resizing', this.onResizing, this);
    },
    onResizing: function (sender, width, height) {
        this.textCtl.SetPosition((width - this.textCtl.width) / 2, (height - this.textCtl.height) / 2);
        this.startupSecond.SetPosition(this.textCtl.X + 470, this.textCtl.Y - 15);
        this.percentageCtl.SetPosition(this.textCtl.X + 315, this.textCtl.Y + 80);
    }
});