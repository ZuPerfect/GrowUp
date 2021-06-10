<!--
 * @Author: zhupengfei6623
 * @Date: 2020-11-25 10:45:41
 * @Description: file content
-->
# kinks
## 接口介绍
计算并返回linestring , multi-linestring , multi-polygon , or polygon所有的自交点。
## 返回值（FeatureCollection < Point >）
所有的自交点
## 示例
``` js
var poly = turf.polygon([[
  [-12.034835, 8.901183],
  [-12.060413, 8.899826],
  [-12.03638, 8.873199],
  [-12.059383, 8.871418],
  [-12.034835, 8.901183]
]]);

var kinks = turf.kinks(poly);
```
## 官网地址
[http://turfjs.org/docs/#kinks](http://turfjs.org/docs/#kinks)
