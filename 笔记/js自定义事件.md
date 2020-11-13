
## 背景
前几天在编写一个需求的时候，遇到了这么一个需求：通过鼠标点击事件自动触发项目中已有的键盘监听事件，刚开始自己一度以为没有办法实现，但是问度娘的过程中，偶然间发现，是不是可以使用dispatchEvent方法派发事件尝试一下呢？o(*￣▽￣*)ブ。行不行光靠想是不行的，立马打开VSCode，写了一段测试代码，居然成功触发了╰(*°▽°*)╯，下面就是我的测试代码，大家共同学习。
## 测试代码
一、首先写一个div标签，监听点击事件
``` html
    <div id="id" style="width:100px; height: 200px;background-color: #b1c2c2" onclick="clickCallback()">
        点击我来触发按键事件
    </div>
```
二、然后添加键盘事件监听
``` js
    //添加键盘事件监听
    document.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
            case 32:
                alert("空格键");
                break;
            case 1000000:
                alert("通过点击触发的按键事件");
                break;
            default:
                alert(`任意键:${event.keyCode}`);
                break;
        }
    }, false);
```
三、在div标签的点击事件的回调函数里面创建自定义事件，然后派发该事件
``` js
    // 点击事件
    var clickCallback = function () {
        var evt = document.createEvent('UIEvents');
        evt.keyCode = 1000000;
        evt.initEvent('keydown', true, true);
        document.body.dispatchEvent(evt);
    }
```
## 总结
纸上得来终觉浅，绝知此事要躬行。
