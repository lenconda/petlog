<template>
  <div>
    <h1>Welcome to Test1!!!</h1>
  </div>
</template>

<script>
export default {
  name: 'test1',
  mounted () {
    this.$store.commit('modNavbar', false)
    this.$store.commit('modClass', {inclass: 'slideInLeft', leaveclass: 'slideOutRight'})
  }
}
</script>

<style scoped>

</style>
