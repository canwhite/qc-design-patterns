/*
在一个方法中定义了算法的骨架，
而将一些步骤延迟在子类中。
模板方法使得子类可以在不改变算法结构的情况下
重新定义算法中的某些步骤
-------------------------------------------
在模板方法模式中，子类中相同的行为被移动到了父类中，
而将不同的部分留待子类来实现。 而且子类可以重写一些方法
*/




/* 由于javascript没有类型检查，
我们需要让子类必须实现brew, pourInup和addCondiments，
因此这里通过抛出异常来提醒编写者。 */
var Beverage = function() { };
//烧水是公用方法
Beverage.prototype.boilWater = function() {
    console.log('煮沸水');
};

//一下三个为空方法，需要子类实现
Beverage.prototype.brew = function(){
    throw new Error( '子类必须重写 brew 方法' );
}; 
Beverage.prototype.pourInCup = function(){
    throw new Error( '子类必须重写 pourInCup 方法' );
}; 
Beverage.prototype.addCondiments = function(){
    throw new Error( '子类必须重写 addCondiments 方法' );
};


/*钩子函数：
平时遇到正常的，喝咖啡的都是上面的顺序，
但是如果有些人不喜欢加调料，那么上面的步骤又不符合情况了，
此时可以通过钩子函数来进行解决。
钩子函数通过用户返回的结果来决定接下来的步骤。
究竟要不要钩子由子类自己决定。
*/

// 钩子函数,自己决定要不要加调料
Beverage.prototype.customerWantsCondiments = function(){
    return true;
}; 

/*模板方法：初始化算法顺序
它内部封装了子类的算法框架，
知道子类以何种顺寻执行哪些方法*/
Beverage.prototype.init = function() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    // 如果钩子函数返回true,则添加调料
    // 钩子函数又增加了灵活性
    if (this.customerWantsCondiments()) {
        this.addCondiments();
    }   
}

/*
创建Coffee子类
接下来要重写抽象父类中的一些方法。只要把水煮沸这个行为可以直接使用父类。
*/
var Coffee = function() { };
Coffee.prototype = new Beverage();//将构造函数指向原型，完成继承

Coffee.prototype.brew = function(){
    console.log( '用沸水冲泡咖啡' );
};
Coffee.prototype.pourInCup = function(){
    console.log( '把咖啡倒进杯子' );
};
Coffee.prototype.addCondiments = function(){
    console.log( '加糖和牛奶' );
}; 
// 重写钩子函数
Coffee.prototype.customerWantsCondiments = function(){
    console.log("---子类实现了，父类init就会判断")
    /* return window.confirm('请问需要调料吗？'); */
    return false;
};

// 当调用init方法时，会找到父类的init方法进行调用。
var coffee = new Coffee();
coffee.init();
//因为自己定义了custom为false，初始化的时候就不会加糖和奶了

/*
创建Tea子类
*/

var Tea = function() { };
Tea.prototype = new Beverage();//将构造函数指向原型，完成继承
Tea.prototype.brew = function(){
    console.log( '用沸水浸泡茶叶' );
};
Tea.prototype.pourInCup = function(){
    console.log( '把茶倒进杯子' );
};
Tea.prototype.addCondiments = function(){
    console.log( '加柠檬' );
}; 

var tea = new Tea();
tea.init();





