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
          <input v-model="code" type="text" placeholder="输入验证码">
          <button class="form-control-btn" :disabled="codeSent" @click="sendMail"><span v-if="!codeSent">发送</span><span v-else>{{ retry }}</span></button>
        </div>
      </div>
      <button class="login-btn" :disabled="username == '' || password == '' || code == ''" @click="nextStep">下一步</button>
    </div>
    <div class="step2" v-show="step == 2">
      <div class="avatar-wrapper">
        <div class="avatar">
          <input id="setavatar" type="file" accept="image/*" @change="upAvatar($event)" style="display: none">
          <img :src="avatar" alt="头像" @click="upAvatarTrigger">
        </div>
      </div>
      <div class="form-wrapper">
        <div class="input-group">
          <span>主人昵称</span>
          <input v-model="nickname" type="text" placeholder="设置昵称" maxlength="16">
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
        <div class="input-group" @click="selectLocation = true">
          <span>所在地</span>
          <span class="position">{{ location == '' ? '选择' : location }}&nbsp;<i class="right"></i></span>
        </div>
      </div>
      <div class="finish-wrapper">
        <button class="finish-btn" :disabled="nickname == '' || location == ''" @click="register">完成</button>
      </div>
    </div>
    <van-popup v-model="selectLocation" position="bottom" class="select-location">
      <van-area :area-list="cities" :columns-num="2" @confirm="onChange($event)" @cancel="onCancel" title="选择所在地" />
    </van-popup>
  </div>  
</template>

<script>
import md5 from 'md5'
import AreaList from '../../citylist.json'
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
      codeSent: false,
      selectLocation: false,
      retry: 60,
      step: 1,
      username: '',
      password: '',
      verification: '',
      code: '',
      gender: 'female',
      cities: AreaList,
      location: '',
      nickname: '',
      avatar: '../../../static/images/avatars/default.png',
      tempAvatar: 'default.png'
    }
  },
  methods: {
    testOnly () {
      console.log(md5('QYABG'))
    },
    interval () {
      if (this.retry == 0) {
        this.retry = 60
        this.codeSent = false
      } else {
        this.codeSent = true
        this.retry--
        setTimeout(() => {
          this.interval()
        }, 1000)
      }
    },
    sendMail () {
      var _this = this
      this.$toast.success('验证邮件已发送!')
      this.$http.post('/api/registered/verify_code', {email: this.username}).then(res => {
        if (res.body.status == 1 && res.status == 200) {
          this.verification = res.body.code
          this.interval()
        } else {
          _this.$toast.fail('发送失败，请稍后再试...')
        }
      })
    },
    nextStep () {
      if (this.verification == md5(this.code)) {
        this.step = 2
      } else {
        this.$toast.fail('验证码错误！')
      }
    },
    upAvatarTrigger () {
      document.getElementById('setavatar').click()
    },
    upAvatar (event) {
      var _this = this
      function getObjectURL (object) {
        return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object)
      }
      var imageData = new FormData()
      imageData.append('image', event.target.files[0])
      this.$http.post('/api/registered/new_avatar', imageData).then(res => {
        if (res.body.status == 1) {
          _this.$toast.success('上传头像成功')
          _this.avatar = getObjectURL(event.target.files[0])
          _this.tempAvatar = res.body.filename
        } else {
          _this.$toast.fail('上传头像失败')
        }
      })
    },
    register () {
      //加上avatar字段
      var _this = this
      this.$http.post('/api/registered', {email: this.username, password: this.password, user_nickname: this.nickname, address: this.location, gender: this.gender, register_key: md5(`${this.username}fdsfd32${this.password}`)}).then(res => {
        if (res.body.status == 1) {
          _this.$toast.success('注册成功')
          _this.$router.push('/start')
        } else {
          _this.$toast.fail('注册失败')
        }
      })
    },
    onChange(value) {
      if (value[0].code == -1 || value[1].code == -1) {
        this.$toast.fail('请选择正确的地址！')
      } else if (value[0].name == value[1].name) {
        this.location = value[0].name
        this.selectLocation = false
      } else if (value[1].name == '县') {
        this.location = value[0].name
        this.selectLocation = false
      } else {
        this.location = `${value[0].name} ${value[1].name}`
        this.selectLocation = false
      }
    },
    onCancel () {
      this.selectLocation = false
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
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
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
            &:disabled {
              background-color: #d4d4d4;
            }
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
      align-self: flex-end;
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
  .select-location {
    width: 100%;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    .van-area {
      & > .van-picker__toolbar.van-hairline--top-bottom {
        display: none !important;
      }
    }
  }
}
</style>
