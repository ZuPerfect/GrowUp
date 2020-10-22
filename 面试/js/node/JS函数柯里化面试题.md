```js
// 实现一个add方法，使计算结果能够满足如下预期：
add(1)(2)(3) = 6;
add(1, 2, 3)(4) = 10;
add(1)(2)(3)(4)(5) = 15;
```
## ✔ 实现代码</>
``` js
function add() {
    // 第一次执行的时候定义一个专门用来存储所有的参数
    // var _args = Array.prototype.slice.call(arguments);
    var _args = [...arguments];

    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var _adder = function () {
        _args.push(...arguments);
        return _adder;
    }

    // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的返回值
     _adder.toString = function () {
        return _args.reduce((a, b) => a + b);
    }
    return _adder;
}
```

