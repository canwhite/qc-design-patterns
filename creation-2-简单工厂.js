/* 简单工厂模式 */

/* 要求这个系统具备给不同工种分配职责说明的功能 */

/* function Coder(name , age) {
    this.name = name
    this.age = age
    this.career = 'coder' 
    this.work = ['写代码','写系分', '修Bug']
}
function ProductManager(name, age) {
    this.name = name 
    this.age = age
    this.career = 'product manager'
    this.work = ['订会议室', '写PRD', '催更']
} */

/* 麻烦的事情来了：难道我每从数据库拿到一条数据，
都要人工判断一下这个员工的工种，然后手动给它分配构造器吗？
不行，这也是一个“变”，我们把这个“变”交给一个函数去处理： */


/* function Factory(name, age, career) {
    switch(career) {
        case 'coder':
            //每个对应一个类
            return new Coder(name, age) 
            break
        case 'product manager':
            return new ProductManager(name, age)
            break
        ...
} 

看着这个省略号，李雷哭了，
他想到：整个公司上下有数十个工种，难道我要手写数十个类、数十行 switch 吗？

思考，变得是什么？不变得又是什么？
-------------------
还有一条共性没有封装出来，work字段需要跟随career字段得取值不同而变化
-------------------
在构造器的基础上上边再封装一层，并保证原来的基本属性

*/

function User(name,age,career,work){
    this.name = name;
    this.age = age;
    this.career = career;
    this.work = work;
}

function Factory(name,age,career){
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
            break;
        case 'xxx':
            // 其它工种的职责分配
            //...
            break;
        default:
            break;
        
    }
    return new User(name, age, career, work)
}



let lilei = Factory("lilei",25,"coder");
console.log('----',lilei.work);
/* 

小结：

-------------------------------------------
概念相对好理解：
将创建对象的过程单独封装，这样的操作就是工厂模式。
-------------------------------------------
特征识别也很简单：
有构造函数的地方，我们就应该想到简单工厂；
-------------------------------------------
在写了大量构造函数、调用了大量的 new、自觉非常不爽的情况下，
我们就应该思考是不是可以掏出工厂模式重构我们的代码了。

 */