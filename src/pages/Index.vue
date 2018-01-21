<template>
  <div class="content">
    <router-link :to="{name: 'test1'}" class="test">To /test1</router-link>
  </div>
</template>

<script>
export default {
  name: 'index',
  mounted () {
    this.$store.commit('modNavbar', true)
    this.$store.commit('modClass', {inclass: 'slideInRight', leaveclass: 'slideOutLeft'})
  }
}
</script>

<style scoped>

</style>
