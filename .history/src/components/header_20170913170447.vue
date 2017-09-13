<template>
  <header class="header" ref="header">
    <div class="header-container">
      <div class="logo">
        <img src="../assets/logo.png" class="logo-img">
        <h1 class="logo-txt">EMO</h1>
      </div>
      <el-menu theme="dark" :default-active="active" class="el-menu-demo" mode="horizontal" router>
        <el-menu-item index="/">
          首页
        </el-menu-item>
        <el-menu-item :index="item.path" v-for="item in routesConfig" :key="item.name">
          {{item.path}} {{item.name}}
        </el-menu-item>
      </el-menu>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  width: 100%;
  background: #324157;
  color: #bfcbd9;
}

.logo {
  height: 40px;
  display: flex;
  align-items: center;
  .logo-img {
    height: 30px;
  }
  .logo-txt {
    margin-left: 10px;
    font-size: 24px;
  }
}

.header-container {
  width: 1140px;
  padding: 0 30px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between
}
</style>
<script>
import routes from '@/router/routes'

export default {
  data () {
    return {
      routesConfig: [],
      active: '/'
    }
  },
  methods: {
    init () {
      if (this.$route.path === '/') {
        this.active = '/'
      }
      this.routesConfig = routes[0].children
      this.active = this.$route.path === '/' || this.$route.matched[1].path
      console.log(this.$route.matched[1].path)
    }
  },
  watch: {
    '$route': 'init'
  },
  mounted () {
    this.init()
  }
}
</script>
