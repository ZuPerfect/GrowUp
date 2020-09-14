/**
 * @classdesc
 * 地图控件基类
 * @param  {object} opts 初始化控件参数字典
 */
class Control {
    constructor(opts) {
        this.el_ = null;
        this.text_ = opts.text || "lx button";
        this.style_ = opts.style || {};
        this.events_ = opts.events || [];
        this.map_ = null;
    }
    on = function (eventType, eventCallback) {
        this.el_[eventType] = eventCallback;
        return this;
    }
    setStyle = function (style) {
        for (let key in style) {
            if (style.hasOwnProperty(key)) {
                this.el_.style[key] = style[key];
            }
        }
        return this;
    }
    addTo = function (map) {
        this.map_ = map;
        map.addControl(this);
        return this;
    }
    removeFrom = function (map) {
        this.map_ = null;
        map.removeControl(this);
        return this;
    }
    getMap = function () {
        return this.map_;
    }
    getEl = function () {
        return this.el_;
    }
}
export default Control;