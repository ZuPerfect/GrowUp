import Control from './Control.js'
/**
 * @classdesc
 * 提示框控件,该控件一般与input标签一起使用
 * @extends {lx.Control}
 * @param  {object} opts 初始化提示框控件需要的参数字典
 */
class TipNoteControl extends Control {
    constructor(opts) {
        super(opts);
        this.el_ = document.createElement("div");
        this.tips_ = opts.tips || [];
    }
    setTips = function (tips) {
        this.tips_ = tips;
        return this;
    }
    init = function (input) {
        this.el_.innerHTML = "";
        let ulElement = document.createElement("ul");
        ulElement.id = "lx-tipUl";
        //设置id，该div样式设置参加样式表
        this.el_.id = "lx-tipDiv";
        for (let i = 0; i < this.tips_.length; i++) {
            let liElement = document.createElement("li");
            liElement.textContent = this.tips_[i];
            liElement.onclick = (e) => {             
                //关闭
                this.removeFrom(this.map_);
                if (input) {
                    //将选中的值放入输入框
                    input.setValue(e.target.textContent);
                }
            };
            ulElement.appendChild(liElement);
        }
        this.el_.appendChild(ulElement);
        return this;
    }
}
export default TipNoteControl;