<template>
  <div class="content">
    <router-view></router-view>
  </div>  
</template>

<script>
export default {
  name: 'auth',
  mounted () {
    console.log('Auth.vue mounted')
    //请求/api/auth，返回1就跳转到/index/interested
    this.$http.get('/api/auth').then(res => {
      if (res.body.status == 1) {
        this.$router.push('/index/cards/interested')
      }
    })
  }
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
