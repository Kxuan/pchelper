/**
 * Created by xuan on 14-12-1.
 */
if (window.node === undefined) {
    window.node = {};
}
(function () {
    "use strict";
    var spawn = require('child_process').spawn,
        fs = require('fs');
    var cpuModel, memInfo, osInfo;
    fs.readFile('/proc/cpuinfo', function (err, data) {
        cpuModel = data.toString().match(/model name\s*:\s*([^\n]+)\n/)[1];
    });

    fs.readFile('/proc/meminfo', function (err, data) {
        var str = data.toString(), total, free;
        total = str.match(/MemTotal\s*:\s*([^\n]+)\n/)[1];
        free = str.match(/MemFree\s*:\s*([^\n]+)\n/)[1];
        memInfo = "总计" + total + " 空闲" + free;
    });
    fs.readFile('/etc/lsb-release', function (err, data) {
        osInfo = data.toString().match(/DISTRIB_DESCRIPTION="([^"]+)"/)[1];
    });
    this.CpuModel = function () {
        return cpuModel;
    };
    this.MemInfo = function () {
        return memInfo;
    };
    this.OsInfo = function () {
        return osInfo;
    }
}).apply(node);
