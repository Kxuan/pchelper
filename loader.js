function initCanvas() {
    if (window.canvasEl !== undefined) return false;
    if (!window.WebGLRenderingContext || CanvasRenderingContext2D === void(0)) {
        window.location = "http://get.webgl.org";
        return false;
    }
    window.canvasEl = document.createElement("canvas");
    document.body.appendChild(canvasEl);
    document.body.onselectstart = function () {
        return false
    };
    document.body.onselect = function () {
        return false
    };
    document.body.ondragstart = function () {
        return false;
    };
    return true;
}

function loadScript(src, callback, thisObj) {
    var head = document.head || document.getElementsByTagName('head')[0];
    if (!head) return null;
    var scriptEl = document.createElement('script');
    scriptEl.src = src;
    scriptEl.type = 'text/javascript';
    scriptEl.async = "async";
    scriptEl.charset = "UTF-8";
    if (typeof callback === "function") {
        scriptEl.addEventListener('load', function () {
            callback.apply(thisObj);
        });
    }
    head.appendChild(scriptEl);
    return scriptEl;
}

var imageCache = {};
function loadImage(src, callback, thisObj) {
    var imgEl;
    if (src in imageCache) {
        imgEl = imageCache[src];
    } else {
        imgEl = document.createElement('img');
        imgEl.src = src;
        imageCache[src] = imgEl;
    }

    if (typeof callback === "function") {
        imgEl.addEventListener('load', function () {
            callback.apply(thisObj);
        });
    }
    return imgEl;
}
var classWaitDictionary = {};
function defineClass(parentName, name, props) {
    if (parentName !== null && !(parentName in window)) {
        if (!(parentName in classWaitDictionary))
            classWaitDictionary[parentName] = [];
        classWaitDictionary[parentName].push({
            name: name,
            props: props
        });
        return false;
    }

    if (parentName === null) {
        window[name] = Class.extend(props);
    } else {
        window[name] = window[parentName].extend(props);
    }
    window[name]['$$name'] = name;
    if (name in classWaitDictionary) {
        classWaitDictionary[name].forEach(function (cls) {
            defineClass(name, cls.name, cls.props);
        });
        delete classWaitDictionary[name];
    }
    return true;
}
window.addEventListener('load', function () {
    if (initCanvas())
        loadScript('js/startup.js');
});