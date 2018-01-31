<template>
  <div id="app">
    <div class="navbar">
      <div class="navbar-left" @click="back" v-show="!$store.state.isHome"><i class="fa fa-angle-left left-arrow"></i></div>
      <div class="navbar-middle">{{ $store.state.title }}</div>
    </div>
    <transition :enter-active-class="$store.state.inClass" :leave-active-class="$store.state.leaveClass" mode="out-in">
      <router-view/>
    </transition>
    <van-popup v-model="$store.state.showLogin" position="right" class="popup" id="popup">
      <h2>Login</h2>
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
      if (to.query.login) {
        this.$store.commit('toggleLogin', true)
      } else {
        this.$store.commit('toggleLogin', false)
      }
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
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
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>

