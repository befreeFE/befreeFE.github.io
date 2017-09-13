<template>
  <div class="side-nav" v-if="showSideNav">
    <el-menu :default-active="$route.path" router>
      <el-menu-item :index="item.path" v-for="(item,index) in routesConfig" :key="index" v-if="!item.chlidren">{{item.name}}</el-menu-item>
      <el-submenu :index="item.path" v-for="(item,index) in routesConfig" :key="index" v-else>
        {{item.name}}
        <el-menu-item :index="child.path" v-for="(child,index) in item" :key="index">
          {{child.name}}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<style lang="scss">
.side-nav {
  width: 260px;
  margin: 20px 40px;
}

.el-menu-vertical-demo {
  width: 260px;
  position: fixed;
}
</style>
<script>
import routes from '@/router/routes'

export default {
  data () {
    return {
      routesConfig: [],
      showSideNav: false
    }
  },
  methods: {
    getRoute () {
      if (this.$route.path === '/') {
        this.showSideNav = false
        return
      }
      routes.forEach((item) => {
        if (this.$route.path.indexOf(item.path) !== -1 && item.path !== '/') {
          this.routesConfig = item.children.map((child) => {
            return {
              path: child.path,
              name: child.name
            }
          })
        }
      })
      this.showSideNav = true
    }
  },
  watch: {
    '$route': 'getRoute'
  },
  mounted () {
    this.getRoute()
  }
}
</script>
