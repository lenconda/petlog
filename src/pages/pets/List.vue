<template>
  <div class="list">
    <div class="select-pets">
      <div class="title">宠物选择</div>
      <div class="list-wrapper">
        <div class="list-item" v-for="(pet, index) in $store.state.pets" :class="[$route.params.id == pet.id ? 'selected' : '']" @click="$router.push(`/pets/list/${pet.id}`)">
          <img :src=`../../../static/images/avatars_pets/${pet.avatar}`>
          {{ pet.name }}
        </div>
      </div>
    </div>
    <div class="form-wrapper">
      <div class="avatar-wrapper" @click="upAvatarTrigger">
        <span>头像</span>
        <div class="avatar">
          <input id="setavatar" type="file" accept="image/*" @change="upAvatar($event)" style="display: none">
          <img :src="avatar">
        </div>
      </div>
      <div class="input-group">
        <span>宠物昵称</span>
        <input type="text" placeholder="填写" maxlength="16" v-model="nickname">
      </div>
      <div class="input-group">
        <span>宠物简介</span>
        <input type="text" placeholder="填写" maxlength="64" v-model="motto">
      </div>
      <div class="input-group">
        <span>宠物性别</span>
        <div class="gender">
          <label>
            <input type="radio" value="female" v-model="gender">
            <span class="gender_female"></span><span>母</span>
          </label>
          <label>
            <input type="radio" value="male" v-model="gender">
            <span class="gender_male"></span><span>公</span>
          </label>
        </div>
      </div>
      <div class="input-group" @click="birth = true">
        <span>出生日期</span>
        <span class="position" :class="{'color-sharpen': birthDay != ''}">{{ birthDay == '' ? '选择' : birthDay }}&nbsp;<i class="right"></i></span>
      </div>
      <div class="input-group" @click="meet = true">
        <span>相遇日期</span>
        <span class="position" :class="{'color-sharpen': meetDay != ''}">{{ meetDay == '' ? '选择' : meetDay }}&nbsp;<i class="right"></i></span>
      </div>
      <div class="input-group" @click="showVariety = true">
        <span>宠物品种</span>
        <span class="position" :class="{'color-sharpen': variety != ''}">{{ variety == '' ? '选择宠物品种' : variety }}&nbsp;<i class="right"></i></span>
      </div>
    </div>
    <div class="finish-wrapper">
      <button @click="update" class="finish-btn" :disabled="nickname == '' || motto == '' || birthDay == '' || meetDay == '' || tempVariety == ''">完成修改</button>
    </div>
    <calendar v-model="birth" @change="handleBirth"></calendar>
    <calendar v-model="meet" @change="handleMeet"></calendar>
    <van-popup position="bottom" v-model="showVariety" class="select-variety">
      <div class="confirms">
        <ul>
          <li class="cancel-btn" @click="showVariety = false">取消</li>
          <li class="confirm-title">宠物种族</li>
          <li class="confirm-btn" @click="showVariety = false; variety = tempVariety">确定</li>
        </ul>
      </div>
      <div class="tag-wrapper">
        <ul>
          <li v-for="(item, index) in varieties">
            <label>
              <div class="avatar">
                <img :src="[`../../../static/images/${item.avatar}@3x.png`]">
              </div>
              <div class="name">{{ item.name }}</div>
              <input type="radio" name="variety" v-model="tempVariety" :value="item.name">
              <div class="checked-wrapper">
                <i class="checked"></i>
              </div>
            </label>
          </li>
        </ul>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Calendar from '@/components/Calendar'
import Varieties from '@/varieties.json'
export default {
  name: 'list',
  created () {
    this.$store.commit('modNavbar', false)
    this.$store.commit('modClass', {inclass: 'slideInLeft', leaveclass: 'slideOutRight'})
    this.$store.commit('setTitle', '宠物资料')
    this.fetch(this.$route.params.id)
  },
  components: {
    'calendar': Calendar
  },
  beforeRouteUpdate (to, from, next) {
    console.log(to)
    this.fetch(to.params.id)
    next()
  },
  methods: {
    fetch (id) {
      this.$http.get(`/api/user/pet/detail/?id=${id}`).then(res => {
        if (res.body.status == 1) {
          this.nickname = res.body.name
          this.motto = res.body.motto
          this.avatar = `../../../static/images/avatars_pets/${res.body.avatar}`
          this.tempAvatar = res.body.avatar
          this.gender = res.body.gender
          this.birthDay = res.body.birth_day
          this.meetDay = res.body.meet_day
          this.variety = res.body.variety
          this.tempVariety = res.body.variety
        } else {
          this.$toast.fail(res.body.message)
        }
      })
    },
    handleBirth (date, formatDate) {
      this.birthDay = formatDate
    },
    handleMeet (date, formatDate) {
      this.meetDay = formatDate
    },
    update () {
      this.$http.post('/api/user/pet/update', {id: this.$route.params.id, name: this.nickname, motto: this.motto, avatar: this.tempAvatar, gender: this.gender, birth_day: this.birthDay, meet_day: this.meetDay, variety: this.variety}).then(res => {
        if (res.body.status == 1) {
          this.$toast.success('更新成功')
          this.$http.get('/api/user/all_pets').then(res => {
            this.$store.commit('setPets', res.body.pets)
          })
          window.history.go(-1)
        } else {
          this.$toast.fail(res.body.message)
        }
      })
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
      this.$http.post('/api/user/pet/avatar', imageData).then(res => {
        if (res.body.status == 1) {
          _this.$toast.success('上传头像成功')
          _this.avatar = getObjectURL(event.target.files[0])
          _this.tempAvatar = res.body.filename
        } else {
          _this.$toast.fail('上传头像失败')
        }
      })
    }
  },
  data () {
    return {
      avatar: '../../../static/images/avatars_pets/default.png',
      tempAvatar: 'default.png',
      meet: false,
      birth: false,
      showVariety: false,
      nickname: '',
      motto: '',
      gender: 'female',
      birthDay: '',
      meetDay: '',
      tempVariety: '其他',
      variety: '',
      varieties: Varieties
    }
  }
}
</script>

<style lang="less" scoped>
.color-sharpen {
  color: #686868;
}
.list {
  width: 100%;
  background-color: #f4f4f4;
  box-sizing: border-box;
  padding-top: 55px;
  .select-pets {
    width: 100%;
    height: 133px;
    background-color: #fff;
    box-sizing: border-box;
    padding-left: 12.5px;
    margin-bottom: 20px;
    text-align: left;
    .title {
      color: #000;
      font-size: 18.5px;
      line-height: 1;
      box-sizing: border-box;
      padding: 17px 0 11.5px 7.5px;
    }
    .list-wrapper {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      overflow-x: auto;
      overflow-y: hidden;
      .list-item {
        width: 70px;
        text-align: center;
        color: #686868;
        font-size: 13px;
        line-height: 20px;
        flex-shrink: 0;
        img {
          transform: translateY(1.5px);
          box-sizing: border-box;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          border: 1px solid #fff;
          box-shadow: 0 0 0 1.25px #949494;
        }
        &.selected {
          img {
            box-shadow: 0 0 0 1.25px #fa7646;
          }
        }
      }
    }
  }
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
              background: url('../../../static/images/pet_gender@3x.png') 100% e('/') 100% no-repeat;
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
              background: url('../../../static/images/pet_gender@3x.png') 100% e('/') 100% no-repeat;
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
              background: url('../../../static/images/pet_female@3x.png') 100% e('/') 100% no-repeat;
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
              background: url('../../../static/images/pet_male@3x.png') 100% e('/') 100% no-repeat;
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
  .select-variety {
    width: 100%;
    height: 346.5px;
    background-color: #fff;
    .confirms {
      width: 100%;
      height: 44px;
      background: #fff;
      position: relative;
      border-bottom: 1px solid #ccc;
      ul {
        display: flex;
        justify-content: center;
        align-items: center;
        & > li {
          font-size: 17.5px;
          width: auto;
          display: inline-block;
          &.confirm-btn {
            color: #1d5faa;
            float: right;
            padding: 8px 13px;
          }
          &.cancel-btn {
            float: left;
            color: #000;
            padding: 8px 13px;
          }
          &.confirm-title {
            display: inline-block;
            font-size: 21.5px;
            font-weight: bold;
            text-align: center;
            color: #000;
            padding: 7px 0;
            flex-grow: 1;
          }
        }
      }
    }
    .tag-wrapper {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      background-color: #f5f5f5;
      ul {
        padding: 0;
        margin: 0;
        width: 100%;
        li {
          width: 100%;
          border-bottom: 1px solid #e6e6e6;
          label {
            width: 100%;
            height: 50px;
            display: flex;
            box-sizing: border-box;
            input[name=variety] {
              display: none;
              & + .checked-wrapper {
                display: none;
              }
              &:checked + .checked-wrapper {
                display: flex;
              }
            }
            .avatar {
              display: flex;
              justify-content: center;
              align-items: center;
              box-sizing: border-box;
              padding: 0 20px;
              img {
                width: 38px;
                height: 38px;
                border-radius: 50%;
              }
            }
            .name {
              display: flex;
              flex-grow: 1;
              justify-content: flex-start;
              align-items: center;
              font-size: 18.5px;
              color: #686868;
            }
            .checked-wrapper {
              width: 56px;
              display: flex;
              justify-content: center;
              align-items: center;
              .checked {
                display: inline-block;
                width: 16px;
                height: 11.5px;
                background: url('../../../static/images/checked@3x.png') 100% e('/') 100% no-repeat;
              }
            }
          }
        }
      }
    }
  }
}
</style>
