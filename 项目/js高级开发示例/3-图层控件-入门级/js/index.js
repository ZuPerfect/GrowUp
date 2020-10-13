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

var zoom = 0.8;
var mapImg = document.getElementById("mapImg");
var mapDiv = document.getElementById("mapDiv");
//获取图层选择控件元素
var layerSelect = document.getElementById("layerSelect");
//隐藏地图介绍对话框
document.getElementById("introduceDiv").style.display = "none";

//初始化图层选择控件
; (function () {
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
        elementA.onclick = introduceBtnCallback(layerID);
        elementLi.appendChild(elementA);
        //注册点击事件
        elementLi.onclick = changeLayer(layerID);
        //思考：这里如果这么写会怎么样?提示：这么写所有的点击事件共享了同一个词法环境。
        // elementLi.onclick = function () {
        //     this.children[0].checked ?
        //         document.getElementById(layerID).style.display = "" :
        //         document.getElementById(layerID).style.display = "none";
        // }
        elemetUl.appendChild(elementLi);
    }
    layerSelect.appendChild(elemetUl);
})();

/*
*模拟地图拖动
*/
mapImg.onmousedown = function (e) {
    //获取事件对象
    var mapEvent = e;
    //阻止浏览器的默认事件
    mapEvent.preventDefault();
    //获取x，y方向鼠标位置与图片偏移的之间的差值，为了保证在拖动的时候图片不回到初始的位置
    var disx = mapEvent.clientX - mapImg.offsetLeft;
    var disy = mapEvent.clientY - mapImg.offsetTop;
    //注册鼠标移动事件
    mapDiv.onmousemove = function (e) {
        //获取事件对象
        mapEvent = e;
        //阻止浏览器的默认事件
        mapEvent.preventDefault();
        //计算图片的偏移值
        var x = mapEvent.clientX - disx;
        var y = mapEvent.clientY - disy;
        mapImg.style.left = x + "px";
        mapImg.style.top = y + "px";
    }
    // 鼠标弹起后停止移动
    mapDiv.onmouseup = function () {
        mapDiv.onmousemove = null;
        mapDiv.onmouseup = null;
    }
}
/**
 * 鼠标滚轮事件回调函数
 * @param {*} e 滚动事件对象
 */
var scrollFunc = function (e) {
    e = e || window.event;    
    if (e.wheelDelta) { /*IE|Opera|Chrome*/
        (e.wheelDelta > 0) && (mapImg.style.transform = "scale(" + (zoom += 0.2) + ")");
        (e.wheelDelta < 0) && (zoom > 0) && (mapImg.style.transform = "scale(" + (zoom -= 0.2) + ")");

    } else if (e.detail) { /*Firefox*/
        (e.detail > 0) && (mapImg.style.transform = "scale(" + (zoom += 0.2) + ")");
        (e.detail < 0) && (zoom > 0) && (mapImg.style.transform = "scale(" + (zoom -= 0.2) + ")");
    }
}
//Firefox
document.addEventListener && document.addEventListener('DOMMouseScroll', scrollFunc, false);
//IE|Opera|Chrome
window.onmousewheel = document.onmousewheel = scrollFunc;

/**
 * 使用闭包的方式，为每一个回调函数创建一个词法环境
 * @param {String} layerID 图层ID
 */
function changeLayer(layerID) {
    return function () {
        //控制图层显示隐藏            
        this.children[0].checked ?
            document.getElementById(layerID).style.display = "" :
            document.getElementById(layerID).style.display = "none"
    }
}

/**
 * 图层介绍界面初始化回调函数
 * @param {String} layerID 图层ID
 */
function introduceBtnCallback(layerID) {
    return function () {
        $.ajax({
            url: "json/mapIntroduce.json",
            type: "get",
            dataType: "json",
            success: function (data) {
                alert("成功");
                document.getElementById("introduceDiv").style.display = "";
                for (var i = 0; i < data.length; i++) {
                    if (layerID == data[i].layerID) {
                        try {
                            //使用递归的方式将地图的介绍以树的形式展现在DIV中
                            var ul = initIntroduce(data[i]);
                            //var ul = initIntroduce(null);
                            //var ul = initIntroduce(未定义);
                            document.getElementById("introduceCon").innerHTML = ul;
                            break;
                        } catch (e) {
                            document.getElementById("introduceCon").innerHTML = e;
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
}

/**
 * 使用递归的方式将介绍信息JSON转换成HTML显示出来
 * @param {Object} obj 待遍历的对象
 */
function initIntroduce(obj) {
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
                str += "<li>数组" + i + ":" + initIntroduce(obj[i]).toString() + "</li>";
            }
        } else if (Object.prototype.toString.call(obj) == '[object Object]') {
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) {
                    str += "<li><b style='color:red'>" + attr + ":</b>" + initIntroduce(obj[attr]).toString() + "</li>";
                }
            }
        } else {
            return obj;
        }
        return startUL + str + endUL;
    } catch (e) {
        throw e;
    }
}

/**
 * 关闭介绍对话框
 * @param {*} e 滚动事件对象
 */
function closeIntroduce() {
    document.getElementById("introduceDiv").style.display = "none";
}