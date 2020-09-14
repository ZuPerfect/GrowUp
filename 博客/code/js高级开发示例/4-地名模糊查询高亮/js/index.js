/**********************地名模糊查询高亮*************************/
/**实现要求：
 * 1、在前端加载一张静态图片作为底图；
 * 2、放一个input输入框和一个【搜索】按钮
 * 3、在输入框中输入任意关键字，通过模糊匹配，在输入框下方弹出可能的结果选项，在提示框中选择正确的选项，自动填充至
 *    输入框
 * 4、点击【搜索】按钮，根据搜索到的大学，在地图上绘制出大学校区的轮廓
 */

/**包含知识点：
 * 1、正则表达式匹配
 * 2、canvas绘图
 */

/**
 * 正则表达式|canvas
 * 一、模糊匹配：
 * 1、使用一张具有地标信息的静态图片作为底图
 * 2、在前端添加一个文本输入框，输入框后面添加搜索按钮；
 * 3、属性模糊查询（正则表达式）高亮显示（canvas绘图）
 * 二、数据：
 * 1、制作一个json文件，里面包含静态图片上面包含的地名，轮廓坐标，至少5个
 * 百度地图：中南民族大学、华中科技大学、武汉工程大学、中国地质大学、武汉大学
 */

//绘制模块
var DrawModel = {
    canvas: document.getElementById("mapCanvas"),
    init: function () {
        //这里乘以2的目的是为了解决图形模糊的问题
        this.canvas.height = this.canvas.offsetHeight * 2;
        this.canvas.width = this.canvas.offsetWidth * 2;
    },
    drawPolygon: function (coordinate, style) {
        //初始化实际高宽
        this.init();
        // var ctx = document.getElementById("mapCanvas").getContext("2d");
        var ctx = this.canvas.getContext("2d");
        ctx.scale(2, 2);
        //初始化样式
        for (var key in style) {
            if (style.hasOwnProperty(key)) {
                ctx[key] = style[key];
            }
        }
        ctx.beginPath();
        ctx.moveTo(coordinate[0][0], coordinate[0][1]);
        for (var i = 0; i < coordinate.length; i++) {
            ctx.lineTo(coordinate[i][0], coordinate[i][1]);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}
//搜索模块
var SearchModel = {
    searchInput: document.getElementById("searchInput"),
    searchButton: document.getElementById("searchButton"),
    buttonEvents: [{
        type: "onclick",
        callback: function () {
            SearchModel.ajax("json/data.json", function (data) {
                //根据输入的大学名称查询
                var name = SearchModel.searchInput.value;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].name == name) {
                        //绘制多边形
                        DrawModel.drawPolygon(data[i].coordinate, {
                            fillStyle: "rgba(255,0,0,0.5)",
                            strokeStyle: "#3385FF",
                            lineWidth: 3
                        });
                        break;
                    }
                }
            })
        }
    }],
    inputEvents: [{
        type: "oninput",
        callback: function () {
            SearchModel.ajax("json/data.json", function (data) {
                var name = SearchModel.searchInput.value;
                var tips = [];
                var regStr = "";
                if (name != "") {
                    //只要任意一个字或者拼音匹配上就提示
                    regStr = "[" + name + "]";
                    var reg = new RegExp(regStr);
                    for (var i = 0; i < data.length; i++) {
                        if (reg.test(data[i].name) || reg.test(data[i].spell)) {
                            tips.push(data[i].name);
                        }
                    }
                }
                TipNote.tips = tips;
                TipNote.show();
            })
        }
    }],
    init: function () {
        //初始化输入框事件
        for (var i = 0; i < this.inputEvents.length; i++) {
            this.searchInput[this.inputEvents[i].type] = this.inputEvents[i].callback;
        }
        //初始化按钮事件
        for (var j = 0; j < this.buttonEvents.length; j++) {
            this.searchButton[this.buttonEvents[j].type] = this.buttonEvents[j].callback;
        }
    },
    ajax: function (url, success, error) {
        $.ajax({
            type: "get",
            url: url,
            success: success,
            error: error || function () { }
        });
    }
}
//下拉提示框模块
var TipNote = {
    el: document.createElement("div"),
    contain: document.getElementById("searchDiv"),
    tips: [],
    init: function () {
        //清空提示框
        this.el.innerHTML = "";
        var ulElement = document.createElement("ul");
        ulElement.id = "tipUl";
        //设置id，该div样式设置参加样式表
        this.el.id = "tipDiv";
        for (var i = 0; i < this.tips.length; i++) {
            var liElement = document.createElement("li");
            liElement.textContent = this.tips[i];
            liElement.onclick = function () {
                //关闭
                TipNote.close();
                //将选中的值放入输入框
                SearchModel.searchInput.value = this.textContent;
            }
            ulElement.appendChild(liElement);
        }
        this.el.appendChild(ulElement);
        //提示：appendChild如果文档树中已经存在了 newchild，它将从文档树中删除，然后重新插入它的新位置。
        this.contain.appendChild(this.el);
        return this;
    },
    show: function () {
        this.init();
    },
    close: function () {
        this.contain.removeChild(this.el);
    }
}

//初始化搜索模块
SearchModel.init();


//采集点位
// var str = "";
// document.getElementById("mapCanvas").onclick = function (e) {
//     str += "[" + e.layerX + "," + e.layerY + "],"
//     console.log(str);
// }
