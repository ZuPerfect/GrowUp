/************模块与类培训示例(为了提高代码的复用性)*************/
/**
 * 要求：将前面的地名模糊查询使用类与模块的方式重写，代码优化，写出一个既有很强复用性的模板
 * 功能类：
 * 1、封装一个【lx.Map】类，该类具有添加图层（addLayer）、删除图层（removeLayer）、添加控件（addControl）、删除控件（removeControl）等方法，自己也可以自行扩展
 * 2、封装一个【lx.Layer】类，该类作为一个图层基类，具有添加到地图（addTo）、从地图删除（removeFro）等方法，自己也可以自行扩展
 * 3、封装一个【lx.ImageLayer】类，该类继承自【lx.Layer】,其本质是将一个<img>标签进一步封装为一个更加直观的类
 * 4、封装一个【lx.CanvasLayer】类，该类继承自【lx.Layer】,其本质是将一个<canvas>标签进一步封装为一个更加直观的类
 * 5、封装一个【lx.Control】类，该类作为一个控件基类，具有添加到地图（addTo）、从地图删除（removeFro）等方法，自己也可以自行扩展
 * 6、封装一个【lx.ButtonControl】类，该类继承自【lx.Control】，其本质是将一个<button>标签进一步封装为一个更加直观的类
 * 7、封装一个【lx.InputControl】类，该类继承自【lx.Control】，其本质是将一个<input>标签进一步封装为一个更加直观的类
 * 8、封装一个【lx.TipNoteControl】类，该类继承自【lx.Control】，其本质是将一个<div>标签进一步封装为一个更加直观的类
 * 9、封装一个【lx.Polygon】类，该类为一个多边形几何要素类，具有向canvas图层绘制（drawTo）的方法，自己也可以自行扩展
 */
/**包含知识点--第五讲
 * 1、DOM操作 √
 * 2、事件机制 √
 * 3、逻辑运算符非常规用法 √
 * 4、JavaScript如何使用ES5模拟类 √
 * 5、类的扩充 √
 * 6、类和类型 √
 * 7、继承 √
 * 8、模块 √
 * 9、函数链式调用 √
 */
/**
 * ES5面向对象目前还存在的问题：
 * 虽然说在写构造函数的时候，将类的属性及方法写到prototype属性中，一遍继承该对象的类可以共享，
 * 而不至于每次都是重新创建一份，但是方法写到prototype里面的话，有没有办法操作类的私有变量
 * 私有变量怎么在prototype中访问
 * 
 * tips:
 * 实际上，可以将一个函数作用域用做一个模块的私有命名空间（有时称为“模块函数”）,该示例将使用这种方式创建模块
 * 这样做的目的：创建一个命名空间,目的是为了避免模块里面的变量污染引用它的其他应用程序
 */

; (function (root, factory) {
    root.lx = factory();
}(this, function () {
    var lx = {};
    /**
     * 继承（寄生组合继承）
     * @param  {Function} childCtor 子类
     * @param  {Function} parentCtor 父类
     */
    lx.inherits = function (childCtor, parentCtor) {
        childCtor.prototype = Object.create(parentCtor.prototype);
        childCtor.prototype.constructor = childCtor;
    }
    /**
     * ajax请求，依赖于jQuery
     * @param  {string} url 请求地址
     * @param  {Function} success 请求成功回掉函数
     * @param  {Function} error 请求失败回掉函数
     */
    lx.ajax = function (url, success, error) {
        $.ajax({
            type: "get",
            url: url,
            success: success,
            error: error || function () { }
        });
    }

    /**
     * @classdesc
     * 地图容器类
     * @param  {Object} opts 地图容器初始化参数字典
     */
    lx.Map = function (opts) {
        //承载地图的element
        this.target_ = opts.target || null;
    }
    /**
     * 获取地图容器靶向element
     */
    lx.Map.prototype.getTarget = function () {
        return this.target_;
    }
    /**
     * 添加图层
     * @param  {lx.Layer} layer 图层对象
     */
    lx.Map.prototype.addLayer = function (layer) {
        //考虑是不是需要拷贝一份
        if (layer instanceof lx.Layer) {
            document.getElementById(this.target_).appendChild(layer.getSource());
            // this.layers_.push(layer);
        } else {
            console.error("该方法只能接受lx.Layer类型或者继承自该类的实例化对象");
        }
        return this;
    }

    /**
     * 移除图层
     * @param  {lx.Layer} layer 图层对象
     */
    lx.Map.prototype.removeLayer = function (layer) {
        if (layer instanceof lx.Layer) {
            document.getElementById(this.target_).removeChild(layer.getSource());
            // this.layers_.pop(layer);
        } else {
            console.error("该方法只能接受lx.Layer类型或者继承自该类的实例化对象");
        }
        return this;
    }
    /**
     * 添加控件
     * @param  {lx.Control} control 控件对象
     */
    lx.Map.prototype.addControl = function (control) {
        if (control instanceof lx.Control) {
            document.getElementById(this.target_).appendChild(control.getEl());
        } else {
            console.error("该方法只能接受lx.Control类型或者继承自该类的实例化对象");
        }
        return this;
    }

    /**
     * 移除控件
     * @param  {lx.Control} control 控件对象
     */
    lx.Map.prototype.removeControl = function (control) {
        if (control instanceof lx.Control) {
            document.getElementById(this.target_).removeChild(control.getEl());
        } else {
            console.error("该方法只能接受lx.Control类型或者继承自该类的实例化对象");
        }
        return this;
    }

    /**
     * @classdesc
     * 图层类需要一个基类lx.Layer，其子类设计目前有两个CanvasLayer（专门用于绘图使用）、ImageLayer（用作底图使用）
     * @param  {object} opts 图层基类初始化参数字典
     */
    lx.Layer = function (opts) {
        this.layerName_ = opts.layerName || "lx_layer";
        //source就是element
        this.source_ = null;
        this.style_ = opts.style || {};
        this.map_ = null;
    }

    /**
     * 图层初始化
     */
    lx.Layer.prototype.init = function () {
        for (var key in this.style_) {
            if (this.style_.hasOwnProperty(key)) {
                this.source_.style[key] = this.style_[key];
            }
        }
    }

    /**
     * 获取图层对应element
     */
    lx.Layer.prototype.getSource = function () {
        return this.source_;
    }

    /**
     * 添加到地图容器
     * @param  {lx.Map} map 地图容器对象
     */
    lx.Layer.prototype.addTo = function (map) {
        //用来标识该图层是不是已经添加到了map中
        this.map_ = map;
        map.addLayer(this);
        return this;
    }

    /**
     * 从地图容器中移除
     * @param  {lx.Map} map 地图容器对象
     */
    lx.Layer.prototype.removeFrom = function (map) {
        this.map_ = null;
        map.removeLayer(this);
        return this;
    }

    /**
     * @classdesc
     * 静态图片图层，继承自lx.Layer
     * @extends {lx.Layer}
     * @param  {object} opts 初始化图层对象参数字典
     */
    lx.ImageLayer = function (opts) {
        lx.Layer.call(this, opts);
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
    //继承  
    lx.inherits(lx.ImageLayer, lx.Layer);
    //这么写的坑啊！！！！！！！直接继承不了,父类可以这么写，但是子类绝对不可以，因为会直接修改prototype属性
    // lx.ImageLayer.prototype = {
    //     init: function () {
    //         this.source_.src = this.url_;
    //         this.source_.style.width = "100%";
    //         this.source_.style.height = "100%";
    //     }
    // };

    /**
     * @classdesc
     * canvas画布图层，继承自lx.Layer
     * @extends {lx.Layer}
     * @param  {object} opts 初始化图层对象参数字典
     */
    lx.CanvasLayer = function (opts) {
        lx.Layer.call(this, opts);
        this.source_ = document.createElement("canvas");
        this.style_ = {
            width: "100%",
            height: "100%",
            position: "absolute"
        }
        this.init();
    }
    lx.inherits(lx.CanvasLayer, lx.Layer);

    /**
     * @classdesc
     * 地图控件基类
     * @param  {object} opts 初始化控件参数字典
     */
    lx.Control = function (opts) {
        this.el_ = null;
        this.text_ = opts.text || "lx button";
        this.style_ = opts.style || {};
        this.events_ = opts.events || [];
        this.map_ = null;
    }

    /**
     * 用于给控件注册事件
     * @param  {string} eventType 事件类型
     * @param  {Function} eventCallback 事件回调函数
     */
    lx.Control.prototype.on = function (eventType, eventCallback) {
        this.el_[eventType] = eventCallback;
        return this;
    }

    /**
     * 设置控件样式
     * @param  {object} style 控件样式字典
     */
    lx.Control.prototype.setStyle = function (style) {
        for (var key in style) {
            if (style.hasOwnProperty(key)) {
                this.el_.style[key] = style[key];
            }
        }
        return this;
    }
    /**
     * 添加到地图容器
     * @param  {lx.Map} map 地图容器对象
     */
    lx.Control.prototype.addTo = function (map) {
        this.map_ = map;
        map.addControl(this);
        return this;
    }
    /**
     * 从地图中移除控件
     * @param  {lx.Map} map 地图容器对象
     */
    lx.Control.prototype.removeFrom = function (map) {
        this.map_ = null;
        map.removeControl(this);
        return this;
    }
    /**
     * 获取当前控件所在的地图容器对象
     */
    lx.Control.prototype.getMap = function () {
        return this.map_;
    }
    /**
     * 获取控件element
     */
    lx.Control.prototype.getEl = function () {
        return this.el_;
    }

    /**
     * @classdesc
     * 按钮控件类
     * @extends {lx.Control}
     * @param  {object} opts 初始化按钮控件参数字典
     */
    lx.ButtonControl = function (opts) {
        lx.Control.call(this, opts);
        this.el_ = document.createElement("button");
        this.el_.innerText = this.text_;
        this.setStyle(this.style_);
    }
    lx.inherits(lx.ButtonControl, lx.Control);


    /** 
     * @classdesc
     * 输入框类
     * @extends {lx.Control}
     * @param  {object} opts 初始化输入框控件参数字典
     */
    lx.InputControl = function (opts) {
        lx.Control.call(this, opts);
        this.el_ = document.createElement("input");
        this.setStyle(this.style_);
    }
    //注意：必须在自定义方法之前编写继承的代码！否则继承会覆盖掉子类自己的方法
    lx.inherits(lx.InputControl, lx.Control);
    /**
     * 获取输入框中的值
     */
    lx.InputControl.prototype.getValue = function () {
        return this.el_.value;
    }
    /**
     * 设置输入框中的值
     * @param  {string} value 需要设置到输入框中的字符串
     */
    lx.InputControl.prototype.setValue = function (value) {
        this.el_.value = value;
        return this;
    }

    /**
     * @classdesc
     * 提示框控件,该控件一般与input标签一起使用
     * @extends {lx.Control}
     * @param  {object} opts 初始化提示框控件需要的参数字典
     */
    lx.TipNoteControl = function (opts) {
        lx.Control.call(this, opts);
        this.el_ = document.createElement("div");
        this.tips_ = opts.tips || [];
    }
    lx.inherits(lx.TipNoteControl, lx.Control);

    /**
     * 设置提示内容
     * @param  {Array<string>} tips 提示内容
     */
    lx.TipNoteControl.prototype.setTips = function (tips) {
        this.tips_ = tips;
        return this;
    }
    /**
     * 初始化提示框控件，目的是为了时其与输入框控件绑定
     * @param  {lx.InputControl} input 输入框控件
     */
    lx.TipNoteControl.prototype.init = function (input) {
        this.el_.innerHTML = "";
        var ulElement = document.createElement("ul");
        ulElement.id = "lx-tipUl";
        //设置id，该div样式设置参加样式表
        this.el_.id = "lx-tipDiv";
        for (var i = 0; i < this.tips_.length; i++) {
            var liElement = document.createElement("li");
            liElement.textContent = this.tips_[i];
            //使用闭包的技巧将当前作用域里面的对象传递到li标签作用域内部使用，这点至关重要！
            liElement.onclick = (function (map, tip) {
                return function () {
                    //关闭
                    tip.removeFrom(map);
                    if (input) {
                        //将选中的值放入输入框
                        input.setValue(this.textContent);
                    }
                };
            }(this.map_, this));
            ulElement.appendChild(liElement);
        }
        this.el_.appendChild(ulElement);
        return this;
    }

    /**
     * @classdesc
     * 多边形类
     * @param  {object} opts 初始化多边形需要的参数字典
     */
    lx.Polygon = function (opts) {
        this.coordinate_ = opts.coordinate || "";
        this.style_ = opts.style || {};
    }

    /**
     * 将多边形绘制到指定的画布
     * @param  {lx.CanvasLayer} canvasLayer 画布图层对象
     */
    lx.Polygon.prototype.drawTo = function (canvasLayer) {
        var canvas = canvasLayer.getSource();
        canvas.height = canvas.offsetHeight * 2;
        canvas.width = canvas.offsetWidth * 2;
        var ctx = canvas.getContext("2d");
        ctx.scale(2, 2);
        //初始化样式
        for (var key in this.style_) {
            if (this.style_.hasOwnProperty(key)) {
                ctx[key] = this.style_[key];
            }
        }
        ctx.beginPath();
        ctx.moveTo(this.coordinate_[0][0], this.coordinate_[0][1]);
        for (var i = 0; i < this.coordinate_.length; i++) {
            ctx.lineTo(this.coordinate_[i][0], this.coordinate_[i][1]);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        return this;
    }
    //导出接口
    return lx;
}));
