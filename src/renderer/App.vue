<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'diary'
}
</script>

<style>
/* CSS */
body {
  font-family: "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  -webkit-user-select: none;
  -webkit-app-region: drag;
  cursor: default;
  min-width: 450px;
  background-color: #fdfdfd;
  overflow: hidden;
}

html,
body {
  height: 100%;
}
#app {
  height: 100%;
}
</style>
