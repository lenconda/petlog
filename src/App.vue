<template>
  <div id="app">
    <div class="navbar">
      <div class="navbar-left" @click="back" v-show="!$store.state.isHome"><i class="fa fa-angle-left left-arrow"></i></div>
      <div class="navbar-middle">{{ $store.state.title }}</div>
    </div>
    <transition :enter-active-class="$store.state.inClass" :leave-active-class="$store.state.leaveClass" mode="out-in">
      <router-view/>
    </transition>
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
      this.$store.commit('setRef', from.fullPath)
    }
  },
  methods: {
    back () {
      this.$router.push(this.$store.state.referer)
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
</style>

