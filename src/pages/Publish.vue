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
        <i @click="selectImg"></i>
        <i @click="actions(0)" :class="[showTags ? 'actived' : '']"></i>
        <i @click="actions(1)" :class="[showStatus ? 'actived' : '']"></i>
      </div>
      <div class="right-buttons"><button class="form-control-btn" @click="uploadImg">发布</button></div>
    </div>
    <van-popup position="bottom" v-model="showStatus" class="select-status">
      <div class="confirms">
        <ul>
          <li class="cancel-btn" @click="actions(1)">取消</li>
          <li class="confirm-btn" @click="actions(1)">确定</li>
        </ul>
      </div>
      <van-picker :columns="status" @change="onStatusChange" />
    </van-popup>
    <van-popup position="bottom" v-model="showTags" class="select-tags">
      <div class="confirms">
        <ul>
          <li class="cancel-btn" @click="actions(0)">取消</li>
          <li class="confirm-title">选择标签</li>
          <li class="confirm-btn" @click="actions(0)">确定</li>
        </ul>
      </div>
      <div class="tags-wrapper">
        <div class="tag-list">
          <label class="tag-wrapper">
            <input type="checkbox" v-model="selectedTags" value="萌宠">
            <span class="tag-content">萌宠</span>
          </label>
          <label class="tag-wrapper">
            <input type="checkbox" v-model="selectedTags" value="狗年大吉">
            <span class="tag-content">狗年大吉</span>
          </label>
          <label class="tag-wrapper">
            <input type="checkbox" v-model="selectedTags" value="喵星人">
            <span class="tag-content">喵星人</span>
          </label>
          <label class="tag-wrapper">
            <input type="checkbox" v-model="selectedTags" value="铲屎官">
            <span class="tag-content">铲屎官</span>
          </label>
        </div>
        <div class="refresh-wrapper">
          <i class="iconfont ptsh-refresh refresh-btn"></i>
        </div>
      </div>
    </van-popup>
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
      selectedTags: [],
      showTags: false,
      showStatus: false,
      status: ["开心", "难过", "怀孕", "生病"],
      currentStatus: ''
    }
  },
  methods: {
    test () {
      alert('active')
    },
    actions(option) {
      switch (option) {
        case 0:
          this.showTags = !this.showTags
          this.showStatus = false
          break
        case 1:
          this.showStatus = !this.showStatus
          this.showTags = false
          break
        default:
          break
      }
    },
    onStatusChange (picker, value, index) {
      this.currentStatus = value
    },
    selectImg () {
      document.getElementById('upfile').click()
    },
    postCard () {
      this.$http.post('/api/test', {content: 'hahaha', images: this.payload}).then(res => {
        this.payload.splice(0, this.payload.length)
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
  background: #fff;
  border-top: 1px solid #ebebeb;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-wrap: nowrap;
  z-index: 9999999;
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
  left: 88px;
  top: 15.5px;
}
.left-buttons > i:last-child {
  background: url('../../static/images/status.gif') no-repeat;
  background-size: 100%;
  width: 29.5px;
  height: 26.5px;
  left: 149px;
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
.left-buttons > i:first-child.actived {
  background: url('../../static/images/picture_active.gif') no-repeat;
  background-size: 100%;
}
.left-buttons > i:nth-child(2).actived {
  background: url('../../static/images/tags_active.gif') no-repeat;
  background-size: 100%;
}
.left-buttons > i:last-child.actived {
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
.select-status {
  width: 100%;
  background: #fff;
  position: fixed;
  bottom: 55px;
  z-index: 9;
}
.confirms {
  width: 100%;
  height: 44px;
  background: #fff;
  position: relative;
  border-bottom: 1px solid #ccc;
}
.confirms > ul > li {
  font-size: 16px;
  width: auto;
  display: inline-block;
}
.confirms > ul > li.confirm-btn {
  color: #1d5faa;
  float: right;
  padding: 11px 13px;
}
.confirms > ul > li.cancel-btn {
  float: left;
  color: #000;
  padding: 11px 13px;
}
.confirms > ul > li.confirm-title {
  font-size: 18px;
  color: #000;
  padding: 9px 0;
  width: calc(100% - 58 * 2);
}
.select-tags {
  width: 100%;
  height: 319px;
  background-color: #fff;
}
.tags-wrapper {
  width: 100%;
  height: 220px;
  background-color: #f5f5f5;
}
div.tags-wrapper div.tag-list {
  width: 346px;
  height: 143px;
  overflow-y: auto;
  margin: 0 auto;
  padding-top: 17px;
  text-align: left;
}
div.tags-wrapper div.refresh-wrapper {
  width: 100%;
  height: 60px;
}
.refresh-btn {
  font-size: 26.5px;
  line-height: 60px;
  display: inline-block;
}
.refresh-btn:active {
  color: #686868;
}
/* Tags */
input[type=checkbox] {
  display: none;
}
label.tag-wrapper {
  display: inline-block;
  font-size: 16px;
  margin: 10px 10px 0 10px;
}
span.tag-content {
  text-align: center;
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 6px;
  margin: 0 2.5px;
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #949494;
  transition: all .4s;
}
input:checked + span {
  color: #2cbce7;
  border-color: #2cbce7;
  transition: all .4s;
}
</style>
