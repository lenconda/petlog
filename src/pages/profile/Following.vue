<template>
  <van-pull-refresh v-model="isLoading" class="following">
    <ul>
      <li>
        <div class="avatar-wrapper">
          <img src="../../../static/images/testonly.jpg" alt="">
        </div>
        <div class="info-wrapper">
          <p class="nickname">金屋藏猫</p>
          <p class="motto">简介Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        </div>
        <div class="btn-wrapper">
          <button class="follow followed"><i class="checked"></i> 关注</button>
        </div>
      </li>
      <li>
        <div class="avatar-wrapper">
          <img src="../../../static/images/testonly.jpg" alt="">
        </div>
        <div class="info-wrapper">
          <p class="nickname">金屋藏猫</p>
          <p class="motto">简介Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        </div>
        <div class="btn-wrapper">
          <button class="follow followed"><i class="checked"></i> 关注</button>
        </div>
      </li>
    </ul>
  </van-pull-refresh>
</template>

<script>
export default {
  name: 'following',
  created () {
    this.$store.commit('modNavbar', false)
    this.$store.commit('modClass', {inclass: 'slideInLeft', leaveclass: 'slideOutRight'})
    this.$store.commit('setTitle', '关注列表')
  },
  watch: {
    isLoading () {
      if (this.isLoading) {
        console.log('is loading...')
        setTimeout(() => {
          this.isLoading = false
        }, 3000);
      }
    }
  },
  data () {
    return {
      isLoading: false
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
