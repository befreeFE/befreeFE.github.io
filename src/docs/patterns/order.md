## 命令模式

命令模式中的命令指的是一个执行某些特定事情的指令。

设计模式的主题总是把不变的事物和变化的事物分离开来。

命令模式的由来，其实是回调函数的一个面向对象的替代品。

用闭包实现的命令模式如下:

```js
let refresh = (receiver){
  return {
    execute(){
      receiver.refresh()
    }
  }
}

let setCommand = (button,command){
  button.onclick = (){
    command.execute()
  }
}

var a = refresh = (MenuBar)

setCommand(button1,a)
```

命令模式的作用不仅是用来封装运算块，而且可以很方便地给命令对象增加撤销操作。

### 宏命令

宏命令是一组命令的集合,通过执行宏命令的方式，可以一次执行一批命令。

```js
let closeDoor = {
  execute(){
    console.log('关门');
  }
};

let openPc = {
  execute(){
    console.log('开电脑');
  }
}

let openQQ = {
  execute(){
    console.log('登录QQ');
  }
}

let macroCommand = ()=>{
  return {
    commandsList:[],
    add(command){
      this.commandList.push(command)
    },
    execute(){
      for(let i =0,command;command=this.commandsList[i++];){
        command.execute()
      }
    }
  }
}

```

JavaScript可以用高阶函数非常方便地实现命令模式，在JavaScript中命令模式是一种隐形的模式。
