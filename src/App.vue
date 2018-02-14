<template>
  <div id="app">
    <div class="navbar">
      <div class="navbar-left" @click="back" v-show="!$store.state.isHome && !$store.state.isTimeline"><i class="fa fa-angle-left left-arrow"></i></div>
      <div class="navbar-middle" v-show="!$store.state.isHome">{{ $store.state.title }}</div>
      <div class="icon_personal" v-show="$store.state.isHome || $store.state.isTimeline"></div>
      <div class="navbar-middle-tabs" v-show="$store.state.isHome">
        <div class="tab_ele"><router-link :to="{path: '/index/cards/interested'}">关注</router-link></div>
        <div class="tab_ele"><router-link :to="{path: '/index/cards/hot'}">热门</router-link></div>
      </div>
      <div class="navbar-right" v-show="$store.state.isTimeline"><router-link :to="{path: '/publish'}"><span class="write-btn"></span></router-link></div>
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

<style lang="less" scoped>
#app {
  font-family: 'Pingfang SC';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
  height: 100%;
  .popup {
    width: 248px;
    height: 128px;
    background-color: #fff;
    z-index: 9999999 !important;
  }
  .navbar {
    .navbar-middle-tabs {
      display: flex;
      position: absolute;
      bottom: 8px;
      font-size: 19px;
      text-align: center;
      width: 125px;
      height: 30px;
      left: 50%;
      transform: translateX(-50%);
      .tab_ele {
        width: 50%;
        & > a {
          color: rgba(255, 255, 255, .7);
          display: inline-block;
          height: 100%;
          position: relative;
          transition: all .4s;
          &.router-link-active {
            color: #fff;
            transition: all .4s;
            &::after {
              content: '';
              position: absolute;
              width: 36px;
              height: 4px;
              border-radius: 2px;
              background-color: #fff;
              bottom: -4px;
              left: 0;
            }
          }
        }
      }
    }
    .icon_personal {
      width: 19px;
      height: 20px;
      position: absolute;
      bottom: 16px;
      left: 16px;
      background: url('../static/images/personal@3x.png') 100% e('/') 100% no-repeat;
    }
    .navbar-right {
      position: absolute;
      transform: translateY(50%);
      bottom: 50%;
      right: 17px;
      width: 17px;
      height: 17px;
      & > a {
        display: inline-block;
        height: 17px;
        width: 17px;
        & > span.write-btn {
          display: inline-block;
          width: 17px;
          height: 17px;
          background: url('../static/images/edit@3x.png') 100% e('/') 100% no-repeat; 
        }
      }
    }
  }
}
</style>