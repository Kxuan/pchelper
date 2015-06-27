/**
 * Created by Xuan on 2014/11/30.
 */

if (window.node === undefined) {
    window.node = {};
}
(function () {
    "use strict";
    var spawn = require('child_process').spawn;
    var fs = require('fs');
    this.CronHalt = function (hour, minute, cronResultCallback, thisObj) {
        var d = new Date(),
            now = d.getTime();
        d.setHours(hour);
        d.setMinutes(minute);
        d.setSeconds(0);
        if (d.getTime() < now) {
            d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
        }
        var tmpFile = '/etc/cron.d/pchelper_halt';
        fs.writeFile(tmpFile,
            d.getMinutes() + " " +
            d.getHours() + " " +
            d.getDate() + " " +
            (d.getMonth() + 1) + " " +
            "* root /sbin/halt -p;rm /etc/cron.d/pchelper_halt\n",
            function (err) {
                if (err != null) {
                    cronResultCallback.call(thisObj, err);
                    return;
                }
                cronResultCallback.call(thisObj, null);
            }
        );
    };
}).apply(node);