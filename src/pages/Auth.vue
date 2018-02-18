<template>
  <div class="content">
    <router-view></router-view>
  </div>  
</template>

<script>
export default {
  name: 'auth'
}
</script>

<style lang="less" scoped>
.content {
  height: 100%;
  box-sizing: border-box;
  padding-top: 55px;
  background-color: #f4f4f4;
}
</style>
