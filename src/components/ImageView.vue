<template>
  <div class="swipe-wrapper">
    <van-swipe class="image-view" :show-indicators="false" @change="index => { swipeIndex = index }">
      <van-swipe-item v-for="(item, index) in images">
        <pinch-image :src="item" :min-zoom="1" :max-zoom="3"></pinch-image>
      </van-swipe-item>
    </van-swipe>
    <div class="indicator">{{ swipeIndex + 1 }}/{{ images.length }}</div>
  </div>
</template>

<script>
import pinchImage from './PinchImage'
export default {
  props: {
    images: {
      type: Array,
      default: []
    }
  },
  components: {
    'pinch-image': pinchImage
  },
  data () {
    return {
      swipeIndex: 0
    }
  }
}
</script>

<style lang="less" scoped>
.swipe-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  .image-view {
    width: 100%;
    height: 100%;
    background-color: #000;
    position: relative;
  }
  .indicator {
    display: inline-block;
    background-color: rgba(0, 0, 0, .5);
    z-index: 999999999999!important;
    border-radius: 5px;
    color: #fff;
    font-size: 18.5px;
    text-align: center;
    line-height: 1;
    padding: 5px 10px;
    position: absolute;
    right: 7px;
    bottom: 7px;
  }
} 
</style>
