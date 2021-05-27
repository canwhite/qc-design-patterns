/* 观察者模式示例一vue数据双向绑定 */

/* 在Vue数据双向绑定的实现逻辑里，有这样三个关键角色：

observer（监听器/发布者，发布者起个这样的名字也是很尴尬呀）：
此observer 非彼 observer。
在我们上节的解析中，observer 作为设计模式中的一个角色，代表“订阅者”。
但在Vue数据双向绑定的角色结构里，所谓的 observer 不仅是一个数据监听器，
它还需要对监听到的数据进行转发——也就是说它同时还是一个发布者。

-----------------------------------------------------
watcher（订阅者）：
observer 把数据转发给了真正的订阅者——watcher对象。watcher 接收到新的数据后，会去更新视图。
-----------------------------------------------------
compile（编译器）：
MVVM 框架特有的角色，负责对每个节点元素指令进行扫描和解析，指令的数据初始化、订阅者的创建这些“杂活”也归它管~ 


下面我们就整个流程中涉及到的发布订阅部分的代码来个特写
*/

/* 实现observer
首先我们需要实现一个方法，对需要监听的数据对象进行遍历、
给它的属性加上定制的 getter 和 setter 函数。（相当于一个代理）
这样但凡这个对象的某个属性发生了改变，就会触发 setter 函数，
进而通知到订阅者。这个 setter 函数，就是我们的监听器： 
*/
// observe方法遍历并包装对象属性
function observe(target) {
    // 若target是一个对象，则遍历它
    if(target && typeof target === 'object') {
        Object.keys(target).forEach((key)=> {
            // defineReactive方法会给目标属性装上“监听器”
            defineReactive(target, key, target[key])
        })
    }
}

// 定义defineReactive方法
function defineReactive(target, key, val) {
    // 属性值也可能是object类型，这种情况下需要调用observe进行递归遍历
    const dep = new Dep()
    observe(val)
    // 为当前属性安装监听器
    Object.defineProperty(target, key, {
         // 可枚举
        enumerable: true,
        // 不可配置
        configurable: false, 
        get: function () {
            return val;
        },
        // 监听器函数和通知
        set: function (value) {
            /* console.log(`${target}属性的${key}属性从${val}值变成了了${value}`)
            val = value */
            // 通知所有订阅者，并且挂载自身
            dep.notify()
        }
    });
}

//订阅者类Dep，进行notify的具体实现
class Dep {
    constructor() {
        // 初始化订阅队列
        this.subs = []
    }
    
    // 增加订阅者
    addSub(sub) {
        this.subs.push(sub)
    }
    
    // 通知订阅者（是不是所有的代码都似曾相识？），
    notify() {
        this.subs.forEach((sub)=>{
            //这里Dep也是身兼双职，除了是订阅者，这里还充当了发布者的工作
            sub.update()
        })
    }
}

//订阅者Watcher，Dep本身还有订阅者Watcher

class Watcher{

    update() {
        //...具体去更新view的操作
    }

}