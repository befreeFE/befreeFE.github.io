<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  height: 100%;
}

body {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimSun, sans-serif;
  overflow: auto;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}

a {
  color: #4078c0;
  text-decoration: none;
}

code {
  background-color: #f9fafc;
  padding: 0 4px;
  border: 1px solid #eaeefb;
  border-radius: 4px;
}

button,
input,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
}

.hljs {
  line-height: 1.8;
  font-family: Menlo, Monaco, Consolas, Courier, monospace;
  font-size: 12px;
  padding: 18px 24px;
  background-color: #f9fafc;
  border: solid 1px #eaeefb;
  margin-bottom: 25px;
  border-radius: 4px;
  -webkit-font-smoothing: auto;
}

.main-cnt {
  margin-top: -80px;
  padding: 80px 0 120px;
  box-sizing: border-box;
  min-height: 100%;
}

.container,
.page-container {
  width: 1140px;
  padding: 0 30px;
  margin: 0 auto;
}

.demo {
  margin: 20px 0;
}

@media (max-width: 1140px) {
  .container,
  .page-container {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .container,
  .page-container {
    padding: 0 20px;
  }
}

.header-anchor {
  opacity: 0;
}

table.table {
  border-collapse: collapse;
  width: 100%;
  background-color: #fff;
  color: #5e6d82;
  font-size: 14px;
  margin-bottom: 45px;
  line-height: 1.5em;
  th {
    border-bottom: 1px solid #eaeefb;
    padding: 10px;
    max-width: 250px;
    text-align: left;
    border-top: 1px solid #eaeefb;
    background-color: #eff2f7;
    white-space: nowrap;
  }
  td {
    border-bottom: 1px solid #eaeefb;
    padding: 10px;
    max-width: 250px;
  }
}
</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import 'highlight.js/styles/color-brewer.css'

export default {
  name: 'app'
}
</script>
