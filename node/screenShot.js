/**
 * Created by Xuan on 2014/11/29.
 */


if (window.node === undefined) {
    window.node = {};
}
(function () {
    "use strict";
	return;
    var screenshot;
    try {
        screenshot = require('./clib').screenshot;
    } catch (ex) {
        this.ScreenShot = function () {
            alert('无法加载拓展库，请确认您正在运行Linux x86_64内核，截屏功能不可用！');
        };
        alert('无法加载拓展库，截屏功能不可用！');
        return;
    }
    var gui = require('nw.gui');

    var option = {
        key: "Ctrl+Alt+A",
        active: function () {
            node.ScreenShot();
        },
        failed: function (msg) {
            console.log(msg);
        }
    };

    var shortcut = new gui.Shortcut(option);
    gui.App.registerGlobalHotKey(shortcut);
    this.ScreenShot = function () {
        var fileEl = document.createElement('input');
        fileEl.type = 'file';
        fileEl.nwsaveas = (new Date()) + ".png";
        fileEl.addEventListener('change', function () {
            gui.Window.get().hide();
            setTimeout(function () {
                screenshot(fileEl.value);
                gui.Shell.openItem(fileEl.value);
                gui.Window.get().show();
            }, 1000);
        });
        fileEl.click();
    }
}).apply(node);
