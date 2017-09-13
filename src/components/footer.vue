<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-main">
        <p class="footer-main-title">EMO</p>
        <a href="" class="footer-main-link" target="_blank">反馈指南</a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  height: 120px;
  background-color: #324157;
  color: #a4aebd;
  width: 100%;
  z-index: 1000;
  * {
    word-spacing: 0;
  }

  .container {
    height: 100%;
    box-sizing: border-box;
  }

  .footer-main {
    font-size: 0;
    padding-top: 40px;
    display: inline-block;

    .footer-main-title {
      line-height: 1;
      font-size: 22px;
      margin: 0;
    }

    .footer-main-link {
      display: inline-block;
      margin: 12px 18px 0 0;
      line-height: 1;
      font-size: 12px;
      color: #768193;

      a {
        color: #768193;
        text-decoration: none;
      }
    }
  }
}
</style>

<script type="text/babel">
export default {
  data () {
    return {
    }
  }
}
</script>
