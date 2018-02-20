<template>
  <div class="add">
    <div class="avatar-wrapper">
      <div class="avatar">
        <input id="setavatar" type="file" accept="image/*" style="display: none">
        <img :src="avatar" alt="头像">
      </div>
    </div>
    <div class="form-wrapper">
      <div class="input-group">
        <span>宠物昵称</span>
        <input type="text" placeholder="设置昵称" maxlength="16">
      </div>
      <div class="input-group">
        <span>宠物简介</span>
        <input type="text" placeholder="填写" maxlength="16">
      </div>
      <div class="input-group">
        <span>宠物性别</span>
        <div class="gender">
          <label>
            <input type="radio" value="female">
            <span class="gender_female"></span><span>母</span>
          </label>
          <label>
            <input type="radio" value="male">
            <span class="gender_male"></span><span>公</span>
          </label>
        </div>
      </div>
      <div class="input-group">
        <span>所在地</span>
        <span class="position">&nbsp;<i class="right"></i></span>
      </div>
    </div>
    <div class="finish-wrapper">
      <button class="finish-btn">完成</button>
    </div>
    <calendar v-model="calendarShow" @change="handleChange"></calendar>
  </div>  
</template>

<script>
import Calendar from '@/components/Calendar'
export default {
  name: 'add',
  components: {
    'calendar': Calendar
  },
  created () {
    this.$store.commit('modNavbar', false)
    this.$store.commit('modClass', {inclass: 'slideInLeft', leaveclass: 'slideOutRight'})
    this.$store.commit('setTitle', '添加宠物')
  },
  methods: {
    handleChange (date, formatDate) {
      
    }
  },
  data () {
    return {
      avatar: '../../../static/images/avatars/default.png',
      tempAvatar: 'default.png',
      calendarShow: false
    }
  }
}
</script>

<style lang="less" scoped>
.add {
  height: 100%;
  box-sizing: border-box;
  padding-top: 55px;
  background-color: #f4f4f4;
  .avatar-wrapper {
    height: 125px;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    .avatar {
      width: 83px;
      height: 83px;
      box-sizing: border-box;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        width: 22.5px;
        height: 22.5px;
        background: url('../../../static/images/setavatar@3x.png') 100% e('/') 100% no-repeat;
      }
      img {
        width: 83px;
        height: 83px;
        border-radius: 50%;
        box-sizing: border-box;
        border: 1px solid #e6e6e6;
      }
    }
  }
  .form-wrapper {
    box-sizing: border-box;
    .input-group {
      box-sizing: border-box;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      width: 100%;
      border-bottom: 1px solid #e6e6e6;
      input {
        font-size: 18.5px;
        border: none;
        outline: none;
        text-align: right;
        width: 261px;
        color: #686868;
        caret-color: #ffa721;
        &::placeholder {
          color: #9b9b9b;
        }
      }
      &:last-child {
        border: none;
      }
      span {
        color: #000;
        font-size: 18.5px;
        &.position {
          color: #686868;
          .right {
            display: inline-block;
            width: 7.5px;
            height: 15px;
            background: url('../../../static/images/location@3x.png') 100% e('/') 100% no-repeat;
            transform: translateY(1px);
          }
        }
      }
      .gender {
        label {
          display: inline-block;
          width: 58px;
          text-align: right;
          margin-left: 20px;
          position: relative;
          span {
            color: #9b9b9b;
          }
          input[type=radio] {
            display: none;
            & + .gender_female {
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              display: inline-block;
              width: 28px;
              height: 28px;
              background: url('../../../static/images/female@3x.png') 100% e('/') 100% no-repeat;
              transition: all .4s;
            }
            & + .gender_male {
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              display: inline-block;
              width: 28px;
              height: 28px;
              background: url('../../../static/images/male@3x.png') 100% e('/') 100% no-repeat;
              transition: all .4s;
            }
            &:checked + .gender_female {
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              display: inline-block;
              width: 28px;
              height: 28px;
              background: url('../../../static/images/female_active@3x.png') 100% e('/') 100% no-repeat;
              transition: all .4s;
            }
            &:checked + .gender_male {
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              display: inline-block;
              width: 28px;
              height: 28px;
              background: url('../../../static/images/male_active@3x.png') 100% e('/') 100% no-repeat;
              transition: all .4s;
            }
          }
        }
      }
    }
  }
  .finish-wrapper {
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    .finish-btn {
      border: none;
      outline: none;
      background-color: #ffa721;
      transition: all .4s;
      border-radius: 8px;
      width: 340px;
      font-size: 18.5px;
      color: #fff;
      padding: 12px 0;
      &:active {
        background-color: #d48000;
        transition: all .4s;
      }
      &:disabled {
        background: #d4d4d4;
      }
    }
  }
}
</style>
