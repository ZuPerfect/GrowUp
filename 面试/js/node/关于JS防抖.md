
# 防抖
这个词语刚开始看的时候，会让你一头雾水，防止页面抖动？？其实这里说的防抖指的是函数防抖

假如咱们在日常开发中会遇到在进行窗口的resize、scroll，输入框内容校验,搜索引擎输入框根据输入内容实时推荐等操作时，如果事件处理函数调用的频率无限制，会加重浏览器的负担，导致用户体验非常糟糕。此时我们可以采用debounce（防抖）的方式来减少调用频率，同时又不影响实际效果。 
## 需求
函数防抖（debounce）：当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时。持续触发scroll事件时，并不执行handle函数，当1000毫秒内没有触发scroll事件时，才会延时触发scroll事件。
## 几个应用场景
### 1、 **延迟执行**的防抖函数
在频繁的事件回调中做复杂的计算，比如在input输入框中输入内容的时候需要试试的校验输入内容的正确型，而且这个校验算法又是比较复杂耗时的，如果我们使用普通的写法会怎么样呢？我现在可以写一个常规的写法，看看效果。
``` html
<input id='inputEl' type="text">
<div id="output" style="width: 200px;height:100px;"></div>
<script>
    var num = 0;
    function changeCallback() {
        // 使用一个大循环模拟一个时间复杂高的计算
        for (let i = 0; i < 100000000; i++) {
            num += i;
        }
        document.getElementById('output').innerText = num;
    }
    document.getElementById('inputEl').oninput = changeCallback;
</script>
```
效果如下图所示

![未防抖](../img/未防抖.gif "未防抖")

如图所示，输入的时候明显卡顿，体验极差！

然后针对这个问题，我们写一个简单的防抖函数，我们要实现的防抖是：如果用户触发这个函数的时间小于我们设置的防抖间隔（wait）的时候，就不调用该函数，大于防抖间隔才调用。
## shut up！show me the code！
``` html
<input id='inputEl' type="text">
<div id="output" style="width: 200px;height:100px;"></div>
<script>
    var num = 0;
    function debounce(fn, wait) {
        // 使用闭包保留计时器，而不污染全局环境变量
        var timeouter = null;
        return function () {
            // 这里返回的函数是每次用户实际调用的防抖函数
            // 如果已经设定过定时器了就清空上一次的定时器
            // 开始一个新的定时器，延迟执行用户传入的方法
            if (timeouter) {
                clearTimeout(timeouter);
            }
            // 重新计时
            timeouter = setTimeout(fn, wait)
        }
    }

    function changeCallback() {
        // 使用一个大循环模拟一个时间复杂高的计算
        for (let i = 0; i < 100000000; i++) {
            num += i;
        }
        document.getElementById('output').innerText = num;
    }

    document.getElementById('inputEl').oninput = debounce(changeCallback, 500);
</script>
```
然后我们在来看看效果

![防抖](../img/防抖.gif "防抖")

体验上丝滑了很多。

### 2、**立即执行**的防抖函数
什么场景中会遇到使用立即执行的防抖函数呢？比如现在有一个按钮，该按钮的回调函数中需要处理一个复杂的算法。为了防止用户由于快速连续的点击造成频繁的调用这个复杂算法的函调函数，给浏览器增加不必要的压力，我们就需要防抖函数去减少回调函数的调用次数。但是用户点击按钮不能让用户点了再等一会在调用回调函数，所以该场景需要第一次点按钮的时候，立即执行回调函数。

``` html

```
