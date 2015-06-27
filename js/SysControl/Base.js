/**
 * Created by Xuan on 2014/11/26.
 */

/**
 * Abstract control
 * @constructor
 */
defineClass('Class', 'ControlBase',
    {
        X: 0,
        Y: 0,
        Z: 0,
        width: 0,
        height: 0,
        cursor: null,
        eventBus: null,
        ignorePointer: false,
        alpha: 1,
        parent: null,
        layoutFreezed: false,
        disposed: false,

        init: function () {
            var self = this;
            this.eventBus = {};
            this.on('mousemove', function () {
                //FIXME This way will make problem in sometime. But this is the easiest way~.~
                Cursor.SetCursor(self.cursor);
            })
        },
        FreezeLayout: function () {
            this.layoutFreezed = true;
            this.fire('layoutfreeze');
        },
        ResumeLayout: function () {
            this.layoutFreezed = false;
            this.fire('layoutresume');
        },
        GetSize: function () {
            return {
                width: this.width,
                height: this.height
            }
        },
        SetSize: function (width, height) {
            this.width = width;
            this.height = height;
            this.fire('resize', width, height);
        },
        /**
         * Register an event listener
         * @param event
         * @param Fn
         * @param thisObj
         * @returns {number}
         */
        on: function (event, Fn, thisObj) {
            if (!(event in this.eventBus)) {
                this.eventBus[event] = {
                    eventIndex: 0,
                    callback: []
                };
            }
            this.eventBus[event].callback[++this.eventBus[event].eventIndex] = {
                fn: Fn,
                thisObj: thisObj
            };
            return this.eventBus[event].eventIndex
        },
        off: function (event, Fn) {
            if (!(event in this.eventBus))
                return false;
            var bus = this.eventBus[event];
            for (var i = 1; i <= bus.eventIndex; i++) {
                if (bus.callback[i] !== undefined && bus.callback[i].fn === Fn) {
                    delete bus.callback[i];
                    return true;
                }
            }
            return false;
        },
        clearListener: function (event) {
            if (event === undefined) {
                for (var evt in this.eventBus) {
                    if (this.eventBus.hasOwnProperty(evt)) {
                        var bus = this.eventBus[evt];
                        for (var i in bus.callback) {
                            delete bus.callback[i];
                        }
                        delete this.eventBus[evt];
                    }
                }
            } else {
                var bus = this.eventBus[event];
                for (var i in bus.callback) {
                    delete bus.callback[i];
                }
                delete this.eventBus[event];
            }
        },
        /**
         * call event listeners
         * @param event
         */
        fire: function (event) {
            var args = Array.prototype.slice.call(arguments, 0);
            args[0] = this;
            var eventObj = this.eventBus[event];
            if (eventObj !== void(0)) {
                return eventObj.callback.every(function (callback) {
                    return callback.fn.apply(callback.thisObj, args) !== false;
                });
            }
            return true;
        },
        post: function (event) {
            var self = this;
            var args = Array.prototype.slice.call(arguments, 0);
            setTimeout(function () {
                self.fire.apply(self, args);
            }, 1);
        },
        Dispose: function () {
            if (this.disposed)
                throw "Double dispose!";
            this.clearListener();
            this.disposed = true;
        },
        SetPosition: function (x, y) {
            this.X = x;
            this.Y = y;
            if (!this.layoutFreezed)
                this.fire('move', x, y);
        },
        /**
         * Check if the point stay on this control
         * @return {boolean} - return true if the point over this control, otherwise return false.
         */
        IsPointIn: function (x, y) {
            return false;
        },
        startRender: function (c, opt) {
            if (opt === undefined) opt = {};
            if (opt.fireEvent !== false)
                this.fire('render');
            if (opt.saveContext !== false)
                c.save();
            if (opt.applyAlpha !== false)
                c.globalAlpha *= this.alpha;
            if (opt.translate !== false)
                c.translate(this.X, this.Y);
        },
        endRender: function (c) {
            c.restore();
        },
        /**
         * Render this control on canvas
         * @param {CanvasRenderingContext2D} c
         * @return {boolean}  - return true if render successful, otherwise return false.
         */
        Render: function (c) {
            return true;
        }
    }
);