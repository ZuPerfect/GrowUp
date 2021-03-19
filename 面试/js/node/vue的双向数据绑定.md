<!--
 * @Author: zhupengfei6623
 * @Date: 2020-09-14 10:49:24
 * @Description: file content
-->
在了解VUE数据双向绑定之前，必须得先知道Object.defineProperty()方法，该方法便是VUE双向数据绑定的核心！
# Object.defineProperty()
# createDocumentFragment()
## 简单思路
1、重写Object.defineProperty()方法的get，set方法

2、set的时候给当前属性添加订阅，也就是使用一个数组记录下当前发生变化了的属性

3、get的时候，取出当前订阅的属性值，进行发布，也就是更新网页上面显示的内容

## vue3种使用proxy实现的数据双向绑定，那Proxy 与 Object.defineProperty有什么区别呢？
Object.defineProperty虽然可以实现数据的双向绑定，但是它是有缺陷的
1、只能对属性进行数据劫持，所以需要深度遍历整个对象

2、对于数组，不能监听到数据的变化