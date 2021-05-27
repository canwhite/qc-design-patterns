/* 
行为型的模式主要在具体执行的时候的一些策略方法
策略模式和状态模式属于本书“彩蛋”性质的附加小节，难度不大，面试也没有权重 
策略模式关键在于对象映射
*/


/* boss说有个功能
当价格类型为“预售价”时，满 100 - 20，不满 100 打 9 折
当价格类型为“大促价”时，满 100 - 30，不满 100 打 8 折
当价格类型为“返场价”时，满 200 - 50，不叠加
当价格类型为“尝鲜价”时，直接打 5 折

李雷扫了一眼，将四种价格做了标签化：

预售价 - pre
大促价 - onSale
返场价 - back
尝鲜价 - fresh

然后李雷做了if-else 侠 */


/* ========================================================
随便跑一个if-else没有啥毛病，但是他违背了原则
1.首先他违背了单一性原则，一个function里边，它竟然处理了四坨逻辑
2.违背了开发封闭原则，如果哪天boss要加100-50的新人价怎么办？


没错，李雷需要灰溜溜的去改询价函数
并且恬不知耻的麻烦测试同学，麻烦他将整个询价逻辑回归一下

由此我们需要重构询价逻辑

===========================================================*/

/* 首先解决单一性原则的问题
// 处理预热价
function prePrice(originPrice) {
  if(originPrice >= 100) {
    return originPrice - 20
  } 
  return originPrice * 0.9
}

// 处理大促价
function onSalePrice(originPrice) {
  if(originPrice >= 100) {
    return originPrice - 30
  } 
  return originPrice * 0.8
}

// 处理返场价
function backPrice(originPrice) {
  if(originPrice >= 200) {
    return originPrice - 50
  }
  return originPrice
}

// 处理尝鲜价
function freshPrice(originPrice) {
  return originPrice * 0.5
}

//编写newUserPrice来处理新人价逻辑，
//然后在askPrice里边我们新增if-else判断
function newUserPrice(originPrice) {
  if(originPrice >= 100) {
    return originPrice - 50
  }
  return originPrice
}




function askPrice(tag, originPrice) {
    // 处理预热价
    if(tag === 'pre') {
      return prePrice(originPrice)
    }
    // 处理大促价
    if(tag === 'onSale') {
      return onSalePrice(originPrice)
    }
  
    // 处理返场价
    if(tag === 'back') {
      return backPrice(originPrice)
    }
  
    // 处理尝鲜价
    if(tag === 'fresh') {
       return freshPrice(originPrice)
    }
    
    // 处理新人价
    if(tag === 'newUser') {
       return newUserPrice(originPrice)
    }
  } */

/* 我们实现了单一性原则，但是没有实现"对扩展开发，对修改封闭" 

用了那么多if-else，目的是什么呢?
是不是为了把 “询价标签-询价函数” 这个映射关系给明确下来

那么，在JS中，
有没有既能帮助我们明确映射关系，同时不破坏代码灵活性的方法呢？
对象映射
既然是对象映射，那么应该需要两个对象，233333

*/


//我们把询价算法收敛到一个对象里，定义一个询价处理器对象
const priceProcessor = {
    pre(originPrice) {
      if (originPrice >= 100) {
        return originPrice - 20;
      }
      return originPrice * 0.9;
    },
    onSale(originPrice) {
      if (originPrice >= 100) {
        return originPrice - 30;
      }
      return originPrice * 0.8;
    },
    back(originPrice) {
      if (originPrice >= 200) {
        return originPrice - 50;
      }
      return originPrice;
    },
    fresh(originPrice) {
      return originPrice * 0.5;
    },
};
//当我们想要使用其中某个询价算法的时候：通过标签名去定位就好了

function askPrice(tag,originPrice){
    //先通过键值对找到函数，然后再传入参数
    return priceProcessor[tag](originPrice);
}

//如果想添加新人价
priceProcessor.newUser = function (originPrice) {
    if (originPrice >= 100) {
      return originPrice - 50;
    }
    return originPrice;
}




/* 总结 
策略模式的定义：
定义一系列的算法,把它们一个个封装起来, 并且使它们可相互替换。
特征就在于“对象映射”





*/