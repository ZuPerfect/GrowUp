<!--
 * @Author: zhupengfei6623
 * @Date: 2020-09-14 11:23:25
 * @Description: file content
-->

## ES5
```js
// 父类
function Super(){
    this.x=1;
}
Super.prototype.getX=function(){
    return x;
}
// 子类
function Sub(){
    Super.call(this) // 初始化父类的属性
}
Sub.prototype=Object.create(Super.prototype);
Sub.prototype.constructor=Sub;
```




