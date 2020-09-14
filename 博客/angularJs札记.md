<!--
 * @Author: zhupengfei6623
 * @Date: 2020-09-14 11:23:25
 * @Description: file content
-->

## 报错信息
```js
Error: [$rootScope:inprog]http://errors.angularjs.org/1.5.8/$rootScope/inprog?p0=%24apply
```
## 报错原因
如果使用以下代码提交变量更改。
``` js
$scope.$apply();
```
AngularJS报如上错误信息时，代表angular说它已经在处理脏数据了，你别老催他。实际上是起冲突了。
## 解决方案
使用如下代码异步提交就ok。
``` js
$scope.$applyAsync();
```