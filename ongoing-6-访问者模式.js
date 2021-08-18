/*
当被操作的对象结构比较稳定，而操作对象的逻辑经常变化的时候，
通过分离逻辑和对象结构，使得他们能独立扩展。这就是 visitor 模式的思想。
*/

/*================抽象访问者-公司===============*/

class Company{
    //这个create等价于Company.protoType.create
    create(){}
}

//具体访问者-艺术公司
class ArtCompany extends Company{
    create(el){
        //对应不同材料，做着不同事情
        if(el instanceof Paper){
            return "画图";
        }else if(el instanceof Cuprum){
            return "设计铜像";
        }
    }
}

//具体访问者-造钱公司
class Mint extends Company{
    create(el){
        if(el instanceof Paper){
            return "造纸币";
        }else if(el instanceof Cuprum){
            return "造铜币";
        }
    }
}


/*================抽象对象-材料==================*/
class Material{
    //对象接收访问者
    accpet(visitor){}
}

//抽象元素-纸
class Paper extends Material{
    /****** 元素接收visitor并将visitor和元素联系在一起 ******/
    accpet(visitor){
        return visitor.create(this);
    }
}

//抽线元素-铜
class Cuprum extends Material{
    accpet(visitor){
        return visitor.create(this);
    }
}

/*===============组合器====================*/
//添加对象材料，接收访问者公司
class SetMaterial{
    constructor(){
        this.el_list = [];//元素数组
    }
    accept( visitor){
        let str = "";
        for(let element of this.el_list){
            //将元素和visitor联系到一块，这个类最大的作用
            //elememt.accept最终调用的是visitor.cteate,生产相应内容
            //element比较稳定，而visitor比较灵活，生产什么可以改变
            //这里也有以不变御万变的意思
            str +=  element.accpet(visitor) + "\n";
        }
        return str;
    }

    add(el){
        this.el_list.push(el);
    }

    remove(el){
        this.el_list.filter((item)=>item!==el);
    }
}


/*================最终消费================== */
class Customer{
    //类方法，全局可用
    static main(){
        //初始化组合器
        let setMaterial = new SetMaterial();
        //添加材料
        setMaterial.add(new Paper());
        setMaterial.add(new Cuprum());
        //根据不同的公司生产不同的东西
        let pro = setMaterial.accept(new ArtCompany());
        let pro1 = setMaterial.accept(new Mint());
        console.log(pro);
        console.log(pro1);

    }
}
Customer.main();
/* 画图
设计铜像

造纸币
造铜币 */
