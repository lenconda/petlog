<template>
  <div class="modify">
    <div class="wrapper">
      <div class="form-wrapper">
        <div class="avatar-wrapper" @click="upAvatarTrigger">
          <span>头像</span>
          <div class="avatar">
            <input id="setavatar" type="file" accept="image/*" @change="upAvatar($event)" style="display: none">
            <img :src="avatar">
          </div>
        </div>
        <div class="input-group">
          <span>昵称</span>
          <input type="text" placeholder="填写" maxlength="16" v-model="nickname">
        </div>
        <div class="input-group">
          <span>个性签名</span>
          <input type="text" placeholder="填写" maxlength="64" v-model="motto">
        </div>
        <div class="input-group">
          <span>性别</span>
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
      </div>
      <div class="form-wrapper">
        <div class="input-group" @click="birth = true">
          <span>出生日期</span>
          <span class="position" :class="{'color-sharpen': birthDay != ''}">{{ birthDay == '' ? '选择' : birthDay }}&nbsp;<i class="right"></i></span>
        </div>
        <div class="input-group" @click="selectLocation = true">
          <span>所在地</span>
          <span class="position" :class="{'color-sharpen': location != ''}">{{ location == '' ? '选择' : location }}&nbsp;<i class="right"></i></span>
        </div>
      </div>
      <div class="finish-wrapper">
        <button class="finish-btn" :disabled="nickname == '' || motto == '' || birthDay == '' || location == ''">完成修改</button>
      </div>
    </div>
    <van-popup v-model="selectLocation" position="bottom" class="select-location">
      <van-area :area-list="cities" :columns-num="2" @confirm="onChange($event)" @cancel="selectLocation = false" title="选择所在地" />
    </van-popup>
    <calendar v-model="birth" @change="handleBirth"></calendar>
  </div>
</template>

<script>
import Cities from '@/citylist.json'
import Calendar from '@/components/Calendar'
export default {
  name: 'modify',
  components: {
    'calendar': Calendar
  },
  created () {
    this.$store.commit('modNavbar', false)
    this.$store.commit('modClass', {inclass: 'slideInLeft', leaveclass: 'slideOutRight'})
    this.$store.commit('setTitle', '修改个人信息')
    this.$http.get('/api/user/profile').then(res => {
      this.nickname = res.body.name
      this.avatar = `../../../static/images/avatars/${res.body.avatar}`,
      this.tempAvatar = res.body.avatar
      this.motto = res.body.motto
      this.gender = res.body.gender
      this.birthDay = res.body.birth_day
      this.location = res.body.location
    })
  },
  data () {
    return {
      selectLocation: false,
      birth: false,
      cities: Cities,
      avatar: '../../../static/images/avatars/default.png',
      tempAvatar: 'default.png',
      nickname: '',
      motto: '',
      gender: 'female',
      birthDay: '',
      location: '',
    }
  },
  methods: {
    handleBirth (date, formatDate) {
      this.birthDay = formatDate
    },
    onChange (value) {
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
      this.$http.post('/api/user/avatar', imageData).then(res => {
        if (res.body.status == 1) {
          _this.$toast.success('上传头像成功')
          _this.avatar = getObjectURL(event.target.files[0])
          _this.tempAvatar = res.body.filename
        } else {
          _this.$toast.fail('上传头像失败')
        }
      })
    },
    modifyInfo () {
      this.$http.post('/api/user/update', {name: this.nickname, avatar: this.tempAvatar, motto: this.motto, gender: this.gender, birth_day: this.birthDay, location: this.location}).then(res => {
        if (res.body.status == 1) {
          this.$toast.success(res.body.message)
        } else {
          this.$toast.fail(res.body.message)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.color-sharpen {
  color: #686868 !important;
}
.modify {
  height: 100%;
  box-sizing: border-box;
  padding-top: 55px;
  background-color: #f4f4f4;
  .wrapper {
    height: 100%;
    box-sizing: border-box;
    padding-top: 20px;
    .form-wrapper {
      box-sizing: border-box;
      margin-bottom: 10px;
      .avatar-wrapper {
        box-sizing: border-box;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 95px;
        border-bottom: 1px solid #e6e6e6;
        span {
          color: #000;
          font-size: 18.5px;
          display: inline-block;
          padding: 0 20px;
        }
        .avatar {
          width: 140px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 69px;
            height: 69px;
            border-radius: 50%;
          }
          &::after {
            content: '';
            position: absolute;
            width: 7.5px;
            height: 15px;
            background: url('../../../static/images/location@3x.png') 100% e('/') 100% no-repeat;
            top: 50%;
            transform: translateY(-50%);
            right: 19px;
          }
        }
      }
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
