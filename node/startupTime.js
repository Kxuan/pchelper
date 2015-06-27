/**
 * Created by LiHao
 */

if (window.node === undefined) {
    window.node = {};
}
(function () {
    "use strict";
    var fs = require('fs');
    var _startupTime = 'ERR';
    var bfb = 'ERR';
    fs.open('/var/log/Xorg.0.log', 'r', function (err, fd) {//打开文件
        if (err) {//回调函数,出错处理
            console.log(err);
            return;
        }
        //只得到第一行的数字部分
        var buf = new Buffer(6);
        fs.read(fd, buf, 0, 6, 5, function (err, bytesRead, buffer) {
            fs.close(fd);
            if (err) {
                console.log(err);
                return;
            }
            //使用指定编码将二进制数据转化为字符串
            var str = buf.toString('utf-8') * 1.4;
            _startupTime = parseInt(str);
            if (_startupTime < 5) {
                bfb = 99;
            }
            else if (_startupTime >= 99) {
                bfb = 1;
            }
            else {
                bfb = 100 - _startupTime;
            }
        });
    });
    /**
     * @return {string}
     */
    this.StartupTime = function () {
        return _startupTime;
    };
    this.baifenbi=function(){
        return bfb;
    }
}).apply(node);