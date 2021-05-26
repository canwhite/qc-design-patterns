"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _desc, _value, _class2;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* ES7中的装饰器  */
//装饰器函数，它的第一个参数是目标类
/* node.js还不支持Decorator，可以使用Babel进行转换，也可以在TypeScript中使用Decorator */
// require("./app.js")
// 装饰器函数，它的第一个参数是目标类

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
输出转译文本
babel test.js --out-file babel_test.js

*/

function classDecorator(target) {
    target.hasDecorator = true;
    return target;
}

// 将装饰器“安装”到Button类上

var Button = classDecorator(_class = function Button(name) {
    _classCallCheck(this, Button);

    this.name = name;
}) || _class;
// 验证装饰器是否生效


console.log('Button 是否被装饰了：', Button.hasDecorator);

// 当然也可以用同样的语法糖去装饰类中的方法
//target：指向了Button.prototype
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
function funcDecorator(target, name, descriptor) {
    var originalMethod = descriptor.value;
    console.log("--name--", name);
    console.log("--value--", descriptor.value);
    descriptor.value = function () {
        console.log("我是func的装饰器逻辑");
        return originalMethod.apply(this, arguments);
    };
    return descriptor;
}

var Button1 = (_class2 = function () {
    function Button1() {
        _classCallCheck(this, Button1);
    }

    _createClass(Button1, [{
        key: "onClick",
        value: function onClick() {
            console.log('我是Func的原有逻辑');
        }
    }]);

    return Button1;
}(), (_applyDecoratedDescriptor(_class2.prototype, "onClick", [funcDecorator], Object.getOwnPropertyDescriptor(_class2.prototype, "onClick"), _class2.prototype)), _class2);

// 验证装饰器是否生效

var button = new Button1();
button.onClick();
