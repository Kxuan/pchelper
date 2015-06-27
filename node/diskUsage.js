/**
 * Created by Xuan on 2014/12/1.
 */
if (window.node === undefined) {
    window.node = {};
}
(function () {
    "use strict";
    var spawn = require('child_process').spawn,
        dfProc = spawn('df', ['-h']);
    var procOutput = '', procData = [];

    dfProc.stdout.on('data', function (data) {
        procOutput += data.toString();
    });
    dfProc.on('close', function () {
        procData = [];
        procOutput.split('\n').forEach(function (i) {
                var matches = i.match(/^\/dev\/\S+\s+\S+\s+([\d\.]+.)\s+([\d\.]+.)\s+\S+\s+(.*)$/);
                if (matches)
                    procData.push({
                        point: matches[3],
                        usage: matches[1],
                        available: matches[2]
                    });
            }
        );
    });
    this.DiskUsage = function () {
        return procData;
    }
}).apply(node);