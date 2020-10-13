/************模块与类培训示例(为了提高代码的复用性)*************/
/**
 * 将前面的地名模糊查询和标注popup使用类与模块的方式重写，代码优化，写出一个既有很强复用性的模板
 */
/**
 * es6之前，javascript本质上不能算是一门面向对象的编程语言，
 * 因为它对于封装、继承、多态这些面向对象语言的特点并没有在
 * 语言层面上提供原生的支持。但是，它引入了原型(prototype)
 * 的概念，可以让我们以另一种方式模仿类，并通过原型链的方式
 * 实现了父类子类之间共享属性的继承以及身份确认机制。其实，
 * 面向对象的概念本质上来讲不是指某种语言特性，而是一种设计
 * 思想。如果你深谙面向对象的编程思想，即使用c这种面向过程的
 * 语言也能写出面向对象的代码（典型的代表就是windows NT 内核
 * 实现），而javascript亦是如此！正是由于javascript本身对面
 * 向对象编程没有一个语言上的支持标准，所以才有了五花八门、令
 * 人眼花缭乱的“类继承”的代码。所幸，es6增加了class、extends、
 * static等关键字用以在语言层面支持面向对象，但是，还是有些保
 * 守！我们先列举出es6之前常见的几种继承方案，然后再来一探es6
 * 的类继承机制，最后再讨论下javascript多态。
 * 
 * -------------------摘自https://www.jianshu.com/p/5cb692658704
 */
/**实现要求
 * 
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
 */
/**
 * 问题：
 * 虽然说在写构造函数的时候，将类的属性及方法写到prototype属性中，一遍继承该对象的类可以共享，
 * 而不至于每次都是重新创建一份，但是方法写到prototype里面的话，有没有办法操作类的私有变量
 * 私有变量怎么在prototype中访问
 */


//实际上，可以将一个函数作用域用做一个模块的私有命名空间（有时称为“模块函数”）
//创建一个命名空间,这样做的目的是为了避免模块里面的变量污染引用它的其他应用程序

/**
 * 1、加载【(1)底图模块】Map，ImageLayer √
 * 2、加载【(2)搜索框】，加载【(3)搜索模块】的时候自定义按钮的回调函数等等，回掉函数里面初始化【(4)绘图控件】 
 */

//设置对象的writable特性虽然可以实现属性不被修改，但是外部还是可以读取到该属性的值，没有达到完全私有的目的
; (function (root, factory) {
    root.lx = factory();
}(this, function () {
    var lx = {};
    //深拷贝，暂时不写
    lx.clone = function () { }
    //继承（寄生组合继承）
    lx.inherits = function (childCtor, parentCtor) {
        childCtor.prototype = Object.create(parentCtor.prototype);
        childCtor.prototype.constructor = childCtor;
    }
    lx.ajax = function (url, success, error) {
        $.ajax({
            type: "get",
            url: url,
            success: success,
            error: error || function () { }
        });
    }

    /**
     * 加载底图类
     */
    lx.Map = function (opts) {
        //承载地图的element
        this.target_ = opts.target || null;
        this.layers_ = [];
    }
    lx.Map.prototype.getTarget = function () {
        return this.target_;
    }
    lx.Map.prototype.addLayer = function (layer) {
        //考虑是不是需要拷贝一份
        if (layer instanceof lx.Layer) {
            document.getElementById(this.target_).appendChild(layer.getSource());
            // this.layers_.push(layer);
        } else {
            console.error("该方法只能接受lx.Layer类型或者继承自该类的实例化对象");
        }
    }
    lx.Map.prototype.removeLayer = function (layer) {
        if (layer instanceof lx.Layer) {
            document.getElementById(this.target_).removeChild(layer.getSource());
            // this.layers_.pop(layer);
        } else {
            console.error("该方法只能接受lx.Layer类型或者继承自该类的实例化对象");
        }
    }
    lx.Map.prototype.getLayers = function () {
        return this.layers_;
    }
    lx.Map.prototype.addControl = function (control) {
        if (control instanceof lx.Control) {
            document.getElementById(this.target_).appendChild(control.getEl());
        } else {
            console.error("该方法只能接受lx.Control类型或者继承自该类的实例化对象");
        }
    }
    lx.Map.prototype.removeControl = function (control) {
        if (control instanceof lx.Control) {
            document.getElementById(this.target_).removeChild(control.getEl());
        }
    }

    /**
     * 图层类需要一个基类lx.Layer，起子类设计目前有三个CanvasLayer（专门用于绘图使用）、ImageLayer（用作底图使用）、MarkerLayer（标注图层使用）
     */
    lx.Layer = function (opts) {
        this.layerName_ = opts.layerName || "lx_layer";
        //source就是element
        this.source_ = null;
        this.style_ = opts.style || {};
        this.map_ = null;
    }
    lx.Layer.prototype.init = function () {
        for (var key in this.style_) {
            if (this.style_.hasOwnProperty(key)) {
                this.source_.style[key] = this.style_[key];
            }
        }
    }
    lx.Layer.prototype.getSource = function () {
        return this.source_;
    }
    lx.Layer.prototype.addTo = function (map) {
        //用来标识该图层是不是已经添加到了map中
        this.map_ = map;
        map.addLayer(this);
        return this;
    }
    lx.Layer.prototype.removeFrom = function (map) {
        this.map_ = null;
        map.removeLayer(this);
        return this;
    }

    /**
     * 加载静态图片作为图层,继承自lx.Layer
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
    //这么写的坑啊！！！！！！！直接继承不了,父类可以这么写，但是子类绝对不可以，应该会直接修改prototype属性
    // lx.ImageLayer.prototype = {
    //     init: function () {
    //         this.source_.src = this.url_;
    //         this.source_.style.width = "100%";
    //         this.source_.style.height = "100%";
    //     }
    // };

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
     * 控件基类
     */
    lx.Control = function (opts) {
        this.el_ = null;
        this.text_ = opts.text || "lx button";
        this.style_ = opts.style || {};
        this.events_ = opts.events || [];
        this.map_ = null;
    }

    lx.Control.prototype.on = function (eventType, eventCallback) {
        this.el_[eventType] = eventCallback;
    }
    lx.Control.prototype.setStyle = function (style) {
        for (var key in style) {
            if (style.hasOwnProperty(key)) {
                this.el_.style[key] = style[key];
            }
        }
    }
    lx.Control.prototype.addTo = function (map) {
        this.map_ = map;
        map.addControl(this);
        return this;
    }
    lx.Control.prototype.removeFrom = function (map) {
        this.map_ = null;
        map.removeControl(this);
    }
    lx.Control.prototype.getMap = function () {
        return this.map_;
    }
    lx.Control.prototype.getEl = function () {
        return this.el_;
    }

    /**
     * 按钮控件类
     */
    lx.ButtonControl = function (opts) {
        lx.Control.call(this, opts);
        this.el_ = document.createElement("button");
        this.el_.innerText = this.text_;
        this.setStyle(this.style_);
    }
    lx.inherits(lx.ButtonControl, lx.Control);
    /**
     * 输入框类
     */
    lx.InputControl = function (opts) {
        lx.Control.call(this, opts);
        this.el_ = document.createElement("input");
        this.setStyle(this.style_);
    }
    //必须在自定义方法之前编写继承的代码
    lx.inherits(lx.InputControl, lx.Control);
    lx.InputControl.prototype.getValue = function () {
        return this.el_.value;
    }
    lx.InputControl.prototype.setValue = function (value) {
        this.el_.value = value;
    }
    /**
     * 提示框控件,该控件一般与input标签一起使用
     */
    lx.TipNoteControl = function (opts) {
        lx.Control.call(this, opts);
        this.el_ = document.createElement("div");
        this.tips_ = opts.tips || [];
    }
    lx.inherits(lx.TipNoteControl, lx.Control);
    lx.TipNoteControl.prototype.setTips = function (tips) {
        this.tips_ = tips;
        return this;
    }
    lx.TipNoteControl.prototype.init = function (input) {
        this.el_.innerHTML = "";
        var ulElement = document.createElement("ul");
        ulElement.id = "lx-tipUl";
        //设置id，该div样式设置参加样式表
        this.el_.id = "lx-tipDiv";
        for (var i = 0; i < this.tips_.length; i++) {
            var liElement = document.createElement("li");
            liElement.textContent = this.tips_[i];
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
     * 多边形,学生可以自己在课余时间自己抽象一个可供点线区继承的父类，此处只以区为例
     */
    lx.Polygon = function (opts) {
        this.coordinate_ = opts.coordinate || "";
        this.style_ = opts.style || {};
    }
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
    }
    //导出接口
    return lx;
}));
