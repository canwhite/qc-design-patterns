/* 
Event Bus（Vue、Flutter 等前端框架中有出镜）
Event Emitter（Node中有出镜）
它们出场的“剧组”不同，但是它们都对应一个共同的角色——全局事件总线。
将发布和订阅封装到一体，全局挂载
*/

/* Event Bus/Event Emitter 作为全局事件总线，
它起到的是一个沟通桥梁的作用。

我们可以把它理解为一个事件中心，我们所有事件的订阅/发布都不能由订阅方和发布方“私下沟通”，
必须要委托这个事件中心帮我们实现。
我写的async2sync本身也是将发布订阅合并在了一起，起到了事件中心的桥梁作用


创建一个 Event Bus（本质上也是 Vue 实例）并导出：
const EventBus = new Vue()
export default EventBus
在主文件里引入EventBus，并挂载到全局：

import bus from 'EventBus的文件路径'
Vue.prototype.bus = bus
订阅事件：

// 这里func指someEvent这个事件的监听函数
this.bus.$on('someEvent', func)
发布（触发）事件：

// 这里params指someEvent这个事件被触发时回调函数接收的入参
this.bus.$emit('someEvent', params)


*/

//接下来我们来自己实现Event Emitter

class EventBus{
    constructor(){
        this.handlers = {};//handlers是一个map，用于存储事件和回调之间的对应关系
    }
    // on方法相当于事件监听器，它接收目标事件名和回调函数作为参数
    on(eventName, cb) {
        // 先检查一下目标事件名有没有对应的监听函数队列
        if (!this.handlers[eventName]) {
          // 如果没有，那么首先初始化一个监听函数队列
          this.handlers[eventName] = []
        }
        // 把回调函数推入目标事件的监听函数队列里去
        this.handlers[eventName].push(cb)
    }
    // emit方法用于触发目标事件，它接受事件名和监听函数入参作为参数
    emit(eventName, ...args) {
        // 检查目标事件是否有监听函数队列
        if (this.handlers[eventName]) {
            // 这里需要对 this.handlers[eventName] 做一次浅拷贝，
            //主要目的是为了避免通过 once 安装的监听器在移除的过程中出现顺序问题
            const handlers = this.handlers[eventName].slice()
            // 如果有，则逐个调用队列里的回调函数,执行
            handlers.forEach((callback) => {
                callback(...args)
            })
        }
    }
    // 移除某个事件回调队列里的指定回调函数
    off(eventName, cb) {
        const callbacks = this.handlers[eventName]
        const index = callbacks.indexOf(cb)
        if (index !== -1) {
            callbacks.splice(index, 1)
        }
    }
    once(eventName, cb) {
        // 对回调函数进行包装，使其执行完毕自动被移除
        const wrapper = (...args) => {
          cb(...args)
          this.off(eventName, wrapper)
        }
        this.on(eventName, wrapper)
    }

}



//PS：推荐阅读https://github.com/facebookarchive/emitter