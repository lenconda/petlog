<template>
  <div class="content">

  </div>
</template>

<script>
export default {
  name: 'auth',
  mounted () {
    this.$store.commit('toggleHeader', false)
  },
  destroyed () {
    this.$store.commit('toggleHeader', true)
  }
}
</script>

<style lang="less" scoped>
.content {
  height: 100%;
  background-image: linear-gradient(rgba(255, 171, 44, .95), rgba(252, 205, 94, .95));
}
</style>
