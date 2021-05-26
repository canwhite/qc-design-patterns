/* 代理模式 
在某些情况下，出于种种考虑限制
一个对象不能直接访问另外一个对象，
需要第三者牵线搭桥从而间接达到访问目的
这样的模式就是代理模式
*/

/* 首先科学上网就是一个正向代理的过程
正常上网我们经历这样一个过程
1.客户端调用url
2.经过dns解析识别目标ip
3.访问目标服务器

为了屏蔽一些网站，神秘的东方力量会作用于你的DNS解析过程
于是当你想Google.com
你的DNS会告诉你“对不起，我查不到”


而有了vpn，
DNS解析的ip就是代理服务器的ip，而不是被诅咒的某个ip 
和被诅咒ip的目标服务器和客户端沟通的
就变成了代理服务器
*/

/* 婚恋平台把代理模式玩挺 6 啊！
主体是同事 A，目标对象是新垣结衣头像的未知妹子。
同事 A 不能直接与未知妹子进行沟通，
只能通过第三方（婚介所）间接获取对方的一些信息，
他能够获取到的信息和权限，取决于第三方愿意给他什么——这不就是典型的代理模式吗？ */

// 第一个参数就是我们的未知妹子
// handler相当于婚介所，用来定义代理的行为，会对我们的行为作一层拦截，
//  我们的每次访问都需要经历handler这个第三方
// const proxy = new Proxy(obj, handler)


// 规定礼物的数据结构由type和value组成
const present = {
    type: '巧克力',
    value: 60,
}

//未知妹子
const girl = {
    //姓名
    name:"小美",
    aboutMe:"...",
    age:24,
    career:"teacher",
    fakeAvatar:"新恒结衣的假头像",
    avatar:"真头像",
    phone:"136234",
    //添加礼物功能
      // 礼物数组
    presents: [],
    // 拒收50块以下的礼物
    bottomValue: 50,
    // 记录最近一次收到的礼物
    lastPresent: present,
}

//婚介所，收到小美的信息，平台就有了操作的空间
//1.姓名、自我介绍、假头像这些信息游客就可以看
//2.年龄、职业、需要实名认证
//3.真实头像、手机号码需要VIP
//4.如果再添上可以互送个礼物


//普通私密信息
const baseInfo = ["age","career"];

//最私密信息
const privateInfo = ['avatar','phone'];

//用户(同事A)对象实例
const user = {
    //...一些必要的个人信息
    isValidated: true,
    isVIP: false,
}

// 掘金婚介所推出了小礼物功能
const JuejinLovers = new Proxy(girl, {

    //判断是否有获取信息的权限
    get: function(girl, key) {
      if(baseInfo.indexOf(key)!==-1 && !user.isValidated) {
          alert('您还没有完成验证哦')
          return
      }
      
      //...(此处省略其它有的没的各种校验逻辑)
    
      // 此处我们认为只有验证过的用户才可以购买VIP
      if(user.isValidated && privateInfo.indexOf(key)!==-1 && !user.isVIP) {
          alert('只有VIP才可以查看该信息哦')
          return
      }
    },


    // 增加了护送小礼物的功能
    set: function(girl, key, val) {
   
      // 最近一次送来的礼物会尝试赋值给lastPresent字段
      if(key === 'lastPresent') {
        if(val.value < girl.bottomValue) {
            alert('sorry，您的礼物被拒收了')
            return
        }
        // 对girl进行操作
        // 如果没有拒收，则赋值成功，同时并入presents数组
        girl.lastPresent = val
        girl.presents = [...girl.presents, val]
      }
    }
   
  })
/* 
  不过如果认为代理模式的本领仅仅是开个婚介所这么简单，那就太小瞧它了。
  代理模式在前端领域一直是一种应用十分广泛的设计模式，
  在下个小节，我们将会选取其中最典型、最实用的四种类型的应用实践，
  帮助大家掌握代理模式在业务开发中的应用场景和使用方法。 */






