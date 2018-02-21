<template>
  <div class="wrapper">
    <div class="publish-wrapper">
      <div class="text-area">
        <textarea rows="4" placeholder="来吧，记录这一刻..." class="text-field" v-model="content"></textarea>
      </div>
      <div id="panel" class="status-panel-wrapper">
        <div class="status-panel">
          <div>您的宠物当前状态：{{ currentStatus }}</div>
          <div class="current-tags-wrapper">
            <span class="current-tags" v-for="(tag, index) in selectedTags">{{ tag }}</span>
          </div>
        </div>
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
    </div>
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
    <van-popup position="bottom" v-model="showSelect" class="select-pets">
      <div class="confirms">
        <ul>
          <li class="cancel-btn" @click="actions(3)">取消</li>
          <li class="confirm-title">为哪只宠物发布</li>
          <li class="confirm-btn" @click="actions(3)">确定</li>
        </ul>
      </div>
      <div class="pets-wrapper">
        <ul>
          <li>
            <label>
              <div class="avatar">
                <img :src="[`../../static/images/dog@3x.png`]">
              </div>
              <div class="name">大猫</div>
              <input type="radio" name="variety" v-model="tempVariety" value="大猫">
              <div class="checked-wrapper">
                <i class="checked"></i>
              </div>
            </label>
          </li>
        </ul>
      </div>
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
        <div class="refresh-wrapper" @click="random">
          <i class="refresh-btn"></i>
          <span>换一批</span>
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
  created () {
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
      selectedPet: '',
      showTags: false,
      showStatus: false,
      showSelect: false,
      status: ['开心', '难过', '怀孕', '生病'],
      currentStatus: '开心'
    }
  },
  methods: {
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
        case 3:
          this.showSelect = !this.showSelect
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
      this.$http.post('/api/User/Post_card', {content: thi.content, images: this.payload, tags: this.selectedTags, time: Utils.getDate(4, true), status: this.currentStatus}).then(res => {
        
        if (res.body.status == 1) {
          this.payload.splice(0, this.payload.length)
          this.$toast.success('发布成功！')
        } else {
          this.$toast.fail('发布失败！')
        }
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
            this.$http.post('/api/Upload/card_imges', ajaxFrom).then(res => {
              if (res.body.status ==1) {
                _this.payload.push(res.body.filename)
              } else {
                this.$toast.fail('图片上传失败！')
              }
            })
          })
        }
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

<style lang="less" scoped>
.wrapper {
  height: 100%;
  box-sizing: border-box;
  padding-top: 55px;
  padding-bottom: 57px;
  .publish-wrapper {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 16px 21px 0;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    .text-area {
      height: 85.5px;
      margin-bottom: 26.5px;
      .text-field {
        width: 100%;
        padding: 0;
        caret-color: #ffa721;
        border: none;
        resize: none;
        font-size: 14px;
      }
    }
    .status-panel-wrapper {
      width: 100%;
      background-color: #fff;
      height: auto;
      .status-panel {
        width: 318.5px;
        height: auto;
        margin-left: 21.5px;
        position: relative;
        min-height: 63px;
        background-color: #fff;
        user-select: none;
        color: #9f9f9f;
        font-size: 15.5px;
        text-align: left;
        font-style: normal;
        &::before {
          content: '';
          width: 17px;
          height: 15.5px;
          position: absolute;
          top: 3px;
          left: -26.5px;
          background: url('../../static/images/status_small@3x.png') 100% e('/') 100% no-repeat;
        }
        &::after {
          content: '';
          width: 15.5px;
          height: 15.5px;
          position: absolute;
          top: 39px;
          left: -26.5px;
          background: url('../../static/images/tag_small@3x.png') 100% e('/') 100% no-repeat;
        }
        .current-tags-wrapper {
          margin-top: 10px;
          .current-tags {
            display: inline-block;
            color: #2cbce7;
            padding: 6px 9px;
            border: 1px solid #2cbce7;
            border-radius: 4px;
            margin-right: 7px;
            margin-bottom: 6px;
          }
        }
      }
    }
    .images-lists {
      width: 355px;
      max-height: 221px;
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
      .cust-camera {
        display: block;
        line-height: 109px;
        height: 100%;
        font-size: 37px;
        color: #ccc
      }
      ul {
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;
        li {
          display: block;
          flex-shrink: 1;
          width: 109px;
          height: 109px;
          margin: 1.5px;
          position: relative;
          &:last-child {
            background: #fff;
            border: 1px dashed #ccc;
            width: 107.5px;
            height: 107.5px; 
          }
        }
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
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
    .left-buttons {
      flex-shrink: 1;
      flex-grow: 1;
      width: 275px;
      position: relative;
      i {
        display: inline-block;
        position: absolute;
        &:first-child {
          background: url('../../static/images/picture.png') no-repeat;
          background-size: 100%;
          width: 26px;
          height: 23.5px;
          left: 26px;
          top: 16.5px;
          &:active {
            background: url('../../static/images/picture_active.png') no-repeat;
            background-size: 100%;
          }
          &.actived {
            background: url('../../static/images/picture_active.png') no-repeat;
            background-size: 100%;
          }
        }
        &:nth-child(2) {
          background: url('../../static/images/tags.png') no-repeat;
          background-size: 100%;
          width: 25px;
          height: 25.5px;
          left: 88px;
          top: 15.5px;
          &:active {
            background: url('../../static/images/tags_active.png') no-repeat;
            background-size: 100%;
          }
          &.actived {
            background: url('../../static/images/tags_active.png') no-repeat;
            background-size: 100%;
          }
        }
        &:last-child {
          background: url('../../static/images/status.png') no-repeat;
          background-size: 100%;
          width: 29.5px;
          height: 26.5px;
          left: 149px;
          top: 15px;
          &:active {
            background: url('../../static/images/status_active.png') no-repeat;
            background-size: 100%;
          }
          &.actived {
            background: url('../../static/images/status_active.png') no-repeat;
            background-size: 100%;
          }
        }
      }
    }
    .right-buttons {
      flex-shrink: 0;
      width: 100px;
    }
  }
  .select-status {
    width: 100%;
    background: #fff;
    position: fixed;
    bottom: 55px;
    z-index: 9;
    .confirms {
      width: 100%;
      height: 44px;
      background: #fff;
      position: relative;
      border-bottom: 1px solid #ccc;
      ul > li {
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
        }
      }
    }
  }
  .select-pets {
    width: 100%;
    background: #fff;
    position: fixed;
    bottom: 0;
    z-index: 99999999 !important;
    .confirms {
      width: 100%;
      height: 44px;
      background: #fff;
      position: relative;
      border-bottom: 1px solid #ccc;
      ul > li {
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
        }
        & input[type='radio'] {
          display: none;
          & + span {
            position: relative;
            width: 122px;
            text-overflow: ellipsis;
            &::before {
              content: '';
              position: absolute;
              left: -18px;
              top: 8px;
              background: #fff;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              border: 1.5px solid #fff;
              box-shadow: 0 0 0 1px #aaa;
            }
          }
          &:checked + span {
            color: #686868;
            &::before {
              background: #2cbce7;
            }
          }
        }
      }
    }
    .pets-wrapper {
      width: 100%;
      height: 300px;
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
                background: url('../../static/images/checked@3x.png') 100% e('/') 100% no-repeat;
              }
            }
          }
        }
      }
    }
  }
  .select-tags {
    width: 100%;
    height: 319px;
    background-color: #fff;
    .confirms {
      width: 100%;
      height: 44px;
      background: #fff;
      position: relative;
      border-bottom: 1px solid #ccc;
      ul > li {
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
        }
      }
    }
    .tags-wrapper {
      width: 100%;
      height: 220px;
      background-color: #f5f5f5;
      .tag-list {
        width: 100%;
        height: 143px;
        overflow-y: auto;
        padding-top: 17px;
        text-align: left;
        .tag-wrapper {
          display: inline-block;
          font-size: 16px;
          margin: 0 12.35px;
          input {
            display: none;
          }
          .tag-content {
            text-align: center;
            display: inline-block;
            width: 100%;
            height: 100%;
            padding: 6px;
            margin: 5.75px;
            border-radius: 4px;
            background-color: #fff;
            border: 1px solid #949494;
            color: #555555;
            transition: all .4s;
          }
        }
      }
      .refresh-wrapper {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        .refresh-btn {
          display: inline-block;
          width: 21.5px;
          height: 18.5px;
          background: url('../../static/images/refresh@3x.png') 100% e('/') 100% no-repeat;
          margin-right: 5.5px;
        }
        span {
          display: inline-block;
          font-size: 12.5px;
          line-height: 1;
          color: #aaa;
        }
      }
    }
  }
}
</style>
