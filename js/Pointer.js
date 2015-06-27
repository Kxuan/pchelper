/**
 * Created by Xuan on 2014/11/26.
 */
/**
 * 指针管理器
 * @constructor
 */
function Pointer() {
    "use strict";

    var Cursors = {};

    this.X = 0;
    this.Y = 0;
    this.CurrentCursor = null;
    this.CurrentFrame = 0;
    this.PointerOrbit = [];

    /**
     * Load a cursor image
     * @param {String} name - Pointer Name
     * @param {Array|HTMLImageElement|String} files - Frame images
     * @param offsetX
     * @param offsetY
     */
    var loadCursor = function (name, files, offsetX, offsetY) {
        var cursorObject = {
            name: name,
            offsetX: offsetX,
            offsetY: offsetY,
            frames: []
        };
        if (files instanceof HTMLImageElement) {
            cursorObject.frames.push(files);
        } else if (typeof files == "string") {
            cursorObject.frames.push(loadImage(files));
        } else {
            files.forEach(function (url) {
                cursorObject.frames.push(loadImage(url));
            });
        }
        Cursors[name] = cursorObject;
    };
    /**
     * Set pointer position
     * @param {Number} x
     * @param {Number} y
     */
    this.SetPosition = function (x, y) {
        this.X = x;
        this.Y = y;
        this.PointerOrbit.push({
            x: this.X,
            y: this.Y,
            cursor: this.CurrentCursor,
            frame: this.CurrentFrame
        });
        if (this.PointerOrbit.length > 20)
            this.PointerOrbit.shift();

    };
    /**
     * Set current cursor.
     * @param {String} name - Pointer name
     * @returns {null|*}
     */
    this.SetCursor = function (name) {
        if (name === null) return null;
        if (this.CurrentCursor !== null && this.CurrentCursor.name === name) return this.CurrentCursor;
        if (name in Cursors) {
            this.CurrentCursor = Cursors[name];
            this.CurrentFrame = 0;
            return this.CurrentCursor;
        } else {
            throw "Cursor Icon " + name + " not found.";
        }
    };
    /**
     * Draw pointer to context
     * @param {CanvasRenderingContext2D} context - Canvas Context
     * @return {boolean}
     */
    this.Draw = function (context) {
        if (this.CurrentCursor === null)
            return false;
        context.drawImage(
            this.CurrentCursor.frames[this.CurrentFrame],
            this.X - this.CurrentCursor.offsetX,
            this.Y - this.CurrentCursor.offsetY
        );
        this.CurrentFrame = (this.CurrentFrame + 1) % this.CurrentCursor.frames.length;
    };

    loadCursor('Arrow', 'image/cursor/Arrow.png', 6, 1);
    loadCursor('Button', 'image/cursor/Button.png', 8, 2);
    loadCursor('Hand', 'image/cursor/Hand.png', 12, 1);
    loadCursor('Help', 'image/cursor/Help.png', 6, 1);
    loadCursor('IBeam', 'image/cursor/IBeam.png', 16, 10);
    loadCursor('NO', 'image/cursor/NO.png', 16, 12);
    loadCursor('AppStarting', [
        'image/cursor/AppStarting/AppStarting_01.png',
        'image/cursor/AppStarting/AppStarting_02.png',
        'image/cursor/AppStarting/AppStarting_03.png',
        'image/cursor/AppStarting/AppStarting_04.png',
        'image/cursor/AppStarting/AppStarting_05.png',
        'image/cursor/AppStarting/AppStarting_06.png',
        'image/cursor/AppStarting/AppStarting_07.png',
        'image/cursor/AppStarting/AppStarting_08.png',
        'image/cursor/AppStarting/AppStarting_09.png',
        'image/cursor/AppStarting/AppStarting_10.png',
        'image/cursor/AppStarting/AppStarting_11.png',
        'image/cursor/AppStarting/AppStarting_12.png',
        'image/cursor/AppStarting/AppStarting_13.png',
        'image/cursor/AppStarting/AppStarting_14.png',
        'image/cursor/AppStarting/AppStarting_15.png',
        'image/cursor/AppStarting/AppStarting_16.png',
        'image/cursor/AppStarting/AppStarting_17.png',
        'image/cursor/AppStarting/AppStarting_18.png',
        'image/cursor/AppStarting/AppStarting_19.png',
        'image/cursor/AppStarting/AppStarting_20.png',
        'image/cursor/AppStarting/AppStarting_21.png',
        'image/cursor/AppStarting/AppStarting_22.png',
        'image/cursor/AppStarting/AppStarting_23.png',
        'image/cursor/AppStarting/AppStarting_24.png'
    ], 6, 1);
    loadCursor('Wait', [
        'image/cursor/Wait/Wait_01.png',
        'image/cursor/Wait/Wait_02.png',
        'image/cursor/Wait/Wait_03.png',
        'image/cursor/Wait/Wait_04.png',
        'image/cursor/Wait/Wait_05.png',
        'image/cursor/Wait/Wait_06.png',
        'image/cursor/Wait/Wait_07.png',
        'image/cursor/Wait/Wait_08.png',
        'image/cursor/Wait/Wait_09.png',
        'image/cursor/Wait/Wait_10.png',
        'image/cursor/Wait/Wait_11.png',
        'image/cursor/Wait/Wait_12.png',
        'image/cursor/Wait/Wait_13.png',
        'image/cursor/Wait/Wait_14.png',
        'image/cursor/Wait/Wait_15.png',
        'image/cursor/Wait/Wait_16.png',
        'image/cursor/Wait/Wait_17.png',
        'image/cursor/Wait/Wait_18.png',
        'image/cursor/Wait/Wait_19.png',
        'image/cursor/Wait/Wait_20.png',
        'image/cursor/Wait/Wait_21.png',
        'image/cursor/Wait/Wait_22.png',
        'image/cursor/Wait/Wait_23.png',
        'image/cursor/Wait/Wait_24.png'
    ], 16, 8);
}