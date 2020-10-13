import  Control  from './Control.js'
/**
 * @classdesc
 * 按钮控件类
 * @extends {lx.Control}
 * @param  {object} opts 初始化按钮控件参数字典
 */
class ButtonControl extends Control {
    constructor(opts) {
        super(opts);
        this.el_ = document.createElement("button");
        this.el_.innerText = this.text_;
        this.setStyle(this.style_);
    }
}

export default ButtonControl;