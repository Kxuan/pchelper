/**
 * Created by Xuan on 2014/11/26.
 */

defineClass('ControlScreen', 'ScreenMain', {
    bgImg: null,
    fpslabel: null,
    closeButton: null,
    sysInfoButton: null,
    cronHaltButton: null,
    eraseFileButton: null,
    startTimeButton: null,
    screenShotButton: null,

    rootRequestFrame: null,

    exitedJob: null,
    isControlsEntering: true,
    controlEnterFrameIndex: 0,
    init: function () {
        this._super(SwitcherFadeOut);
        this.cursor = 'Hand';
        this.bgImg = new ControlImage('image/background.jpg');
        this.Append(this.bgImg);

        this.sysInfoButton = new ControlMainAction('系统信息', 'ScreenSysInfo');
        this.sysInfoButton.on('click', this.onActionClick, this);
        this.Append(this.sysInfoButton);
        this.cronHaltButton = new ControlMainAction('定时关机', 'ScreenCronHalt');
        this.cronHaltButton.on('click', this.onCronHaltClick, this);
        this.Append(this.cronHaltButton);
        this.eraseFileButton = new ControlMainAction('粉碎文件', 'ScreenEraseFile');
        this.eraseFileButton.on('click', this.onActionClick, this);
        this.Append(this.eraseFileButton);
        this.startTimeButton = new ControlMainAction('开机时间', 'ScreenStartupTime');
        this.startTimeButton.on('click', this.onActionClick, this);
        this.Append(this.startTimeButton);
        this.screenShotButton = new ControlMainAction('电脑截屏', 'ScreenScreenShot');
        this.screenShotButton.on('click', this.onScreenShotClick, this);
        this.Append(this.screenShotButton);

        this.fpslabel = new ControlLabel('Fpslabel');
        this.fpslabel.height = 10;
        this.fpslabel.style = 'white';
        this.Append(this.fpslabel);

        this.closeButton = new ControlCloseButton();
        this.Append(this.closeButton);

        this.on('close', this.onClose, this);
        this.on('resize', this.onResize, this);
    },
    /**
     * Fire when screen is resized.
     * @param {ControlBase} sender
     * @param {Number} width
     * @param {Number} height
     */
    onResize: function (sender, width, height) {
        this.FreezeLayout();
        this.bgImg.SetSize(width, height);
        this.fpslabel.SetPosition(0, 0);

        if (this.isControlsEntering) {
            this.sysInfoButton.SetPosition(width / 2 - 100, -200);
            this.cronHaltButton.SetPosition(-200, -200);
            this.eraseFileButton.SetPosition(width, -200);
            this.startTimeButton.SetPosition(-200, height);
            this.screenShotButton.SetPosition(width, height);
        } else {
            this.sysInfoButton.SetPosition(width / 2 - 100, height / 2 - 100);
            this.cronHaltButton.SetPosition(width / 2 - 150 - 100, height / 2 - 100 * 0.866025404 - 100);
            this.eraseFileButton.SetPosition(width / 2 + 150 - 100, height / 2 - 100 * 0.866025404 - 100);
            this.startTimeButton.SetPosition(width / 2 - 150 - 100, height / 2 + 100 * 0.866025404 - 100);
            this.screenShotButton.SetPosition(width / 2 + 150 - 100, height / 2 + 100 * 0.866025404 - 100);
        }
        this.closeButton.SetPosition(width - this.closeButton.width, 0);
        if (this.rootRequestFrame)
            this.rootRequestFrame.SetSize(this.width, this.height);
        this.ResumeLayout();
    },
    onClose: function (sender, nextScreen) {
        this.RemoveAll();
    },
    exitingFrame: function () {
        var allExit = true;
        if (!this.controlFlyOut(this.sysInfoButton, this.sysInfoButton.X, -200))
            allExit = false;
        if (!this.controlFlyOut(this.cronHaltButton, -200, -200))
            allExit = false;
        if (!this.controlFlyOut(this.eraseFileButton, this.width, -200))
            allExit = false;
        if (!this.controlFlyOut(this.startTimeButton, -200, this.height))
            allExit = false;
        if (!this.controlFlyOut(this.screenShotButton, this.width, this.height))
            allExit = false;
        if (allExit) {
            var c = this.exitedJob;
            this.exitedJob = null;
            c.apply(this);
        }
    },
    enterFrame: function () {
        var allEnter = true;
        this.controlEnterFrameIndex++;
        if (0 < this.controlEnterFrameIndex && !this.controlFlyIn(this.sysInfoButton, this.width / 2 - 100, this.height / 2 - 100))
            allEnter = false;
        if (5 < this.controlEnterFrameIndex && !this.controlFlyIn(this.eraseFileButton, this.width / 2 + 150 - 100, this.height / 2 - 100 * 0.866025404 - 100))
            allEnter = false;
        if (10 < this.controlEnterFrameIndex && !this.controlFlyIn(this.cronHaltButton, this.width / 2 - 150 - 100, this.height / 2 - 100 * 0.866025404 - 100))
            allEnter = false;
        if (15 < this.controlEnterFrameIndex && !this.controlFlyIn(this.startTimeButton, this.width / 2 - 150 - 100, this.height / 2 + 100 * 0.866025404 - 100))
            allEnter = false;
        if (20 < this.controlEnterFrameIndex && !this.controlFlyIn(this.screenShotButton, this.width / 2 + 150 - 100, this.height / 2 + 100 * 0.86602540 - 100))
            allEnter = false;
        if (allEnter) {
            this.isControlsEntering = false;
            this.cursor = 'Arrow';
        }
    },
    onActionClick: function (sender) {
        if (this.exitedJob !== null) return false;
        this.cursor = 'Wait';
        Cursor.SetCursor(this.cursor);
        this.controls.forEach(function (i) {
            i.ignorePointer = true;
        });
        this.exitedJob = function () {
            stage.LoadScreen(window[sender.action])
        }
    },
    onScreenShotClick: function () {
        if (window.node === undefined) {
            alert('NodeJS Module has now been load!');
            return false;
        }
		return;
        node.ScreenShot();
    },
    onCronHaltClick: function () {
        if (process.getuid() != 0) {
            this.rootRequestFrame = new ControlMessageBox("该功能需要root权限");
            this.rootRequestFrame.SetSize(this.width, this.height);
            this.Append(this.rootRequestFrame);
            return;
        }
        this.onActionClick(this.cronHaltButton);
    },
    /**
     * @param {CanvasRenderingContext2D} c
     * @return {boolean}
     */
    Render: function (c) {
        this.fpslabel.text = stage.fps;
        if (!this._super(c))
            return false;
        if (this.exitedJob !== null) {
            this.exitingFrame();
        } else if (this.isControlsEntering) {
            this.enterFrame();
        }
        return true;
    }
});
