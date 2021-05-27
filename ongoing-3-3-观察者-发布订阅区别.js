/* 观察者模式和发布订阅模式最大的区别，就是事件中台的确立，让事件中台作为一种全局的属性
以我写的async2sync为例
WaterFall将发布和订阅归于己身，起到一个事件中心的作用，全局挂载成为桥梁，
使得我们所有订阅/发布不能由订阅方和发布方“私下沟通，而是走总线”
这样的模式就是发布订阅模式，从上边我们也可以看出观察者模式和发布订阅模式的区别

*/


/* =====================
//wf.js

import AsyncWaterfall from 'asynctsync'
const WF = new AsyncWaterfall(['name']);
export default WF

//main.js引入：
import wf from './wf.js'
Vue.prototype.wf = wf

//组件a中
this.wf.publish_promise('1',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(name, 1);
            resolve('1');
  
        },1000)
    });
 });

//组件b中
this.wf.promise('series promise').then(res=>{
     console.log(res);
     console.timeEnd('cost6');
 }).catch((err)=>{
     console.log('error',err);
     console.timeEnd('cost6');
 });
 =====================*/

