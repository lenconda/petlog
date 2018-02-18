<template>
  <div class="content">
    <div class="form-wrapper">
      <div class="input-group">
        <input type="text" placeholder="输入邮箱账号">
      </div>
      <div class="input-group">
        <input type="password" placeholder="输入密码">
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
      &:first-child {
        border-bottom: 1px solid #e6e6e6;
      }
      input {
        display: inline-block;
        width: 100%;
        box-sizing: border-box;
        font-size: 18.5px;
        padding: 16px 0;
        padding-left: 48px;
        color: #000;
        caret-color: #ffa721;
        border: none;
        outline: none;
      }
    }
    
  }
}
</style>
