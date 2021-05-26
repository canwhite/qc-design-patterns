/* 单例模式 */
/* 我们正常写一个类，无论new多少次，每次都是一个新的类
而单例模式想要做的是：
不管我们尝试创建多少次，它都给我们返回第一次创建的那个唯一的实例 
而要做到这一点，就需要构造函数具备判断自己是否已经创建过一个实例的能力
*/
class SingleDog{
    show(){
        console.log("我是一个单例对象");
    }
    //static被所有的对象所共享，在内存中仅有一个，它当且仅当初次加载时会被初始化
    //和单例简直是绝配
    static getInstance(){
        //如果不存在，再非就进去了
        if(!SingleDog.instance){
            //那再创建它
            SingleDog.instance = new SingleDog();
        }
        return SingleDog.instance;
    }

}

const s1 = SingleDog.getInstance();
const s2 = SingleDog.getInstance();

console.log(s1==s2);

//也可以闭包实现
SingleDog.getIns = (function(){
    //定义自由变量instance，模拟私有变量
    let instance = null;
    return function(){
        //判断自由变量是否为null
        //如果不存在，再非就进去了
        if(!instance){
            //创建新对象
            instance = new SingleDog();
        }
        return instance;
    }
})();//这样实例上就直接把内部函数返回了，内部函数再执行的时候就返回instance


const s3 = SingleDog.getIns();
const s4 = SingleDog.getIns();

console.log("闭包实现:",s3==s4);


/*
生产实现：Vuex中的单例模式
*/

/* 无论是Redux还是Vuex，它们都实现了一个全局的Store用来存储应用的所有状态
这个Store的实现就是单例模式的典型应用 
一个Vue实例只能对应一个Store

// 安装vuex插件
Vue.use(Vuex)

// 将store注入到Vue实例中
new Vue({
    el: '#app',
    store
})


Vuex插件是一个对象，内部实现了一个install方法，
这个方法会在插件安装时调用
conger把Store注入到Vue实例中；
而注入的Store本身虽然和本节无关，但是还是说一下
其实就是一个没有template的组件，state就是data，
commit就是同步改变data中的数据
dispatch就是异步改变data中的数据


我们来看Vuex插件的install实现：

let Vue // 这个Vue的作用和楼上的instance作用一样
...
export function install (_Vue) {
  // 判断传入的Vue实例对象是否已经被install过Vuex插件（是否有了唯一的state）
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  // 若没有，则为这个Vue实例对象install一个唯一的Vuex
  Vue = _Vue
  // 将Vuex的初始化逻辑写进Vue的钩子函数里
  applyMixin(Vue)
}


*/

/* =======================================================
总结：
触发特征很简单，就是我们需要在全局声明周期都可用的状态存在的时候
就可以使用氮磷模式，就像上边的Store和Vue的关系
 ========================================================*/