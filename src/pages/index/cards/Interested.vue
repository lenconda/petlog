<template>
  <van-pull-refresh v-model="isLoading" class="content">
    <div class="topic-wrapper" v-show="$route.query.tag">
      <div class="topic-icon"></div>
      <div>当前已选中的标签： #{{ $route.query.tag }}#</div>
    </div>
    <div class="card-wrapper">
      <div class="card-head">
        <div class="card-head-avatar">
          <img src="../../../../static/images/testonly.jpg" width="100%">
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
      <div class="card-control-wrapper">
        <div class="card-control">
          <button class="control-btn"><span class="icon_comment">icon_comment</span><span>&nbsp;23</span></button>
          <button class="control-btn"><span class="icon_like">icon_like</span><span>&nbsp;233</span></button>
        </div>
      </div>
    </div>
    <div class="card-wrapper">
      <div class="card-head">
        <div class="card-head-avatar">
          <img src="../../../../static/images/testonly.jpg" width="100%">
        </div>
        <div class="card-head-poster">
          <div class="poster-name">金屋藏猫</div>
          <div class="poster-date">1970年1月1日 00:00</div>
        </div>
        <div class="card-head-follow">
          <button class="follow followed"><i class="checked"></i> 关注</button>
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
      <div class="card-control-wrapper">
        <div class="card-control">
          <button class="control-btn"><span class="icon_comment">icon_comment</span><span>&nbsp;23</span></button>
          <button class="control-btn"><span class="icon_like">icon_like</span><span>&nbsp;233</span></button>
        </div>
      </div>
    </div>
    <div class="loadmore">
      加载更多
    </div>
  </van-pull-refresh>
</template>

<script>
export default {
  name: 'index_cards_interested',
  data () {
    return {
      isLoading: false
    }
  },
  created () {
    getFollowed()
  },
  watch: {
    isLoading () {
      if (this.isLoading) {
        console.log('is loading...')
        setTimeout(() => {
          this.isLoading = false
        }, 3000);
      }
    }
  },
  methods: {
    getFollowed () {
      this.$http.post('/api/user/get_circle_of_friends', {action})
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  background-color: #f4f4f4;
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
  & .card-wrapper {
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
