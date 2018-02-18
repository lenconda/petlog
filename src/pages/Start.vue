<template>
  <div class="content">
    <div class="wrapper">
      <div class="login">
        <router-link :to="{path: '/auth/login'}">登录</router-link>
        <router-link :to="{path: '/auth/register'}">注册</router-link>
      </div>
      <div class="visitor">
        <router-link :to="{path: '/index/cards/hot'}">随便看看</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'start',
  created () {
    this.$store.commit('modClass', {inclass: 'slideInRight', leaveclass: 'slideOutLeft'})
    this.$store.commit('toggleHeader', false)
  },
  destroyed () {
    this.$store.commit('toggleHeader', true)
  }
}
</script>

<style lang="less" scoped>
.content {
  height: 100%;
  position: relative;
  background-image: linear-gradient(rgba(255, 171, 44, .95), rgba(252, 205, 94, .95));
  .wrapper {
    width: 100%;
    height: 122.5px;
    position: absolute;
    bottom: 58px;
    .login {
      a {
        display: inline-block;
        width: 157px;
        height: 54px;
        border-radius: 27px;
        font-size: 18.5px;
        line-height: 54px;
        box-sizing: border-box;
        margin: 0 10.5px;
        &:first-child {
          background-color: #fff;
          color: #ffa721;
        }
        &:last-child {
          background: transparent;
          border: 1.5px solid #fff;
          color: #fff;
        }
      }
    }
    .visitor {
      height: 68px;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      a {
        display: inline-block;
        box-sizing: border-box;
        padding: 6px 8.5px;
        border-radius: 16px;
        background-color: rgba(0, 0, 0, .2);
        font-size: 14px;
        color: #fff;
      }
    }
  }
}
</style>
