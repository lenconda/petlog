<template>
  <div class="wrapper">
    <div class="publish-wrapper">
      <div class="text-area">
        <textarea rows="4" placeholder="来吧，记录这一刻..." class="text-field" v-model="content"></textarea>
      </div>
      <div class="images-lists">
        <ul>
          <input id="upfile" type="file" accept="image/*" @change="fileChange($event)" style="display: none;">
          <li v-for="(item, index) in imgList"><img :src="item">
            <span class="delete-image" @click="delImg(index)"><i class="fa fa-times close-btn"></i></span>
          </li>
          <li @click="selectImg" v-show="imgList.length < 6">
            <i class="iconfont ptsh-add cust-camera" aria-hidden="true"></i>
          </li>
        </ul>
      </div>
    </div>
    <div class="tags-picker"></div>
    <div class="control-bar">
      <div class="left-buttons">
        <i></i>
        <i></i>
        <i></i>
      </div>
      <div class="right-buttons"><button class="form-control-btn" @click="uploadImg">发布</button></div>
    </div>
  </div>
</template>

<script>
import Utils from '../utils'
import EXIF from 'exif-js'
export default {
  name: 'publish',
  mounted () {
    this.$store.commit('modNavbar', false)
    this.$store.commit('modClass', {inclass: 'slideInLeft', leaveclass: 'slideOutRight'})
    this.$store.commit('setTitle', '发布动态')
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
  data () {
    return {
      imgList: [],
      uploadList: [],
      payload: [],
      content: '',
      tags: [],
      selectedTags: []
    }
  },
  methods: {
    test () {
      alert('active')
    },
    selectImg () {
      document.getElementById('upfile').click()
    },
    postCard () {
      this.$http.post('/api/test', {content: 'hahaha', images: this.payload}).then(res => {
        this.payload.splice(0, this.payload.length)
        this.imgList.splice(0, this.imgList.length)
      })
    },
    uploadImg () {
      if (this.imgList.length == 0 || this.content == 0) {
        this.$toast.fail('写一些东西吧')
      } else {
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
      }
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
    delImg (index) {
      this.imgList.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.control-bar {
  width: 100%;
  height: 55px;
  border-top: 1px solid #ebebeb;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-wrap: nowrap;
}
.left-buttons {
  flex-shrink: 1;
  width: 275px;
  position: relative;
}
.right-buttons {
  flex-shrink: 0;
  width: 100px;
}
.publish-wrapper {
  height: calc(100% - 32px);
  width: calc(100% - 42px);
  padding: 16px 21px;
  overflow-y: auto;
  overflow-x: hidden;
}
.wrapper {
  height: calc(100% - 55px);
}
.left-buttons > i {
  display: inline-block;
  position: absolute;
}
.left-buttons > i:first-child {
  background: url('../../static/images/picture.gif') no-repeat;
  background-size: 100%;
  width: 26px;
  height: 23.5px;
  left: 26px;
  top: 16.5px;
}
.left-buttons > i:nth-child(2) {
  background: url('../../static/images/tags.gif') no-repeat;
  background-size: 100%;
  width: 25px;
  height: 25.5px;
  left: 89px;
  top: 15.5px;
}
.left-buttons > i:last-child {
  background: url('../../static/images/status.gif') no-repeat;
  background-size: 100%;
  width: 29.5px;
  height: 26.5px;
  left: 147.5px;
  top: 15px;
}
.left-buttons > i:first-child:active {
  background: url('../../static/images/picture_active.gif') no-repeat;
  background-size: 100%;
}
.left-buttons > i:nth-child(2):active {
  background: url('../../static/images/tags_active.gif') no-repeat;
  background-size: 100%;
}
.left-buttons > i:last-child:active {
  background: url('../../static/images/status_active.gif') no-repeat;
  background-size: 100%;
}
.text-field {
  width: 100%;
  padding: 0;
  caret-color: #ffa721;
  border: none;
  resize: none;
  font-size: 14px;
}
.text-area {
  height: 85.5px;
  margin-bottom: 26.5px;
}
.cust-camera {
  display: block;
  line-height: 109px;
  height: 100%;
  font-size: 37px;
  color: #ccc
}
.images-lists {
  width: 355px;
  margin: 0 auto;
}
.images-lists > ul {
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
  width: 109px;
  height: 109px;
  margin: 1.5px;
  position: relative;
}
.images-lists > ul > li:last-child {
  background: #fff;
  border: 1px dashed #ccc; 
}
.images-lists img {
  width: 100%;
  height: 100%;
}
.delete-image {
  width: 27px;
  height: 27px;
  line-height: 27px;
  text-align: center;
  background: rgba(0, 0, 0, .5);
  position: absolute;
  top: 4px;
  right: 4px;
  border-radius: 50%;
}
.close-btn {
  font-size: 11.5px;
  color: #fff;
}
</style>
