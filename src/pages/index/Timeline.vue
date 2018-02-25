<template>
  <div class="timeline">
    <div class="head-wrapper" :style="{background: `url(../../../static/images/avatars_pets/${avatar})`}">
      <div class="avatar-wrapper">
        <div>
          <img :src="[`../../../static/images/avatars_pets/${avatar}`]" width="100%" height="100%">
          <i class="switch-btn" @click="select = !select" :class="[select ? 'actived' : '']"></i>
        </div>
      </div>
      <div class="info-wrapper">
        <span class="name-age">
          <span>{{ name }}</span>|<span>{{ age }}岁</span>
        </span>
        <span class="motto" v-show="!select">{{ motto }}</span>
        <div class="select-pets" v-show="select">
          <div class="items" v-for="(item, index) in $store.state.pets" @click="$router.push(`/index/timeline?id=${item.id}`)">
            <img :src="[`../../../static/images/avatars/${item.avatar}`]" alt="">
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="timeline-items-wrapper">
      <div class="timeline-items" v-for="(item, index) in items">
        <div class="date" :class="[item.is_year ? 'isyear' : '']">
          <div class="dates">
            <span>{{ item.date != '' ? item.date.split('-')[1] : '' }}</span>
            <span>{{ item.date != '' ? `${item.date.split('-')[0]}月` : '' }}</span>
          </div>
          <div class="year" v-show="item.is_year">{{ item.year }}</div>
        </div>
        <div class="content">
          <div class="card" v-show="!item.is_year" v-for="(card, index) in item.items" @click="$router.push(`/c/${card.id}`)">
            <p>{{ card.content }}</p>
            <div class="image-wrapper" v-if="card.images.length > 0">
              <img :src="[`../../../static/images/posts/${card.images[0]}`]" width="100%" height="100%">
              <span>{{ card.images.length }}</span>
            </div>
            <div v-else></div>
            <div class="status-panel">
              <span class="icon_status">status</span><span>{{ card.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'index_timeline',
  mounted () {
    this.$store.commit('modNavbar', false)
    this.$store.commit('setTitle', '时间轴')
    this.$store.commit('isTimeline', true)
    // var test = {
    //   name: 'test',
    //   age: 2,
    //   avatar: 'default.png',
    //   motto: 'a test: fuck GFW',
    //   items: [
    //     {
    //       date: "12-2",
    //       items: [
    //         {
    //           content: "asdasdasd",
    //           images: ["P_01.jpg", "asdqweasdqwe"],
    //           status: "asda",
    //           id: "123123123123"
    //         },
    //         {
    //           content: "asdasdasd",
    //           images: [],
    //           status: "asda",
    //           id: "123123123123"
    //         }
    //       ],
    //       is_year: false
    //     },
    //     {
    //       date: "",
    //       items: [
    //         {
    //           content: "",
    //           images: [],
    //           status: "",
    //           id: ""
    //         }
    //       ],
    //       is_year: true,
    //       year: 2017
    //     },
    //     {
    //       date: "12-2",
    //       items: [
    //         {
    //           content: "asdasdasd",
    //           images: ["asdasd", "asdqweasdqwe"],
    //           status: "asda",
    //           id: "123123123123"
    //         },
    //         {
    //           content: "asdasdasd",
    //           images: ["asdasd", "asdqweasdqwe"],
    //           status: "asda",
    //           id: "123123123123"
    //         }
    //       ],
    //       is_year: false
    //     },
    //   ]
    // }
    // this.name = test.name
    // this.age = test.age
    // this.avatar = test.avatar
    // this.motto = test.motto
    // this.items = test.items
  },
  data () {
    return {
      name: '',
      age: 0,
      avatar: '',
      motto: '',
      items: [],
      select: false,
    }
  },
  created () {
    var _this = this
    this.$http.get('/api/auth').then(res => {
      if (res.body.status == 1) {
        if (this.$route.query.id == undefined) {
          if (this.$store.state.pets.length < 1) {
            _this.$toast.fail('还没有宠物哦')
          } else {
            _this.$http.get(`/api/user/get_timeline/?id=${this.$store.state.pets[0].id}`).then(res => {
              if (res.body.status == 1) {
                _this.name = res.body.name
                _this.age = res.body.age
                _this.avatar = res.body.avatar
                _this.motto = res.body.motto
                _this.items = res.body.items
              } else {
                _this.$toast.fail(res.body.message)
              }
            })
          }
        } else {
          _this.$http.get(`/api/user/get_timeline/?id=${this.$route.query.id}`).then(res => {
            if (res.body.status == 1) {
              _this.name = res.body.name
              _this.age = res.body.age
              _this.avatar = res.body.avatar
              _this.motto = res.body.motto
              _this.items = res.body.items
            } else {
              _this.$toast.fail(res.body.message)
            }
          })
        }
      } else {
        _this.$toast.fail(res.body.message)
        window.history.go(-1)
      }
    })
  },
  methods: {
    toggleAvt () {
      if (this.avatar == 'testonly.jpg') {
        this.avatar = 'testonly2.png'
      } else {
        this.avatar = 'testonly.jpg'
      }
    }
  },
  destroyed () {
    this.$store.commit('isTimeline', false)
  }
}
</script>

<style lang="less" scoped>
.timeline {
  height: 100%;
  background-color: #f4f4f4;
  overflow-y: auto;
  .head-wrapper {
    min-height: 161px;
    height: auto;
    width: 100%;
    position: relative;
    background-repeat: no-repeat !important;
    background-size: 80% !important;
    background-position: center !important;
    transition: all .5s;
    overflow: hidden;
    user-select: none;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: inherit;
      filter: blur(4px);
      margin: -20%;
      z-index: 0;
    }
    .avatar-wrapper {
      box-sizing: border-box;
      width: 100%;
      height: 105px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      position: relative;
      div {
        position: relative;
        img {
          width: 82px;
          height: 82px;
          box-sizing: border-box;
          border-radius: 50%;
          border: 1.5px solid rgba(224, 224, 224, .5);
        }
        .switch-btn {
          width: 10.5px;
          height: 13px;
          background-color: transparent;
          background: url('../../../static/images/switch@3x.png') 100% e('/') 100% no-repeat;
          position: absolute;
          bottom: 50%;
          transform: translateY(50%);
          right: -15px;
          &.actived {
            width: 13px;
            height: 10.5px;
            background: url('../../../static/images/switch_active@3x.png') 100% e('/') 100% no-repeat;
          }
        }
      }
    }
    .info-wrapper {
      width: 100%;
      height: auto;
      color: #fff;
      box-sizing: border-box;
      padding: 9.5px 0 5.5px 0;
      position: relative;
      .name-age {
        display: block;
        margin-bottom: 2px;
        font-size: 17px;
        color: rgba(255, 255, 255, .8);
        text-shadow: 0 1px 1px #000;
        span:first-child {
          padding-right: 24px;
        }
        span:last-child {
          padding-left: 24px;
        }
      }
      .motto {
        box-sizing: border-box;
        display: inline-block;
        text-shadow: 0 1px 1px #000;
        text-align: left;
        width: 100%;
        padding: 0 26.5px 0 26.5px;
        margin-top: 2px;
        font-size: 14.5px;
      }
      .select-pets {
        width: 100%;
        height: 73px;
        text-align: left;
        overflow-y: hidden;
        overflow-x: auto;
        white-space: nowrap;
        background-color: rgba(255, 255, 255, .1);
        .items {
          padding: 0;
          margin: 0;
          display: inline-block;
          text-align: center;
          text-shadow: 0 1px 1px #000;
          box-sizing: border-box;
          padding: 0 6px 0 6px;
          &:first-child {
            padding-left: 12px;
          }
          &:last-child {
            padding-right: 12px;
          }
          img {
            display: block;
            box-sizing: border-box;
            width: 54px;
            height: 54px;
            border-radius: 50%;
            border: 1px solid #fff;
            box-shadow: 0 0 0 0.5px #949494;
            background: red;
            margin-bottom: 3.5px;
          }
        }
      }
    }
  }
  .timeline-items-wrapper {
    width: 100%;
    box-sizing: border-box;
    .timeline-items {
      width: 100%;
      height: auto;
      display: flex;
      .date {
        width: 70px;
        border-right: 1px solid #fff;
        position: relative;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        box-sizing: border-box;
        padding-top: 8.75px;
        &::after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #fa7646;
          right: -5px;
          top: 25px;
          z-index: 9;
        }
        .year {
          display: block;
          padding: 3px 6px;
          box-sizing: border-box;
          border-radius: 3px;
          position: absolute;
          right: -50%;
          transform: translateX(-28%);
          background-color: #fa7646;
          color: #fff;
          font-size: 13.5px;
          z-index: 99;
        }
        &.isyear {
          height: 48.5px;
          &::after {
            display: none;
          }
        }
        div > span {
          &:first-child {
            color: #000;
            font-size: 19px;
            display: block;
            font-weight: bold;
          }
          &:last-child {
            color: #9b9b9b;
            font-size: 13.5px;
            display: block;
          }
        }
      }
      .content {
        width: 305px;
        box-sizing: border-box;
        padding: 8.75px 17.5px 8.75px 21px;
        .card {
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0px 4px 6.5px 0px rgba(0, 0, 0, 0.1);
          border: solid 1px #e6e6e6;
          box-sizing: border-box;
          padding: 12px;
          padding-right: 2px;
          padding-bottom: 8px;
          margin-bottom: 12px;
          text-align: left;
          font-size: 16.5px;
          color: #000;
          p {
            margin: 0;
          }
          .image-wrapper {
            position: relative;
            width: 239px;
            height: auto;
            display: block;
            img {
              width: 239px;
              height: 139px;
              margin: 8px 0 3px 0;
            }
            span {
              display: inline-block;
              color: #fff;
              background-color: rgba(0, 0, 0, .5);
              padding: 0 10px;
              border-radius: 5px;
              font-size: 18.5px;
              position: absolute;
              right: 7px;
              bottom: 16px;
            }
          }
          .status-panel > span {
            display: inline-block;
            &:last-child {
              color: #888;
              font-size: 12.5px;
              line-height: 12.5px;
              margin-left: 4.5px;
            }
            &.icon_status {
              color: transparent;
              width: 16px;
              height: 16px;
              line-height: 16px;
              background: url('../../../static/images/status.png') 100% e('/') 100% no-repeat;
            }
          }
        }
      }
      &:first-child > .content {
        padding-top: 16px;
      }
    }
  }
}
</style>
