/* 缓存代理 
计算量大的场景中，我们需要用“空间换时间”
——当我们需要用到已经计算过的值，不想再耗时二次计算，就从内存中取出现成的计算结果*/

//addAll方法对你传入的所有参数做求和操作
/* const addAll = ()=>{
    console.log("进行了一次新计算");
    let result = 0
    const len = arguments.length;
    for(let i = 0; i< len;i++){
        result += arguments[i]
    }
    return result;
} */
// addAll方法会对你传入的所有参数做求和操作
const addAll = function() {
    console.log('进行了一次新计算')
    let result = 0
    const len = arguments.length
    for(let i = 0; i < len; i++) {
        result += arguments[i]
    }
    return result
}
//为求和方法创建代理
const proxyAddAll = (function(){
    //求和结果的缓存池
    const resultCache = {};
    //这里直接用箭头函数的时候竟然有问题，node支持问题吗？
    //箭头函数和arguments混用的时候有问题，所以还是用function
    //应该和箭头函数本身没有this有关
    return function(){
        //将入参转化为一个唯一的入参字符串
        //这种方法可以记忆一下，Array.prototype.join.call(目标,连接符号)
        const args = Array.prototype.join.call(arguments,",")
        /* console.log("----",args); */
        //检查本次入参是否又对应的计算结果
        if(args in resultCache){
            //如果有，则返回现有结果
            return resultCache[args];
        }
        //这里将入参作为key存了起来
        return resultCache[args] = addAll(...arguments);
    }
})()



console.log(proxyAddAll(1,2,3,4,5,6))
console.log(proxyAddAll(1,2,3,4,5,6))


