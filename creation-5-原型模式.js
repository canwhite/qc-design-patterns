/* 原型模式 */

/*ES6所支持的类，其实是原型的语法糖:
class Dog {
    constructor(name ,age) {
     this.name = name
     this.age = age
    }
    
    eat() {
      console.log('肉骨头真好吃')
    }
}

--------------------------------
上边等价于

//【构造函数】，注意这个构造函数的概念，和强类型语言的区别是它并不出现在类内
function Dog(name, age) {
    this.name = name
    this.age = age
}
//Dog.prototype就相当于原型，eat就是拓展的方法
Dog.prototype.eat = function() {
    console.log('肉骨头真好吃')
}

*/

/* ==============================================================================
--原型
在原型模式下，我们想要创建一个对象时，会先找一个对象作为原型
so：ES6中class只是原型的语法糖
【构造函数】就是我们写的放置有属性的函数
【构造函数】通过prototype指向原型对象，
所以prototype就是原型，上边挂载的方法就是原型的拓展，

【实例对象】通过__proto__指向原型对象
而原型对象呢，通过constructor指向构造函数
=================================================================================*/

//创建一个Dog构造函数
function Dog(name,age){
    this.name = name;
    this.age = age;
    //重写原型方法
    this.eat = ()=>{
        console.log("肉骨头真好吃");
    }
    //自己本身的方法
    this.action = ()=>{
        console.log("狗狗在草地上撒欢");
    }
}

//protoType指向原型，这里因为只有一层，所以指向Object,
//所以在这里定义的eat方法就是对原型的拓展
Dog.prototype.eat = function() {
    console.log('吃饭')
}

//使用dog构造函数创建dog实例，这个实例，注意是实例，有一个__proto__属性指向原型
const dog = new Dog('旺财',3);




/* 原型链 
明明没有在dog实例里手动定义，eat方法和toString方法，它们还是被成功的调用了
这是因为当我们试图访问一个js实例的属性/方法时，
它首先搜索这个实例本身；
当发现实例没有定义对应的属性方法时；
它会转而搜索实例的原型对象；
如果原型对象也搜索不到，它就去搜索原型对象的原型对象
这个搜索的轨迹，就叫做原型链
实例对象往原型链跑的话借助于__proto__

*/

dog.__proto__.eat();//原型方法
dog.eat();//重写了方法
//这个是Dog本身的方法，在原型里并没有
dog.action();
// dog.__proto__.action(); //报错，没有定义在原型上


//继承了原型的方法
console.log(dog.toString());
//原型对象通过constructor指向构造函数
console.log(dog.__proto__.constructor);//[Function: Dog]




/* PS:几乎所有的JS中的对象都是位于原型链顶端的Object的实例，除了Object.prototype 
当然，即使我们手动用Object.create(null)创建一个没有任何原型的对象，那它也不是 Object 的实例
*/

/* 此外在一些面试中，一些面试官可能会混淆js中原型范式和强类型语言中原型范式的区别
当他们这样做的时候不一定是对语言、设计模式的理解有问题，
而可能是为了考察你对象的深拷贝
因为强类型语言中原型范式就是深拷贝
*/


/* 
深拷贝
实现js的深拷贝，有一种非常取巧的方式 ——JSON.stringify */
const liLei = {
    name: 'lilei',
    age: 28,
    habits: ['coding', 'hiking', 'running']
}
const liLeiStr = JSON.stringify(liLei)
const liLeiCopy = JSON.parse(liLeiStr)
liLeiCopy.habits.splice(0, 1) 
console.log('李雷副本的habits数组是', liLeiCopy.habits)
console.log('李雷的habits数组是',  liLei.habits)

/* 方法存在一些局限性
比如无法处理function，无法处理正则等
在面试中大家答出这个答案没有任何问题，但是不要仅仅答这一种做法

深拷贝没有完美方案，每一种方案都有它的边界 case,
面试官可能不是让你解决未解之谜，可能在考你递归 */
function deepClone(obj) {
    // 如果是 值类型 或 null，则直接return
    if(typeof obj !== 'object' || obj === null) {
        return obj
    }
    
    // 定义结果对象
    let copy = {}
    
    // 如果对象是数组，则定义结果数组
    if(obj.constructor === Array) {
        copy = []
    }
    
    // 遍历对象的key
    for(let key in obj) {
        // 如果key是对象的自有属性
        if(obj.hasOwnProperty(key)) {
            // 递归调用深拷贝方法
            copy[key] = deepClone(obj[key])
        }
    }
    
    return copy
} 