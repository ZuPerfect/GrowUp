# 面试回答
## 问：你给我说说css中的盒子模型吧？
**答**：**标准盒子模型（最常用）**和**IE盒子模型(怪异盒子模型)**以及css3中的**flex弹性伸缩盒子模型**
### 标准盒子模型（box-sizing:content-box）：
该盒子模型中，我们设置的width和height的大小表示的是内容（content）的宽高，不代表盒子的宽和高。一个盒子的大小宽高为：（width或者height）+padding+border的大小，如果需要考虑盒子在页面中的位置，还需要结合margin。但是在我们的项目当中，使用该盒子模型的话存在这么一个问题：那就是在设置了padding和border之后，盒子的大小会变大，调样式不是很方便。该盒子模型如下图所示：
![标准盒子模型](../img/标准盒子模型图.png "标准盒子模型图")
### IE盒子模型（怪异盒子模型）（box-sizing:border-box）：
该盒子模型中，我们设置的width和height的大小直接就表示的是盒子的大小。如果我们设置好了盒子的大小，然后在设置padding和border，它会缩放盒子的内容才固定盒子的大小不会变化，这样我写样式的时候就会比较方便，不需要来回计算盒子的大小，所以我现在在正式的项目当中，大部分都在应用IE盒子模型，包括我看了bootstrap，elementUI以及各大UI组件，它的源码里面，他们的一些公共样式里面，大部分也采用的是这种盒子模型，所以我认为这是我们开发中的一种规范，或者说是一种方式。该盒子模型如下图所示：
![IE盒子模型](../img/IE盒子模型图.png "IE盒子模型图")
### flex盒子模型：
参考学习[阮一峰的flex布局教程](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)，简单来说，使用盒子模型只需要给他的父容器的display的样式为flex（display:flex），这个盒子就会变成一个弹性伸缩盒子，这个盒子里面有两个轴，一个是main axis（主轴），还有一个是cross axis（交叉轴），主轴就相当于我们的X轴，交叉轴就相当于我们的Y轴，而我们这个盒子当中的所有的子元素（flex item），默认情况下都是靠着交叉轴的上面和主轴的左边排列的，但是我们可以用过justify-content和align-items控制我们这些所有项在主轴和交叉轴上面的排列方式。该盒子模型如下图所示：
![flex盒子模型图](../img/flex盒子模型图.png "flex盒子模型图")


扩展：html元素分类
![html元素分类](../img/html元素分类.png "html元素分类")
参考资料

[html元素可分为三大类：块元素、内联元素、可变元素](https://www.cnblogs.com/21-forever/p/10849721.html)

[HTML元素分类](https://www.jianshu.com/p/c663e4729cd7)


