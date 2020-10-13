//创建地图容器
var map = new lx.Map({ target: "mapDiv" });
//创建图层并添加至地图容器
var layer = new lx.ImageLayer({ url: "img/百度地图.png" }).addTo(map);
//创建一个canvas图层并添加到地图容器
var canvasLayer = new lx.CanvasLayer({}).addTo(map);
//创建提示框控件并添加到地图容器
var TipNote = new lx.TipNoteControl({}).addTo(map);
//创建输入框控件并添加到地图容器并注册事件
var input = new lx.InputControl({
    style: {
        width: "230px",
        height: "25px",
        position: "absolute",
        top: "10px",
        left: "10px"
    }
}).addTo(map).on("oninput", function () {
    lx.ajax("json/data.json", function (data) {
        var name = input.getValue();
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
        //判断其map属性是不是为null，为null说明该控件没有添加在map中，否则以在map中存在
        (!TipNote.getMap()) && (TipNote.addTo(map));
        TipNote.setTips(tips).init(input);
    })
});
//创建一个按钮控件并添加到地图容器并注册事件
new lx.ButtonControl({
    text: "搜索",
    style: {
        width: "72px",
        height: "32px",
        color: "white",
        backgroundColor: "#3385FF",
        position: "absolute",
        top: "9px",
        left: "250px"
    }
}).addTo(map).on("onclick", function () {
    lx.ajax("json/data.json", function (data) {
        var name = input.getValue();
        for (var i = 0; i < data.length; i++) {
            if (data[i].name == name) {
                var polygon = new lx.Polygon({
                    coordinate: data[i].coordinate,
                    style: {
                        fillStyle: "rgba(255,0,0,0.5)",
                        strokeStyle: "#3385FF",
                        lineWidth: 3
                    }
                });
                polygon.drawTo(canvasLayer);
                break;
            }
        }
    })
});



