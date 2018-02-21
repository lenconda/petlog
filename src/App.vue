<template>
  <div id="app">
    <div class="navbar" v-show="$store.state.showTitle">
      <div class="navbar-left" @click="back" v-show="!$store.state.isHome && !$store.state.isTimeline"></div>
      <div class="navbar-middle" v-show="!$store.state.isHome">{{ $store.state.title }}</div>
      <div class="icon_personal" v-show="$store.state.isHome || $store.state.isTimeline"></div>
      <div class="navbar-middle-tabs" v-show="$store.state.isHome">
        <div class="tab_ele"><router-link :to="{path: '/index/cards/interested'}">关注</router-link></div>
        <div class="tab_ele"><router-link :to="{path: '/index/cards/hot'}">热门</router-link></div>
      </div>
      <div class="navbar-right" v-show="$store.state.isTimeline"><router-link :to="{path: '/publish'}"><span class="write-btn"></span></router-link></div>
      <div class="navbar-right" v-show="$store.state.isHome"><span class="tag-btn" @click="tag = !tag"></span></div>
    </div>
    <transition :enter-active-class="$store.state.inClass" :leave-active-class="$store.state.leaveClass" mode="out-in">
      <router-view/>
    </transition>
    <van-popup v-model="$store.state.showLogin" class="popup">
      <h2><i class="iconfont ptsh-close" @click="closeLogin"></i>Login</h2>
    </van-popup>
    <van-popup v-model="tag" position="top" class="tags">
      <div class="tags-wrapper">
        <div class="tag-list">
          <label class="tag-wrapper" v-for="(tag, index) in tags" v-show="randomShow.indexOf(index) > -1">
            <input type="checkbox" v-model="selectedTags" :value="tag">
            <span class="tag-content">{{ tag }}</span>
          </label>
        </div>
        <div class="refresh-wrapper" @click="random">
          <i class="refresh-btn"></i>
          <span>换一批</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      isHome: true,
      tag: false,
      tags: ['狗年大吉', '喵星人', '铲屎官', '萌宠', 'lorem', 'ipsum', 'sim', 'dolor', 'asda', 'asdasdasd', 'uhdwiud', 'a78euqn', 'asjdh72y788', '123ad', 'weaas12', 'qweas', '123', 'asd', 'foo', 'bar'],
      randomShow: []
    }
  },
  watch: {
    '$route' (to, from) {
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
    random() {
      this.randomShow = []
      for (var i = 0; i < 10; i++) {
        this.randomShow.push(parseInt(Math.random() * (this.tags.length + 1), 10))
      }
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
    z-index: 2014;
    .navbar-left {
      background: url('../static/images/back@3x.png') 100% e('/') 100% no-repeat;
      display: inline-block;
      width: 9px;
      height: 16.5px;
    }
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
      bottom: 50%;
      transform: translateY(50%);
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
      .tag-btn {
        display: inline-block;
        width: 19px;
        height: 20px;
        background: url('../static/images/tag_index@3x.png') 100% e('/') 100% no-repeat;
      }
    }
  }
  .tags {
    width: 100%;
    background-color: #fff;
    top: 55px;
    .tags-wrapper {
      width: 100%;
      height: 220px;
      background-color: #f5f5f5;
      .tag-list {
        width: 100%;
        height: 143px;
        overflow-y: auto;
        padding-top: 17px;
        text-align: left;
        .tag-wrapper {
          display: inline-block;
          font-size: 16px;
          margin: 0 10px 10px 10px;
          input {
            display: none;
          }
          .tag-content {
            text-align: center;
            display: inline-block;
            width: 100%;
            height: 100%;
            padding: 6px;
            margin: 0 2.5px;
            border-radius: 4px;
            background-color: #fff;
            border: 1px solid #949494;
            color: #555555;
            transition: all .4s;
          }
        }
      }
      .refresh-wrapper {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        .refresh-btn {
          display: inline-block;
          width: 21.5px;
          height: 18.5px;
          background: url('../static/images/refresh@3x.png') 100% e('/') 100% no-repeat;
          margin-right: 5.5px;
        }
        span {
          display: inline-block;
          font-size: 12.5px;
          line-height: 1;
          color: #aaa;
        }
      }
    }
  }
}
</style>