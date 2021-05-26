/* 生产实践 */
/*
首先是HOC，这个是因为接收一个comp，然后提供容器，最后再返回一个comp
高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件。
这个因为在其它地方有了实现了，所以这里就不重复些了 */

//------------装饰器------------------
import React, { Component } from 'react'
const BorderHoc = WrappedComponent => class extends Component {
  render() {
    return <div style={{ border: 'solid 1px red' }}>
      <WrappedComponent />
    </div>
  }
}
export default borderHoc

//-----------目标组件--------------------
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
export default TargetComponent 

