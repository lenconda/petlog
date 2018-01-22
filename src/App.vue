<template>
  <div id="app">
    <van-nav-bar title="首页" :left-text="$store.state.isHome ? '我的' : '返回'" right-text="按钮" @click-left="" fixed :left-arrow="!$store.state.isHome" @click-right="" />
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
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: calc(100% - 46px);
  padding-top: 46px;
}
.content {
  height: 100%;
  width: 100%;
}
</style>

