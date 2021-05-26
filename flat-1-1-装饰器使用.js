/* ES7中的装饰器  */

/*
-------------------------------------
use1:使用typescript转译

使用tsc转译下
npm i typescript -g

tsc flat-1-1-装饰器使用.ts

文件夹出现了flat-1-1-装饰器使用.js
用node运行这个js文件就可以了

-------------------------------------
//use2:使用babel

npm install babel-preset-env babel-plugin-transform-decorators-legacy --save-dev
在.babelrc中
{
  "presets": ["env"],
  "plugins": ["transform-decorators-legacy"]
}

全局装cli
npm install babel-cli -g

输出转译文本,-o输出前的文件是输入，-o后的是输出文件
babel test.js -o babel_test.js

*/

function classDecorator(target) {
    //此处的target是被修饰的类本身
    target.hasDecorator = true
  	return target
}

// 将装饰器“安装”到Button类上
@classDecorator
class Button {
    constructor(name) {
        this.name = name;
    }
}
// 验证装饰器是否生效
console.log('Button 是否被装饰了：', Button.hasDecorator)


// 当然也可以用同样的语法糖去装饰类中的方法
//target：对类进行修饰的时候target指向的是类本身，
//  对方法进行修饰的时候，因为方法是原型的拓展，所以指向Buttton.prototype，指向类的原型对象
//name：是我们修饰的目标属性的属性名
//descriptor：
/* 它是 JavaScript 提供的一个内部数据结构、一个对象，
专门用来描述对象的属性。它由各种各样的属性描述符组成，这些描述符又分为数据描述符和存取描述符：
------
数据描述符：
包括 
value（存放属性值，默认为默认为 undefined）
writable（表示属性值是否可改变，默认为true）
enumerable（表示属性是否可枚举，默认为 true）
configurable（属性是否可配置，默认为true）。
------
存取描述符：包括 
get 方法（访问属性时调用的方法，默认为 undefined），
set（设置属性时调用的方法，默认为 undefined ）
------
很明显，拿到了 descriptor，就相当于拿到了目标方法的控制权。通过修改 descriptor，我们就可以对目标方法为所欲为的逻辑进行拓展了~ */
function funcDecorator(target,name,descriptor){

    let originalMethod = descriptor.value;
    console.log("--name--",name);//--name-- onClick
    console.log("--value--",descriptor.value);//--value-- [Function: onClick]
    //这里相当于把下边Button的onClick重构以下
    descriptor.value = function(){
        console.log("我是func的装饰器逻辑");
        //将当前的函数的内容挂载在原onClick上
        return originalMethod.apply(this,arguments);
    }
    //最后返回描述器
    return descriptor;
}

class Button1 {
    @funcDecorator
    onClick() { 
        console.log('我是Func的原有逻辑')
    }
}

// 验证装饰器是否生效
const button = new Button1()
button.onClick()

/* 
所谓语法糖，即为“美好的表象”;
正如class语法糖背后是大家十分熟悉的ES5构造函数
装饰器背后也是我们的老朋友
 */

/* 装饰器调用的时机
装饰器函数执行的时候，Button实例并不存在，因为实例是运行时动态生成的
而装饰器在静态编译阶段就执行了 */


/* 生产实践 */
/* ====================实践一=========================：
首先是HOC，这个是因为接收一个comp，然后提供容器，最后再返回一个comp
高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件。
这个因为在其它地方有了实现了，所以这里就不重复些了 */
import React, { Component } from 'react'

/* const BorderHoc = WrappedComponent => class extends Component {
  render() {
    return <div style={{ border: 'solid 1px red' }}>
      <WrappedComponent />
    </div>
  }
}
export default borderHoc

//----------------------------------------------
import React, { Component } from 'react'
import BorderHoc from './BorderHoc'

// 用BorderHoc装饰目标组件
@BorderHoc 
class TargetComponent extends React.Component {
  render() {
    // 目标组件具体的业务逻辑
  }
}

// export出去的其实是一个被包裹后的组件
export default TargetComponent */




/* ====================实践二=========================：
使用装饰器修改react-redux
react-redux是热门的状态管理工具。
在其中，我们需要调用connect方法来把状态和组件绑在一起
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import action from './action.js'

class App extends Component {
  render() {
    // App的业务逻辑
  }
}

function mapStateToProps(state) {
  // 假设App的状态对应状态树上的app节点
  return state.app
}

function mapDispatchToProps(dispatch) {
  // 这段看不懂也没关系，下面会有解释。重点理解connect的调用即可
  return bindActionCreators(action, dispatch)
}

// 把App组件与Redux绑在一起
export default connect(mapStateToProps, mapDispatchToProps)(App)


*/
/*========================================
我们调用connect可以返回一个具有装饰作用的函数；
这个函数接收一个react组件作为参数connect(...)(App)
使得目标组件和redux结合，具备redux提供的数据和能力。
既然是能力的拓展，那么一定能用装饰器来写
=========================================*/
/* import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import action from './action.js'

function mapStateToProps(state) {
  return state.app
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(action, dispatch)
}

// 将connect调用后的结果作为一个装饰器导出
export default connect(mapStateToProps, mapDispatchToProps)

//在组件文件里引入connect：
import React, { Component } from 'react'
import connect from './connect.js'   

@connect
export default class App extends Component {
  render() {
    // App的业务逻辑
  }
} */


/* ====================实践三=========================：

优质源码阅读
这里就要给大家推荐一个非常赞的装饰模式库 —— core-decorators。
core-decorators 帮我们实现好了一些使用频率较高的装饰器，
比如@readonly(使目标属性只读)、
@deprecate(在控制台输出警告，提示用户某个指定的方法已被废除)等等等等。
@debounce
这里强烈建议大家把 core-decorators 作为自己的源码阅读材料，
你能收获的或许比你想象中更多~




*/