<template>
  <div class="content">
    <div class="form-wrapper">
      <div class="input-group">
        <input v-model="username" type="text" placeholder="输入邮箱账号">
      </div>
      <div class="input-group">
        <input v-model="password" type="password" placeholder="输入密码">
      </div>
    </div>
    <button class="login-btn" :disabled="username == '' || password == ''" @click="login">登录</button>
  </div>  
</template>

<script>
export default {
  name: 'login',
  beforeMount () {
    this.$store.commit('setTitle', '登录')
    this.$store.commit('modNavbar', false)
  },
  created () {
    this.$store.commit('modClass', {inclass: 'slideInLeft', leaveclass: 'slideOutRight'})
  },
  data () {
    return {
      naka: false,
      username: '',
      password: ''
    }
  },
  methods: {
    test () {
      alert(1)
    },
    login () {
      this.$http.post('/api/login', {email: this.username, password: this.password}).then(res => {
        if (res.body.status == 1) {
          this.$router.push('/index/cards/interested')
          localStorage.token = res.body.token
        } else {
          this.$toast.fail('用户名或密码错误')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  box-sizing: border-box;
  padding: 0;
  padding-top: 20px;
  height: 100%;
  .form-wrapper {
    width: 100%;
    box-sizing: border-box;
    padding-left: 21px;
    background-color: #fff;
    .input-group {
      box-sizing: border-box;
      background-color: #fff;
      position: relative;
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
      &:last-child::before {
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
</style>
