<template>
  <div class="content">
    <router-link :to="{name: 'test1'}" class="test">To /test1</router-link>
    <van-button type="danger" @click="swichPopup">Show Popup</van-button>
    <van-popup v-model="custPopup.show" position="right" class="popup">hahaha
      <van-button @click="swichPopup">Close Popup</van-button>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'index',
  mounted () {
    this.$store.commit('modNavbar', true)
    this.$store.commit('modClass', {inclass: 'slideInRight', leaveclass: 'slideOutLeft'})
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
  }
}
</script>

<style scoped>
.popup {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
