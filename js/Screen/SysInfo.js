/**
 * Created by Xuan on 2014/11/28.
 */

defineClass('ScreenChild', 'ScreenSysInfo', {
    entryNameCtl: null,
    osVersion: null,
    cpuModel: null,
    memInfo: null,
    partitionInfo: null,
    init: function () {
        this._super(new ControlImage('image/sysInfo/title.png'));
        this.entryNameCtl = new ControlImage('image/sysInfo/entryName.png');
        this.entryNameCtl.SetPosition(0, 0);
        this.Append(this.entryNameCtl);

        this.osVersion = new ControlLabel(node.OsInfo());
        this.memInfo = new ControlLabel(node.MemInfo());
        this.cpuModel = new ControlLabel(node.CpuModel());
        this.osVersion.strokeStyle = 'black';
        this.memInfo.strokeStyle = 'black';
        this.cpuModel.strokeStyle = 'black';
        this.osVersion.strokeWidth = 2;
        this.memInfo.strokeWidth = 2;
        this.cpuModel.strokeWidth = 2;
        this.osVersion.style = 'white';
        this.memInfo.style = 'white';
        this.cpuModel.style = 'white';
        this.osVersion.SetSize(400, 40);
        this.memInfo.SetSize(400, 30);
        this.cpuModel.SetSize(400, 20);
        this.Append(this.osVersion);
        this.Append(this.memInfo);
        this.Append(this.cpuModel);

        this.partitionInfo = new ControlList(40);
        this.partitionInfo.SetSize(350, 150);
        this.partitionInfo.cursor = 'Hand';
        var entryHeader = new ControlMountPointUsage({
            point: '挂载点',
            usage: '可用',
            available: '剩余'
        });
        entryHeader.style = 'white';
        this.partitionInfo.Append(entryHeader);
        var info = node.DiskUsage();
        var self = this;

        info.forEach(function (p) {
            var entry = new ControlMountPointUsage(p);
            entry.style = 'white';
            self.partitionInfo.Append(entry);
        });
        this.Append(this.partitionInfo);
        this.on('screen-resizing', this.onResizing, this);
    },
    onResizing: function (sender, width, height) {
        this.entryNameCtl.SetPosition((width - this.entryNameCtl.width) / 2 - 200, (height - this.entryNameCtl.height) / 2 - 70);
        this.osVersion.SetPosition((width - this.osVersion.width) / 2 + 100, (height - this.osVersion.height) / 2 - 155);
        this.memInfo.SetPosition((width - this.memInfo.width) / 2 + 100, (height - this.memInfo.height) / 2 - 100);
        this.cpuModel.SetPosition((width - this.cpuModel.width) / 2 + 100, (height - this.cpuModel.height) / 2 - 45);
        this.partitionInfo.SetPosition((width - this.cpuModel.width) / 2 + 100, (height - this.cpuModel.height) / 2 + 10);
    }
});