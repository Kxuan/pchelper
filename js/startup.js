/**
 * Created by Xuan on 14-11-25.
 */
(function () {
    "use strict";
    /**
     * Startup Resources.
     * the value means the resource is optional.
     * if the resource is required(value FALSE),the startup.js will wait until it ready.
     * And if the resource is optional(value TRUE), the startup.js just TRY to load it.
     * @type {Object}
     */
    var resources = {
        js: {
            'Pointer.js': false,
            'Stage.js': false,
            'Switcher': {
                'Base.js': false,
                'FadeOut.js': true,
                'Simple.js': true,
                'Blind.js': true,
                'FlyOut.js': true,
                'ShrinkingCircle.js': true
            },
            'SysControl': {
                'Base.js': false,
                'Container.js': false,
                'Image.js': false,
                'Screen.js': false,
                'Label.js': false,
                'Frame.js': false,
                'Polygon.js': false,
                'List.js': false,
                'Plane.js': false,
                'TextBox.js': false
            },
            'UsrControl': {
                'MainAction.js': false,
                'CloseButton.js': false,
                'BackButton.js': false,
                'EraseFileRecord.js': false,
                'MessageBox.js': false,
                'MountPointUsage.js': false
            },
            'Screen': {
                'Main.js': false,
                'Child.js': false,
                'CronHalt.js': false,
                'EraseFile.js': false,
                'StartupTime.js': false,
                'SysInfo.js': false,
            }
        },
        node: {
            'init.js': false,
            'screenShot.js': false,
            'eraseFile.js': true,
            'cronHalt.js': true,
            'startupTime.js': true,
            'diskUsage.js': true,
            'sysInfo.xuan.js':true
        },
        image: {
            cursor: {
                AppStarting: {
                    'AppStarting_01.png': false,
                    'AppStarting_02.png': false,
                    'AppStarting_03.png': false,
                    'AppStarting_04.png': false,
                    'AppStarting_05.png': false,
                    'AppStarting_06.png': false,
                    'AppStarting_07.png': false,
                    'AppStarting_08.png': false,
                    'AppStarting_09.png': false,
                    'AppStarting_10.png': false,
                    'AppStarting_11.png': false,
                    'AppStarting_12.png': false,
                    'AppStarting_13.png': false,
                    'AppStarting_14.png': false,
                    'AppStarting_15.png': false,
                    'AppStarting_16.png': false,
                    'AppStarting_17.png': false,
                    'AppStarting_18.png': false,
                    'AppStarting_19.png': false,
                    'AppStarting_20.png': false,
                    'AppStarting_21.png': false,
                    'AppStarting_22.png': false,
                    'AppStarting_23.png': false,
                    'AppStarting_24.png': false
                },
                Wait: {
                    'Wait_01.png': false,
                    'Wait_02.png': false,
                    'Wait_03.png': false,
                    'Wait_04.png': false,
                    'Wait_05.png': false,
                    'Wait_06.png': false,
                    'Wait_07.png': false,
                    'Wait_08.png': false,
                    'Wait_09.png': false,
                    'Wait_10.png': false,
                    'Wait_11.png': false,
                    'Wait_12.png': false,
                    'Wait_13.png': false,
                    'Wait_14.png': false,
                    'Wait_15.png': false,
                    'Wait_16.png': false,
                    'Wait_17.png': false,
                    'Wait_18.png': false,
                    'Wait_19.png': false,
                    'Wait_20.png': false,
                    'Wait_21.png': false,
                    'Wait_22.png': false,
                    'Wait_23.png': false,
                    'Wait_24.png': false
                },
                'Arrow.png': false,
                'Button.png': false,
                'Hand.png': false,
                'Handwriting.png': false,
                'Help.png': false,
                'IBeam.png': false,
                'NO.png': false
            },
            'digit': {
                '0.png': true,
                '1.png': true,
                '2.png': true,
                '3.png': true,
                '4.png': true,
                '5.png': true,
                '6.png': true,
                '7.png': true,
                '8.png': true,
                '9.png': true
            },
            'main': {},
            'stage': {
                'close-normal.png': false,
                'back.png': false,
            },
            'startupTime': {
                'title.png': true,
                'text.png': true,
            },
            'sysInfo': {
                'title.png': true,
                'entryName.png': true,
            },
            'eraseFile': {
                'title.png': true,
                'subTitle.png': true,
                'dialog.png': true,
                'run.png': true,
                'select.png': true
            },
            'cronHalt': {
                'title.png': true,
                'run.png': true,
                'label.png': true,
                'tips.png': true,
                'ok.png': true
            },
            'background.jpg': false
        }
    };

    function checkAllTrue(object) {
        for (var i in object) {
            if (object.hasOwnProperty(i) && object[i] !== void(0)) {
                if (typeof object[i] == "object") {
                    if (!checkAllTrue(object[i]))
                        return false;
                } else if (!object[i]) {
                    return false;
                }
            }
        }
        return true;
    }

    var alreadyInit = false;

    function resourceReady() {
        delete this.obj[this.index];
        if (!alreadyInit && checkAllTrue(resources)) {
            alreadyInit = true;
            for (var i in classWaitDictionary) {
                if (!confirm("所有资源已就绪，但发现了被引用但未定义的类！\n这可能导致无法渲染界面，是否强制执行？")) {
                    document.writeln('舞台加载失败。双击窗口关闭。');
                    window.addEventListener('dblclick', function () {
                        window.close();
                    });
                    for (var clsName in classWaitDictionary) {
                        document.writeln('未加载' + clsName);
                    }
                    return false;
                }
            }
            node.init();
            window.stage = new Stage(canvasEl);
        }
    }

    function loadResourceObject(loadFn, path, object) {
        for (var i in object)
            if (object.hasOwnProperty(i)) {
                if (typeof object[i] === "object") {
                    loadResourceObject(loadFn, path + '/' + i, object[i]);
                } else if (typeof object[i] === "boolean") {
                    loadFn(path + '/' + i, resourceReady, {
                        obj: object,
                        index: i
                    });
                }
            }

    }

    function load() {
        loadResourceObject(loadScript, 'js', resources.js);
        loadResourceObject(loadImage, 'image', resources.image);
        loadResourceObject(loadScript, 'node', resources.node);
    }

    var lastTime = Date.now();
    this.debugLog = function (text) {
        var now = Date.now(),
            cTime = now - lastTime;
        lastTime = now;
        console.debug('[+%s]:%s', cTime, text);
    };
    load.apply(this);
}).apply(window);