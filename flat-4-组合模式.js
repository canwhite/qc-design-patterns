/*组合模式是用小的子对象来构成更大的对象，
而这些小的对象本身也许是由更小的孙子对象构成的
这个更好的案例是fiber tree
这里只是一个简单的实现
*/


/******************************* Folder ******************************/
var Folder = function (name) {
    this.name = name;
    this.files = [];
    //添加删除方法的时候就有点意思了，需要向父类指了
    //添加this.parent属性
    this.parent = null;

  };
  Folder.prototype.add = function (file) {
    //在父类这add的时候，子类就和父类建立的关系
    file.parent = this;
    this.files.push(file);
  };
  Folder.prototype.scan = function () {
    console.log('开始扫描文件夹: ' + this.name);
    for (var i = 0, file, files = this.files; file = files[i++];) {
      file.scan();
    }
  };
  //添加一个folder的remove方法
  Folder.prototype.remove = function () {
    if (!this.parent) { //根节点或者树外的游离节点
      return;
    }
    for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
      var file = files[l];
      if (file === this) {
        files.splice(l, 1);
      }
    }
  };

  


  /******************************* File ******************************/
  var File = function (name) {
    this.name = name;
    //关于remove，做和上边相同的操作
    this.parent = null;

  };
  File.prototype.add = function () {
    throw new Error('文件下面不能再添加文件');
  };
  File.prototype.scan = function () {
    console.log('开始扫描文件: ' + this.name);
  };
  
  //删除操作
  File.prototype.remove = function () {
    if (!this.parent) { //根节点或者树外的游离节点
      return;
    }
  
    for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
      var file = files[l];
      if (file === this) {
        files.splice(l, 1);
      }
    }
  };


  /******************************* Run ******************************/


  var folder = new Folder('学习资料');
  var folder1 = new Folder('JavaScript');
  var folder2 = new Folder('jQuery');
  var file1 = new File('JavaScript 设计模式与开发实践');
  var file2 = new File('精通jQuery');
  var file3 = new File('重构与模式')
  folder1.add(file1);
  folder2.add(file2);
  folder.add(folder1);
  folder.add(folder2);
  folder.add(file3);
  
  var folder3 = new Folder('Nodejs');
  var file4 = new File('深入浅出Node.js');
  folder3.add(file4);
  var file5 = new File('JavaScript 语言精髓与编程实践');
  
  folder.add(folder3);
  folder.add(file5);
  
  folder1.remove(); //移除文件夹
  folder.scan();
  


