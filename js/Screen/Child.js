/**
 * Created by Xuan on 2014/11/28.
 */

defineClass('ControlScreen', 'ScreenChild', {
    bgImg: null,
    titleCtl: null,
    closeButton: null,
    backButton: null,


    exitedJob: null,
    isControlsEntering: true,
    closeNextScreen: null,
    init: function (titleCtl) {
        this._super(SwitcherSimple);
        this.titleCtl = titleCtl;

        this.bgImg = new ControlImage('image/background.jpg');
        this.Append(this.bgImg);

        this.Append(this.titleCtl);
        this.closeButton = new ControlCloseButton();
        this.Append(this.closeButton);
        this.backButton = new ControlBackButton();
        this.Append(this.backButton);


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

        this.titleCtl.SetPosition(0, 0);
        this.closeButton.SetPosition(width - this.closeButton.width, 0);
        this.backButton.SetPosition(width - this.backButton.width - 40, height - this.backButton.height - 40);
        this.fire('screen-resizing', width, height);
        this.ResumeLayout();
    },
    onClose: function (sender, nextScreen) {
        if (this.closeNextScreen !== null) {
            this.RemoveAll();
            return true;
        } else {
            this.closeNextScreen = nextScreen;
            this.controls.forEach(function (i) {
                i.ignorePointer = true;
            });
            return false;
        }
    },
    exitingFrame: function () {
        var allExit = true;
        if (!this.fire('controlleaveframe'))
            allEnter = false;
        if (allExit) {
            stage.LoadScreen(this.closeNextScreen);
        }
    },
    enterFrame: function () {
        var allEnter = true;
        if (!this.fire('controlenterframe'))
            allEnter = false;
        if (allEnter) {
            this.isControlsEntering = false;
            this.cursor = 'Arrow';
        }
    },
    /**
     * @param {CanvasRenderingContext2D} c
     * @return {boolean}
     */
    Render: function (c) {
        if (!this._super(c))
            return false;
        if (this.closeNextScreen) {
            this.exitingFrame();
        } else if (this.isControlsEntering) {
            this.enterFrame();
        }
        return true;
    }
});