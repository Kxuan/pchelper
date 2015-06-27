/**
 * Created by Xuan on 2014/11/26.
 */

/**
 * Main Stage
 * @param {HTMLCanvasElement} canvasEl
 * @constructor
 */
function Stage(canvasEl) {
    /**
     * Canvas Context
     * @type {CanvasRenderingContext2D}
     */
    var c = this.context = canvasEl.getContext('2d');
    /**
     * Current Screen
     * @type {ControlScreen}
     */
    var screen = null;
    var slideSwitcher = null;
    var frameCounter = 0;
    var frameCleaner;
    this.fps = 0;
    function init() {
        window.addEventListener('resize', onResize, this);
        canvasEl.addEventListener('mousemove', onMouseMoveEvent);
        canvasEl.addEventListener('mousedown', onMouseMoveEvent);
        canvasEl.addEventListener('mouseup', onMouseMoveEvent);
        canvasEl.addEventListener('click', onMouseMoveEvent);
        canvasEl.addEventListener('dblclick', onMouseMoveEvent);
        canvasEl.addEventListener('mousewheel', onMouseWheel);

        window.addEventListener('keydown', onKeyEvent);
        window.addEventListener('keyup', onKeyEvent);
        window.addEventListener('keypress', onKeyEvent);

        window.Cursor = new Pointer();
        Cursor.SetCursor('Arrow');
        this.LoadScreen(ScreenMain);
        //this.LoadScreen(ScreenMain);
        frameCleaner = setInterval(function () {
            stage.fps = frameCounter;
            frameCounter = 0;
        }, 1000);
        onResize();
        requestAnimationFrame(Render);
    }


    function onResize() {
        canvasEl.width = window.innerWidth;
        canvasEl.height = window.innerHeight;
        screen.SetSize(canvasEl.width, canvasEl.height);
    }

    function onMouseMoveEvent(e) {
        if (Cursor.X != e.x || Cursor.Y != e.y) {
            Cursor.SetPosition(e.x, e.y);
        }
        screen.fire(e.type, e.x, e.y, e.which);
        e.preventDefault();
    }

    function onMouseWheel(e) {
        screen.fire(e.type, e.x, e.y, e.deltaX, e.deltaY, e.deltaZ);
    }

    function onKeyEvent(e) {
        if (!screen.fire(e.type, e.which, {
                repeat: e.repeat,
                charCode: e.charCode,
                altKey: e.altKey,
                shiftKey: e.shiftKey,
                ctrlKey: e.ctrlKey,
                metaKey: e.metaKey
            }))
            e.preventDefault();
    }

    function Render() {
        requestAnimationFrame(Render);
        frameCounter++;
        c.clearRect(0, 0, canvasEl.width, canvasEl.height);
        c.save();
        try {
            if (!screen.Render(c))
                debugLog('Render false');
            if (slideSwitcher !== null && slideSwitcher !== undefined) {
                if (typeof slideSwitcher.Render != "function") {
                    debugLog('slideSwitcher has no method named Render');
                    slideSwitcher = null;
                } else {
                    if (slideSwitcher.Render(c) === false) {
                        slideSwitcher = null;
                    }
                }
            }
        } catch (ex) {
            debugLog('screen render fail');
            console.error(ex.stack);
        } finally {
            c.restore();
            c.beginPath();//BUG Fix
            c.closePath();
        }
        Cursor.Draw(c);
    }

    /**
     * @return {boolean}
     */
    this.LoadScreen = function (screenCls) {
        if (screen !== null) {
            if (screen.fire('close', screenCls)) {
                slideSwitcher = new screen.Switcher(c);
                screen.Dispose();
                screen = null;
            } else {
                debugLog('LoadScreen Fail. Close Screen Request has been refused.');
            }
        }
        if (screen === null) {
            debugLog('LoadScreen Constructing New Screen.');
            screen = new screenCls();
            screen.fire('open');
            screen.SetSize(canvasEl.width, canvasEl.height);
            return true;
        }
        return false;
    };
    init.apply(this);
}