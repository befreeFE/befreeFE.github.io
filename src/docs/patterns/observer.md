## 发布订阅模式

发布订阅模式又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。

在JavaScript中，我们一般用事件模型来替代传统的发布订阅模式。


```js
  let observer = {
    cache:[],
    listen(name,fn){
      if(!this.cache[name]){
        this.cache[name] = []
      }
      this.cache[name].push(fn)
    },
    trigger(){
      let name = [].shift.call(arguments),
          fns = this.cache[name]
      if(!fns ||fns.length === 0){
        return false
      }
      for(let i,fn;fn=fns[i++]){
        fn.apply(this,arguments)
      }
    },
    remove(name,fn){
      let fns = this.cache[name]
      if(!fns){
        return false
      }
      if(!fn){
        fns&&(fns.length=0)
      }else{
        for(let l = fns.length-1;l>=0;l--){
          let _fn = fns[l]
          if(_fn===fn){
            fns.splice(l,1)
          }
        }
      }
    }
  }

  let installEvent = (obj)=>{
    for(let i in evnet ){
      obj[i] = event[i]
    }
  }

```

发布订阅模式可以用一个全局的Event对象来实现，订阅者不需要了解消息来自哪个发布者，发布者也不用知道消息会推送给哪些订阅者，Event作为一个类似中介者的角色，把订阅者和发布者俩联系起来。

```js
let Event = (()=>{
  let clientList = [],
      listen,
      trigger,
      remove;

  listen = (key,fn){
    if(!clientList[key]){
      clientList[key] = [];
    }
    clientList[key].push(fn)
  }

  trigger = ()=>{
    let key = Array.prototype.shift.call(arguments),
        fns = clientList[key]

    if(!fns || fns.length === 0){
      return false
    }
    for(let i = 0,fn;fn=fns[i++];){
      fn.apply(this,arguments)
    }
  }

  remove = (key,fn){
    let fns = clientList[key]
    if(!fns){
      return false
    }
    if(!fn){
      fns && (fns.length = 0)
    }else{
      for(let l = fns.length -1;l>=0;l--){
        let _fn = fns[l]
        if(_fn===fn){
          fns.splice(l,1);
        }

      }
    }
  }

  return {
    listen:listen,
    trigger:trigger,
    remove:remove
  }

})
```

解决命名冲突，以先发布后订阅。

```js

let Event = (()={

  let global = this,
      Event,
      _default = 'default';

  Event = ()=>{
    let _listne,
        _trigger,
        _remove,
        _slice = Array.prototype.slice,
        _shift = Array.prototype.shift,
        _unshift = Array.prototype.unshift,
        namespaceCache = {},
        _create,
        find,
        each = (ary,fn){
          let ret
          for(let i = 0,l = ary.length;i<l;i++){
            let n = ary[i]
            ret = fn.call(n,i,n)
          }
          return ret
        }

    _listen = (key,fn,cache)=>{
      if(!cache[key]){
        cache[key] = []
      }
      cache[key].push(fn)
    }

    _remove = (key,cache,fn)=>{
      if(cache[key]){
        if(fn){
          for(let i = cache[key].length;i>=0;i--){
            if(cache[key][i]===fn){
              cache[key].splice(i,1)
            }
          }
        }else{
          cache[key]=[]
        }
      }
    }

    _trigger = ()=>{
      let cache = _shift.call(arguments),
          key = __shift.call(arguments),
          args = arguments,
          _self = this,
          ret,
          stack = cache[key]

      if(!stack || !stack.length){
        return
      }

      return each(stack,()=>{
        return this.apply(_self,args)
      })
    }

    _create = (namespace)=>{
      let namespace = namespace || _default
      let cache = {},
          offlineStack = [],
          ret = {
            listen(key,fn,last){
              _listen(key,fn,cache)
              if(offlineStack === null){
                return
              }
              if(last === 'last'){
                offlineStack.length && offlineStack.pop()()
              }else{
                each(offlineStack,()=>{
                  this()
                })
              }
              offlineStack = null
            },
            one(key,fn,last){
              _remove(key,cache)
              this.listen(key,fn,last)
            },
            remove(key,fn){
              _remove(key,cache,fn)
            },
            trigger(){
              let fn,
                  args,
                  _self=this
              _unshift.call(arguments,cache)
              args = arguments;
              fn = ()=>{
                return _trigger.apply(_self,args)
              }
              if(offlineStack){
                return offlineStack.push(fn)
              }
              return fn()
            }
          }

      return namespace ?
      (namespaceCache[namespace]?namespaceCache[namespace]) : namespaceCache[namespace] = ret) : ret
    }
    return {
      create:_create,
      one(key,fn,last){
        let event = this.create()
        event.one(key,fn,last)
      },
      remove(key,fn){
        let event = this.create()
        event.remove(key,fn)
      },
      listen(key,fn,last){
        let event = this.create()
        event.listen(key,fn,last)
      }
      trigger(){
        let event = this.create()
        event.trigger.apply(this,arguments)
      }
    }
  }

  return Event

})()

```

发布订阅模式的优点，一位时间上的解耦，二为对象之间的解耦。JavaScript本身也是一门基于事件驱动的语言。不要滥用观察者模式。
