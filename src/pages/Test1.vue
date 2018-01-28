<template>
  <div>
    <!-- <h2>{{ test }}</h2> -->
    <div class="upload-img-wrapper">
      <van-button type="primary" @click="handleClick">Select an image</van-button>
      <input id="upfile" type="file" accept="image/*" @change="fileChange($event)" style="display: none;">
      <van-button type="danger" @click="uploadImg">Upload</van-button>
      <van-button type="primary" @click="testOnly">Debug</van-button>
    </div>
    <transition name="slide-fade">
      <div class="imgview-wrapper" v-if="show" @click="hideImageView">
        <i class="fa fa-trash-o remove-btn" aria-hidden="true" @click="delAlert($event, swipeIndex)"></i>
        <van-swipe :auto="0" :show-indicators="false" :initial-swipe="this.imageIndex" @change="getIndex" :class="['img-view']">
          <van-swipe-item v-for="(item, index) in imgList">
            <img :src="item" alt="" width="100%" @click="hideImageView" class="display-item">
            <van-actionsheet :actions="actions" cancel-text="取消" v-model="acSheet"></van-actionsheet>
          </van-swipe-item>
        </van-swipe>
        <span class="swipe-index">{{ swipeIndex + 1 }}/{{ imgList.length }}</span>
      </div>
    </transition>
    <div class="images-lists">
      <ul>
        <li v-for="(item, index) in imgList"><img :src="item" alt="" @click="selectImg(index)"></li>
        <li @click="handleClick" v-show="imgList.length < 6">
          <i class="fa fa-camera cust-camera" aria-hidden="true"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Utils from '../utils'
import EXIF from 'exif-js'
export default {
  name: 'upload',
  mounted () {
    this.$store.commit('modNavbar', false)
    this.$store.commit('modClass', {inclass: 'slideInLeft', leaveclass: 'slideOutRight'})
  },
  watch: {
    'payload.length': {
      handler () {
        if (this.payload.length == this.imgList.length) {
          this.postCard()
        }
      }
    }
  },
  methods: {
    testOnly () {
      var _this = this
      for (var i = 0; i < this.imgList.length; i++) {
        this.$http.get(this.imgList[i], {responseType: 'blob'}).then(res => {
          console.log(res)
          var ajaxFrom = new FormData()
          ajaxFrom.append('image', res.body)
          this.$http.post('/api/upload', ajaxFrom).then(res => {
            _this.payload.push(res.body)
          })
        })
      }
    },
    getIndex (index) {
      this.swipeIndex = index
    },
    handleClick () {
      document.getElementById('upfile').click()
    },
    fileChange (el) {
      var _this = this
      function getObjectURL (object) {
        return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object)
      }
      for (var i = 0; i < el.target.files.length; i++) {
        var imgSrc = getObjectURL(el.target.files[i])
        console.log(`imgSrc1 ${imgSrc}`)
        var current = el.target.files[i]
        console.log(el.target.files[i])
        console.log(`i = ${i}`)
        EXIF.getData(current, () => {
          var temp1 = EXIF.getAllTags(current)
          if (temp1.Orientation == 6) {
            console.log(`if src ${imgSrc}`)
            Utils.rotateImg(imgSrc, _this)
          } else {
            console.log(`else src ${imgSrc}`)
            console.log(`current ${current.name}`)
            _this.imgList.push(imgSrc)
          }
        })
      }
      this.imgList = this.imgList.slice(0, 6)
    },
    uploadImg () {
      var _this = this      
      for (var i = 0; i < this.imgList.length; i++) {
        this.$http.get(this.imgList[i], {responseType: 'blob'}).then(res => {
          var ajaxFrom = new FormData()
          ajaxFrom.append('image', res.body)
          this.$http.post('/api/upload', ajaxFrom).then(res => {
            _this.payload.push(res.body)
          })
        })
      }
    },
    postCard () {
      this.$http.post('/api/test', {content: 'hahaha', images: this.payload}).then(res => {
        this.payload.splice(0, this.payload.length)
        //这里也要搞一个imgList的删除
      })
    },
    showImgView () {
      this.show = true
    },
    hideImageView () {
      this.show = false
    },
    selectImg (index) {
      this.show = true
      console.log(this.field)
      this.imageIndex = index
      this.swipeIndex = index
    },
    delAlert (el, index) {
      el.stopPropagation()
      this.actionIndex = index
      this.acSheet = true
    },
    fileDel () {
      this.imgList.splice(this.actionIndex, 1)
      if (this.imgList.length == 0) {
        this.show = false
      }
      this.actionIndex = 0
      this.acSheet = false
    }
  },
  data () {
    return {
      upload: false,
      field: '',
      imgList: [],
      show: false,
      imageIndex: 0,
      swipeIndex: 0,
      acSheet: false,
      actionIndex: 0,
      actions: [{
        name: '删除',
        callback: this.fileDel
      }],
      file: '',
      uploadList: [],
      payload: []
    }
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: opacity .5s ease;
}
.slide-fade-leave-active {
  transition: opacity .5s ease;
}
.slide-fade-enter, .slide-fade-leave-active {
  opacity: 0;
}
.banner-wrapper {
  width: 355px;
  height: 140px;
  margin: 20px auto;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .18);
  box-sizing: border-box;
  padding: 10px 0;
}
.banner-wrapper::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
.banner-list {
  background: #2c3e50;
  height: 120px;
  width: 180px;
  margin: 0 10px;
  display: inline-block;
}
.cust-camera {
  display: block;
  line-height: 80px;
  height: 100%;
  font-size: 26px;
  color: #ccc
}
.upload-img-wrapper {
  width: 335px;
  /* height: 120px; */
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .18);
  margin: 18px auto;
  padding: 10px;
}
.images-lists {
  width: 355px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .18);
  margin: 18px auto;
  padding: 5px 0;
}
.images-lists > ul {
  padding-left: 10px;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
}
.images-lists > ul > li {
  display: block;
  flex-shrink: 1;
  width: 80px;
  height: 80px;
  margin: 2px;
}
.images-lists > ul > li:last-child {
  background: #eee;
}
.images-lists img {
  width: 100%;
  height: 100%;
}
.image-splash {
  position: fixed;
  z-index: 99999;
  bottom: 10px;
  color: #fff;
  width: 100%;
  height: auto;
  text-align: center;
}
.mint-swipe {
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .18);
  margin: 0 auto;
}
.imgview-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 99999;
}
img.display-item {
  position: relative;
  top: 50%;
  transform: translateY(-50%)
}
.remove-btn {
  font-size: 18px;
  color: #fff;
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 9999999;
}
.swipe-index {
  font-size: 14px;
  color: #fff;
  position: absolute;
  top: 18px;
  text-shadow: 0 0 3px #000;
  left: 50%;
  transform: translateX(-50%);
}
.van-swipe.img-view {
  height: 100%;
}
</style>
