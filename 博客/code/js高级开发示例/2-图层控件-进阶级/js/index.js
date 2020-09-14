/************图层切换控件*************/

/**实现要求
 * 1、使用4张静态图片模拟4个图层，加载显示到前端页面；
 * 2、实现鼠标拖动图片功能；
 * 3、实现鼠标滚轮放大缩小图片功能（可选要求）；
 * 4、在前端页面创建一个DIV，增加4个checkbox标签，checkbox标签的选中与否控制图层的显示与隐藏；
 * 5、在图层选择界面中增加【介绍】按钮，通过点击按钮，查询JOSN数据，然后使用递归遍历数据，将数据展示到DIV中
 */
/**包含知识点--第三、四讲
 * 1、DOM操作 √
 * 2、事件机制 √
 * 3、逻辑运算符非常规用法 √
 * 4、递归 √
 * 5、变量作用域 √
 * 6、闭包 √
 * 7、错误处理 √
 */
/**
 * 地图显示模块
 */
var Map = {
    mapDiv: document.getElementById("mapDiv"),
    mapImg: document.getElementById("mapImg"),
    zoom: 0.8,
    initMoveMapEvent: function () {
        Map.mapImg.onmousedown = function (e) {
            //获取事件对象
            var mapEvent = e;
            //阻止浏览器的默认事件
            mapEvent.preventDefault();
            //获取x，y方向鼠标位置与图片偏移的之间的差值，为了保证在拖动的时候图片不回到初始的位置
            var disx = mapEvent.clientX - Map.mapImg.offsetLeft;
            var disy = mapEvent.clientY - Map.mapImg.offsetTop;
            //注册鼠标移动事件
            Map.mapDiv.onmousemove = function (e) {
                //获取事件对象
                mapEvent = e;
                //阻止浏览器的默认事件
                mapEvent.preventDefault();
                //计算图片的偏移值
                var x = mapEvent.clientX - disx;
                var y = mapEvent.clientY - disy;
                Map.mapImg.style.left = x + "px";
                Map.mapImg.style.top = y + "px";
            }
            // 鼠标弹起后停止移动
            Map.mapDiv.onmouseup = function () {
                Map.mapDiv.onmousemove = null;
                Map.mapDiv.onmouseup = null;
            }
        }
    },
    initZoomMapEvent: function () {
        var scrollFunc = function (e) {
            e = e || window.event;
            if (e.wheelDelta) { /*IE|Opera|Chrome*/
                (e.wheelDelta > 0) && (Map.mapImg.style.transform = "scale(" + (Map.zoom += 0.2) + ")");
                (e.wheelDelta < 0) && (Map.zoom > 0) && (Map.mapImg.style.transform = "scale(" + (Map.zoom -= 0.2) + ")");

            } else if (e.detail) { /*Firefox*/
                (e.detail < 0) && (Map.mapImg.style.transform = "scale(" + (Map.zoom += 0.2) + ")");
                (e.detail > 0) && (Map.zoom > 0) && (Map.mapImg.style.transform = "scale(" + (Map.zoom -= 0.2) + ")");
            }
        }
        //Firefox        
        this.mapDiv.addEventListener && this.mapDiv.addEventListener('DOMMouseScroll', scrollFunc, false);
        //IE|Opera|Chrome        
        this.mapDiv.onmousewheel = scrollFunc;
    },
    init: function () {
        this.initMoveMapEvent();
        this.initZoomMapEvent();
        return window;
    }
};

/**
 * 图层选择模块
 */
var LayerSelectModel = {
    layerSelect: document.getElementById("layerSelect"),
    changeLayer: function (layerID) {
        return function () {
            //控制图层显示隐藏            
            this.children[0].checked ?
                document.getElementById(layerID).style.display = "" :
                document.getElementById(layerID).style.display = "none"
        }
    },
    introduceBtnCallback: function (layerID) {
        return function () {
            $.ajax({
                url: "json/mapIntroduce.json",
                type: "get",
                dataType: "json",
                success: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        if (layerID == data[i].layerID) {
                            try {
                                IntroduceModel.init(data[i]);
                                //IntroduceModel.init(null);
                                //IntroduceModel.init(未定义);
                                break;
                            } catch (e) {
                                IntroduceModel.init(e);
                            }
                        }
                    }
                },
                error: function (data) {
                    alert("失败");
                    console.log(data);
                }
            });
        }
    },
    init: function () {
        var elemetUl = document.createElement('ul');
        //获取mapImg下面的所有li标签
        var layerList = document.getElementsByClassName('layer');
        for (var i = 0; i < layerList.length; i++) {
            //创建li标签
            var elementLi = document.createElement('li');
            //获取图层的id
            var layerID = layerList[i].attributes.id.value;
            var elementInput = document.createElement('input');
            //可通过方法设置元素的属性
            elementInput.setAttribute('type', 'checkbox');
            //也可以通过直接赋值的方式设置元素的属性
            elementInput.type = "checkbox";
            elementInput.name = "layers";
            elementInput.setAttribute('checked', 'checked');
            elementLi.appendChild(elementInput);
            //创建lable标签
            var elementLabel = document.createElement('label');
            elementLabel.className = 'layerLabel';
            elementLabel.textContent = layerList[i].attributes.layerName.value;
            elementLabel.style.paddingRight = "10px";
            elementLi.appendChild(elementLabel);
            //创建按钮标签
            var elementA = document.createElement('button');
            elementA.textContent = "介绍";
            elementA.onclick = LayerSelectModel.introduceBtnCallback(layerID);
            elementLi.appendChild(elementA);
            //注册点击事件
            elementLi.onclick = LayerSelectModel.changeLayer(layerID);
            //思考：这里如果这么写会怎么样?提示：这么写所有的点击事件共享了同一个词法环境。
            // elementLi.onclick = function () {
            //     this.children[0].checked ?
            //         document.getElementById(layerID).style.display = "" :
            //         document.getElementById(layerID).style.display = "none";
            // }
            elemetUl.appendChild(elementLi);
        }
        layerSelect.appendChild(elemetUl);
    }
};

/**
 * 介绍模块
 */
var IntroduceModel = {
    el: document.getElementById("introduceDiv"),
    elCon: document.getElementById("introduceCon"),
    closeBtn: document.getElementById("close"),
    init: function (obj) {
        //显示信息介绍div
        this.el.style.display = "block";
        //为关闭按钮注册事件
        this.closeBtn.onclick = function () {
            IntroduceModel.close();
        }
        this.elCon.innerHTML = this.loadData(obj);
    },
    //使用递归的方式将地图的介绍以树的形式展现在DIV中
    loadData: function (obj) {
        try {
            if (obj == null) {
                throw "待转换对象为null";
            }
            if (obj == undefined) {
                throw "待转换对象为未定义";
            }
            var startUL = "<ul>";
            var endUL = "</ul>";
            var str = "";
            //引用类型        
            if (Object.prototype.toString.call(obj) == '[object Array]') {
                for (var i = 0; i < obj.length; i++) {
                    str += "<li>数组" + i + ":" + this.loadData(obj[i]).toString() + "</li>";
                }
            } else if (Object.prototype.toString.call(obj) == '[object Object]') {
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) {
                        str += "<li><b style='color:red'>" + attr + ":</b>" + this.loadData(obj[attr]).toString() + "</li>";
                    }
                }
            } else {
                return obj;
            }
            return startUL + str + endUL;
        } catch (e) {
            throw e;
        }
    },
    close: function () {
        this.el.style.display = "none";
    }
};

//函数的链式调用
Map.init().LayerSelectModel.init();
