## 策略模式

策略模式的定义是:定义一系列的算法，把它们各自封装成策略类，算法被 封装在策略类内部的方法里。

将不变的部分和变化的部分隔开是每个设计模式的主题，策 略模式也不例外，策略模式的目的就是将算法的使用与算法的实现分离开来。

## 示例

策略模式也可以用来封装 一系列的“业务规则”。只要这些业务规则指向的目标一致，并且可以被替换使用，我们就可以 用策略模式来封装它们。


如下，表单校验
<br>

::: demo 不使用Element校验机制的情况下，使用策略模式来完成校验。

```html
<template>
  <div>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <div style="width:400px">
        <el-form-item label="用户名">
          <el-input v-model="formLabelAlign.name" @blur="name"></el-input>
          <span class="error">{{errorMsg.name}}</span>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formLabelAlign.password" @blur="password"></el-input>
          <span class="error">{{errorMsg.password}}</span>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formLabelAlign.mobile" @blur="mobile"></el-input>
          <span class="error">{{errorMsg.mobile}}</span>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
/** *********************策略对象**************************/
const strategies = {
  isNonEmpty: function(value, errorMsg) {
    if (value === '') {
      return errorMsg
    }
  },
  minLength: function(value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg
    }
  },
  isMobile: function(value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg
    }
  }
}
/***********************Validator 类**************************/
class Validator {
  constructor() {
    this.cache = []
  }
  add(value, rules) {
    let _this = this
    rules.forEach((rule) => {
      let strategyAry = rule.strategy.split(':')
      let errorMsg = rule.errorMsg
      _this.cache.push(function() {
        let strategy = strategyAry.shift()
        strategyAry.unshift(value)
        strategyAry.push(errorMsg)
        return strategies[strategy].apply(this, strategyAry)
      })
    })
  }
  start() {
    for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
      var errorMsg = validatorFunc()
      if (errorMsg) {
        return errorMsg
      }
    }
  }
}

export default {
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        password: '',
        mobile: ''
      },
      errorMsg: {
        name: '',
        password: '',
        mobile: ''
      }
    }
  },
  methods: {
    name() {
      this.blur('name', [{
        strategy: 'isNonEmpty',
        errorMsg: '用户名不能为空'
      }, {
        strategy: 'minLength:6',
        errorMsg: '用户名长度不能小于6 位'
      }])
    },
    password() {
      this.blur('password', [{
        strategy: 'isNonEmpty',
        errorMsg: '密码不能为空'
      }, {
        strategy: 'minLength:6',
        errorMsg: '密码长度不能小于6 位'
      }])
    },
    mobile() {
      this.blur('mobile', [{
        strategy: 'isNonEmpty',
        errorMsg: '手机号不能为空'
      }, {
        strategy: 'isMobile',
        errorMsg: '请输入合法手机号'
      }])
    },
    blur(obj, errorMsg) {
      let validator = new Validator()
      validator.add(this.formLabelAlign[obj], errorMsg);
      this.errorMsg[obj] = validator.start()
    }
  },
  mounted() {

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

.error {
  color: #f00;
}
</style>
```
:::

<br>

### TODO

在vue中 如`@click`的事件，当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何自己清理它们。

***当我们需要自己绑定事件时就得避免事件重复绑定，以及及时移除不必要的事件。非特殊情况，推荐使用vue事件绑定***

<script>
/** *********************策略对象**************************/
const strategies = {
  isNonEmpty: function(value, errorMsg) {
    if (value === '') {
      return errorMsg
    }
  },
  minLength: function(value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg
    }
  },
  isMobile: function(value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg
    }
  }
}
/***********************Validator 类**************************/
class Validator {
  constructor() {
    this.cache = []
  }
  add(value, rules) {
    let _this = this
    rules.forEach((rule) => {
      let strategyAry = rule.strategy.split(':')
      let errorMsg = rule.errorMsg
      _this.cache.push(function() {
        let strategy = strategyAry.shift()
        strategyAry.unshift(value)
        strategyAry.push(errorMsg)
        return strategies[strategy].apply(this, strategyAry)
      })
    })
  }
  start() {
    for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
      var errorMsg = validatorFunc()
      if (errorMsg) {
        return errorMsg
      }
    }
  }
}

export default {
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        password: '',
        mobile: ''
      },
      errorMsg: {
        name: '',
        password: '',
        mobile: ''
      }
    }
  },
  methods: {
    name() {
      this.blur('name', [{
        strategy: 'isNonEmpty',
        errorMsg: '用户名不能为空'
      }, {
        strategy: 'minLength:6',
        errorMsg: '用户名长度不能小于6 位'
      }])
    },
    password() {
      this.blur('password', [{
        strategy: 'isNonEmpty',
        errorMsg: '密码不能为空'
      }, {
        strategy: 'minLength:6',
        errorMsg: '密码长度不能小于6 位'
      }])
    },
    mobile() {
      this.blur('mobile', [{
        strategy: 'isNonEmpty',
        errorMsg: '手机号不能为空'
      }, {
        strategy: 'isMobile',
        errorMsg: '请输入合法手机号'
      }])
    },
    blur(obj, errorMsg) {
      let validator = new Validator()
      validator.add(this.formLabelAlign[obj], errorMsg);
      this.errorMsg[obj] = validator.start()
    }
  },
  mounted() {

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

.error {
  color: #f00;
}
</style>
