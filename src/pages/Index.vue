<template>
  <div class="content">
    <router-link :to="{name: 'test1'}" class="test">To /test1</router-link>
    <van-button type="danger" @click="swichPopup">Show Popup</van-button>
  </div>
</template>

<script>
export default {
  name: 'index',
  mounted () {
    this.$store.commit('modNavbar', true)
    this.$store.commit('modClass', {inclass: 'slideInRight', leaveclass: 'slideOutLeft'})
    this.$store.commit('setTitle', '宠物秀')
  },
  data () {
    return {
      custPopup: {
        show: false
      }
    }
  },
  methods: {
    swichPopup () {
      this.custPopup.show = !this.custPopup.show
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.query.login) {
        this.custPopup.show = true
      } else {
        this.custPopup.show = false
      }
    }
  }
}
</script>

<style scoped>

</style>
