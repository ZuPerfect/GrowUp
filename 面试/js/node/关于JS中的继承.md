
在JavaScript中，类的实现是基于其原型继承机制的。如果两个实例都从同一个原型对象上继承了属性，我们说它们是同一个类的实例。
# ES5中的继承
``` js
// 创建父类
function Person(name){
    this.name = name;
    this.className = 'Person';
}
// 为父类的原型上挂方法
Person.prototype.getName=function(){
    return this.name;
}


// 创建一个子类
function Man(name){

}

// 下面如何让类Man继承类Person呢？？
// 1、首先就是在Man的构造函数里面初始化Person类的属性
function Man(name){
    // 将父类的属性绑定到Man的this上，并且赋值
    Person.apply(this,arguments);
    // 这里需要注意的是：Person.apply(this,arguments);这句代码一定要写在第一行，避免覆盖Man自己的属性
    this.name=name;
}

// 2、绑定Person的原型
Man.prototype = Object.create(Person.prototype);
// 将Person类的原型对象绑在Man.prototype的原型对象上，为什么不直接这么写
// Man = Object.create(Person.prototype);
// 像上面那么写的话，如果Man的原型对象上有自己的其他方法或者属性，那就会被覆盖掉


// 3、维护Man原型上的constructor属性
Man.prototype.constructor = Man;
```

# ES6中的继承
es6引入了class、extends、super、static(部分为ES2016标准)
``` js
// 定义父类
class Person {
    constructor(opt){
        this.name = opt.name;
        this.age = opt.age;
    }
    getName(){
        return this.name;
    }
    // 静态方法，也可被继承
    static getAge(){
        return this.age;
    }
}

// 定义子类
class Man extends Person {
    constructor(opt){
        // 如果有super，需要放在第一句执行
        super(opt);
        this.job = 'JS'
    }
}
```
