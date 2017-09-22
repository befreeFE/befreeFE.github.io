## 开放封闭原则

通过动态装饰函数的方式，修改window
```js
Function.prototype.after = (afterFn)=>{
  return ()=>{
    let ret = this.apply(this,arguments)
    afterFn.apply(this,arguments)
    return ret
  }
}

window.onload = ( window.onload || function(){} ).after(function(){

})
```

### 用对象的多态性消除条件分支

```js
let makeSound = (animal)=>{
  animal.sound()
}

let Duck = ()=>{}
Duck.prototype.sound = ()=>{
  console.log('')
}

let Chicken = ()=>{}
Chicken.prototype.sound = ()=>{
  console.log('')
}

makeSound(new Duck())
makeSound(new Chicken())

```

最明显的就是找出程序中将要发生变化的地方，然后把变化封装起来。

其他编写开放封闭原则的方式

1. 放置挂钩

放置挂钩也是分离变化的一种方式。我们在程序有可能发生变化的地方放置一个挂钩，挂钩的返回结果决定了程序的下一步走向。

```js
 let Beverage = (param)=>{
    let boilWater = ()=>{console.log('aaa')}
    let brew = param.brew || ()=>{throw new Error('aaa')}
    let F = ()=>{};
    F.prototype.init = ()=>{
      boilWater();
      brew();
    }

    return F
  }

```

在Template Method模式中的父类是一个相当稳定的类，由于子类的数量是无限制的，总会与一些个性化的子类迫使我们不得不去改变已经封装好的算法骨架。

于是我们可以在父类中的某个容易变化的地方放置挂钩，挂钩的返回结果由具体子类决定。这样一来，程序就拥有了变化的可能。

2. 使用回调函数

在js中，函数可以作为参数传递给另一个函数，这是高阶函数的意义之一。在这种情况下，我们通常会把这个函数称为回调函数。

回调函数是一种特殊的挂钩。我们可以把一部分易于变化的逻辑封装在回调函数里，然后把回调函数当做参数传入一个稳定和封闭的函数中。

当回调函数被执行的时候，程序就可以因为回调函数的内部逻辑不通，而产生不通的结果

### 设计模式中的开放封闭原则

有一种说法是，设计模式就是给做的好的设计取个名字。

1. 发布订阅模式

2. 模板方法模式

3. 策略模式

4. 代理模式

5. 职责链模式

- 挑选出最容易变化的地方，然后构造抽象来封闭这些变化。

- 在不可避免发生修改的时候，尽量修改那 相对容易修改的地方。
