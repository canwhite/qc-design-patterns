//提供统一接口，用来访问子系统一群的接口
//外观模式定义了高层接口，让子系统更容易访问
/* 
// a.js
export default {
    getA (params) {
      // do something...
    }
  }
  
// b.js 
export default {
    getB (params) {
        // do something...
    }
}

// app.js  外观模式为子系统提供同一的高层接口
import A from './a'
import B from './b'
export default {
    A,
    B
} 

//然后我们就可以通过app.js去统一管理A和B的接口
//通过统一接口去调用子系统

import app from './app'

app.A.getA(params);
app.B.getB(params);



*/



