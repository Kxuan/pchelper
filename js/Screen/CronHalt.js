/**
 * Created by Xuan on 2014/11/28.
 */

defineClass('ScreenChild', 'ScreenCronHalt', {
    run: null,
    label: null,
    timeHour: null,
    timeMinute: null,
    tips: null,
    keyMasker: null,
    keyLabelTips: null,
    passwordMask: null,
    passwordBox: null,
    passwordOk: null,
    passwordCallback: null,
    init: function () {
        this._super(new ControlImage('image/cronHalt/title.png'));
        this.Switcher = SwitcherShrinkingCircle;
        this.run = new ControlImage('image/cronHalt/run.png');
        this.label = new ControlImage('image/cronHalt/label.png');
        this.run.cursor = "Hand";
        this.run.on('click', this.runClick, this);
        this.Append(this.run);
        this.Append(this.label);

        var date = new Date(Date.now() + 1000 * 60 * 60);
        this.timeHour = new ControlLabel(date.getHours());
        this.timeMinute = new ControlLabel(date.getMinutes());
        this.timeHour.height = 50;
        this.timeHour.padding = 2;
        this.timeMinute.height = 50;
        this.timeMinute.padding = 2;
        this.timeHour.on('mousewheel', this.onHourWheel, this);
        this.timeMinute.on('mousewheel', this.onMinuteWheel, this);
        this.Append(this.timeHour);
        this.Append(this.timeMinute);

        if (localStorage.cronHalt_tips === undefined) {
            localStorage.cronHalt_tips = true;
            this.tips = new ControlImage('image/cronHalt/tips.png');
            this.tips.on('click', this.closeTips, this);
            this.tips.on('mousewheel', this.closeTips, this);
            this.tips.SetPosition(0, 0);
            this.Append(this.tips);
        }

        this.on('screen-resizing', this.onResizing, this);
    },
    closeTips: function () {
        if (this.tips) {
            this.Remove(this.tips);
            this.tips.Dispose();
            this.tips = null;
        }
    },
    runClick: function () {
        node.CronHalt(this.timeHour.text, this.timeMinute.text, this.cronResult, this);
    },
    cronResult: function (result) {
        var msgBox;
        if (result === null) {
            msgBox = new ControlMessageBox("定时成功！");
        } else {
            msgBox = new ControlMessageBox("错误！");
        }
        msgBox.SetPosition(0, 0);
        msgBox.SetSize(this.width, this.height);
        this.Append(msgBox);
    },
    requestPassword: function (callback, thisObj) {
        if (this.keyMasker) return;
        this.passwordCallback = {
            callback: callback,
            thisObj: thisObj
        };
        this.keyMasker = new ControlPlane('black');
        this.keyMasker.SetPosition(0, 0);
        this.keyMasker.SetSize(canvasEl.width, canvasEl.height);
        this.keyMasker.alpha = 0.7;
        this.Append(this.keyMasker);
        this.keyLabelTips = new ControlLabel('请输入管理员密码');
        this.keyLabelTips.style = "white";
        this.keyLabelTips.height = 50;
        this.keyLabelTips.ignorePointer = true;
        this.keyLabelTips.SetPosition(canvasEl.width / 2 - 200, canvasEl.height / 2 - 100);
        this.Append(this.keyLabelTips);
        this.passwordBox = new ControlTextBox('');
        this.passwordBox.SetSize(400, 50);
        this.passwordBox.SetPosition(canvasEl.width / 2 - 200, canvasEl.height / 2);
        this.Append(this.passwordBox);
        this.passwordOk = new ControlImage('image/cronHalt/ok.png');
        this.passwordOk.SetPosition((canvasEl.width - this.passwordOk.width) / 2, canvasEl.height / 2 + this.passwordOk.height + 50);
        this.passwordOk.cursor = 'Hand';
        this.passwordOk.on('click', this.onPasswordOk, this);
        this.Append(this.passwordOk);
        this.FocusControl = this.passwordBox;//Set focus

    },
    onPasswordOk: function (sender) {
        if (this.passwordCallback === null) return;
        var passwd = this.passwordBox.text;
        this.Remove(this.keyMasker);
        this.keyMasker.Dispose();
        delete this.keyMasker;
        this.Remove(this.keyLabelTips);
        this.keyLabelTips.Dispose();
        delete this.keyLabelTips;
        this.Remove(this.passwordBox);
        this.passwordBox.Dispose();
        delete this.passwordBox;
        this.Remove(this.passwordOk);
        this.passwordOk.Dispose();
        delete this.passwordOk;

        this.passwordCallback.callback.call(this.passwordCallback.thisObj,
            passwd
        );
    },
    onHourWheel: function (sender, x, y, dx, dy, dz) {
        if (dy > 0) {
            this.timeHour.text--;
            if (this.timeHour.text < 0)
                this.timeHour.text = 23;
        } else if (dy < 0) {
            this.timeHour.text++;
            if (this.timeHour.text > 23)
                this.timeHour.text = 0;
        }
    },
    onMinuteWheel: function (sender, x, y, dx, dy, dz) {
        if (dy > 0) {
            this.timeMinute.text--;
            if (this.timeMinute.text < 0)
                this.timeMinute.text = 59;
        } else if (dy < 0) {
            this.timeMinute.text++;
            if (this.timeMinute.text > 59)
                this.timeMinute.text = 0;
        }
    },
    onResizing: function (sender, width, height) {
        this.label.SetPosition((width - this.label.width) / 2, (height - this.label.height) / 2 - 60);
        this.timeHour.SetPosition((width) / 2 - 90, (height ) / 2 - 50);
        this.timeMinute.SetPosition((width) / 2 + 20, (height ) / 2 - 50);
        this.run.SetPosition((width - this.run.width) / 2, (height - this.run.height) / 2 + 80);
        if (this.tips) {
            this.tips.SetSize(width, height);
        }
        if (this.keyMasker) {
            this.keyMasker.SetPosition(0, 0);
            this.keyMasker.SetSize(width, height);
            this.keyLabelTips.SetPosition((width - this.keyLabelTips.width) / 2, (height - this.keyLabelTips.height) / 2);
        }
    }
});