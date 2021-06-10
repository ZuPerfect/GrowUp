<!--
 * @Author: zhupengfei6623
 * @Date: 2021-06-10 17:01:50
 * @Description: file content
-->
## 背景
已知一个中心点（Cartesian3），长（100米），宽（70米），计算矩形的顶点坐标
## 初次尝试
直接使用以下方式计算
``` js
const rectWidth = 100;

const rectHeight = 70;

const minX = center.x - rectWidth / 2;

const minY = center.y - rectHeight / 2;

const maxX = center.x + rectWidth / 2;

const maxY = center.y + rectHeight / 2;
```
结果结算出结果误差太大，导致矩形变形严重，完全不符合要求
## 使用局部坐标系
``` js
const rectWidth = 100;

const rectHeight = 70;

const origin = {
  x: 0,
  y: 0
};

const minX = origin.x - this.rectWidth / 2;

const minY = origin.y - this.rectHeight / 2;

const maxX = origin.x + this.rectWidth / 2;

const maxY = origin.y + this.rectHeight / 2;

// 使用eastNorthUpToFixedFrame方法计算出已指定点（center）为原点的局部参考系转换矩阵
let localMatrix4 = this.cesium.Transforms.eastNorthUpToFixedFrame(center);

// 然后使用multiplyByPoint计算相对于原点的其他坐标的实际笛卡尔坐标
const westSouth = this.cesium.Matrix4.multiplyByPoint(localMatrix4, new this.cesium.Cartesian3(minX, minY, 0), new this.cesium.Cartesian3());

const westNorth = this.cesium.Matrix4.multiplyByPoint(localMatrix4, new this.cesium.Cartesian3(minX, maxY, 0), new this.cesium.Cartesian3());

const eastSouth = this.cesium.Matrix4.multiplyByPoint(localMatrix4, new this.cesium.Cartesian3(maxX, minY, 0), new this.cesium.Cartesian3());

const eastNorth = this.cesium.Matrix4.multiplyByPoint(localMatrix4, new this.cesium.Cartesian3(maxX, maxY, 0), new this.cesium.Cartesian3());
```