<template>
  <van-pull-refresh v-model="isLoading" class="content" v-if="cards.length != 0">
    <div class="topic-wrapper" v-show="$route.query.tag">
      <div class="topic-icon"></div>
      <div>当前已选中的标签： #{{ $route.query.tag }}#</div>
    </div>
    <div class="card-wrapper" v-for="(item, index) in cards" @click="$router.push(`/c/${item.id}`)">
      <div class="card-head">
        <div class="card-head-avatar" @click="$router.push(`/u/${item.author.id}`)">
          <img :src="[`../../../../static/images/avatars/${item.author.avatar}`]" width="100%">
        </div>
        <div class="card-head-poster">
          <div class="poster-name">{{ item.author.name }}</div>
          <div class="poster-date">{{ item.post.time }}</div>
        </div>
        <div class="card-head-follow">
          <button class="follow" @click="follow($event, index, item.author.id, item.author.followed ? 0 : 1)" :class="[item.author.followed ? 'followed' : '']"><i class="checked" v-if="item.author.followed"></i><i class="iconfont ptsh-tianjia plus" v-else></i> 关注</button>
        </div>
      </div>
      <div class="card-content">
        {{ item.post.content }}
        <div class="images" v-show="item.post.images.length != 0">
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
          <button class="control-btn" @click="like($event, index, item.id, item.liked ? 0 : 1)"><span class="icon_like" :class="[item.liked ? 'liked' : '']">icon_like</span><span>&nbsp;{{ item.post.likes }}</span></button>
        </div>
      </div>
    </div>
    <div class="loadmore" v-show="!infinited" @click="getInterested($route.query.tag == undefined ? '' : this.$route.query.tag, lastCursor)">
      加载更多
    </div>
  </van-pull-refresh>
  <van-pull-refresh class="nocards" v-else>
    暂无动态
  </van-pull-refresh>
</template>

<script>
import Vue from 'vue'
import petImage from '@/components/ImageView'
export default {
  name: 'index_cards_interested',
  components: {
    'pet-image': petImage,
  },
  data () {
    return {
      isLoading: false,
      cards: [],
      infinited: false,
      lastCursor: 'none'
    }
  },
  watch: {
    isLoading () {
      if (this.isLoading) {
        this.getInterested(this.$route.query.tag == undefined ? '' : this.$route.query.tag, 'none')
      }
    }
  },
  created () {
    Vue.http.headers.common['Authorization'] = `${localStorage.token}`
    this.$http.get('/api/auth').then(res => {
      if (res.body.status == 1) {
        this.getInterested(this.$route.query.tag == undefined ? '' : this.$route.query.tag, 'none')
      } else {
        this.$toast.fail(res.body.message)
        window.history.go(-1)
      }
    })
  },
  methods: {
    getInterested (tag, lastCursor) {
      this.$http.get(`/api/user/get_circle_of_friends?tag=${tag}&lastCursor=${lastCursor}`).then(res => {
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
          this.isLoading = false
        } else {
          this.isLoading = false
          this.$toast.fail(res.body.message)
        }
      })
      
    },
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
    follow (event, index, id, action) {
      event.stopPropagation()
      this.$http.get(`/api/user/focus/?action=${action}&id=${id}`).then(res => {
        if (res.body.status == 1) {
          this.cards[index].author.followed = !this.cards[index].author.followed
        } else {
          this.$toast.fail(res.body.message)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.nocards {
  height: 100%;
  background-color: #f4f4f4;
  font-size: 18.5px;
  color: #686868;
}
.content {
  background-color: #f4f4f4;
  box-sizing: border-box;
  padding-bottom: 50px;
  .topic-wrapper {
    height: 45px;
    background: #fff;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 18px;
    color: #949494;
    .topic-icon {
      width: 18.5px;
      height: 18.5px;
      background: url('../../../../static/images/topic@3x.png') 100% e('/') 100% no-repeat;
      margin: 0 9.5px 0 10.5px;
    }
    div:last-child {
      flex-grow: 1;
      text-align: left;
    }
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
              background: url('../../../../static/images/checked@3x.png') 100% e('/') 100% no-repeat;
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
          background: url('../../../../static/images/status_small@3x.png') 100% e('/') 100% no-repeat;
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
          background: url('../../../../static/images/tag_small@3x.png') 100% e('/') 100% no-repeat;
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
            background: url('../../../../static/images/comment@3x.png') 100% e('/') 100% no-repeat;
          }
          .icon_like {
            display: inline-block;
            color: transparent;
            width: 21px;
            height: 21px;
            background: url('../../../../static/images/like@3x.png') 100% e('/') 100% no-repeat;
            &.actived {
              display: inline-block;
              color: transparent;
              width: 20px;
              height: 20px;
              background: url('../../../../static/images/liked@3x.png') 100% e('/') 100% no-repeat;
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
