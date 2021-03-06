# qc-design-patterns
常用设计模式学习，创建型、结构型和行为型


## 常规思考
从特征触发到默写  
识别题目特征 —— catch题目想要考查的知识点 —— 快速在脑海中映射出它对应的解决方法  
所以我们在学习的时候，可以明确这类只是的特征，以方便方便后期特征触发默写


## 设计模式是干什么的？

>每一个模式描述了一个在我们周围不断重复发生的问题，以及该问题的解决方案的核心。
>这样，你就能一次又一次地使用该方案而不必做重复劳动。 —— Christopher Alexander




驾驭技术的能力，具体来说可以分为以下三层

* 能用健壮的代码解决具体的问题
* 能用抽象的思维来应对复杂的系统
* 能用工程化的思想去规划更大规模的业务

很多人缺乏的并不是这种高瞻远瞩的激情，而是我们前面提到的“不变能力”中最基本的那一点——用健壮的代码去解决具体的问题的能力。
这是基线，基线越坚实，越容易发展后边两项；
而设计模式就是为了提供健壮的代码；
所以说，想做靠谱开发，想掌握设计模式




## 设计原则
"SOLID" 是由罗伯特·C·马丁在 21 世纪早期引入的记忆术首字母缩略字，指代了面向对象编程和面向对象设计的五个基本原则。
设计原则是设计模式的指导理论，它可以帮助我们规避不良的软件设计。SOLID 指代的五个基本原则分别是：
	
* 单一功能原则（Single Responsibility Principle）

* 开放封闭原则（Opened Closed Principle）

* 里式替换原则（Liskov Substitution Principle）

* 接口隔离原则（Interface Segregation Principle）
 
* 依赖反转原则（Dependency Inversion Principle）


主要用到的设计模式都围绕“单一功能”和“开放封闭”

## 设计模式的核心思想——封装变化
软件设计越来越复杂的罪魁祸首，就是“变化”

如果我们写个业务，初始版本是1.0，一百年之后还是1.0，那么这个版本可以随便写

但是实际的开发中，不发生变化的代码基本不存在

所以，我们要把变化的影响最小化

——将变和不变分离，保证变化的部分灵活，不变的部分稳定

这样的过程就叫做封装变化


## 设计模式的“术”

所谓“术”，就是23种设计模式
在修言的小册里边，分为创建型，结构型和行为型


无论是创造型，结构型还是行为型，这些具体的设计模式都是用自己的方式取封装不同类型的变化

* 创建型模式：封装了创建对象过程中的变化，eg：工厂模式，它做的事情是将创建对象的过程抽离
	
* 结构型模式：封装的是对象之间组合方式的变化，目的在于灵活表达对象间的配合和依赖关系
	 
* 行为型模式：将对象千变万化的行为进行抽离，确保我们能更安全，更方便的进行更改



封装变化，封装的这是软件中那些不稳定的要素，它是一种防患未然的行为，抽离了变化，为未来的拓展提供了无限的可能