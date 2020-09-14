import Layer from './Layer.js'
/**
 * @classdesc
 * 静态图片图层，继承自lx.Layer
 * @extends {lx.Layer}
 * @param  {object} opts 初始化图层对象参数字典
 */
class ImageLayer extends Layer {
    constructor(opts) {
        super(opts);
        this.url_ = opts.url || "";
        this.source_ = document.createElement("img");
        this.source_.src = this.url_;
        this.style_ = {
            width: "100%",
            height: "100%",
            position: "absolute"
        }
        this.init();
    }
}
export default ImageLayer;