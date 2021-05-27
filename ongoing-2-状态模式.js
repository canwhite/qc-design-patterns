/* 状态模式和策略模式宛如一对孪生兄弟——它们长得很像、
解决的问题也可以说没啥本质上的差别。 */

/* 李雷要用代码实现咖啡机
- 美式咖啡态（american)：只吐黑咖啡
- 普通拿铁态(latte)：黑咖啡加点奶
- 香草拿铁态（vanillaLatte）：黑咖啡加点奶再加香草糖浆
- 摩卡咖啡态(mocha)：黑咖啡加点奶再加点巧克力 */

/* class CoffeeMaker {
    constructor() {
      // 初始化状态，没有切换任何咖啡模式
      this.state = 'init';
    }
  
    // 关注咖啡机状态切换函数
    changeState(state) {
      // 记录当前状态
      this.state = state;
      if(state === 'american') {
        // 这里用 console 代指咖啡制作流程的业务逻辑
        console.log('我只吐黑咖啡');
      } else if(state === 'latte') {
        console.log(`给黑咖啡加点奶`);
      } else if(state === 'vanillaLatte') {
        console.log('黑咖啡加点奶再加香草糖浆');
      } else if(state === 'mocha') {
        console.log('黑咖啡加点奶再加点巧克力');
      }
    }
  }
const mk = new CoffeeMaker();
mk.changeState('latte'); // 输出 '给黑咖啡加点奶' */

/* 
=========================================================
上边的测试了一下，完美无缺
但是李雷不想做if-else侠
我们考虑下对象映射的方案
==========================================================
const stateToProcessor = {
  american() {
    console.log('我只吐黑咖啡');    
  },
  latte() {
    this.american();
    console.log('加点奶');  
  },
  vanillaLatte() {
    this.latte();
    console.log('再加香草糖浆');
  },
  mocha() {
    this.latte();
    console.log('再加巧克力');
  }
}

class CoffeeMaker {
  constructor() {
    // 初始化状态，没有切换任何咖啡模式
    this.state = 'init';
  }
  
  // 关注咖啡机状态切换函数
  changeState(state) {
    // 记录当前状态
    this.state = state;
    // 若状态不存在，则返回
    if(!stateToProcessor[state]) {
      return ;
    }
    stateToProcessor[state]();
  }
}

const mk = new CoffeeMaker();
mk.changeState('latte');


*/
/* 
实现了，但是有一个弊端，如果咖啡里边有属性呢?
我们如何拿到，比如
// 初始化牛奶的存储量
this.leftMilk = '500ml'; 
非常简单，把状态-行为映射对象作为主体类对应实例的一个属性添加进去就行了：

*/
//主体类
class CoffeeMaker {
    constructor() {
      /**
      这里略去咖啡机中与咖啡状态切换无关的一些初始化逻辑
    **/
      // 初始化状态，没有切换任何咖啡模式
      this.state = 'init';
      // 初始化牛奶的存储量
      this.leftMilk = '500ml';
    }
    
    //内部类
    stateToProcessor = {
/*        --this <ref *1> {
            that: CoffeeMaker {
              stateToProcessor: [Circular *1],
              state: 'american',
              leftMilk: '500ml'
            },
            american: [Function: american],
            latte: [Function: latte],
            vanillaLatte: [Function: vanillaLatte],
            mocha: [Function: mocha]
          }
          --this.that <ref *1> CoffeeMaker {
            stateToProcessor: {
              that: [Circular *1],
              american: [Function: american],
              latte: [Function: latte],
              vanillaLatte: [Function: vanillaLatte],
              mocha: [Function: mocha]
            },
            state: 'american',
            leftMilk: '500ml'
          } */
      that: this,//这里的that相当于CoffeeMaker的外键，that指向的是CoffeeMaker

      american() {
        console.log("--this",this);
        console.log("--this.that",this.that);
        // 在方法中this指向的是它的调用者stateToProcessor
        // 然后又用that找到了CoffeeMaker
        // 内部类中有函数，并且使用了this，可以这样用
        console.log('咖啡机现在的牛奶存储量是:', this.that.leftMilk)
        console.log('我只吐黑咖啡');
      },
      latte() {
        this.american()
        console.log('加点奶');
      },
      vanillaLatte() {
        this.latte();
        console.log('再加香草糖浆');
      },
      mocha() {
        this.latte();
        console.log('再加巧克力');
      }
    }
  
    // 关注咖啡机状态切换函数
    changeState(state) {
      this.state = state;
      if (!this.stateToProcessor[state]) {
        return;
      }
      this.stateToProcessor[state]();
    }
  }
  
  const mk = new CoffeeMaker();
  mk.changeState('american');


//总结：

/* 
状态模式(State Pattern) :
允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类。
解决的问题：
对象映射，且用到了操作对象的内部属性
that:this可以做外键
然后方便在内部类函数中使用this.that获取外层对象

*/