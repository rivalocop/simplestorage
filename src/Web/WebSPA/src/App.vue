<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import "assets/styles/main";
  @import '../node_modules/material-design-icons/iconfont/material-icons.css';
  body {
    scroll-behavior: smooth;
    #app{
      background:#F2F4F6;
      height: 100vh;
      overflow: auto;
    }
  }
</style>
