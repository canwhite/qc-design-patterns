/* 抽象工厂 */
/* 抽线工厂在很长一段时间被认为是Java/C++的专利

Java/C++的特征是，它们是强类型的静态语言
用这些语言创建对象时，我们要时刻关注类型之间的解耦；
以便该对象日后可以表现出来多态性

Javascript作为一种弱类型语言，它具有天然的多态性
好像压根不需要考虑类型耦合问题；
而目前的Javascript语法里，也确实不支持抽象类的直接实现，
我们只能通过模拟去还原抽象类；
因此有一种说法是，对于前端来说，抽象工厂就是鸡肋 */

/* 

//一个不简单的简单工厂引发的命案

function Factory(name, age, career) {
    let work
    switch(career) {
        case 'coder':
            work =  ['写代码','写系分', '修Bug'] 
            break
        case 'product manager':
            work = ['订会议室', '写PRD', '催更']
            break
        case 'boss':
            work = ['喝茶', '看报', '见客户']
        case 'xxx':
            // 其它工种的职责分配
            ...
            
    return new User(name, age, career, work)
}
 */
/* 

上面的代码看起来没有问题实际上都是问题
Boss的权限很明显和员工不同
有些操作只有管理层可以执行

怎么办，去修改Factory函数体，增加管理层逻辑？
这样导致的结果就是
首先：Factory会变得越来越大，逻辑复杂，容易出bug
其次：坑死队友
再次：坑死测试同学，每增加工种就要进行回归测试

然后都死完了，血案

那么悲剧的根源是什么呢？
没有遵守开放封闭原则！

那什么是开放封闭原则呢？
-----------------------
即对拓展开放，对修改封闭
-----------------------
软件实体(类、模块、函数)可以拓展，但是不可修改
这波操作错在我们不是拓展，而是疯狂的修改
 */

/* 然后我们开始抽象工厂模式


我们要建造一个山寨手机工厂，
只能手机的基本组成部分是OS和HardWare
如何实现量产呢？

我们现在并不知道下一个生产线具体要生产一台什么样的手机，
我只知道手机必须有两部分组成，
so:先约定手机的基本组成部分 */

class MobilePhoneFactory{
    //提供操作系统的接口
    createOS(){
        throw new Error("抽象工厂方法不允许直接调用，你需要将我重写");
    }

    //提供硬件的接口
    createHardWare(){
        throw new Error("抽象工厂方法不允许直接调用，你需要将我重写");
    }

}

/* 抽象类，不能new，不能调，只能继承重写，它是食物链的顶端 */

//具体工厂继承自抽象工厂
class FakeStarFactory extends MobilePhoneFactory{
    //重写方法
    createOS() {
        // 提供安卓系统实例
        return new AndroidOS()
    }
    createHardWare() {
        // 提供高通硬件实例
        return new QualcommHardWare()
    }
}
/* 以上为具体产品类，具体产品类不会孤立存在，
不同的具体产品类王汪具有共同的功能
因此我们用抽象产品类来抽离基础动作 */

//定义操作系统这类产品的抽象产品类
class OS{
    controlHardWare(){
        throw new Error("抽象方法不允许直接调用，你需要将我重写");
    }
}

//定义具体产品
class AndroidOS extends OS{
    controlHardWare(){
        console.log("我用安卓的方式去操作硬件");
    }
}

class AppleOS extends OS{
    
    controlHardWare(){
        console.log("我会用ios的方式去操作硬件");
    }
}


//硬件类产品同样
// 定义手机硬件这类产品的抽象产品类
class HardWare {
    // 手机硬件的共性方法，这里提取了“根据命令运转”这个共性
    operateByOrder() {
        throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
    }
}

// 定义具体硬件的具体产品类
class QualcommHardWare extends HardWare {
    operateByOrder() {
        console.log('我会用高通的方式去运转')
    }
}

class MiWare extends HardWare {
    operateByOrder() {
        console.log('我会用小米的方式去运转')
    }
}


//这是我的手机
const myPhone = new FakeStarFactory();
//让它拥有操作系统
const myOS = myPhone.createOS();
//让它拥有硬件
const myHardWare = myPhone.createHardWare();
//启动操作系统
myOS.controlHardWare();
//唤醒硬件
myHardWare.operateByOrder();


//如果有天FakeStar过气了，我们需要一款新机
//不需要对抽象工厂MobilePhoneFactory做任何修改，只需要拓展它的种类

/* class newStarFactory extends MobilePhoneFactory {
    createOS() {
        // 操作系统实现代码
    }
    createHardWare() {
        // 硬件实现代码
    }
} */


/* 简单工厂 VS 抽象工厂
共同点：都尝试去分离一个系统中变与不变的部分
不同点：场景的复杂度

总结就是通过接口去抽离共性，实现拓展性

触发特征：这些复杂的类不仅分出门派，还划分等级；

对"共性"作更特别的处理，使用抽象类去降低拓展成本；
于是有了这四个关键角色：
----------------------------------------------------------------
——抽象工厂（抽象类，它不能被用于生成具体实例）：用于声明最终目标产品的共性。
——具体工厂（用于生成产品族里的一个具体的产品）： 
继承自抽象工厂、实现了抽象工厂里声明的那些方法，用于创建具体的产品的类。
-----------------------------------------------------------------
——抽象产品（抽象类，它不能被用于生成具体实例）： 
上面我们看到，具体工厂里实现的接口，会依赖一些类，
这些类对应到各种各样的具体的细粒度产品（比如操作系统、硬件等）。
——具体产品（用于生成产品族里的一个具体的产品所依赖的更细粒度的产品）： 
比如我们上文中具体的一种操作系统、或具体的一种硬件等。 */

