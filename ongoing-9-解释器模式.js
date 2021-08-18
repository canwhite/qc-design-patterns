/*=======================================================
解释器就是我们字面理解的解释器，像js解释器等
词法分析=>语法分析=>ast，然后拿去解释执行，前半部分时编译
后半部分就是解释
---------------------------------------------------
解释器模式指的是给分析对象定义一个语言，
并定义该语言的文法表示。
再设计一个解释器来解释该语句中的句子。
用编译语言的方式来分析应用中的实例。

结构：
解释器模式包含【抽象表达式】、【终结符表达式】、【非终结符表达式】、【环境】和【客户端】。

【抽象表达式】：定义解释器的接口，约定解释器的解释操作。
【终结符表达式】：抽象表达式的子类，用来实现文法中与终结符相关的操作，
文法中每一个终结符都有一个具体终结符表达式与之对应。
【非终结符表达式】：也是抽象表达式的子类，用来实现文法中与非终结符相关的操作，
文法中每一个非终结符都对应具体终结符表达式。
【环境】：通常包含各个解释器需要的数据或是公共功能。
【客户端】：将需要分析的句子或表达式转换成使用解释器对象描述的抽象语法树，
    然后调用解释器的解释方法，也可以通过环境角色间接访问解释器的解释方法。

应用场景：
----------------------------------------
应用场景实际上已经时开始猜题了，
这种方式确实很棒，这样的特点再什么样的场景种可以用到
----------------------------------------
当语言的文法较为简单，且执行效率不是关键问题时。
当问题重复出现，且可以用一种简单的语言来进行表达时。
当一个语言需要解释执行，
并且语言中的句子可以表示为一个抽象语法树的时候，
如 XML 文档解释。
最后一条比较重要

案例：
功能描述：假如“韶粵通”公交车读卡器可以判断乘客的身份，如果是“韶关”或者“广州”的“老人” “妇女”“儿童”就可以免费乘车，其他人员乘车一次扣 2 元。
请实现以上功能。
============================================================*/

//抽象表达式类
class Expression{
    interpret(info){
        throw new Error("方法需要重新定义");
    }
}
//终结符表达式
class TerminalExpression extends Expression{
    constructor(data){
        super(data);
        this.set = new Set(data);           
    }
    interpret(info){
       if(this.set.has(info)){
          return true
       }else {
          return false
       }
    }
}
//非终结符表达式
class AndExpression extends Expression{
    constructor(city,person){
        super();
        this.city = city;
        this.person = person;
    }
    interpret(info){
       let s = info.split('的');
       return this.city.interpret(s[0])&&this.person.interpret(s[1])
    }
}
//环境
class Context {
    constructor() {
      //定义终结表达式实例和非终结表达式实例
        let citys = ["韶关", "广州"];
        let persons = ["老人", "妇女", "儿童"];
        this.city = new TerminalExpression(citys);
        this.person = new TerminalExpression(persons);
        this.cityPerson = new AndExpression(this.city, this.person);
    }
     //根据非终结表达式实例的解释方法做出反应
    action(info) {
        let ok = this.cityPerson.interpret(info);
        if (ok) {
            console.log("您是" + info + "，您本次乘车免费！")
        } else {
            console.log(info + "，您不是免费人员，本次乘车扣费2元！")
        }
    }
}
class Customer{
    static main(){
        let bus = new Context();
        bus.action("韶关的老人");
        bus.action("韶关的年轻人");
        bus.action("广州的妇女");
        bus.action("广州的儿童");
        bus.action("山东的儿童");
    }
}
Customer.main();
