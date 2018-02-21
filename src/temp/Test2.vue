<template>
  <div class="test1">
    <div class="images">
      <pet-image :images="images"></pet-image>
    </div>
  </div>
</template>

<script>
import petImage from '@/components/ImageView'
export default {
  name: 'test1',
  components: {
    'pet-image': petImage,
  },
  data () {
    return {
      images: [
        '../../static/images/posts/P_00.jpg',
        '../../static/images/posts/P_01.jpg',
        '../../static/images/posts/P_02.jpg',
        '../../static/images/posts/P_03.jpg',
        '../../static/images/posts/P_04.jpg'
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.test1 {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 55px;
  .images {
    width: 100%;
    height: 220px;
  }
}
</style>
