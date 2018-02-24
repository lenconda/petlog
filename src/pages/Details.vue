<template>
  <div class="gray">
    <div class="card-wrapper">
      <div class="card-head">
        <div class="card-head-avatar">
          <img :src="[`../../static/images/${author.avatar}`]" width="100%">
        </div>
        <div class="card-head-poster">
          <div class="poster-name">{{ author.name }}</div>
          <div class="poster-date">{{ post.time }}</div>
        </div>
        <div class="card-head-follow">
          <button class="follow" @click="follow" :class="[ author.followed ? 'followed' : '' ]"><i class="checked" v-if="author.followed"></i><i class="iconfont ptsh-tianjia plus" v-else></i> 关注</button>
        </div>
      </div>
      <div class="card-content">
        {{ post.content }}
      </div>
      <div class="card-misc">
        <div class="misc-status">宠物当前状态：{{ post.status }}</div>
        <div class="misc-tags">
          <span class="tag" v-for="(item, index) in post.tags">{{ item }}</span>
        </div>
      </div>
    </div>
    <div class="comment-wrapper">
      <div class="comment-head">
        <div class="comment-count">评论 {{ comments.length }}</div>
        <div class="comment-likes">
          <span class="like-icon" @click="like">10</span>
          <span class="like-count">{{ post.likes }}</span>
        </div>
      </div>
      <div class="comment-contents">
        <div class="none-comment" v-if="comments.length == 0">
          <span>快来发表评论吧</span>
        </div>
        <ul v-else>
          <li v-for="(item, index) in comments" @click="replyToName = item.author.name">
            <div class="comment-avatar">
              <img :src="[`../../static/images/${item.author.avatar}`]">
            </div>
            <div class="comment-texts">
              <div class="comment-text-author">{{ item.author.name }}</div>
              <div class="comment-text-raw">{{ item.content }}</div>
              <div class="comment-text-date"><span>{{ item.time }}</span></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="write-comment">
      <div class="write-comment-wrapper">
        <van-field type="textarea" class="write-comment-field" v-model="comment" @blur="replyToName = '作者'" maxlength="100" :placeholder="[ replyToName == '作者' ? '评论作者...' : `回复${replyToName}...` ]" rows="1" autosize/>
      </div>
      <div class="write-comment-submit" :class="[comment.length > 0 ? 'active' : '']" @click="postComment">
        <span>发送</span>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'card_details',
  data () {
    return {
      author: {
        name: '',
        id: '',
        avatar: '',
        followed: false
      },
      liked: false,
      post: {
        time: '',
        content: '',
        status: '',
        tags: [],
        likes: 0,
        images: []
      },
      comments: [
        // {            
        //   id: '234',
        //   author: {
        //     name: 'Test',
        //     id: '123',
        //     avatar: 'test.jpg'
        //   },
        //   time: '1-1', 
        //   content: 'a test message'
        // }
      ],
      comment: '',
      replyToName: '作者'
    }
  },
  created () {
    this.$http.get(`/api/card/?id=${ this.$route.params.id }`).then(res => {
      if (res.status == 200) {
        this.author = res.body.author
        this.liked = res.body.liked
        this.post = res.body.post
        this.comments = res.body.comments
      }
    })
  },
  mounted () {
    this.$store.commit('modNavbar', false)
    this.$store.commit('modClass', {inclass: 'slideInLeft', leaveclass: 'slideOutRight'})
    this.$store.commit('setTitle', '')
  },
  methods: {
    like () {
      this.$http.post('/api/user/post_praise', {id: this.$route.params.id, action: this.liked ? 0 : 1}).then(res => {
        if (res.body.status == 1) {
          this.liked = !this.liked
        } else {
          this.$toast.fail(res.body.message)
        }
      })
    },
    follow () {
      this.$http.get(`/api/user/focus/?action=${this.author.followed ? 0 : 1}&id=`).then(res => {
        if (res.body.status == 1) {
          this.author.followed = !this.author.followed
        } else {
          this.$toast.fail(res.body.message)
        }
      })
    },
    postComment () {
      this.$http.post('/api/user/post_comment', {card_id: this.$route.params.id, to_author: this.replyToName == '作者' ? true : false, reply_to: this.replyToName, content: this.comment}).then(res => {
        if (res.body.status == 1) {
          this.$toast.success('发送成功')
          this.replyToName = '作者'
          this.comment = ''
        } else {
          this.$toast.fail(res.body.message)
        }
      })
    } 
  }
}
</script>

<style lang="less" scoped>
.gray {
  height: 100%;
  display: relative;
  background-color: #f4f4f4;
  padding-top: 55px;
  padding-bottom: 57px;
  .card-wrapper {
    text-align: left;
    width: 100%;
    height: auto;
    background-color: #fff;
    .card-head {
      display: flex;
      height: 69.5px;
      width: 100%;
      padding: 12.5px 14.5px 10px 14px;
      box-sizing: border-box;
      .card-head-avatar {
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
        width: 74px;
        height: 47px;
        padding: 3px 0 10px 5px;
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
          }
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
    .card-content {
      box-sizing: border-box;
      width: 100%;
      height: auto;
      background-color: #fff;
      padding: 0 19px 10px 19px;
      color: #000;
      font-size: 18px;
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
  .comment-wrapper {
    width: 100%;
    background-color: #fff;
    margin-top: 11px;
    .comment-head {
      width: 100%;
      height: 50px;
      box-sizing: border-box;
      padding: 12.5px 14px;
      color: #9b9b9b;
      border-bottom: 1px solid #e6e6e6;
      font-size: 18.5px;
      .comment-count {
        float: left;
      }
      .comment-likes {
        float: right;
        .like-icon {
          display: inline-block;
          color: transparent;
          width: 25px;
          height: 25px;
          background: url('../../static/images/like@3x.png') 100% e('/') 100% no-repeat;
          &.active {
            background: url('../../static/images/liked@3x.png') 100% e('/') 100% no-repeat;
          }
        }
        .like-count {
          display: inline-block;
          line-height: 25px;
        }
      }
    }
    .comment-contents > .none-comment {
      background: #f4f4f4;
      height: 100px;
      position: relative;
      margin-bottom: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #686868;
      font-size: 14px;
    }
    .comment-contents > ul {
      padding: 0;
      margin: 0;
      margin-bottom: 63px;
      background-color: #f4f4f4;
      padding-bottom: 10px;
      box-sizing: border-box;
      li {
        display: flex;
        width: 100%;
        height: auto;
        background-color: #fff;
        .comment-avatar {
          text-align: left;
          width: 73.5px;
          box-sizing: border-box;
          img {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            margin: 25px 14.5px 0 15px;
          }
        }
        .comment-texts {
          width: 302px;
          height: auto;
          text-align: left;
          border-bottom: 1px solid #e0e0e0;
          padding: 27px 14px 10px 0;
          box-sizing: border-box;
          .comment-text-author {
            font-size: 16.5px;
            color: #888;
          }
          .comment-text-raw {
            font-size: 18px;
            color: #333;
            margin: 10.5px 0 8.5px 0;
          }
          .comment-text-date {
            font-size: 14px;
            color: #9b9b9b;
            margin: 7px 0;
          }
        }
        &:last-child > .comment-texts {
          border: none;
        }
      }
    }
  }
  .write-comment {
    width: 100%;
    box-sizing: border-box;
    height: auto;
    min-height: 60px;
    padding: 11px 14px 10px 14px;
    background-color: #fff;
    border-top: 1px solid #e6e6e6;
    position: fixed;
    bottom: 0;
    z-index: 999999999;
    display: flex;
    align-items: flex-end;
    .write-comment-wrapper {
      box-sizing: border-box;
      width: 280px;
      height: auto;
      padding: 8px;
      background-color: #f4f4f4;
      border-radius: 5px;
      border: 1px solid #e0e0e0
    }
    .write-comment-submit {
      width: 66.5px;
      text-align: right;
      font-size: 18.5px;
      line-height: 39px;
      padding: 0 8.5px 0 21px;
      color: #888;
      box-sizing: border-box;
      &.active {
        color: #ffa721;
      }
    }
  }
}
</style>
