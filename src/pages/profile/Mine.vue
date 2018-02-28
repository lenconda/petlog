<template>
  <div class="mine">
    <div class="head-wrapper" :style="{background: `url(../../../static/images/avatars/${user.avatar})`}">
      <div class="avatar-wrapper">
        <div>
          <img :src="[`../../../static/images/avatars/${user.avatar}`]" width="100%" height="100%">
        </div>
      </div>
      <div class="info-wrapper">
        <span class="name-age">
          <span>关注 {{ user.followers }}</span>|<span>粉丝 {{ user.followings }}</span>
        </span>
        <span class="motto">个性签名： {{ user.motto }}</span>
      </div>
    </div>
    <div class="pets-list-wrapper">
      <div class="title">宠物</div>
      <div class="list">
        <div class="list-item" v-for="(item, index) in $store.state.pets" @click="$router.push(`/index/timeline?id=${item.id}`)">
          <div class="avatar">
            <img :src="[`../../../static/images/avatars_pets/${item.avatar}`]">
          </div>
          <div class="name">{{ item.name }}</div>
          <i class="icon-right"></i>
        </div>
        <div class="list-item" @click="$router.push('/pets/add')">
          <div class="avatar">
            <img :src="['../../../static/images/profile_add@3x.png']">
          </div>
          <div class="name">添加宠物</div>
          <i class="icon-right"></i>
        </div>
      </div>
    </div>
    <div class="field-wrapper">
      <button @click="$router.push('/profile/modify')">修改个人资料</button>
      <button @click="toList">宠物信息</button>
      <button @click="toTimeLine">时间轴</button>
    </div>
    <div class="field-wrapper">
      <button @click="$router.push('/index/cards/interested')">新的动态</button>
      <button @click="$router.push('/profile/following')">我的关注</button>
      <button @click="$router.push('/profile/followers')">我的粉丝</button>
    </div>
    <button class="logout-btn" @click="logOut">退出登录</button>
  </div> 
</template>

<script>
export default {
  name: 'mine',
  created () {
    this.$store.commit('modNavbar', false)
    this.$store.commit('modClass', {inclass: 'slideInLeft', leaveclass: 'slideOutRight'})
    this.$store.commit('setTitle', '')
    this.$http.get('/api/user/profile_summary').then(res => {
      if (res.body.status == 1) {
        this.user = res.body.user
      } else {
        this.$toast.fail(res.body.message)
        this.$store.commit('setRef', this.$route.fullPath)
        this.$router.push('/auth/login')
      }
    })
  },
  data () {
    return {
      user: {}
    }
  },
  methods: {
    logOut () {
      localStorage.removeItem('token')
      this.$router.push('/start')
    },
    toList () {
      if (this.$store.state.pets.length < 1) {
        this.$toast.fail('还没有宠物哦')
      } else {
        this.$router.push(`/pets/list/${this.$store.state.pets[0].id}`)
      }
    },
    toTimeLine () {
      if (this.$store.state.pets.length < 1) {
        this.$toast.fail('还没有宠物哦')
      } else {
        this.$router.push(`/index/timeline?id=${this.$store.state.pets[0].id}`)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.mine {
  box-sizing: border-box;
  padding-top: 55px;
  background-color: #f4f4f4;
  .head-wrapper {
    min-height: 161px;
    height: auto;
    width: 100%;
    position: relative;
    background-repeat: no-repeat !important;
    background-size: 80% !important;
    background-position: center !important;
    transition: all .5s;
    overflow: hidden;
    user-select: none;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: inherit;
      filter: blur(4px);
      margin: -20%;
      z-index: 0;
    }
    .avatar-wrapper {
      box-sizing: border-box;
      width: 100%;
      height: 105px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      position: relative;
      div {
        position: relative;
        img {
          width: 82px;
          height: 82px;
          box-sizing: border-box;
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, .5);
        }
        .switch-btn {
          width: 10.5px;
          height: 13px;
          background-color: transparent;
          background: url('../../../static/images/switch@3x.png') 100% e('/') 100% no-repeat;
          position: absolute;
          bottom: 50%;
          transform: translateY(50%);
          right: -15px;
          &.actived {
            width: 13px;
            height: 10.5px;
            background: url('../../../static/images/switch_active@3x.png') 100% e('/') 100% no-repeat;
          }
        }
      }
    }
    .info-wrapper {
      width: 100%;
      height: auto;
      color: #fff;
      box-sizing: border-box;
      padding: 9.5px 0 5.5px 0;
      position: relative;
      .name-age {
        display: block;
        margin-bottom: 2px;
        font-size: 17px;
        color: rgba(255, 255, 255, .8);
        text-shadow: 0 1px 1px #000;
        span:first-child {
          text-align: right;
          padding-right: 18px;
        }
        span:last-child {
          padding-left: 18px;
        }
      }
      .motto {
        box-sizing: border-box;
        display: inline-block;
        text-shadow: 0 1px 1px #000;
        text-align: left;
        width: 100%;
        padding: 0 26.5px 0 26.5px;
        margin-top: 2px;
        font-size: 14.5px;
      }
      .select-pets {
        width: 100%;
        height: 73px;
        text-align: left;
        overflow-y: hidden;
        overflow-x: auto;
        white-space: nowrap;
        background-color: rgba(255, 255, 255, .1);
        .items {
          padding: 0;
          margin: 0;
          display: inline-block;
          text-align: center;
          text-shadow: 0 1px 1px #000;
          box-sizing: border-box;
          padding: 0 6px 0 6px;
          &:first-child {
            padding-left: 12px;
          }
          &:last-child {
            padding-right: 12px;
          }
          img {
            display: block;
            box-sizing: border-box;
            width: 54px;
            height: 54px;
            border-radius: 50%;
            border: 1px solid #fff;
            box-shadow: 0 0 0 0.5px #949494;
            background: red;
            margin-bottom: 3.5px;
          }
        }
      }
    }
  }
  .pets-list-wrapper {
    text-align: left;
    height: 98px;
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 15px;
    margin-top: 10px;
    .title {
      line-height: 1;
      font-size: 18.5px;
      color: #000;
      padding: 8.5px 0;
      padding-left: 1px;
    }
    .list {
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      display: flex;
      justify-content: flex-start;
      align-content: center;
      .list-item {
        width: 107px;
        height: 52.5px;
        border-radius: 5px;
        border: 1.36px solid #e6e6e6;
        margin-right: 12px;
        flex-shrink: 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .avatar {
          box-sizing: border-box;
          padding: 0 1.5px 0 5.5px;
          img {
            width: 37.5px;
            height: 37.5px;
            border-radius: 50%;
          }
        }
        .name {
          font-size: 11.5px;
          color: #949494;
          display: inline-block;
          width: 46.5px;
          flex-grow: 1;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .icon-right {
          display: inline-block;
          width: 4px;
          height: 7.5px;
          margin-right: 5.5px;
          background: url('../../../static/images/location@3x.png') 100% e('/') 100% no-repeat;
        }
      }
    }
  }
  .field-wrapper {
    width: 100%;
    background-color: #fff;
    margin-top: 10px;
    text-align: left;
    button {
      display: block;
      box-sizing: border-box;
      width: 100%;
      border: none;
      outline: none;
      padding-left: 20px;
      background-color: #fff;
      text-align: left;
      color: #000;
      font-size: 18.5px;
      height: 51px;
      line-height: 51px;
      border-bottom: 1px solid #e6e6e6;
      transition: all .4s;
      &:last-child {
        border: none;
      }
      &:active {
        background-color: #e6e6e6;
        transition: all .4s;
      }
    }  
  }
  .logout-btn {
    margin: 40px 0 60px 0;
    width: 100%;
    height: 50px;
    font-size: 18.5px;
    color: #c93535;
    border: none;
    outline: none;
    background-color: #fff;
    transition: all .4s;
    &:active {
      background-color: #e6e6e6;
      transition: all .4s;
    }
  }
}
</style>
