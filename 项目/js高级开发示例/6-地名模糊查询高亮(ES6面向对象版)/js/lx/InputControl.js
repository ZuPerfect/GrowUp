import Control from './Control.js'
/**
 * @classdesc
 * 输入框类
 * @extends {lx.Control}
 * @param  {object} opts 初始化输入框控件参数字典
 */
class InputControl extends Control {
    constructor(opts) {
        super(opts);
        this.el_ = document.createElement("input");
        this.setStyle(this.style_);
    }
    getValue = function () {
        return this.el_.value;
    }
    setValue = function (value) {
        this.el_.value = value;
        return this;
    }
}
export default InputControl;