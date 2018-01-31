<template>
  <div class="wrapper">
    <div class="publish-wrapper">
      <div class="text-area">
        <textarea @focus="textFocus" @blur="textBlur" rows="4" placeholder="来吧，记录这一刻..." class="text-field" v-model="content"></textarea>
      </div>
      <div class="images-lists">
        <ul>
          <input id="upfile" type="file" accept="image/*" @change="fileChange($event)" style="display: none;">
          <li v-for="(item, index) in imgList"><img :src="item">
            <span class="delete-image" @click="delImg(index)"><i class="iconfont ptsh-close close-btn"></i></span>
          </li>
          <li @click="selectImg" v-show="imgList.length < 6">
            <i class="iconfont ptsh-add cust-camera" aria-hidden="true"></i>
          </li>
        </ul>
      </div>
      <div id="panel" class="staus-panel-wrapper" v-show="showPanel">
        <div class="status-panel">
          <div class="current-status">您的宠物当前状态：{{ currentStatus }}</div>
          <div class="current-tags-wrapper">
            <span class="current-tags" v-for="tag in selectedTags">{{ tag }}</span>
          </div>
        </div>
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
          <li class="cancel-btn" @click="actions(2)">取消</li>
          <li class="confirm-title">选择标签</li>
          <li class="confirm-btn" @click="actions(0)">确定</li>
        </ul>
      </div>
      <div class="tags-wrapper">
        <div class="tag-list">
          <label class="tag-wrapper" v-for="(tag, index) in tags" v-show="randomShow.indexOf(index) > -1">
            <input type="checkbox" v-model="selectedTags" :value="tag">
            <span class="tag-content">{{ tag }}</span>
          </label>
        </div>
        <div class="refresh-wrapper">
          <i class="iconfont ptsh-refresh refresh-btn" @click="random"></i>
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
    this.random()
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
      tags: ['狗年大吉', '喵星人', '铲屎官', '萌宠', 'lorem', 'ipsum', 'sim', 'dolor', 'asda', 'asdasdasd', 'uhdwiud', 'a78euqn', 'asjdh72y788', '123ad', 'weaas12', 'qweas', '123', 'asd', 'foo', 'bar'],
      randomShow: [],
      selectedTags: [],
      showTags: false,
      showStatus: false,
      showPanel: true,
      status: ['开心', '难过', '怀孕', '生病'],
      currentStatus: '开心'
    }
  },
  methods: {
    test () {
      this.showPanel = false
    },
    textFocus () {
      this.showPanel = false
    },
    textBlur () {
      this.showPanel = true
    },
    random() {
      this.randomShow = []
      for (var i = 0; i < 10; i++) {
        this.randomShow.push(parseInt(Math.random() * (this.tags.length + 1), 10))
      }
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
        case 2:
          this.showTags = !this.showTags
          this.showStatus = false
          this.selectedTags = []
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
      this.$http.post('/api/test', {content: thi.content, images: this.payload, tags: this.selectedTags, time: Utils.getDate(4, true), status: this.currentStatus}).then(res => {
        this.payload.splice(0, this.payload.length)
      })
    },
    uploadImg () {
      if (this.imgList.length == 0 && this.content == 0) {
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
  height: calc(100% - 16px);
  width: calc(100% - 42px);
  padding: 16px 21px 0;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
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
  max-height: 221px;
  overflow-y: auto;
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
  width: 107.5px;
  height: 107.5px; 
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
  display: inline-block;
  font-size: 11.5px;
  line-height: 27px;
  width: 27px;
  text-align: center;
  padding-left: 1.1px;
  padding-bottom: 0.5px;
  font-weight: bolder;
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
  font-size: 19.5px;
  width: auto;
  display: inline-block;
}
.confirms > ul > li.confirm-btn {
  color: #1d5faa;
  float: right;
  padding: 8px 13px;
}
.confirms > ul > li.cancel-btn {
  float: left;
  color: #000;
  padding: 8px 13px;
}
.confirms > ul > li.confirm-title {
  display: inline-block;
  font-size: 21.5px;
  font-weight: bold;
  text-align: center;
  color: #000;
  padding: 7px 0;
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
  width: 100%;
  height: 143px;
  overflow-y: auto;
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
  color: #aaaaaa;
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
  margin: 0 10px 10px 10px;
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
  color: #555555;
  transition: all .4s;
}
input:checked + span {
  color: #2cbce7;
  border-color: #2cbce7;
  transition: all .4s;
}
/* Tag、状态显示栏 */
.status-panel-wrapper {
  width: 100%;
  background-color: #fff;
  height: auto;
  position: relative;
}
.status-panel {
  width: 318.5px;
  height: auto;
  max-height: 166px;
  min-height: 55px;
  position: absolute;
  left: 41.5px;
  bottom: 6px;
  background-color: #fff;
  user-select: none;
  color: #9f9f9f;
  font-size: 15.5px;
  text-align: left;
  font-style: normal;
}
.current-tags-wrapper {
  margin-top: 10px;
}
.current-tags {
  display: inline-block;
  color: #2cbce7;
  padding: 6px 9px;
  border: 1px solid #2cbce7;
  border-radius: 4px;
  margin-right: 7px;
  margin-bottom: 6px;
}
.status-panel::before {
  content: '';
  width: 17px;
  height: 15.5px;
  position: absolute;
  top: 3px;
  left: -26.5px;
  background: url('../../static/images/status_small@3x.png') 100% / 100% no-repeat;
}
.status-panel::after {
  content: '';
  width: 15.5px;
  height: 15.5px;
  position: absolute;
  top: 39px;
  left: -26.5px;
  background: url('../../static/images/tag_small@3x.png') 100% / 100% no-repeat;
}
</style>
