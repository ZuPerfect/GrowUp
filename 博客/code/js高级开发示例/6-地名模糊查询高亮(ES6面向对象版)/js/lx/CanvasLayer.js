import Layer from './Layer.js'
/**
 * @classdesc
 * canvas画布图层，继承自lx.Layer
 * @extends {lx.Layer}
 * @param  {object} opts 初始化图层对象参数字典
 */
class CanvasLayer extends Layer {
    constructor(opts) {
        super(opts);
        this.source_ = document.createElement("canvas");
        this.style_ = {
            width: "100%",
            height: "100%",
            position: "absolute"
        }
        this.init();
    }
}
export default CanvasLayer;