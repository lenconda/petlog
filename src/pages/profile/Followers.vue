<template>
  <van-pull-refresh v-model="isLoading" class="following">
    <ul>
      <li v-for="(item, index) in followers">
        <div class="avatar-wrapper">
          <!-- **********************跳转个人页面 -->
          <img :src="[`../../../static/images/avatars/${item.avatar}`]">
        </div>
        <div class="info-wrapper">
          <p class="nickname">{{ item.name }}</p>
          <p class="motto">{{ item.motto }}</p>
        </div>
        <div class="btn-wrapper">
          <button class="follow" :class="[item.followed ? 'followed' : '']" @click="follow(index, item.id, item.followed ? 0 : 1)"><i class="checked" v-if="item.followed"></i><i class="iconfont ptsh-tianjia plus" v-else></i> 关注</button>
        </div>
      </li>
    </ul>
  </van-pull-refresh>
</template>

<script>
export default {
  name: 'followers',
  created () {
    this.$store.commit('modNavbar', false)
    this.$store.commit('modClass', {inclass: 'slideInLeft', leaveclass: 'slideOutRight'})
    this.$store.commit('setTitle', '粉丝列表')
    this.getFollowers()
  },
  watch: {
    isLoading () {
      if (this.isLoading) {
        this.getFollowers()
      }
    }
  },
  data () {
    return {
      isLoading: false,
      followers: []
    }
  },
  methods: {
    //关注/取关
    getFollowers () {
      this.$http.get('/api/user/get_followers').then(res => {
        if (res.body.status == 1) {
          this.followers = res.body.followers
          this.isLoading = false
        } else {
          this.$toast.fail(res.body.message)
          window.history.go(-1)
          this.isLoading = false
        }
      })
    },
    follow (index, id, action) {
      this.$http.get(`/api/user/focus/?id=${id}&action=${action}`).then(res => {
        if (res.body.status == 1) {
          if (aciton == 0) {
            this.followers[index].followed = false
          } else {
            this.followers[index].followed = true
          }
          this.$toast.success('关注成功')
        } else {
          this.$toast.fail(res.body.message)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.following {
  height: 100%;
  box-sizing: border-box;
  padding-top: 55px;
  ul > li {
    display: flex;
    height: 86px;
    border-bottom: 1px solid #e6e6e6;
    box-sizing: border-box;
    .avatar-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      padding: 0 14px;
      img {
        width: 65px;
        height: 65px;
        border-radius: 50%;
        box-sizing: border-box;
        border: 1px solid #e6e6e6;
      }
    }
    .info-wrapper {
      flex-grow: 1;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      p {
        margin: 0;
        padding: 0;
        line-height: 1;
        &.nickname {
          font-size: 18px;
          color: #000;
          margin-bottom: 4.75px;
          font-weight: bold;
        }
        &.motto {
          font-size: 14px;
          color: #888;
          text-align: left;
          display: inline-block;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          width: 180px;
          margin-top: 4.75px;
        }
      }
    }
    .btn-wrapper {
      display: flex;
      width: 98px;
      justify-content: center;
      align-items: center;
      button {
        &.follow {
          width: 63px;
          height: 34px;
          background-color: #fff;
          border: 1px solid #ffa721;
          border-radius: 4px;
          color: #ffa721;
          font-size: 13px;
          box-sizing: border-box;
          outline: none;
          &.followed {
            background-color: #f4f4f4;
            color: #686868;
            border: 1px solid #e7e7e7;
          }
        }
        i {
          &.plus {
            font-weight: bold;
            font-size: 13px;
          }
          &.checked {
            width: 13px;
            height: 9.9px;
            display: inline-block;
            background: url('../../../static/images/checked@3x.png') 100% e('/') 100% no-repeat;
            transform: translateY(.6px);
          }
        }
      }
    }
  }
}
</style>
