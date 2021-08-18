/***********************************************
桥接模式和适配器模式的区别
---共同点---：
都是为了让两个东西配合工作
---不同点---：
使用场景不同
适配器：已有两个接口，让它们相融
桥接模式：如果什么还没有，我们可以用桥接模式设计，
================================================
将抽象部分与它的实现部分分离，使它们都可以独立地变化。
================================================
感觉桥接和关系数据库的多表、外键好像

************************************************/



/*so:========================================================

假设某个汽车厂商生产三种品牌的汽车：Big、Tiny和Boss，
每种品牌又可以选择燃油、纯电和混合动力。
如果用传统的继承来表示各个最终车型，一共有3个抽象类加9个最终子类：

首先把Car按品牌进行子类化，当然中间经过一层“修正”类
每个品牌选择什么发动机，不再使用子类扩充，
而是通过一个抽象的“修正”类，以组合的形式引入。
这个抽线的“修正”类就是我们所说的桥
       ┌───────────┐
       │    Car    │
       └───────────┘
             ▲
             │
       ┌───────────┐       ┌─────────┐
       │RefinedCar │ ─ ─ ─>│ Engine  │
       └───────────┘       └─────────┘
             ▲                  ▲
    ┌────────┼────────┐         │ ┌──────────────┐
    │        │        │         ├─│  FuelEngine  │
┌───────┐┌───────┐┌───────┐     │ └──────────────┘
│BigCar ││TinyCar││BossCar│     │ ┌──────────────┐
└───────┘└───────┘└───────┘     ├─│ElectricEngine│
                                │ └──────────────┘
                                │ ┌──────────────┐
                                └─│ HybridEngine │
                                  └──────────────┘

==========================================================*/
//Car抽象类
class Car {
    constructor(engine){
        this.engine = engine;
    }
    //驾驶
    drive(){
        throw new Error("drive方法需要实现");
    }
}
//Engine抽线类
class Engine{
    //启动
    start(){
        throw new Error("start方法需要重新实现");
    }
}

//实现Car的修正类,用修正类和引擎做连接
class RefinedCar extends Car{
    constructor(engine){
        /* super(engine); */
        //console.log(super.engine);//getter的时候相当于prototype
        //super.engine = engine;//setter使用的时候，super相当于this
        super(engine);
    }
    //开车的直接行为在修正类中重新实现了
    drive(){
        //引擎的打开时drive的内置步骤
        console.log("Drive" + this.getBrand()+"car...")//这些需要一个抽象方法
        this.engine.start();
       
    }
    //获取品牌
    getBrand(){
        throw new Error("需要重写获取品牌方法");
    }

}

//不同品牌可以继承自修正RefindedCar
class BossCar extends RefinedCar{
    constructor(engine){
        super(engine);
    }
    getBrand(){
        return "Boss";
    }
}

//而针对引擎的继承，继承自Engine
class HybridEngine extends Engine{
    start(){
        console.log("Start Hybrid Engine");
    }
}

//最后创建实例
let car = new BossCar(new HybridEngine());
car.drive()







