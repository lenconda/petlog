<template>
  <div>
    <router-view></router-view>
  </div>  
</template>

<script>
export default {
  name: 'index_cards',
  mounted () {
    this.$store.commit('modNavbar', true)
    this.$store.commit('setTitle', '宠物记')
  }
}
</script>

<style scoped>

</style>
