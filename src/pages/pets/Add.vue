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
        <input type="text" placeholder="设置昵称" maxlength="16" v-model="nickname">
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
        <span class="position" :class="{'color-sharpen': birthDay != ''}">{{ birthDay == '' ? '选择宠物生日' : birthDay }}&nbsp;<i class="right"></i></span>
      </div>
      <div class="input-group" @click="meet = true">
        <span>相遇日期</span>
        <span class="position" :class="{'color-sharpen': meetDay != ''}">{{ meetDay == '' ? '选择相遇日期' : meetDay }}&nbsp;<i class="right"></i></span>
      </div>
      <div class="input-group" @click="showVariety = true">
        <span>宠物品种</span>
        <span class="position" :class="{'color-sharpen': variety != ''}">{{ variety == '' ? '选择宠物品种' : variety }}&nbsp;<i class="right"></i></span>
      </div>
    </div>
    <div class="finish-wrapper">
      <button class="finish-btn" :disabled="nickname == '' || motto == '' || birthDay == '' || meetDay == '' || variety == ''">完成</button>
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
          <li v-for="item in varieties">
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
    handleBirth (date, formatDate) {
      this.birthDay = formatDate
    },
    handleMeet (date, formatDate) {
      this.meetDay = formatDate
    }
  },
  data () {
    return {
      avatar: '../../../static/images/avatars/pet_default.png',
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
  color: #686868 !important;
}
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
  .refresh-wrapper {
    width: 100%;
    height: 60px;
    .refresh-btn {
      font-size: 26.5px;
      line-height: 60px;
      display: inline-block;
      color: #aaaaaa;
      &:active {
        color: #686868;
      }
    }
  }
}
</style>
