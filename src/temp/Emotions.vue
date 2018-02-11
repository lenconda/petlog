<template>
  <div>
    <van-area :area-list="arealist" @confirm="confirm($event)" @cancel="onCancel" :columns-num="2"/>
  </div>
</template>

<script>
import areaList from '../citylist.json'
export default {
  name: 'madan',
  data () {
    return {
      text: '',
      arealist: areaList,
      area: {
        province: '',
        city: ''
      }
    }
  },
  methods: {
    add () {
      this.text += '<a href="#">你好</a>'
    },
    confirm (list) {
      this.area.province = list[0].name
      this.area.city = list[1].name
      if (this.area.province == '选择省份' || this.area.city == '选择城市') {
        this.$toast.fail('选择错误！')
      } else {
        this.$toast.loading({duration: 0})
      }
    },
    onCancel () {
      this.$toast.clear()
    }
  }
}
</script>

<style scoped>

</style>
