/*===========================================

通过共享已存在的对象，减少创建对象内存开销的设计模式被称作享元模式

享元模式Flyweight和单例模式Singleton像是一对孪生兄弟，
二者的表现方式非常相似，但二者的存在目的却不一样：

单例模式
保证了整个应用声明周期内，同一个对象只会存在一份内存，并且任何时间都能被访问使用。

享元模式
如果存在可以复用的对象，那么对象将被共享而不是创建新的对象
主要的使用在可复用上，可以根据状态分组，这样需要管理它的状态
--------------
eg：
在iOS开发中，享元模式的最佳实践就是UITableView的复用机制——
超出屏幕外的单元格统一被回收放到一个复用队列之中，等待着需要新的单元格时进行复用。
=============================================*/
/*现在假设一个一个情景, 有男女服装个100套, 
需要租模特来试穿衣服, 传统做法就是男女各找100个模特试穿每一见衣服*/
// 雇佣模特
/* let HireModel = function(sex,clothes){
    this.sex = sex;
    this.clothes = clothes;
};
    
HireModel.prototype.wearClothes = function(){
console.log(this.sex + '试穿' + this.clothes);
};
//试穿
for(let i=0;i<100;i++){
    let model = new HireModel('male','第'+i+'款男衣服');
    model.wearClothes();flat-7-享元模式.js
}
for(let i=0;i<100;i++){
    let model = new HireModel('female','第'+i+'款女衣服');
    model.wearClothes();
} */

//享元模式可以简单的理解为:
//对象 + 工厂缓存 + 管理器 , 
//管理器对外部状态进行管理组合成完整的对象

//1.对象
var HireModel = function(sex){
  //内部状态是性别
  this.sex = sex;
};
HireModel.prototype.wearClothes = function(clothes){
  console.log(this.sex+"穿了"+clothes);
};


//2.工厂模式，做缓存处理
//这里使用了自执行函数，相当于把当前函数给执行了
//然后还会返回一个函数，在其它部分直接使用
var ModelFactory = (function(){
    var cacheObj= {};
    //这种方法好棒啊，返回一个策略模式类，map-function
    return{
        create:function(sex){
            if(cacheObj[sex]){
                return cacheObj[sex];
            }else{
                //新建分组
                cacheObj[sex] = new HireModel(sex);
                return cacheObj[sex];
            }
        }
    }
})()


//3.模特管理：将共享对象和状态做联合管理，所以叫结构型
var ModelManager = (function(){
    
    //容器存储：1.共享对象 2.外部状态
    var vessel = {}; 
    //返回map-function
    return {
        add:function(sex,clothes,id){
            //造出共享元素：模特
            var model = ModelFactory.create(sex);
            //以id为键存储所有状态
            vessel[id] = {
                model:model,
                clothes:clothes
            }

        },
        wear:function(){
            for(var key in vessel){
                //调用雇佣模特中的穿衣服方法
                vessel[key]['model'].wearClothes(vessel[key]['clothes'])
            }
        }
    }
})()


//end:通过运行时间测试性能
for(var i=0;i<100;i++){
    //id是状态标识，所以id要做一下区分
    ModelManager.add('female','第'+i+'款女衣服',i+"female");
    ModelManager.add('male','第'+i+'款男衣服',i+"male");
}
ModelManager.wear();   




