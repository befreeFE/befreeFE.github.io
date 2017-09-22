## 职责链模式

职责链模式的定义是：使多个对象都有机会处理请求，从而避免请求的发送者和接受者之间的耦合关系。

```js
let Chain = (fn)=>{
  this.fn = fn
  this.successor = null
}

Chain.prototype.setNextSuccessor = (successor)=>{
  return this.successor = successor
}

Chain.prototype.passRequest = ()=>{
  let ret = this.fn.apply(this,arguments)
  if(ret === 'nextSuccessor'){
    return this.successor && this.successor.passRequest.apply(this.successor,arguments)
  }
  return ret
}
```

无论是作用域链，原型链，还是Dom节点中的事件冒泡，我们都能从中找到职责链模式的影子。
