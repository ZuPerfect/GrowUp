<!--
 * @Author: zhupengfei6623
 * @Date: 2020-09-14 11:23:25
 * @Description: file content
-->

## 用途
单独使用break语句的作用是立即退出<font color=red>**最内层**</font>的循环或switch语句，它的语法如下:
```js
break;
```
其他用途习以为常，此处就不再记录，主要记录一下其在嵌套循环中的使用。
## 用例
从上面的用途中我们可以看到，在嵌套循环中，如果break语句单独使用的话，它只能终止最内层的循环。那如果我们需要在一个嵌套循环中找一个数组中某一个元素，找到了之后就立即终止循环，如下所示：
```js
for(let i=0;i<a.length;i++>){
    for(let j;j<b.length;j++){
        if(a[i]===b[j]){ // 如果找到，便不再继续，结束循环
            break;
        }
    }
}
```
实际上，上面的代码中break只能终止最内层的循环，外层循环还在继续执行，那如果想终止我们想终止的循环，那就要用到break语句的另一个用法。
## 终止外层循环
JavaScript中允许break关键字后面跟随一个<font color=blue>语句标签</font>(只有标识符，没有符号):
```js
break labelname;
```
上面的代码可以改写成这样:
```js
outer:for(let i=0;i<a.length;i++>){
    for(let j;j<b.length;j++){
        if(a[i]===b[j]){ // 如果找到，便不再继续，结束循环
            break outer; // 终止指定的循环
        }
    }
}
```
## 注意
不管break语句带不带标签，它的控制权都无法超越函数的边界，比如，对于一个带标签的函数语句来说，不能从函数内部通过这个标签来跳转到函数的外部！
## 尾
此处之作备忘之用，详细参考《JavaScript权威指南》p-107.




