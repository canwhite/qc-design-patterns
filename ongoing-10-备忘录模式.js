/*
备忘录模式（Memento），主要用于捕获一个对象的内部状态，
以便在将来的某个时候恢复此状态。
看到一个例子，说的应用场景
其实就是要实现哪个目标特征的时候用到这个知识的问题
1.需要保存与恢复数据的场景。
2.需要提供一个可回滚操作的场景。


结构：
备忘录模式包含发起人、备忘录和管理者。
发起人：
记录当前时刻的状态信息，提供创建备忘录和恢复备忘录数据的功能，
可以访问备忘录里的所有信息。
-------------------
备忘录：负责存储发起人的内部状态，
在需要的时候将状态提供给发起人
-------------------------------。
管理者：对备忘录进行管理，
提供保存和获取备忘录的功能，
但不能对备忘录的内容进行访问和修改。


*/
/* 案例：
功能描述：迷你冰箱里面只能储存3个水果。超过3个水果，
可以按储存顺序将最后一个储存的水果拿出来之后再进行储存。
比如分别储存了梨子、苹果、香蕉。想要再储存桃子就不行了。
只能先将最后储存的水果香蕉拿出来之后再储存桃子。 */

//发起人：记录状态信息，提供备忘录创建和恢复功能
class Person{
    constructor(){
        this.fruitName = "";
    }
    getFruitName(){
        return this.fruitName;
    }
    setFruitName(fruitName){
        this.fruitName = fruitName;

    }
    createFruit(){
        return new Fruit(this.fruitName);
    }
    
    restoreFruit(fruit){
        //new Fruit不传名字的吗？
        //重置name
        console.log("new",(new Fruit));//new Fruit { name: undefined }
        this.setFruitName((new Fruit).getName());
    }
}
//备忘录：负责存储发起人的内部状态，
//在需要的时候将状态提供给发起人
class Fruit{
    constructor(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }
    setName(name){
        this.name = name;
    }
}

//管理者：对备忘录进行管理，但不能对备忘录的内容进行访问和修改
class Manager{
    constructor(){
        this.fruit = [];
        this.top = 0;
    }
    push(f){
        console.log("push",f);
        this.fruit[this.top] = f;
        if(this.top >=3){
            console.log("已达上限，不能储存"+f.getName());
            return false
        }else{
            console.log(`存储了 ${f.getName()}`);
            this.top ++;
            return true;
        }
    }
    pop(){
        this.top--;
        let f = this.fruit[this.top];
        if(this.top <= 0){
            console.log("撤回最后一个"+f.getName())
        }else{
            console.log("撤回了"+f.getName())
        }
    }
}

//最后就是使用了
class Customer{
    static main(){
        let p = new Person();
        let m = new Manager();
        p.setFruitName("梨子");
        m.push(p.createFruit());//保存备忘录

        p.setFruitName("苹果");
        m.push(p.createFruit());//保存备忘录

        p.setFruitName("香蕉");
        let banana = p.createFruit();
        console.log("banana",banana);
        m.push(banana);//保存备忘录

        p.setFruitName("桃子");
        m.push(p.createFruit());//保存备忘录，不能存了，已存满

        p.restoreFruit(m.pop());//恢复状态
        p.restoreFruit(m.pop());//恢复状态
        p.restoreFruit(m.pop());//恢复状态

        p.setFruitName("桃子");//又可以存了
        m.push(p.createFruit());//保存备忘录

    }
}
Customer.main();

