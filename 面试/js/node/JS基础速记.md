<!--
 * @Author: zhupengfei6623
 * @Date: 2020-11-06 15:16:39
 * @Description: file content
-->
# 🐸内置类型
## 基本类型
undefined、null、number、string、boolean、symbol
## 对象类型
对象（Object）是引用类型，在使用过程中会遇到浅拷贝和深拷贝的问题。
# 🐸typeof
针对基础类型，除了null，typeof都能正确判断出数据类型
``` js
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof b // b 没有声明，但是还会显示 undefined

typeof null; // object,js长期存留下来的一个bug
```
针对对象类型，除了函数，typeof都会显示object
``` js
typeof [] // object
typeof {} // object
typeof console.log // function
```
## 小技巧
判断一个变量是不是undefined，可以用一下代码
```js
let a;
a === void 0

// 我们也用可以用下面的这个种方法判断
a === undefined
// 但是undefined不是保留字，在低版本的浏览器中可以被赋值
let undefined =1
```
# 🐸类型转换
## 转Boolean
在条件判断时，除了undefined、null、''、0、-0、false、NaN，其他所有值都转成true。

