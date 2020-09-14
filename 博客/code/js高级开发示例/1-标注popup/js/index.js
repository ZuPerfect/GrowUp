/************交互添加标注*************/
/**实现要求
 * 1、使用1张静态图片模拟图层，加载显示到前端页面；
 * 2、定义一个Marker对象供继承，内部需要包含markerSrc、markerStyle等属性。create方法。
 * 3、定义一个Dialog对象供继承，内部需要包含el、contain等属性。init、show等方法。注：“添加标注对话框”和“显示标注信息对话框”需要继承自该对话框对象
 * 4、在页面添加【开始添加标注】按钮，点击该按钮之后，激活交互添加标注功能，点击地图上的任意位置，
 *    首先弹出信息输入对话框，输入标注信息之后，点击对话框中的【添加】按钮，在当前位置添加一个标注。
 * 5、点击已添加的标注，弹出popup对话框显示标注信息。
 */
//有关使用function创建类的介绍将会在后面的“类与模块”中详细介绍，这里不多体现
/**包含知识点（√表示已体现；X表示未体现）--第三、四讲
 * 1、DOM操作 √
 * 2、事件机制 √
 * 3、逻辑运算符非常规用法 √
 * 4、创建对象 √
 * 5、对象属性的特性 √
 * 6、对象继承 √
 * 7、深拷贝与浅拷贝 X
 */
/**
 * 使用对象的方式为当前应用创建一个命名空间
 */
var MarkerApp = {};//等同于 MarkerApp=new Object();
MarkerApp.map = document.getElementById("mapDiv");
MarkerApp.position = {
    x: 0,
    y: 0
};
/**
 * 一个简单的可继承的对话框对象
 */
MarkerApp.Dialog = {
    //对话框主体html元素
    el: document.createElement('div'),
    //包含对话框的html元素
    contain: document.getElementsByTagName("body"),
    //对话框内部需要显示的内容
    htmlStr: "",
    //对话框内部按钮以及回掉函数，例如{text:"确认",callBack:function(){...}}
    buttons: [],
    //对话框样式
    style: {
        position: 'absolute',
        width: "auto",
        maxWidth: "300px",
        height: "auto",
        padding: "10px",
        borderRadius: "10px",
        zIndex: "100",
        border: "1px solid rgba(0,0,0,0.7)",
        backgroundColor: "rgba(255,255,255,0.7)"
    },
    //初始化对话框方法
    init: function () {
        //设置对话框样式
        for (var styleKey in this.style) {
            if (this.style.hasOwnProperty(styleKey)) {
                this.el.style[styleKey] = this.style[styleKey];
            }
        }
        //加载对话框内容
        this.el.innerHTML = this.htmlStr;
        //加载对话框内部按钮
        for (var i = 0; i < this.buttons.length; i++) {
            var buttonElement = document.createElement("button");
            buttonElement.textContent = this.buttons[i].text;
            buttonElement.onclick = this.buttons[i].callBack;
            this.el.appendChild(buttonElement);
        }
        //将对话框添加到其父类标签之中
        this.contain.appendChild(this.el);
    },
    //显示对话框
    show: function (x, y) {
        this.init();
        //设置对话框位置
        this.el.style.top = (y - 200) + "px";
        this.el.style.left = x + "px";
    },
    close: function () {
        //直接移除DIV
        this.contain.removeChild(this.el);
    }
}
//设置对话框对象的属性特性
Object.defineProperties(MarkerApp.Dialog, {
    el: { writable: true, enumerable: true, configurable: false },
    contain: { writable: true, enumerable: true, configurable: false },
    htmlStr: { writable: true, enumerable: true, configurable: false },
    buttons: { writable: true, enumerable: true, configurable: false },
    style: { writable: true, enumerable: true, configurable: false }
});
/**
 * 一个简单的可继承的标注对象
 */
MarkerApp.Marker = {
    markerSrc: "img/marker-red.png",
    //自定义对象属性特征
    markerStyle: Object.defineProperties({}, {
        position: { value: 'absolute', writable: true, enumerable: true, configurable: false }
    }),
    markerAttribute: {
        markerName: "",
        markerDescribe: ""
    },
    markerEvents: [{
        eventType: 'onclick',
        eventCallback: function () {
            var x = parseInt(this.style.left.slice(0, this.style.left.length - 2));
            var y = parseInt(this.style.top.slice(0, this.style.top.length - 2));
            MarkerApp.showMarkerInfoDialog(x, y, {
                markerName: this.getAttribute("markerName"),
                markerDescribe: this.getAttribute("markerDescribe")
            });
        }
    }],
    create: function (x, y) {
        var newMarker = document.createElement('img');
        //设置标注样式
        for (var styleKey in this.markerStyle) {
            if (this.markerStyle.hasOwnProperty(styleKey)) {
                //在对象有哪些键值对不确定的情况下，使用这种方式赋值               
                newMarker.style[styleKey] = this.markerStyle[styleKey];
            }
        }
        //设置img标签样式        
        newMarker.style.left = (x + "px");
        newMarker.style.top = (y + "px");
        newMarker.src = this.markerSrc;
        //设置标注属性
        for (var AttrKey in this.markerAttribute) {
            if (this.markerAttribute.hasOwnProperty(AttrKey)) {
                newMarker.setAttribute(AttrKey, this.markerAttribute[AttrKey]);
            }
        }
        //设置标注事件
        for (var j = 0; j < this.markerEvents.length; j++) {
            newMarker[this.markerEvents[j].eventType] = this.markerEvents[j].eventCallback;
        }
        return newMarker;
    }
}
//设置标注对象的属性特性
Object.defineProperties(MarkerApp.Marker, {
    markerSrc: { writable: true, enumerable: true, configurable: false },
    markerStyle: { writable: true, enumerable: true, configurable: false },
    markerAttribute: { writable: true, enumerable: true, configurable: false },
    markerEvents: { writable: true, enumerable: true, configurable: false }
});

/**一个简单的继承的方法（原型继承）
 * @param  {object} p 可继承的对象
 */
MarkerApp.inherit = function (p) {
    if (p == null) {
        throw TypeError();
    }
    if (Object.create) {
        //原型链继承
        return Object.create(p);
    }
}

/**添加标注
 * @param  {object} marker
 */
MarkerApp.addMakerToMap = function (marker) {
    if (marker) {
        MarkerApp.map && MarkerApp.map.appendChild(marker);
    } else {
        console.error(" MarkerApp.addMakerToMap方法不支持没有实参的调用！");
    }
}

/**显示添加标注对话框
 * @param  {number} x 对话框X轴位置
 * @param  {number} y 对话框Y轴位置
 */
MarkerApp.showAddMarkerDialog = function (x, y) {
    //继承一个对话框对象
    var addMarkerDialog = MarkerApp.inherit(MarkerApp.Dialog);
    //设置对话框对象自己的属性参数
    addMarkerDialog.contain = MarkerApp.map;
    var htmlStr = "";
    htmlStr += "<label>标注名称：</label><input id='markerName' type='text'/><br/>";
    htmlStr += "<label>标注描述：</label><br/><textarea id='markerIntroduce' style='width:300px;height:150px'></textarea><br/>";
    addMarkerDialog.htmlStr = htmlStr;
    addMarkerDialog.buttons = [{
        text: "添加",
        callBack: function () {
            var marker = MarkerApp.inherit(MarkerApp.Marker);
            marker.markerAttribute = {
                markerName: document.getElementById("markerName").value,
                markerDescribe: document.getElementById("markerIntroduce").value
            }
            //将标注添加到地图上面
            var position = MarkerApp.position;
            MarkerApp.addMakerToMap(marker.create(position.x, position.y));
            addMarkerDialog.close();
        }
    }, {
        text: "关闭",
        callBack: function () {
            addMarkerDialog.close();
        }
    }];
    addMarkerDialog.show(x, y);
}

/**显示标注信息对话框，亦即popup
 * @param  {number} x 对话框X轴位置
 * @param  {number} y 对话框Y轴位置
 * @param  {object} markerInfo 对话框中需要显示的标注的信息对象
 */
MarkerApp.showMarkerInfoDialog = function (x, y, markerInfo) {
    //继承一个对话框对象
    var markerInfoDialog = MarkerApp.inherit(MarkerApp.Dialog);
    //设置对话框对象自己的属性参数
    markerInfoDialog.contain = MarkerApp.map;
    var htmlStr = "";
    htmlStr += "<label>标注名称：</label><label id='markerInfo_name'>" + markerInfo.markerName + "</label><br/>";
    htmlStr += "<label>标注描述：</label><br/><textarea id='markerInfo_descride' readonly='readonly' style='width:300px;height:120px'>" + markerInfo.markerDescribe + "</textarea><br/>";
    markerInfoDialog.htmlStr = htmlStr;
    markerInfoDialog.buttons = [{
        text: "关闭",
        callBack: function () {
            markerInfoDialog.close();
        }
    }];
    markerInfoDialog.show(x, y);
}

/**
 * 加载一张静态图片作为底图
 */
onload = function () {
    var mapImgElement = document.getElementById("mapImg");
    var btnElement = document.getElementById("addMarker");
    btnElement.onclick = function () {
        //注册鼠标事件
        mapImgElement.onclick = function (e) {
            //弹出一个对话框，要求用户输入属性信息
            MarkerApp.showAddMarkerDialog(e.layerX, e.layerY);
            MarkerApp.position.x = e.layerX;
            MarkerApp.position.y = e.layerY;
        }
    }
}
