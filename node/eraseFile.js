/**
 * Created by Xuan on 2014/11/29.
 */

if (window.node === undefined) {
    window.node = {};
}
(function () {
    "use strict";
    var fs = require('fs');

    this.EraseFile = function (filepath, callback, thisObj, arg) {
        var fd, buffer, totalBlock, blocksWritten = 0;
        function writeProcess(err, written, buffer) {
            if (err != null) {
                callback.call(thisObj, arg, err.code);
                return;
            }
            callback.call(thisObj, arg, 'Processing', parseInt(blocksWritten / totalBlock * 100));
            if (blocksWritten >= totalBlock) {
                fs.close(fd);
                fs.unlink(filepath, function (err) {
                    if (err != null) {
                        callback.call(thisObj, arg, err.code);
                    } else {
                        callback.call(thisObj, arg, 'OK');
                    }
                });
            } else {
                fs.write(fd, buffer, 0, buffer.length, null, writeProcess);
                blocksWritten++;
            }
        }
        fs.open(filepath, 'r+', function (err, _fd) {
            if (err != null) {
                callback.call(thisObj, arg, err.code);
                return;
            }
            fd = _fd;
            fs.fstat(fd, function (err, stats) {
                if (err != null) {
                    callback.call(thisObj, arg, err.code);
                    return;
                }
                buffer = new Buffer(4096);
                buffer.fill(0);
                totalBlock = parseInt(stats.size / 4096) + 1;
                writeProcess(null, 0, buffer);
            });
        });
    }
}).apply(node);