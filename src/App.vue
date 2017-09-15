<template>
  <div id="app">
    <main-header></main-header>
    <div class="main-cnt">
      <router-view></router-view>
    </div>
    <main-footer></main-footer>
  </div>
</template>
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

::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

 ::-webkit-scrollbar-thumb {
  background: #c5c5c5;
  border-radius: 10px;
  border: whiteSmoke solid 3px;
}

hr {
  border: solid 1px #eaeefb;
  margin: 30px 0;
  height: 0;
}
.container,
.page-container {
  width: 1140px;
  display: flex;
  padding: 0 30px;
  margin: 20px auto 0;
  .tip {
    padding: 8px 16px;
    margin: 20px 0;
    background-color: #ECF8FF;
    border-radius: 4px;
    border-left: #50bfff 5px solid;

    code {
      background-color: rgba(#fff, .7);
      color: #445368;
    }
  }
}

.page-content {
  flex: 1;
}

.page-container p {
  font-size: 14px;
  color: #5e6d82;
  line-height: 1.5em;
}

.page-container h2,
.page-container h3,
.page-container h4,
.page-container h5 {
  font-weight: 400;
  color: #1f2f3d;
}

.page-container h2 a,
.page-container h3 a,
.page-container h4 a,
.page-container h5 a {
  float: left;
  margin-left: -20px;
  opacity: 0;
  cursor: pointer;
}
</style>
<script>
import 'highlight.js/styles/color-brewer.css'

export default {
  name: 'app'
}
</script>
