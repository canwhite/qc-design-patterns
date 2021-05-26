/* lazy-Load
它是针对图片加载时机的优化，
我们会采取“先占位，后加载”的方式来展示图片
——在元素露出之前，我们给一个div作占位，
当它滚动到可视区域内时，再即时的加载真实的图片资源，
既减轻了性能压力，又保住了用户体验 

除了上边的lazy-Load
还有一种操作是“图片预加载”
是为了避免网络不好，或者图片太大时，页面长事件给用户留白的尴尬

操作是
1.先让这个 img 标签展示一个占位图，
2.然后创建一个 Image 实例，让这个 Image 实例的src指向真实的目标图片地址、
观察该 Image 实例的加载情况 
3.当其对应的真实图片加载完毕后，即已经有了该图片的缓存内容，
再将 DOM 上的 img 元素的 src 指向真实的目标图片地址。
4.此时我们直接去取了目标图片的缓存，所以展示速度会非常快

*/
//上面的思路，我们不假思索的实现如下
class PreLoadImage0{
    //占位图的Url地址
    static LOADING_URL = "xxxxxx";
    constructor(imgNode){
        this.imgNode = imgNode;
    }

    //该方法用于设置真实的图片地址
    setStr(targetUrl){
        //img节点初始时候展示的时候是一个占位图
        this.imgNode.src = PreLoadImage0.LOADING_URL;//静态资源的使用
        //创建一个帮我们加载图片的Image实例
        const image = new Image();
        //监听目标图片加载的情况，完成时再将Dom上的img节点的src属性设置为目标图片的url
        //这是监听，开始加载在下边
        image.onload = ()=>{
            this.imgNode.src = targetUrl;
        }
        image.src = targetUrl;//开始加载图片

    }
}

/* PreLoadImage 乍一看没问题，但其实违反了我们设计原则中的单一职责原则。
PreLoadImage
不仅要负责图片的加载，
还要负责 DOM 层面的操作（img 节点的初始化和后续的改变）
这样一来，就出现了两个可能导致这个类发生变化的原因。


好的做法是将两个逻辑分离，
PreLoadImage专心去做DOM层面的事情（真实 DOM 节点的获取、img 节点的链接设置），
再找一个对象来专门来帮我们搞加载


*/