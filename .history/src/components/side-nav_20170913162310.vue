<template>
  <div class="side-nav" v-if="routesConfig">
    <el-menu :default-active="$router.path" router>
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
  width: 200px;
  margin: 20px;
}

.el-menu-vertical-demo {
  width: 200px;
  position: fixed;
}
</style>
<script>
import routes from '@/router/routes'

export default {
  data () {
    return {
      routesConfig: []
    }
  },
  methods: {
    getRoute () {
      console.log(this.$route.path)
      this.routesConfig = routes[0].children.map((item) => {
        console.log(item.path)
        if (item.path === this.$route.path) {
          return item
        }
      })[0].children
      console.log(this.routesConfig)
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
