/**
 * Created by Xuan on 2014/11/28.
 */

defineClass('ScreenChild', 'ScreenEraseFile', {
    subTitle: null,
    dialog: null,
    startButton: null,
    selectButton: null,
    fileList: null,
    prepareList: null,

    fileDialog: null,
    init: function () {
        var self = this;
        this._super(new ControlImage('image/eraseFile/title.png'));
        this.Switcher = SwitcherBlind;
        this.fileDialog = document.createElement('input');
        this.fileDialog.type = 'file';
        this.fileDialog.multiple = 'multiple';
        this.fileDialog.addEventListener('change', function () {
            self.onFileDialogChanged(this.value);
        });

        this.prepareList = [];
        this.subTitle = new ControlImage('image/eraseFile/subTitle.png');
        this.subTitle.SetPosition(180, 10);
        this.Append(this.subTitle);
        this.on('screen-resizing', this.onResizing, this);
        this.dialog = new ControlImage('image/eraseFile/dialog.png');
        this.Append(this.dialog);
        this.startButton = new ControlImage('image/eraseFile/run.png');
        this.startButton.cursor = "Hand";
        this.startButton.on('click', this.onStartErase, this);
        this.Append(this.startButton);
        this.selectButton = new ControlImage('image/eraseFile/select.png');
        this.selectButton.cursor = "Hand";
        this.selectButton.on('click', this.onSelectFile, this);
        this.Append(this.selectButton);

        this.fileList = new ControlList(40);
        this.fileList.SetSize(532, 254);
        this.Append(this.fileList);
    },
    onFileDialogChanged: function (filenames) {
        var self = this;
        filenames.split(';').forEach(function (filename) {
            var fileCtl = new ControlEraseFileRecord(filename);
            self.fileList.Append(fileCtl);
            self.prepareList.push(
                {
                    file: filename,
                    ctl: fileCtl
                }
            );
        });
    },
    onSelectFile: function (sender) {
        this.fileDialog.click();
    },
    onStartErase: function (sender) {
        while (this.prepareList.length > 0) {
            var entry = this.prepareList.pop();
            node.EraseFile(entry.file, function (fileCtl, status, progress) {
                if (status == 'Processing') {
                    fileCtl.Status = progress;
                } else {
                    fileCtl.Status = status;
                }
            }, this, entry.ctl);
        }
    },
    onResizing: function (sender, width, height) {
        this.dialog.SetPosition((width - this.dialog.width) / 2, (height - this.dialog.height) / 2);
        this.startButton.SetPosition((width - this.startButton.width) / 2 + 210, (height - this.startButton.height) / 2 + 150);
        this.selectButton.SetPosition((width - this.startButton.width) / 2 - 210, (height - this.startButton.height) / 2 + 150);
        this.fileList.SetPosition((width - this.dialog.width) / 2 + 10, (height - this.dialog.height) / 2 + 40);
    }
});