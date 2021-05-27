/* 观察者模式 

观察者模式定义了一种一对多的依赖关系，
让多个观察者对象同时监听某一个目标对象，
当这个目标对象的状态发生变化时，会通知所有观察者对象，
使它们能够自动更新。

观察者模式有一个“别名”，
叫发布 - 订阅模式
（之所以别名加了引号，是因为两者之间存在着细微的差异，下个小节里我们会讲到这点）。这个别名非常形象地诠释了观察者模式里两个核心的角色要素——“发布者”与“订阅者”。
这个别名非常形象地诠释了观察者模式里两个核心的角色要素——“发布者”与“订阅者”。

*/

/* 结合上边的分析，在观察者模式中，至少两个关键角色是一定出现的
发布者和订阅者
首先我们开看合格代表发布者的类，我们给它起名叫做Publisher
这个类具备哪些功能呢？
产品经历韩梅梅的基本操作是什么？
首先是拉群（增加订阅者），然后是@所有人（通知订阅者）看需求文档，这俩是最明显的了。
此外作为群主&产品经理，
韩梅梅还具有踢走项目组成员（移除订阅者）的能力。
OK，产品经理发布者类的三个基本能力齐了，下面我们开始写代码 */


//定义发布者类，发布的内容会被订阅
class Publisher{
    constructor(){
        this.observers = [];
        console.log("Publisher cerated");
    }
    //增加订阅者
    add(observer){
        console.log("Publisher.add invoked");
        this.observers.push(observer);
    }
    //移除订阅者
    remove(observer){
        console.log('Publisher.remove invoked')
        this.observers.forEach((item, i) => {
          if (item === observer) {
            this.observers.splice(i, 1)
          }
        })
    }
    //通知所有订阅者    
    notify(){
        console.log('Publisher.notify invoked');
        this.observers.forEach((observer)=>{
            /*****这个通知的地方很有意思，也很重要，
   
            总结：
            
            发布者通过挂载自身通知订阅者并分享信息，
            订阅者拿到发布者的挂载信息，去做事情


            async2sync也有这样的挂载过程
            Hook类是发布者
            WaterFall(WF)是订阅者，具体做事情的，

            Hook类通知WF的方法，就是将自己通过create方法挂载在了WF上分享自己的事件数组

            订阅者WF拿到信息通过new Fucntion去调用方法数组，具体执行工作

            这里是通过update挂载自身分享数据，触发执行
            update的具体执行是在订阅者中用于触发work

            ****/
            observer.update(this);
        })
    }
}
/* 
订阅者相对来说就简单了,
被通知
去执行
在我写的async2sync中,订阅者是通过new Function实现的，用来循环执行发布的内容
定义订阅者类 */

class Observer{
    constructor(){
        console.log("Observer created");
    }
    update(){
        console.log('Observer.update invoked')
    }
}

/*
发布者和订阅者这两个基础有了
接下来我们通过拓展发布者类，
来使订阅者来监听某个特定状态的变化
我们这里让开发者来监听需求文档的变化
*/

//订阅一个具体的需求文档(prd)发布类
class PrdPublisher extends Publisher{
    constructor(){
        super()
        //初始化需求文档
        this.prdState = null;
        //韩梅梅还没有拉群，开发权目前为空
        this.observers = [];
        console.log('PrdPublisher created')
    }

    //该方法用于获取当前的prdState
    getState(){
        console.log('PrdPublisher.getState invoked')
        return this.prdState
    }
    // 该方法用于改变prdState的值
    setState(state) {
        console.log('PrdPublisher.setState invoked')
        // prd的值发生改变
        this.prdState = state
        // 需求文档变更，立刻通知所有开发者
        this.notify()
    }
}

/* 
作为订阅方，开发者的任务也具体了：
接收需求文档、并开始干活 */

class DeveloperObserver extends Observer{
    constructor(){
        super();
        //需求文档一开始不存在，prd初始为空对象
        this.prdState = {}
        console.log('DeveloperObserver created')
    }
    //update的具体实现是在订阅者中
    update(publisher){
        console.log('DeveloperObserver.update invoked')
        // 更新需求文档
        this.prdState = publisher.getState()
        // 调用工作函数,update执行了就直接工作了
        this.work()
    }
    // work方法，一个专门搬砖的方法
    work() {
        // 获取需求文档
        const prd = this.prdState
        // 开始基于需求文档提供的信息搬砖。。。
        //...
        console.log('996 begins...')
    }

}

/* 目标对象的状态发生变化时，会通知所有观察者对象，使它们能够自动更新。 
 */

// 创建订阅者：前端开发李雷
const liLei = new DeveloperObserver()
// 创建订阅者：服务端开发小A（sorry。。。起名字真的太难了）
const A = new DeveloperObserver()
// 创建订阅者：测试同学小B
const B = new DeveloperObserver()
// 韩梅梅出现了
const hanMeiMei = new PrdPublisher()
// 需求文档出现了
const prd = {
    // 具体的需求内容
    //...
    a:"123"
}
// 韩梅梅开始拉群
hanMeiMei.add(liLei)
hanMeiMei.add(A)
hanMeiMei.add(B)
// 韩梅梅发送了需求文档，并@了所有人
hanMeiMei.setState(prd)
