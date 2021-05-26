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
import { connect } from 'react-redux'
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
}
