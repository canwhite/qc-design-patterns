/*
责任链模式（Chain of Responsibility）是一种处理请求的模式，
它让多个处理器都有机会处理该请求，直到其中某个处理成功为止。
责任链模式把多个处理器串成链，然后让请求在链上传递：
在实际场景中，财务审批就是一个责任链模式。


假设某个员工需要报销一笔费用，审核者可以分为：
Manager：只能审核1000元以下的报销；
Director：只能审核10000元以下的报销；
CEO：可以审核任意额度。
用责任链模式设计此报销流程时，
每个审核者只关心自己责任范围内的请求，并且处理它。
对于超出自己责任范围的，扔给下一个审核者处理，
这样，将来继续添加审核者的时候，不用改动现有逻辑。
*/

//首先我们要抽象出请求对象，它将在责任链上传递：
class Request{
    constructor(name,amount){
        this.name = name;
        this.amount = amount;
    }
    getName(){
        return this.name;
    }
    getAmount(){
        return this.amount;
    }
}

//然后我们抽象出处理器
class Handler{
    // 返回Boolean.TRUE = 成功
    // 返回Boolean.FALSE = 拒绝
    // 返回null = 交下一个处理
    process(requst){
        throw new Error("需要重新实现");
    }
}



//然后，依次编写
//ManagerHandler、DirectorHandler和CEOHandler。
//以ManagerHandler为例：

class ManagerHandler extends Handler{
    //重写process方法
    process(request){
        if(request.getAmount() >1000){
            return null;
        }
        //对bob有偏见，所以bob不过
        return !(request.getName()=="bob")
    }
}
class DirectorHandler extends Handler{
    //重写process方法
    process(request){
        if(request.getAmount() >10000){
            return null;
        }
        //对bob有偏见，所以bob不过
        return !(request.getName()=="zhangsan")
    }
}
class CEOHandler extends Handler{
    //重写process方法
    process(request){
        return !(request.getName()=="lisi")
    }
}

//有了不同的handler后，我们还要把这些handler组合起来
//变成一个链，并通过统一入口处理
class HandlerChain{
    constructor(){
        this.handlers = [];
    }
    addHandler(handler){
        this.handlers.push(handler);
    }
    process(request){
        //这里handler报错，找不到process方法
        //使用for in和for，我们可以访问数组的下标而不是值
        //使用for of是可以获取值，但是获取不了下标
        /* for(var handler in this.handlers){
        } */ 

        //forEach是通过return 或者return false跳出当前循环，结束循环需要抛出error
        //所以并不适合在这里使用
        /* this.handlers.forEach(handler=>{
 
        })  */
        
        for (const handler of this.handlers) {
            let r = handler.process(request);
            // let handler = handler;
            if(r!=null){
                //这里主要是要把三目运算符提出来，单独运算，然后再导入，毕竟拼接的时字符串
                //使用模板字符串就不会出现这样的问题了
                //console.log("request" + r?"Approved by":"Denied by" + handler.constructor.name);    
                console.log(`requst ${ r? "Approved by":"Denied by"} ${handler.__proto__.constructor.name}`)
                return r;
            }
        } 

        //如果都不通过，就抛出错误
        throw new Error("Could not handle request:"+ request);
    }

}

var chain = new HandlerChain();
chain.addHandler(new ManagerHandler());
chain.addHandler(new DirectorHandler());
chain.addHandler(new CEOHandler());
// 处理请求:
chain.process(new Request("Bob", 123.45));
chain.process(new Request("Alice", 1234.56));
chain.process(new Request("Bill", 12345.67));
chain.process(new Request("John", 123456.78));

