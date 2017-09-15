## 单例模式

单例模式的定义是：保证一个类仅有一个实例，并提供一个访问它的全局访问点。应用场景不限于创建单个实例。

一般情况，推荐字面量的形式创建单个对象，而不是基于New的创建方式。设计模式仅提供一种思路，并不限于场景。

## 示例

在某些特殊情况，需要直接对DOM元素添加事件监听。

如下，由于每次事件执行都会添加绑定，结果导致元素绑定重复事件，增大性能开销。

<br>

::: demo 不使用单例模式的情况下绑定事件将导致元素被绑定多个重复事件。

```html
<template>
  <div>
    <div>
      <h4>1、未使用单例</h4>
      <el-button type="primary" @click="bind">
        执行绑定 {{bindNum}}
      </el-button>
      <span ref="btn" class="btn">
        被绑定元素
      </span>
      事件处理次数:{{num}}
    </div>
    <hr>
    <div>
      <h4>2、使用单例</h4>
      <el-button type="success" @click="bind2">
        执行绑定 {{bindNum2}}
      </el-button>
      <span ref="btn2" class="btn">
        被绑定元素
      </span>
      事件处理次数:{{num2}}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      num: 0,
      bindNum: 0,
      num2: 0,
      bindNum2: 0,
      single: null
    }
  },
  methods: {
    toSingle(fn) {
      let result
      return result || (result = fn.apply(this, arguments))
    },
    bindEvent() {
      this.$refs.btn.addEventListener('click', () => {
        this.num++
      })
    },
    bind() {
      this.bindNum++
      this.bindEvent();
    },
    bind2() {
      this.bindNum2++
      if (typeof this.single === 'function') {
        this.single()
      }
    }
  },
  mounted() {
    this.single = this.toSingle(() => {
      this.$refs.btn2.addEventListener('click', () => {
        this.num2++
      })
      return true
    })
  }
}
</script>
<style>
.btn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #c4c4c4;
  color: #1f2d3d;
  margin: 0;
  padding: 10px 15px;
  border-radius: 4px;
}
</style>
```
:::

<br>

### TODO

在vue中 如`@click`的事件，当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何自己清理它们。

***当我们需要自己绑定事件时就得避免事件重复绑定，以及及时移除不必要的事件。非特殊情况，推荐使用vue事件绑定***

<script>
export default {
  data() {
    return {
      num: 0,
      bindNum: 0,
      num2: 0,
      bindNum2: 0,
      single: null
    }
  },
  methods: {
    toSingle(fn) {
      let result
      return result || (result = fn.apply(this, arguments))
    },
    bindEvent() {
      this.$refs.btn.addEventListener('click', () => {
        this.num++
      })
    },
    bind() {
      this.bindNum++
      this.bindEvent();
    },
    bind2() {
      this.bindNum2++
      if (typeof this.single === 'function') {
        this.single()
      }
    }
  },
  mounted() {
    this.single = this.toSingle(() => {
      this.$refs.btn2.addEventListener('click', () => {
        this.num2++
      })
      return true
    })
  }
}
</script>
<style>
.btn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #c4c4c4;
  color: #1f2d3d;
  margin: 0;
  padding: 10px 15px;
  border-radius: 4px;
}
</style>
