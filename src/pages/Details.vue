<template>
  <div class="gray">
    <div class="card-wrapper">
      <div class="card-head">
        <div class="card-head-avatar">
          <img src="../../static/images/testonly.jpg" width="100%" height="100%">
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
      <div class="comment-head"></div>
      <div class="comment-contents">
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
    <div class="write-comment">
      <div class="write-comment-field">
        
      </div>
      <div class="write-comment-submit">
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

    }
  },
  mounted () {

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
  width: 69px;
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
</style>
