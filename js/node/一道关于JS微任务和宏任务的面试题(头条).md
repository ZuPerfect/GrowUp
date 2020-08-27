
# JS的微任务和宏任务的理解
## 浏览器是多线程的
## JS是单线程的=>原因是：浏览器只给了其一个线程来渲染
``` js
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}

async function async2() {
    console.log('async2');
}

console.log('script start');

setTimeout(() => {
    console.log('setTimeout');
}, 0);

async1();

new Promise(function (resolve) {
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise2');
});

console.log('script end');
```
## 执行顺序
主线程（主栈）代码先执行，主线城的代码执行完了之后才回去事件队列里面去找。事件队列中，如果有微任务，则先执行微任务。微任务全部执行完毕之后再执行宏任务。

1、主线程

2、微任务

3、宏任务
## 常见的微任务：
Promise 

async 

await

...
## 常见的宏任务：
定时器（setTimeout）

事件

...


