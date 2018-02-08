<template>
  <div>

  </div>  
</template>

<script>
export default {
  name: 'index_timeline',
  mounted () {
    this.$store.commit('modNavbar', false)
    this.$store.commit('setTitle', '时间轴')
    this.$store.commit('isTimeline', true)
  },
  destroyed () {
    this.$store.commit('isTimeline', false)
  }
}
</script>

<style scoped>

</style>
