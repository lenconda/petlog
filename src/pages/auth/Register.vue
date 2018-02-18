<template>
  <div class="wrapper">
    <div class="step1" v-show="step == 1">
      <div class="form-wrapper">
        <div class="input-group">
          <input v-model="username" type="text" placeholder="输入邮箱账号">
        </div>
        <div class="input-group">
          <input v-model="password" type="password" maxlength="16" placeholder="设置登录密码">
        </div>
        <div class="input-group">
          <input v-model="verification" type="text" placeholder="输入验证码">
          <button class="form-control-btn">发送</button>
        </div>
      </div>
      <button class="login-btn" :disabled="username == '' || password == '' || verification == ''">下一步</button>
    </div>
    <div class="step2" v-show="step == 2">
      <div class="avatar-wrapper">
        <div class="avatar">
          <img src="../../../static/images/avatars/default.png" alt="头像">
        </div>
      </div>
      <div class="form-wrapper">
        <div class="input-group">
          <span>主人昵称</span>
          <input type="text" placeholder="设置昵称" maxlength="16">
        </div>
        <div class="input-group">
          <span>主人性别</span>
          <div class="gender">
            <label>
              <input type="radio" value="female" v-model="gender">
              <span class="gender_female"></span><span>女</span>
            </label>
            <label>
              <input type="radio" value="male" v-model="gender">
              <span class="gender_male"></span><span>男</span>
            </label>
          </div>
        </div>
        <div class="input-group">
          <span>所在地</span>
          <span class="position">选择&nbsp;<i class="right"></i></span>
        </div>
      </div>
      <div class="finish-wrapper">
        <button class="finish-btn">完成</button>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'register',
  beforeMount () {
    this.$store.commit('setTitle', '注册')
    this.$store.commit('modNavbar', false)
  },
  created () {
    this.$store.commit('modClass', {inclass: 'slideInLeft', leaveclass: 'slideOutRight'})
  },
  data () {
    return {
      step: 2,
      username: '',
      password: '',
      verification: '',
      gender: 'female'
    }
  },
  methods: {
    test () {
      alert(1)
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  box-sizing: border-box;
  padding: 0;
  height: 100%;
  .step1 {
    box-sizing: border-box;
    height: 100%;
    padding-top: 20px;
    position: relative;
    .form-wrapper {
      width: 100%;
      box-sizing: border-box;
      padding-left: 21px;
      background-color: #fff;
      .input-group {
        box-sizing: border-box;
        background-color: #fff;
        position: relative;
        text-align: left;
        display: flex;
        input {
          display: inline-block;
          width: 100%;
          box-sizing: border-box;
          font-size: 18.5px;
          padding: 16px 0;
          padding-left: 35px;
          color: #000;
          caret-color: #ffa721;
          border: none;
          outline: none;
          &::placeholder {
            color: #9b9b9b;
          }
        }
        &:first-child {
          border-bottom: 1px solid #e6e6e6;
          &::before {
            content: '';
            display: block;
            position: absolute;
            width: 22px;
            height: 18px;
            background: url('../../../static/images/email@3x.png') 100% e('/') 100% no-repeat;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        &:nth-child(2) {
          border-bottom: 1px solid #e6e6e6;
          &::before {
            content: '';
            display: block;
            position: absolute;
            width: 15px;
            height: 20px;
            background: url('../../../static/images/password@3x.png') 100% e('/') 100% no-repeat;
            left: 3.5px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        &:last-child {
          display: flex;
          justify-content: center;
          align-items: center;
          input {
            width: 214px;
            flex-grow: 1;
          }
          .form-control-btn {
            margin: 0 18.5px;
          }
          &::before {
            content: '';
            display: block;
            position: absolute;
            width: 18.5px;
            height: 21.5px;
            background: url('../../../static/images/verification@3x.png') 100% e('/') 100% no-repeat;
            left: 2px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
    .login-btn {
      display: flex;
      box-sizing: border-box;
      width: 100%;
      height: 55px;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 18.5px;
      border: none;
      outline: none;
      background-color: rgba(255, 167, 33, 0.6);
      position: fixed;
      bottom: 0;
      &[disabled] {
        background-color: #d4d4d4;
      }
    }
  }
  .step2 {
    box-sizing: border-box;
    height: 100%;
    position: relative;
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
            color: #9b9b9b;
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
      }
    }
  }
}
</style>
