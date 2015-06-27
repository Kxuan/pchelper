/**
 * Created by Xuan on 2014/11/30.
 */

if (window.node === undefined) {
    window.node = {};
}

(function () {
    "use strict";
    var gui = require('nw.gui');

    this.init = function () {
        console.trace();
        gui.Window.get().show();

        //Debug
        //gui.Window.get().showDevTools();

        if (localStorage.startup_notification === undefined) {
            localStorage.startup_notification = true;
            showNotification();
        }
    };
    this.quit = function () {
        gui.App.quit();
    };
    var notifies = [
        ["( *^_^* )", "Hey~"],
        ["^_^", "If you can see this,"],
        ["└(^o^)┘", "It means that I am startup normally."],
        ["(＝^ω^＝)", "Thanks for your try."],
        ["→_→", "                    ----Fous"]
    ];
    var nof, index = 0;

    function showNotification() {
        nof = new Notification(notifies[index][0], {
            body: notifies[index][1]
        });
        index++;
        if (index < notifies.length) {
            setTimeout(showNotification, 3000);
        }

    }
}).apply(node);