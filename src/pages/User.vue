<template>
  <div class="user">
    <div class="head-wrapper" :style="{background: `url(../../static/images/avatars/${user.avatar})`}">
      <div class="avatar-wrapper">
        <div>
          <img :src="[`../../static/images/avatars/${user.avatar}`]" width="100%" height="100%">
        </div>
      </div>
      <div class="info-wrapper">
        <span class="name-age">
          <span>关注 {{ user.following }}</span>|<span>粉丝 {{ user.followers }}</span>
        </span>
        <span class="motto">个性签名： {{ user.motto }}</span>
      </div>
    </div>
    <div class="pets-list-wrapper">
      <div class="title">宠物</div>
      <div class="list" v-if="pets.length != 0">
        <div class="list-item" v-for="(item, index) in pets" @click="$router.push(`/index/timeline?id=${item.id}`)">
          <div class="avatar">
            <img :src="[`../../static/images/avatars_pets/${item.avatar}`]">
          </div>
          <div class="name">{{ item.name }}</div>
          <i class="icon-right"></i>
        </div>
      </div>
      <div class="list" v-else>Ta还没有宠物</div>
    </div>
    <div class="posts-wrapper">
      <div class="title">Ta的动态</div>
      <div class="card-wrapper" v-for="(item, index) in cards" @click="$router.push(`/c/${item.id}`)">
        <div class="card-head">
          <div class="card-head-avatar">
            <img :src="[`../../static/images/avatars/${user.avatar}`]" width="100%">
          </div>
          <div class="card-head-poster">
            <div class="poster-name">{{ user.name }}</div>
            <div class="poster-date">{{ item.post.time }}</div>
          </div>
        </div>
        <div class="card-content">
          {{ item.post.content }}
          <div class="images">
            <pet-image :images="item.post.images"></pet-image>
          </div>
        </div>
        <div class="card-misc">
          <div class="misc-status">宠物当前状态：{{ item.post.status }}</div>
          <div class="misc-tags">
            <span class="tag" v-for="(tag, index) in item.post.tags">{{ tag }}</span>
          </div>
        </div>
        <div class="card-control-wrapper">
          <div class="card-control">
            <button class="control-btn"><span class="icon_comment">icon_comment</span><span>&nbsp;{{ item.comments }}</span></button>
            <button class="control-btn" @click="like($event, index, item.id, item.liked ? 0 : 1)"><span class="icon_like">icon_like</span><span>&nbsp;{{ item.post.likes }}</span></button>
          </div>
        </div>
      </div>
    </div>
    <div class="control-wrapper">
      <button class="control-btn" @click="follow($route.params.id, followed ? 0 : 1)" :class="[followed ? '' : 'actived']"><i class="checked" v-if="followed"></i><i class="iconfont ptsh-tianjia plus" v-else></i> 关注</button>
      <button class="control-btn" @click="toTimeline"><i class="timeline"></i>时间轴</button>
    </div>
    <div class="loadmore" @click="getCards(lastCursor)" v-show="!infinited">
      加载更多
    </div>
  </div>
</template>

<script>
import petImage from '@/components/ImageView'
export default {
  name: 'user',
  components: {
    'pet-image': petImage,
  },
  created () {
    this.$store.commit('modNavbar', false)
    this.$store.commit('modClass', {inclass: 'slideInLeft', leaveclass: 'slideOutRight'})
    this.$store.commit('setTitle', ''),
    this.$http.get(`/api/user/profile_other?id=${this.$route.params.id}`).then(res => {
      if (res.body.status == 1) {
        this.user = res.body.user
        this.pets = res.body.pets
        this.followed = res.body.followed
        this.getCards('none')
      } else {
        this.$toast.fail(res.body.message)
      }
    })
  },
  methods: {
    like (event, index, id, action) {
      event.stopPropagation()
      this.$http.post('/api/user/post_praise', {id: id, action: action}).then(res => {
        if (res.body.status == 1) {
          this.cards[index].liked = !this.cards[index].liked
        } else {
          this.$toast.fail(res.body.message)
        }
      })
    },
    follow (id, action) {
      this.$http.get(`/api/user/focus/?id=${id}&action=${action}`).then(res => {
        if (res.body.status == 1) {
          if (aciton == 0) {
            this.followed = false
          } else {
            this.followed = true
          }
          this.$toast.success('关注成功')
        } else {
          this.$toast.fail(res.body.message)
        }
      })
    },
    toTimeline () {
      if (this.pets.length == 0) {
        this.$toast.fail('Ta还没有宠物')
      } else {
        this.$router.push(`/index/timeline?id=${this.pets[0].id}`)
      }
    },
    getCards (lastCursor) {
      this.$http.get(`/api/get_cards?id=${this.$route.params.id}&lastCursor=${lastCursor}`).then(res => {
        if (res.body.status == 1) {
          if (lastCursor == 'none') {
            this.infinited = res.body.infinited
            this.cards = res.body.cards
            this.lastCursor = res.body.cards[res.body.cards.length - 1].id
          } else {
            for (var i = 0; i < res.body.cards.length; i++) {
              this.cards.push(res.body.cards[i])
            }
            this.infinited = res.body.infinited
          }
        } else {
          this.$toast.fail(res.body.message)
        }
      })
    },
  },
  data () {
    return {
      user: {},
      pets: [],
      followed: false,
      cards: [],
      infinited: false,
      lastCursor: 'none'
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  box-sizing: border-box;
  height: 100%;
  padding-top: 55px;
  padding-bottom: 50px;
  background-color: #f4f4f4;
  overflow-y: auto;
  overflow-x: hidden;
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
          border: 3px solid rgba(255, 255, 255, .5);
        }
        .switch-btn {
          width: 10.5px;
          height: 13px;
          background-color: transparent;
          background: url('../../static/images/switch@3x.png') 100% e('/') 100% no-repeat;
          position: absolute;
          bottom: 50%;
          transform: translateY(50%);
          right: -15px;
          &.actived {
            width: 13px;
            height: 10.5px;
            background: url('../../static/images/switch_active@3x.png') 100% e('/') 100% no-repeat;
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
          text-align: right;
          padding-right: 18px;
        }
        span:last-child {
          padding-left: 18px;
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
  .pets-list-wrapper {
    text-align: left;
    height: 98px;
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 15px;
    .title {
      line-height: 1;
      font-size: 18.5px;
      color: #000;
      padding: 8.5px 0;
      padding-left: 1px;
    }
    .list {
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      display: flex;
      justify-content: flex-start;
      align-content: center;
      color: #686868;
      font-size: 16px;
      .list-item {
        width: 107px;
        height: 52.5px;
        border-radius: 5px;
        border: 1.36px solid #e6e6e6;
        margin-right: 12px;
        flex-shrink: 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .avatar {
          box-sizing: border-box;
          padding: 0 1.5px 0 5.5px;
          img {
            width: 37.5px;
            height: 37.5px;
            border-radius: 50%;
          }
        }
        .name {
          font-size: 11.5px;
          color: #949494;
          display: inline-block;
          width: 46.5px;
          flex-grow: 1;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .icon-right {
          display: inline-block;
          width: 4px;
          height: 7.5px;
          margin-right: 5.5px;
          background: url('../../static/images/location@3x.png') 100% e('/') 100% no-repeat;
        }
      }
    }
  }
  .control-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    background-color: #fff;
    border-top: 1px solid #9f9f9f;
    display: flex;
    position: fixed;
    bottom: 0;
    z-index: 9;
    .control-btn {
      flex-grow: 1;
      width: 50%;
      font-size: 16.5px;
      color: #949494;
      box-sizing: border-box;
      background-color: #fff;
      border: none;
      outline: none;
      padding: 0;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      &.actived {
        color: #ffa721;
      }
      &:active {
        background-color: #f4f4f4;
      }
      i {
        &.plus {
          font-weight: bold;
          font-size: 13px
        }
        &.checked {
          width: 13px;
          height: 9.9px;
          display: inline-block;
          margin-right: 5px;
          background: url('../../static/images/checked@3x.png') 100% e('/') 100% no-repeat;
          transform: translateY(.6px);
        }
        &.timeline {
          display: block;
          width: 12.5px;
          height: 15.5px;
          background: url('../../static/images/timeline@3x.png') 100% e('/') 100% no-repeat;
          margin-right: 5px;
        }
      }
    }
    &::after {
      content: '';
      width: 1px;
      height: 25px;
      position: absolute;
      right: 50%;
      top: 50%;
      transform: translateY(-50%);
      background-color: #949494;
    }
  }
  .posts-wrapper {
    margin-top: 10px;
    width: 100%;
    background-color: #fff;
    .title {
      height: 50px;
      font-size: 18.5px;
      line-height: 50px;
      color: #000;
      box-sizing: border-box;
      padding-left: 20px;
      text-align: left;
      border-bottom: 1px solid #e6e6e6;
    }
    .card-wrapper {
      text-align: left;
      width: 100%;
      height: auto;
      background-color: #fff;
      margin-bottom: 11px;
      .card-head {
        display: flex;
        height: 69.5px;
        width: 100%;
        padding: 12.5px 19px 10px 14px;
        box-sizing: border-box;
        .card-head-avatar {
          flex-grow: 0;
          display: inline-block;
          width: 47px;
          height: 47px;
          img {
            width: 47px;
            height: 47px;
            border-radius: 50%;
          }
        }
        .card-head-poster {
          flex-grow: 1;
          display: inline-block;
          width: 225.5px;
          padding: 6px 5px 5px 12px;
          box-sizing: content-box;
          .poster-name {
            font-size: 18px;
            line-height: 18px;
            color: #000;
          }
          .poster-date {
            font-size: 12.5px;
            line-height: 12.5px;
            margin-top: 7px;
            color: #9b9b9b;
          }
        }
        .card-head-follow {
          flex-grow: 1;
          width: 74px;
          height: 47px;
          padding: 3px 0 10px 5px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          button {
            &.follow {
              width: 63px;
              height: 34px;
              background-color: #fff;
              border: 1px solid #ffa721;
              border-radius: 4px;
              color: #ffa721;
              font-size: 13px;
              box-sizing: border-box;
              outline: none;
              &.followed {
                background-color: #f4f4f4;
                color: #686868;
                border: 1px solid #e7e7e7;
              }
            }
            i {
              &.plus {
                font-weight: bold;
                font-size: 13px;
              }
              &.checked {
                width: 13px;
                height: 9.9px;
                display: inline-block;
                background: url('../../static/images/checked@3x.png') 100% e('/') 100% no-repeat;
                transform: translateY(.6px);
              }
            }
          }    
        }
      }
      .card-content {
        box-sizing: border-box;
        width: 100%;
        height: auto;
        background-color: #fff;
        padding: 0 19px 10px 19px;
        color: #000;
        font-size: 18px;
        .images {
          width: 100%;
          height: 220px;
        }
      }
      .card-misc {
        box-sizing: border-box;
        width: 100%;
        height: auto;
        position: relative;
        z-index: 1;
        padding: 12.5px 14px 13px 40.5px;
        background-color: #fff;
        .misc-status {
          position: relative;
          font-size: 16.5px;
          color: #9f9f9f;
          &::before {
            content: '';
            width: 17px;
            height: 15.5px;
            color: #000;
            position: absolute;
            top: 3px;
            left: -26.5px;
            background: url('../../static/images/status_small@3x.png') 100% e('/') 100% no-repeat;
          }
        }
        .misc-tags {
          position: relative;
          margin-top: 10px;
          &::before {
            content: '';
            width: 15.5px;
            height: 15.5px;
            position: absolute;
            top: 7px;
            left: -26.5px;
            background: url('../../static/images/tag_small@3x.png') 100% e('/') 100% no-repeat;
          }
          .tag {
            display: inline-block;
            font-size: 16.5px;
            color: #9f9f9f;
            padding: 6px 9px;
            border: 1px solid #c1c1c1;
            border-radius: 4px;
            margin-right: 7px;
            margin-bottom: 6px;
          }
        }
      }
      .card-control-wrapper {
        width: 100%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 0 14px 0 14px;
        .card-control {
          width: 100%;
          border-top: 1px solid #e6e6e6;
          display: flex;
          button {
            width: 50%;
            height: 40px;
            color: #686868;
            font-size: 15px;
            outline: none;
            background: #fff;
            border: none;
            &:active {
              background-color: #f4f4f4;
            }
            .icon_comment {
              display: inline-block;
              color: transparent;
              width: 21px;
              height: 21px;
              background: url('../../static/images/comment@3x.png') 100% e('/') 100% no-repeat;
            }
            .icon_like {
              display: inline-block;
              color: transparent;
              width: 21px;
              height: 21px;
              background: url('../../static/images/like@3x.png') 100% e('/') 100% no-repeat;
              &.actived {
                display: inline-block;
                color: transparent;
                width: 20px;
                height: 20px;
                background: url('../../static/images/liked@3x.png') 100% e('/') 100% no-repeat;
              }
            }
          }
        }
      }
    }
  }
  .loadmore {
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #ffa721;
    line-height: 1;
  }
}
</style>
