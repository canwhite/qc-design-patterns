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




