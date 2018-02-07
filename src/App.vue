<template>
  <div id="app">
    <div class="navbar">
      <div class="navbar-left" @click="back" v-show="!$store.state.isHome"><i class="fa fa-angle-left left-arrow"></i></div>
      <div class="navbar-middle" v-show="!$store.state.isHome">{{ $store.state.title }}</div>
      <div class="navbar-middle" v-show="$store.state.isHome"></div>
    </div>
    <transition :enter-active-class="$store.state.inClass" :leave-active-class="$store.state.leaveClass" mode="out-in">
      <router-view/>
    </transition>
    <van-popup v-model="$store.state.showLogin" class="popup">
      <h2><i class="iconfont ptsh-close" @click="closeLogin"></i>Login</h2>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      isHome: true
    }
  },
  watch: {
    '$route' (to, from) {
      console.log(to)
      if (to.hash == '#login') {
        this.$store.commit('toggleLogin', true)
        this.$store.commit('setRef', from.fullPath)
      } else {
        this.$store.commit('toggleLogin', false)
      }
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    closeLogin () {
      this.$store.commit('toggleLogin', false)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Pingfang SC';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: calc(100% - 55px);
  padding-top: 55px;
}
.content {
  height: 100%;
  width: 100%;
}
.popup {
  width: 248px;
  height: 128px;
  background-color: #fff;
  z-index: 9999999 !important;
}
</style>

