/**
 * Created by gaoming on 14-12-1.
 */

if (window.node === undefined) {
    window.node = {};
}
(function () {
    "use strict";
    var sys;
    var sys_data;
    var cpu;
    var cpu_data;
    var disk;
    var disk_data;
    var free;
    var free_data;
    var fdisk;
    var fdisk_data;
    var zong;
    var zong_data = "";
    var home;
    var home_data;
    var boot;
    var boot_data;
    var infor = new Array();
    var table = new Array();
    table[0] = {inf1: "123", inf2: "123"};

    function Initialization() {

        var spawn = require('child_process').spawn;
        sys = spawn('uname', ['-a']);


        cpu = spawn('head', ['-n', '1', '/etc/issue']);


        disk = spawn('cat', ['/proc/scsi/scsi']);


        free = spawn('free', ['-m']);


//fdisk = spawn('cat' ,['/proc/cpuinfo']);


        sys.stdout.on('data', function (data) {
            sys_data = data;
        });

        cpu.stdout.on('data', function (data) {
            cpu_data = data;
        });

        spawn('grep', ['MemFree', '/proc/meminfo']).pipe('awk \'{print $2}\'').stdout.on('data', function (data) {
            disk_data = data;
        });

        spawn('grep', ['MemTotal', '/proc/meminfo']).pipe('awk \'{print $2}\'').stdout.on('data', function (data) {
            free_data = data;
        });

        spawn('cat', ['/proc/cpuinfo']).pipe('grep name').pipe('sort -u').pipe('awk \'gsub(/model name/,""){print $0}\'').stdout.on('data', function (data) {
            fdisk_data = data.toString().substr(2);
        });


        spawn('df').pipe('grep ^\\/dev').pipe('awk \'{print $2,$3,$6}\'').stdout.on('data', function (data) {
            zong_data = data.toString();
            infor = zong_data.split(/\s+/);


            for (var i = infor.length - 2, j = 0; i >= 0; i--) {
                if (i % 3 == 2) table[j] = infor[i];
                if (i % 3 == 1) table[j].inf1 = infor[i];
                if (i % 3 == 0) {
                    table[j].inf2 = infor[i];
                    j++;
                }

            }


        });


    }

    this.func_sys = function () {
        return sys_data;
    };
    this.func_cpu = function () {
        return cpu_data;
    };
    this.func_disk = function () {
        return disk_data;
    };
    this.func_free = function () {
        return free_data;
    };
    this.func_fdisk = function () {
        return fdisk_data;
    };
    this.func_zong = function () {
        return table;
    };
    this.func_home = function () {
        return infor.length;
    };
    this.func_boot = function () {
        return boot_data;
    };


// 捕获标准输出并将其打印到控制台


    Initialization();


// 捕获标准错误输出并将其打印到控制台
    sys.stderr.on('data', function (data) {
        console.log('标准错误输出：\n' + data);
    });

// 注册子进程关闭事件
    sys.on('exit', function (code, signal) {
        console.log('子进程已退出，代码：' + code);
    });
}).apply(node);