/**
 * @classdesc
 * 图层类需要一个基类lx.Layer，其子类设计目前有两个CanvasLayer（专门用于绘图使用）、ImageLayer（用作底图使用）
 * @param  {object} opts 图层基类初始化参数字典
 */
class Layer {
    constructor(opts) {
        this.layerName_ = opts.layerName || "lx_layer";
        this.source_ = null;
        this.style_ = opts.style || {};
        this.map_ = null;
    }
    init = function () {
        for (let key in this.style_) {
            if (this.style_.hasOwnProperty(key)) {
                this.source_.style[key] = this.style_[key];
            }
        }
    }
    getSource = function () {
        return this.source_;
    }
    addTo = function (map) {
        this.map_ = map;
        map.addLayer(this);
        return this;
    }
    removeFrom = function (map) {
        this.map_ = null;
        map.removeLayer(this);
        return this;
    }
}
export default Layer;