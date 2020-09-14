class Polygon {
    constructor(opts) {
        this.coordinate_ = opts.coordinate || "";
        this.style_ = opts.style || {};
    }
    drawTo = function (canvasLayer) {
        let canvas = canvasLayer.getSource();
        canvas.height = canvas.offsetHeight * 2;
        canvas.width = canvas.offsetWidth * 2;
        let ctx = canvas.getContext("2d");
        ctx.scale(2, 2);
        //初始化样式
        for (let key in this.style_) {
            if (this.style_.hasOwnProperty(key)) {
                ctx[key] = this.style_[key];
            }
        }
        ctx.beginPath();
        ctx.moveTo(this.coordinate_[0][0], this.coordinate_[0][1]);
        for (let i = 0; i < this.coordinate_.length; i++) {
            ctx.lineTo(this.coordinate_[i][0], this.coordinate_[i][1]);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        return this;
    }
}

export default Polygon;