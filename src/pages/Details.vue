<template>
  <div class="gray">
    <div class="card-wrapper">
      <div class="card-head">
        <div class="card-head-avatar">
          <img src="../../static/images/testonly.jpg" width="100%">
        </div>
        <div class="card-head-poster">
          <div class="poster-name">金屋藏猫</div>
          <div class="poster-date">1970年1月1日 00:00</div>
        </div>
        <div class="card-head-follow">
          <button class="follow"><i class="iconfont ptsh-tianjia plus"></i> 关注</button>
        </div>
      </div>
      <div class="card-content">
        见甘、凉、瓜、沙等州城邑如故，陷蕃之人见唐使者旌节，夹道迎呼涕泣曰：“皇帝犹念陷蕃生灵否？”其人皆天宝中陷吐蕃者子孙，其语言小讹，而衣服未改。
      </div>
      <div class="card-misc">
        <div class="misc-status">您的宠物当前状态：难过</div>
        <div class="misc-tags">
          <span class="tag">萌宠</span>
          <span class="tag">喵星人</span>
        </div>
      </div>
    </div>
    <div class="comment-wrapper">
      <div class="comment-head">
        <div class="comment-count">评论 2</div>
        <div class="comment-likes">
          <span class="like-icon">10</span>
          <span class="like-count">10</span>
        </div>
      </div>
      <div class="comment-contents">
        <div class="none-comment" v-if="card.comments.length == 0">
          <span>快来发表评论吧</span>
        </div>
        <ul v-else>
          <li>
            <div class="comment-avatar">
              <img src="../../static/images/testonly.jpg">
            </div>
            <div class="comment-texts">
              <div class="comment-text-author">美丽喵喵</div>
              <div class="comment-text-raw">Lorem ipsum dolor sit amet consectetur, adipisicing elit. 汉字汉字汉字</div>
              <div class="comment-text-date"><span>1-1</span></div>
            </div>
          </li>
          <li>
            <div class="comment-avatar">
              <img src="../../static/images/testonly.jpg">
            </div>
            <div class="comment-texts">
              <div class="comment-text-author">美丽喵喵</div>
              <div class="comment-text-raw">Lorem ipsum dolor sit amet consectetur, adipisicing elit. 汉字汉字汉字</div>
              <div class="comment-text-date"><span>1-1</span></div>
            </div>
          </li>
          <li>
            <div class="comment-avatar">
              <img src="../../static/images/testonly.jpg">
            </div>
            <div class="comment-texts">
              <div class="comment-text-author">美丽喵喵</div>
              <div class="comment-text-raw">Lorem ipsum dolor sit amet consectetur, adipisicing elit. 汉字汉字汉字</div>
              <div class="comment-text-date"><span>1-1</span></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="write-comment">
      <div class="write-comment-wrapper">
        <van-field type="textarea" class="write-comment-field" v-model="comment" maxlength="100" placeholder="请输入留言" rows="1" autosize/>
      </div>
      <div class="write-comment-submit" :class="[comment.length > 0 ? 'active' : '']">
        <span>发送</span>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'details',
  data () {
    return {
      card: {
        comments: ['asdasd']
      },
      comment: ''
    }
  },
  mounted () {
    this.$store.commit('modNavbar', false)
    this.$store.commit('modClass', {inclass: 'slideInLeft', leaveclass: 'slideOutRight'})
    this.$store.commit('setTitle', '')
  },
  methods: {

  }
}
</script>

<style scoped>
.gray {
  height: 100%;
  width: 100%;
  display: relative;
  background-color: #f4f4f4;
}
.plus {
  font-weight: bold;
  font-size: 13px;
}
.card-wrapper {
  text-align: left;
  width: 100%;
  height: auto;
  background-color: #fff;
}
.card-wrapper .card-head {
  display: flex;
  height: 69.5px;
  width: 100%;
  padding: 12.5px 14.5px 10px 14px;
  box-sizing: border-box;
}
.card-wrapper .card-head .card-head-avatar {
  display: inline-block;
  width: 47px;
  height: 47px;
}
.card-wrapper .card-head .card-head-avatar img {
  width: 47px;
  height: 47px;
  border-radius: 50%;
}
.card-wrapper .card-head .card-head-poster {
  display: inline-block;
  width: 225.5px;
  padding: 6px 5px 5px 12px;
  box-sizing: content-box;
}
.card-wrapper .card-head .card-head-poster .poster-name {
  font-size: 18px;
  line-height: 18px;
  color: #000;
}
.card-wrapper .card-head .card-head-poster .poster-date {
  font-size: 12.5px;
  line-height: 12.5px;
  margin-top: 7px;
  color: #9b9b9b;
}
.card-wrapper .card-head .card-head-follow {
  width: 74px;
  height: 47px;
  padding: 3px 0 10px 5px;
}
.card-wrapper .card-head .card-head-follow button {
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
.card-wrapper .card-content {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  background-color: #fff;
  padding: 0 19px 10px 19px;
  color: #000;
  font-size: 18px;
}
.card-wrapper .card-misc {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  position: relative;
  z-index: 1;
  padding: 12.5px 14px 13px 40.5px;
  background-color: #fff;
}
.card-wrapper .card-misc .misc-status {
  position: relative;
  font-size: 16.5px;
  color: #9f9f9f;
}
.card-wrapper .card-misc .misc-tags {
  position: relative;
  margin-top: 10px;
}
.card-wrapper .card-misc .misc-status::before {
  content: '';
  width: 17px;
  height: 15.5px;
  color: #000;
  position: absolute;
  top: 3px;
  left: -26.5px;
  background: url('../../static/images/status_small@3x.png') 100% / 100% no-repeat;
}
.card-wrapper .card-misc .misc-tags::before {
  content: '';
  width: 15.5px;
  height: 15.5px;
  position: absolute;
  top: 7px;
  left: -26.5px;
  background: url('../../static/images/tag_small@3x.png') 100% / 100% no-repeat;
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
  display: flex;
  align-items: flex-end;
}
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
}
.write-comment-submit.active {
  color: #ffa721;
}
.comment-wrapper {
  width: 100%;
  background-color: #fff;
  margin-top: 11px;
}
.comment-wrapper .comment-head {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding: 12.5px 14px;
  color: #9b9b9b;
  border-bottom: 1px solid #e6e6e6;
  font-size: 18.5px;
}
.comment-wrapper .comment-head .comment-count {
  float: left;
}
.comment-wrapper .comment-head .comment-likes {
  float: right;
}
span.like-icon {
  display: inline-block;
  color: transparent;
  width: 25px;
  height: 25px;
  background: url('../../static/images/like@3x.png') 100% / 100% no-repeat;
}
span.like-icon.active {
  background: url('../../static/images/liked@3x.png') 100% / 100% no-repeat;
}
span.like-count {
  display: inline-block;
  line-height: 25px;
}
.none-comment {
  background: #f4f4f4;
  height: 267px;
  position: relative;
  margin-bottom: 60px;
}
.none-comment span {
  display: block;
  width: 100%;
  line-height: 267px;
  color: #9b9b9b;
  font-size: 12.5px;
}
.comment-contents > ul {
  padding: 0;
  margin: 0;
  margin-bottom: 63px;
  background-color: #f4f4f4;
  padding-bottom: 10px;
  box-sizing: border-box;
}
.comment-contents > ul > li {
  display: flex;
  width: 100%;
  height: auto;
  background-color: #fff;
}
.comment-contents > ul > li > .comment-avatar {
  text-align: left;
  width: 73.5px;
  box-sizing: border-box;
}
.comment-contents > ul > li > .comment-avatar img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  margin: 25px 14.5px 0 15px;
}
.comment-contents > ul > li > .comment-texts {
  width: 302px;
  height: auto;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
  padding: 27px 14px 10px 0;
  box-sizing: border-box;
}
.comment-contents > ul > li > .comment-texts > .comment-text-author {
  font-size: 16.5px;
  color: #888;
}
.comment-contents > ul > li > .comment-texts > .comment-text-raw {
  font-size: 18px;
  color: #333;
  margin: 10.5px 0 8.5px 0;
}
.comment-contents > ul > li > .comment-texts > .comment-text-date {
  font-size: 14px;
  color: #9b9b9b;
  margin: 7px 0;
}
.comment-contents > ul > li:last-child >.comment-texts {
  border: none;
}
</style>
