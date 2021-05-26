/* 构造器模式 */

/* const liLei = {
    name: '李雷',
    age: 25,
    career: 'coder',
}

const hanMeiMei = {
    name: '韩梅梅',
    age: 24,
    career: 'product manager'
} */

/* 上边只有李雷和韩梅梅，如果有500人呢？ */

function User(name,age,career){
    this.name = name;
    this.age = age;
    this.career = career;
}

const lilei = User('李雷',25,"coder")
/* 在创建user的过程中，谁变了，谁不变？

很明显，变的是每个user的姓名、年龄、工种这些值，这是用户的个性，
不变的是每个员工都具备姓名、年龄、工种这些属性，这是用户的共性。 */

/* 构造器做了什么？

构造器保持共性不变，个性灵活 
对变与不变进行了抽离，本质属性是共性，变化的是个性
基本盘是共性，在基本盘上的是个性
*/