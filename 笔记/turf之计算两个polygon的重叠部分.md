<!--
 * @Author: zhupengfei6623
 * @Date: 2020-11-25 10:45:41
 * @Description: file content
-->
# intersect
## 接口介绍
计算两个多边形的交点，如果它们公用了一条边，那么返回这个边线，如果没有交点，则返回null。
## 返回值（Feature|null）
如果相交的是点，则返回（Point或者MultiPoint）

如果相交的是边，则返回（LineString或者MultiLineString）

如果相交的是区域，则返回（Polygon或者MultiPolygon）

如果没有相交，则返回null

## 示例
``` js
var poly1 = turf.polygon([[
  [-122.801742, 45.48565],
  [-122.801742, 45.60491],
  [-122.584762, 45.60491],
  [-122.584762, 45.48565],
  [-122.801742, 45.48565]
]]);

var poly2 = turf.polygon([[
  [-122.520217, 45.535693],
  [-122.64038, 45.553967],
  [-122.720031, 45.526554],
  [-122.669906, 45.507309],
  [-122.723464, 45.446643],
  [-122.532577, 45.408574],
  [-122.487258, 45.477466],
  [-122.520217, 45.535693]
]]);

var intersection = turf.intersect(poly1, poly2);
```
## 官网地址
[http://turfjs.org/docs/#intersect](http://turfjs.org/docs/#intersect)

## bug及解决方案
目前turf的该方法计算1米左右精度的计算的时候，存在计算没有计算结果的bug，可以用jsts的intersection方法计算，代码如下：
``` js
const geometry1 = {
  type:'Polygon',
  coordinates:[[
  [-122.801742, 45.48565],
  [-122.801742, 45.60491],
  [-122.584762, 45.60491],
  [-122.584762, 45.48565],
  [-122.801742, 45.48565]
]]
};
const geometry2 = {
  type:'Polygon',
  coordinates:[[
  [-122.520217, 45.535693],
  [-122.64038, 45.553967],
  [-122.720031, 45.526554],
  [-122.669906, 45.507309],
  [-122.723464, 45.446643],
  [-122.532577, 45.408574],
  [-122.487258, 45.477466],
  [-122.520217, 45.535693]
]]
};
const precisionModel = new jsts.geom.PrecisionModel(1e12);
const factory = new jsts.geom.GeometryFactory(precisionModel);
const jstsReader=new jsts.io.GeoJSONReader(factory);
const jstsGeometry1 = jstsReader.read(geometry1);
const jstsGeometry2 = jstsReader.read(geometry2);
var intersection = jstsReader.write(jstsGeometry1.intersection(jstsGeometry2));
```
