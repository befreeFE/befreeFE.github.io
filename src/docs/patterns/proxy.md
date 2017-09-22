
## 代理模式

代理模式是为一个对象提供一个代用ֵ或站位符，以便控制对它的访问。

代理模式的关键是，当客户不方便直接访问一个对象或者不满足需求的时候，提供一个替身对象来控制对这个对象的访问，客户实际上访问的是替身对象。

### 虚拟代理

如果网速够快，我们就不需要预加载，那就不需要代理对象，可以选择直接请求本体。

下列使用虚拟代理实现，图片占位符预加载。

::: demo 使用虚拟代理实现图片预加载

```html
<template>
  <div id="box">
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    proxImage() {
      let myImage = (() => {
        let imgNode = document.createElement('img')
        document.getElementById('box').appendChild(imgNode)
        return function(src) {
          imgNode.src = src
        }
      })()

      let proxyImage = (() => {
        let img = new Image()
        img.onload = function() {
          myImage(this.src)
        }
        return function(src) {
          myImage('http://www.w3school.com.cn/i/eg_chinarose.jpg')
          img.src = src
        }
      })()

      proxyImage('http://www.w3school.com.cn/i/eg_tulip.jpg')
    }
  },
  mounted() {
    this.proxImage()
  }
}
</script>

```
:::

###  虚拟代理合并HTTP请求

在web开发中，最大的开销就是网络请求。

假设我们在做一个文件同步的功能，当我们选中一个 checkbox 的时候，它对应的文件就会被同步到另外一台备用服务器上面

::: demo 虚拟代理合并HTTP请求

```html
<template>
  <div>
    <el-checkbox label="文件1" @change="uploadFile"></el-checkbox>
    <el-checkbox label="文件2" @change="uploadFile"></el-checkbox>
    <el-checkbox label="文件3" @change="uploadFile"></el-checkbox>
    <el-checkbox label="文件4" @change="uploadFile"></el-checkbox>
    <el-checkbox label="文件5" @change="uploadFile"></el-checkbox>
    <el-checkbox label="文件6" @change="uploadFile"></el-checkbox>
    <el-checkbox label="文件7" @change="uploadFile"></el-checkbox>
    <div v-for="(item,index) in showList" style="margin-top:30px">{{item}}</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showList:[]
    }
  },
  methods: {
        uploadFile () {
      let target = event.target
      let synchronousFile = (id)=> {
        this.showList.push(`${id}开始同步文件.....`)
      }

      let proxySynchronousFile = (function () {
        let cache = [], // 保存一段时间内需要同步的ID
            timer // 定时器
        return function (id) {
          cache.push(id)
          if (timer) { // 保证不会覆盖已经启动的定时器
            return
          }
          timer = setTimeout(function () {
            synchronousFile(cache.join(',')) // 2 秒后向本体发送需要同步的ID 集合
            clearTimeout(timer) // 清空定时器
            timer = null
            cache.length = 0 // 清空ID 集合
          }, 2000)
        }
      })()
      if (target.checked) {
        proxySynchronousFile(target.value)
      }
    }
  }
}
</script>

```
:::

### 缓存代理
缓存代理可以为一些开销大的运算结果提供暂时的存储，在下次运算时，如果传递进来的参数跟之前一致，则可以直接返回前面存储的运算结果。


::: demo 缓存代理,求乘积函数

```html
<template>
  <div>
    <el-input v-model="arg" placeholder="输入以逗号为分割的参数" style="width:200px"></el-input>
    <el-button type="primary" @click="doFn">计算</el-button>
    {{arg.replace(/,/g,'*')}}={{result}}

    <div style="margin-top:20px">
      缓存结果:{{multCache}}
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
       multCache:{},
      arg:'',
      result:''
    }
  },
  computed: {
    args(){
      return this.arg.split(',')
    }
  },
  methods: {
    mult () {
      let a = 1;
      for (var i = 0,l=arguments.length; i < l; i++) {
        a = a*arguments[i]
      }
      return a
    },
    proxyMult(){
      let args = Array.prototype.join.call(arguments,',')
      if (args in this.multCache) {
        return this.multCache[args]
      }
      return this.multCache[args] = this.mult.apply(this,arguments)
    },
    doFn(){
     this.result = this.proxyMult.apply(null,this.args)
    }
  }
}
</script>

```
:::

### 用高阶函数动态创建代理

```js
/** ************** 计算乘积 *****************/
var mult = function () {
  var a = 1
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a * arguments[i]
  }
  return a
}
/** ************** 计算加和 *****************/
var plus = function () {
  var a = 0
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a + arguments[i]
  }
  return a
}
/** ************** 创建缓存代理的工厂 *****************/
var createProxyFactory = function (fn) {
  var cache = {}
  return function () {
    var args = Array.prototype.join.call(arguments, ',')
    if (args in cache) {
      return cache[args]
    }
    return cache[args] = fn.apply(this, arguments)
  }
}

var proxyMult = createProxyFactory(mult),
  proxyPlus = createProxyFactory(plus)
alert(proxyMult(1, 2, 3, 4)) // 输出：24
alert(proxyMult(1, 2, 3, 4)) // 输出：24
alert(proxyPlus(1, 2, 3, 4)) // 输出：10
alert(proxyPlus(1, 2, 3, 4)) // 输出：10
```

<script>
export default {
  data () {
    return {
      showList:[],
      multCache:{},
      arg:'',
      result:''
    }
  },
  computed: {
    args(){
      return this.arg.split(',')
    }
  },
  methods: {
    proxImage () {
      let myImage = (() => {
        let imgNode = document.createElement('img')
        document.getElementById('box').appendChild(imgNode)
        return function (src) {
          imgNode.src = src
        }
      })()

      let proxyImage = (() => {
        let img = new Image()
        img.onload = function () {
          myImage(this.src)
        }
        return function (src) {
          myImage('http://www.w3school.com.cn/i/eg_chinarose.jpg')
          img.src = src
        }
      })()

      proxyImage('http://www.w3school.com.cn/i/eg_tulip.jpg')
    },
    uploadFile () {
      let target = event.target
      let synchronousFile = (id)=> {
        this.showList.push(`${id}开始同步文件.....`)
      }

      let proxySynchronousFile = (function () {
        let cache = [], // 保存一段时间内需要同步的ID
            timer // 定时器
        return function (id) {
          cache.push(id)
          if (timer) { // 保证不会覆盖已经启动的定时器
            return
          }
          timer = setTimeout(function () {
            synchronousFile(cache.join(',')) // 2 秒后向本体发送需要同步的ID 集合
            clearTimeout(timer) // 清空定时器
            timer = null
            cache.length = 0 // 清空ID 集合
          }, 2000)
        }
      })()
      if (target.checked) {
        proxySynchronousFile(target.value)
      }
    },
    mult () {
      let a = 1;
      for (var i = 0,l=arguments.length; i < l; i++) {
        a = a*arguments[i]
      }
      return a
    },
    proxyMult(){
      let args = Array.prototype.join.call(arguments,',')
      if (args in this.multCache) {
        return this.multCache[args]
      }
      return this.multCache[args] = this.mult.apply(this,arguments)
    },
    doFn(){
     this.result = this.proxyMult.apply(null,this.args)
    }
  },
  mounted () {
    this.proxImage()
  }
}
</script>
