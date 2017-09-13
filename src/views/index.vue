<template>
  <div class="page-container">
    <div class="page-content">
      <router-view></router-view>
    </div>
    <side-nav></side-nav>
  </div>
</template>
<style lang="scss">
.container,
.page-container {
  width: 1140px;
  display: flex;
  padding: 0 30px;
  margin: 20px auto 0;
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

export default {
  data () {
    return {

    }
  },
  mounted () {
  }
}
</script>
