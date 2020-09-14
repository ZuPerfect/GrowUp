import Layer from './Layer.js'
import Control from './Control.js'
/**
 * @classdesc
 * 地图容器类
 * @param  {Object} opts 地图容器初始化参数字典
 */
class Map {
    constructor(opts) {
        this.target_ = opts.target || null;
    }
    getTarget = function () {
        return this.target_;
    }
    addLayer = function (layer) {
        if (layer instanceof Layer) {
            document.getElementById(this.target_).appendChild(layer.getSource());
        } else {
            console.error("该方法只能接受lx.Layer类型或者继承自该类的实例化对象");
        }
        return this;
    }
    removeLayer = function (layer) {
        if (layer instanceof Layer) {
            document.getElementById(this.target_).removeChild(layer.getSource());
        } else {
            console.error("该方法只能接受lx.Layer类型或者继承自该类的实例化对象");
        }
        return this;
    }
    addControl = function (control) {
        if (control instanceof Control) {
            document.getElementById(this.target_).appendChild(control.getEl());
        } else {
            console.error("该方法只能接受lx.Control类型或者继承自该类的实例化对象");
        }
        return this;
    }
    removeControl = function (control) {
        if (control instanceof Control) {
            document.getElementById(this.target_).removeChild(control.getEl());
        } else {
            console.error("该方法只能接受lx.Control类型或者继承自该类的实例化对象");
        }
        return this;
    }
}

export default Map;