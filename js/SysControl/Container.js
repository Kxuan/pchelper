/**
 * Created by Xuan on 2014/11/26.
 */
defineClass('ControlBase', 'ControlContainer', {
    controls: null,
    focusControl: null,
    init: function () {
        this._super();
        this.controls = [];
    },
    /**
     * APPEND control into this container
     * @param control
     */
    Append: function (control) {
        if (control.parent !== null)
            throw "Control has already add to other container";
        this.controls.push(control);
        control.parent = this;
        control.fire('attach', this);
    },
    /**
     * REMOVE control from this container
     * @param control
     * @return {boolean}
     */
    Remove: function (control) {
        for (var i in this.controls) {
            if (this.controls[i] === control) {
                delete this.controls[i];
                control.parent = null;
                control.fire('detach', this);
                return true;
            }
        }
        return false;
    },
    RemoveAll: function (dispose) {
        for (var i in this.controls) {
            if (this.controls[i] !== undefined) {
                var control = this.controls[i];
                delete this.controls[i];
                control.parent = null;
                control.fire('detach', this);
                if (dispose !== false) {
                    control.Dispose();
                }
            }
        }
        this.controls = [];
        return true;
    },
    Dispose: function () {
        this.RemoveAll(true);
        this._super();
    },
    /**
     * Container is not render-able
     * @returns {boolean}
     */
    Render: function () {
        return false;
    }
});