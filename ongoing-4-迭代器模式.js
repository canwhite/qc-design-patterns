/* 
迭代器模式提供一种方法顺序访问一个聚合对象中的各个元素，而又不暴露该对象的内部表示。
 ——《设计模式：可复用面向对象软件的基础》

迭代器模式是设计模式中少有的目的性极强的模式。
所谓“目的性极强”就是说它不操心别的，它就解决这一个问题——遍历。 */

/*================================================
第一部分：公元前
=================================================*/

/* 在js中本身就有一种比较粗陋的遍历方式——Array.prototype.forEach。 */
const arr = [1, 2, 3]
arr.forEach((item, index)=>{
    console.log(`索引为${index}的元素是${item}`)
})


/* //但是forEach并不是万能的,比如下面场景
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>事件代理</title>
</head>
<body>
    <a href="#">链接1号</a>
    <a href="#">链接2号</a>
    <a href="#">链接3号</a>
    <a href="#">链接4号</a>
    <a href="#">链接5号</a>
    <a href="#">链接6号</a>
</body>
<script> 
    const aNodes = document.getElementsByTagName('a')
    console.log('aNodes are', aNodes)
    //我想取其中一个a标签，可以这样做：
    const aNode = aNodes[i]
    //在这个操作的映衬下，aNodes看上去多么像一个数组啊！但当你尝试用数组的原型方法去遍历它时
    //报错aNodes.forEach is not a function
    aNodes.forEach((aNode, index){
        console.log(aNode, index)
    })
</script>
</html>

原来这个aNodes是个假数组！
准确地说，它是一个类数组对象，并没有为你实现好用的forEach方法。
也就是说，要想实现类数组的遍历，你得另请高明。

*/

/* 现在问题就出现了：
普通数组是不是集合？是！
aNodes是不是集合？是！
同样是集合，同样有遍历需求，
而forEach只能做到允许我们不关心数组这一种集合的内部结构，
看来想要一套统一的遍历方案，我们非得请出一个更强的通用迭代器不可了。

JQuery里边就有更强的通用迭代器，数组和节点集合都可以
引入：
<script src="https://cdn.bootcss.com/jquery/3.3.0/jquery.min.js" type="text/javascript"></script>

const arr = [1, 2, 3]
const aNodes = document.getElementsByTagName('a')

$.each(arr, function (index, item) {
    console.log(`数组的第${index}个元素是${item}`)
})

$.each(aNodes, function (index, aNode) {
    console.log(`DOM类数组的第${index}个元素是${aNode.innerText}`)
})

//甚至可以遍历自己的集合对象，是个狼人
const jQNodes = $('a')
$.each(jQNodes, function (index, aNode) {
    console.log(`jQuery集合的第${index}个元素是${aNode.innerText}`)
})

*/


/*=======================================================
第二部分：ES6迭代器
========================================================*/
/* 在“公元前”，
JS原生的集合类型数据结构，只有Array（数组）和Object（对象）；
而ES6中，又新增了Map和Set。
所以ES6推出了统一的遍历接口机制——迭代器（Iterator） 
ES6约定，任何数据结构只要具备Symbol.iterator属性（Symbol.iterator本质是当前数据结构默认的迭代器生成函数），
就可以被遍历
——准确地说，
是被for...of...循环和迭代器的next方法遍历。 
事实上，for...of...的背后正是对next方法的反复调用。


在ES6中，
针对Array、Map、Set、String、TypedArray、函数的 arguments 对象、NodeList 对象
这些原生的数据结构都可以通过for...of...进行遍历
*/
const arr = [1, 2, 3]
const len = arr.length
for(item of arr) {
    console.log(`当前元素是${item}`)
}

/* 之所以能够按顺序一次一次地拿到数组里的每一个成员，
是因为我们借助数组的Symbol.iterator生成了它对应的迭代器对象，
通过反复调用迭代器对象的next方法访问了数组成员，像这样： */
/* 

const arr = [1, 2, 3]
// 通过调用iterator，拿到迭代器对象
const iterator = arr[Symbol.iterator]()

// 对迭代器对象执行next，就能逐个访问集合的成员
iterator.next()
iterator.next()
iterator.next()

 */

//基本等价于下述操作

// 通过调用iterator，拿到迭代器对象
const iterator = arr[Symbol.iterator]()

// 初始化一个迭代结果
let now = { done: false }

// 循环往外迭代成员
while(!now.done) {
    now = iterator.next()
    if(!now.done) {
        console.log(`现在遍历到了${now.value}`)
    }
}

/* 可以看出，for...of...其实就是iterator循环调用换了种写法。
在ES6中我们之所以能够开心地用for...of...遍历各种各种的集合，全靠迭代器模式在背后给力。 */


/*=======================================================
第三部分：一起来实现一个迭代器生成发函数吧
=======================================================*/

/* 楼上我们说迭代器对象全凭迭代器生成函数帮我们生成。
在ES6中，实现一个迭代器生成函数并不是什么难事儿，
因为ES6早帮我们考虑好了全套的解决方案，
内置了贴心的生成器（Generator）供我们使用：
注：本小册不要求ES6基础，但生成器语法比较简单，推荐不了解的同学阅读阮老师的生成器教学光速入门 */

// 编写一个迭代器生成函数
function *iteratorGenerator() {
    yield '1号选手'
    yield '2号选手'
    yield '3号选手'
}

const iterator = iteratorGenerator()

iterator.next()
iterator.next()
iterator.next()

/* 下面我们要做的，不仅仅是写一个迭代器对象，
而是用ES5去写一个能够生成迭代器对象的迭代器生成函数（解析在注释里）： */

// 定义生成器函数，入参是任意集合
function iteratorGenerator(list) {
    // idx记录当前访问的索引
    var idx = 0
    // len记录传入集合的长度
    var len = list.length
    return {
        // 自定义next方法
        next: function() {
            // 如果索引还没有超出集合长度，done为false
            var done = idx >= len
            // 如果done为false，则可以继续取值
            var value = !done ? list[idx++] : undefined
            
            // 将当前值与遍历是否完毕（done）返回
            return {
                done: done,
                value: value
            }
        }
    }
}

var iterator = iteratorGenerator(['1号选手', '2号选手', '3号选手'])
iterator.next()
iterator.next()
iterator.next()
/* 此处为了记录每次遍历的位置，我们实现了一个闭包，借助自由变量来做我们的迭代过程中的“游标”。
运行一下我们自定义的迭代器 */