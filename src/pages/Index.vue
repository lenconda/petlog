<template>
  <div class="content">
    <router-view></router-view>
    <div class="tabbar">
      <div>
        <router-link :to="{path: '/index/cards'}">
          <span class="nav_icon"></span>
          <span class="text">首页</span>
        </router-link>
      </div>
      <div>
        <router-link :to="{path: '/publish'}">
          <span class="nav_icon"></span>
          <span class="text">拍摄</span>
        </router-link>
      </div>
      <div>
        <router-link :to="{path: '/index/timeline'}">
          <span class="nav_icon"></span>
          <span class="text">时间轴</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  beforeMount () {
    this.$store.commit('modNavbar', true)
    this.$store.commit('setTitle', '宠爱时刻')
  },
  created () {
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

<style lang="less" scoped>
.content {
  box-sizing: border-box;
  height: 100%;
  // padding-bottom: 55px;
  padding-top: 55px;
  padding-bottom: 57px;
  overflow-y: auto;
  .tabbar {
    width: 100%;
    border-top: 1px solid #e6e6e6;
    height: 55px;
    position: fixed;
    bottom: 0;
    display: flex;
    background-color: #fff;
    user-select: none;
    div {
      flex-grow: 1;
      a {
        box-sizing: border-box;
        color: #949494;
        font-size: 11.5px;
        padding: 8px 0 6px 0;
        display: inline-block;
        width: 100%;
        height: 100%;
        span.nav_icon {
          display: block;
          width: 27px;
          height: 27px;
          margin: 0 auto;
        }
        &.router-link-active {
          color: #ffa721;
        }
      }
      &:first-child > a {
        /* text-align: left; */
        box-sizing: border-box;
        /* padding-left: 25px; */
        span.nav_icon {
          background: url('../../static/images/home@3x.png') 100% e('/') 100% no-repeat;
        }
        &.router-link-active > span.nav_icon {
          background: url('../../static/images/home_active@3x.png') 100% e('/') 100% no-repeat;
        }
      }
      &:nth-child(2) > a { 
        span.nav_icon {
          margin: 0 auto;
          background: url('../../static/images/camera@3x.png') 100% e('/') 100% no-repeat;
        }
        &.router-link-active > span.nav_icon {
          background: url('../../static/images/camera_active@3x.png') 100% e('/') 100% no-repeat;
        }
      }
      &:last-child > a {
        box-sizing: border-box;
        /* padding-right: 25px; */
        span {
          &.text {
            width: 100%;
            display: inline-block;
            /* text-align: right; */
          }
          &.nav_icon {
            /* margin-right: 4px; */
            background: url('../../static/images/timeline@3x.png') 100% e('/') 100% no-repeat;
          }
        }
        &.router-link-active > span.nav_icon {
          background: url('../../static/images/timeline_active@3x.png') 100% e('/') 100% no-repeat;
        }
      }
    }
  }
}
</style>
