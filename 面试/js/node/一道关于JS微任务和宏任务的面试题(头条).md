
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
## JS任务先执行主栈里面的任务，主栈里面的任务执行完毕之后再去事件队列里面去找，在事件队列中，先从微任务中找，将找到的任务继续压入主栈中执行，执行完毕之后再去事件队列的微任务中找，然后压栈执行，直到微任务队列中为空，然后去宏任务队列中去找，压入主栈执行，直到所有的任务执行结束。该流程为***事件循环（event loop）***
![微任务宏任务图解](../img/微任务宏任务图解.png "微任务宏任务图解")
