/* 适配器
适配器模式通过把一个类的接口变换成客户端所期待的另一种接口，可以帮我们解决不兼容的问题。
适配器的作用就是抹平差异，所以特征就是新旧交替的时候使用
源头耳机转typeC耳机接口的那个就是适配器
这个转接器是不是就是我们开头说的把一个类（iPhone 新机型）的接口（方形）
变换成客户端（用户）所期待的另一种接口（圆形）
*/

/*
李雷写了一套 HttpUtils工具对fetch进行了封装
调用差不过是这样的
-----------------------------------------------
// 定义目标url地址
const URL = "xxxxx"
// 定义post入参
const params = {
    ...
}

// 发起post请求
const postResponse = await HttpUtils.post(URL,params) || {}
 
// 发起get请求
const getResponse = await HttpUtils.get(URL) || {}
-----------------------------------------------

老板希望把公司的所有网络请求都迁移到这个HttpUtil上来
但是他是公司的第99代员工，
而公司第1代员工封装的请求是基于XMLHttpRequest
调用差不过是这样的
-------------------------------------------------
// 发送get请求
Ajax('get', url地址, post入参, function(data){
    // 成功的回调逻辑
}, function(error){
    // 失败的回调逻辑
})
-------------------------------------------------

要把老代码迁移到新接口，不一定要去修改每一次的接口调用
只需要在引入接口时做下适配

*/
class HttpUtils{
    //...

}


//ajax适配器函数，入参和旧接口保持一致；
//就像耳机转接器的入口还是旧的圆头
async function AjaxAdapter(type,url,data,success,failed){
    const type = type.toUpperCase();
    let result;
    try{    
        //实际上的请求全部由新接口发出，就像转接器另外一边的新的typeC
        if(type === 'GET') {
            result = await HttpUtils.get(url) || {}
        } else if(type === 'POST') {
            result = await HttpUtils.post(url, data) || {}
        }
        // 假设请求成功对应的状态码是1，返回还是走的老方法，因为要满足旧参数
        result.statusCode === 1 && success ? success(result) : failed(result.statusCode)


    }catch(error){
        // 捕捉网络错误
        if(failed){
            failed(error.statusCode);
        }
    }
} 
//用适配器适配旧的Ajax方法
async function Ajax(type, url, data, success, failed) {
    await AjaxAdapter(type, url, data, success, failed)
}
//如此一来，我们只需要编写一个适配器函数AjaxAdapter，
//并用适配器去程接旧接口的参数，就可以实现新旧接口的无缝衔接

/*生产实践：ajax中的适配器
数月之后，老板发现了网络请求神器axios，于是又让整个方案迁移到axios
有适配器得李雷说，这都不是事儿
不过本小节我们要聊的可不再是“如何使现有接口兼容axios”了
因为axios本身就用了适配器模式，这里值得我们学习和借鉴

*/



/*  当然除了上边简明优雅的api，get/post和get、post的通用模式
    --axios完美的抹平了前端和node两种环境下的api调用差异--
    靠的正是对适配器模式的灵活运用
 
 在axios的核心逻辑中，我们可以注意到实际派发请求的是
 dispatchRequest 方法
 该方法主要做了两件事：
 1.数据转换，转换请求体/响应体，可以理解为数据层面的适配；
 2.调用适配器。

 */

/* 调用适配器的逻辑如下 */

/* 
 // 若用户未手动配置适配器，则使用默认的适配器
var adapter = config.adapter || defaults.adapter;
  
// dispatchRequest方法的末尾调用的是适配器方法
return adapter(config).then(function onAdapterResolution(response) {
  // 请求成功的回调
  throwIfCancellationRequested(config);

  // 转换响应体
  response.data = transformData(
    response.data,
    response.headers,
    config.transformResponse
  );

  return response;
}, function onAdapterRejection(reason) {
  // 请求失败的回调
  if (!isCancel(reason)) {
    throwIfCancellationRequested(config);

    // 转换响应体
    if (reason && reason.response) {
      reason.response.data = transformData(
        reason.response.data,
        reason.response.headers,
        config.transformResponse
      );
    }
  }

  return Promise.reject(reason);
}); 

*/

/* 
注意上边注释代码的第一行， “若用户未手动配置适配器，则使用默认的适配器”
实际开发中，我们使用默认适配器的频率相当高，
默认适配器在axios/lib/default.js里是通过getDefaultAdapter方法来获取的： */


//判断了环境，不同环境不同适配
//我们看到有node环境和浏览器环境
function getDefaultAdapter() {
    var adapter;
    // 判断当前是否是node环境
    if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
      // 如果是node环境，调用node专属的http适配器
      adapter = require('./adapters/http');
    } else if (typeof XMLHttpRequest !== 'undefined') {
      // 如果是浏览器环境，调用基于xhr的适配器
      adapter = require('./adapters/xhr');
    }
    return adapter;
}
  
// 继续看下http适配器和xhr适配器

//http适配器：

/* module.exports = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
    // 具体逻辑
  }
} */

//xhr适配器：
/* module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    // 具体逻辑
  }
} */

/* 咱们现在就注意到两件事儿，
1.两个适配器的入参都是config
2.两个适配器的出参都是Promise

这样不同平台不仅调用的接口名是同一个，连入参、出参的格式都只需要同一套
学习成本就变得很低
这正是一个好的适配器的特点——把变化留给自己，把统一留给用户 

*/

/* 所以适配器的触发特征就是
抹平新旧平台的差异
抹平不同环境的差异
 */
  

  
