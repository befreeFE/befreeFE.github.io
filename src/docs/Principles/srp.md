## 单一职责原则

就一个类而言，应该仅有一个引起它变化的原因。在js中，需要用到类的场景并不多，单一职责原则更多地是被运用在对象或者方法级别上。

单一职责原则(SRP)的职责被定义为"引起变化的原因"。如果我们有两个动机去改写一个方法，你们这个方法就具有两个职责。

SRP原则体现为：一个对象 ( 方法 ) 只做一件事情。

代理模式，迭代器模式，单例模式和装饰者模式都属于SRP原则运用。

### 代理模式

```js
let myImage = (()=>{
  let imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  return {
    setSrc(src){
      imgNode.src = src
    }
  }
})()

let proxyImage = (()=>{
  let img = new Image
  img.onload = function(){
    myImage.setSrc(this.src)
  }
  return {
    setSrc(src){
      myImage.setSrc('')
      img.src = src
    }
  }
})()
```

把添加img和预加载的职责分开到两个对象中，两个对象各自都只有一个呗修改的动机。

### 迭代器模式

```js
  let each = (obj,callback){
    let value,i=0,length = obj.length,isArray = isArraylike(obj)

    if(isArray){
      for(;i<length;i++){
        callback.call(obj[i],i,obj[i])
      }
    }else{
      for(i in obj){
        value = callback.call(obj[i],i,obj[i])
      }
    }

    return obj
  }

  let appendDiv = (data)=>{
    each(data,(i,n)=>{
      let div = document.createElement('div')
      div.innerHTML = n
      document.body.appendChild(div)
    })
  }
```

### 单例模式

```js
  let getSingle = (fn)=>{
    let ret
    return function(){
      return ret || (ret=fn.apply(this,arguments))
    }
  }

  let createLoginLayer = ()=>{
    let div = document.createElement('div')
    div.innerHTML = '我是登录浮窗'
    document.body.appendChild(div)
    return div
  }

```

### 装饰者模式

使用装饰者模式的时候，我们通常让类或者对象一开始只具有一些基础的职责，更多的职责在代码运行时被动态装饰到对象上面。

装饰者模式可以为对象动态增加职责，从另一个角度来看，这也是分离职责的一种方式。

```js
  Function.prototype.after = (afterFn)=>{
    return ()=>{
      let ret = this.apply(this,arguments)
      afterFn.apply(this,arguments)
      return ret
    }
  }

  let showLogin = ()=>{
    console.log('打开登录浮窗')
  }

  let log = ()=>{
    console.log('上报标签为':+this.getAttribute('tag'))
  }

  document.getElementById('button').onclick = showLogin.after(log)
```

SRP原则的应用难点是如何去分离职责

### 何时应该分离职责

并不是所有原则都应该一一分离。

如果随着需求的变化，有两个职责总是同时变化，那就不必分离他们。

职责的变化轴线仅当他们确定会发生变化时才具有意义，即使两个职责已经被耦合在一起，但他们还没有发生改变的征兆，那么也许没有必要主动分离它们。

在方面性跟稳定性之间要有一些取舍。未必要在任何时候都一成不变地遵守原则。

### SRP原则的优缺点

SRP原则的优点是降低了单个类或者对象的复杂度，按照职责把对象分解成更小的粒度，有助于代码复用。























































