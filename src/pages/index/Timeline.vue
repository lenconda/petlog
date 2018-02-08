<template>
  <div class="timeline">
    <div class="head-wrapper">
      <div class="avatar-wrapper">
        <div>
          <img :src="['../../../static/images/testonly.jpg']" width="100%" height="100%">
          <i class="switch-btn"></i>
        </div>
      </div>
      <div class="info-wrapper">
        <span class="name-age">
          <span>毛毛</span>|<span>2岁</span>
        </span>
        <span class="motto">毛毛，两岁，波斯猫，有兴趣认识毛毛...</span>
      </div>
    </div>
    <div class="timeline-items-wrapper">
      <div class="timeline-items">
        <div class="date">
          <div class="dates">
            <span>22</span>
            <span>1月</span>
          </div>
        </div>
        <div class="content">
          <div class="card">
            <p>今天和毛毛出去玩了，稍后放图，哈哈哈哈哈哈</p>
          </div>
        </div>
      </div>
      <div class="timeline-items">
        <div class="date">
          <div class="dates">
            <span>22</span>
            <span>1月</span>
          </div>
        </div>
        <div class="content">
          <div class="card">
            <p>今天和毛毛出去玩了，稍后放图，哈哈哈哈哈哈</p>
          </div>
        </div>
      </div>
      <div class="timeline-items">
        <div class="date isyear">
          <div class="dates">
            <span></span>
            <span></span>
          </div>
          <div class="year">2017</div>
        </div>
        <div class="content">
          <div class="card" style="display: none">
            <p></p>
          </div>
        </div>
      </div>
      <div class="timeline-items">
        <div class="date">
          <div class="dates">
            <span>2</span>
            <span>12月</span>
          </div>
        </div>
        <div class="content">
          <div class="card">
            <p>今天和毛毛出去玩了</p>
            <div class="image-wrapper">
              <img src="../../../static/images/testonly2.png" alt="" width="100%" height="100%">
              <span>9</span>
            </div>
            <div class="status-panel">
              <span class="icon_status">status</span><span>开心</span>
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
  },
  destroyed () {
    this.$store.commit('isTimeline', false)
  }
}
</script>

<style scoped>
.timeline {
  height: 100%;
  background-color: #f4f4f4;
  overflow-y: auto;
}
.head-wrapper {
  min-height: 161px;
  height: auto;
  width: 100%;
  background: #2f3139;
  user-select: none;
}
.avatar-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 105px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
}
.avatar-wrapper > div {
  position: relative;
}
.avatar-wrapper > div > img {
  width: 82px;
  height: 82px;
  box-sizing: border-box;
  border-radius: 50%;
  border: 1.5px solid rgba(224, 224, 224, .5);
}

.info-wrapper {
  width: 100%;
  height: auto;
  color: #fff;
  box-sizing: border-box;
  padding: 9.5px 0 5.5px 0;
}
.info-wrapper > span {
  display: block;
}
.info-wrapper > .name-age {
  margin-bottom: 2px;
  font-size: 17px;
}
.info-wrapper > .name-age > span:first-child {
  padding-right: 24px;
}
.info-wrapper > .name-age > span:last-child {
  padding-left: 24px;
}
.info-wrapper > .motto {
  box-sizing: border-box;
  width: 100%;
  padding: 0 26.5px 0 26.5px;
  margin-top: 2px;
  font-size: 14.5px;
}
.switch-btn {
  width: 10.5px;
  height: 13px;
  background-color: transparent;
  background: url('../../../static/images/switch@3x.png') 100% / 100% no-repeat;
  position: absolute;
  bottom: 50%;
  transform: translateY(50%);
  right: -15px;
}

.timeline-items-wrapper {
  width: 100%;
  box-sizing: border-box;
}
.timeline-items {
  width: 100%;
  height: auto;
  display: flex;
}
.timeline-items > .date {
  width: 70px;
  border-right: 1px solid #fff;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  box-sizing: border-box;
  padding-top: 8.75px;
}
.timeline-items > .date::after {
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
.timeline-items > .date > .year {
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
.isyear {
  height: 48.5px;
}
.isyear::after {
  display: none;
}
.timeline-items > .date > div > span:first-child {
  color: #000;
  font-size: 19px;
  display: block;
  font-weight: bold;
}
.timeline-items > .date > div > span:last-child {
  color: #9b9b9b;
  font-size: 13.5px;
  display: block;
}
.timeline-items > .content {
  width: 305px;
  box-sizing: border-box;
  padding: 8.75px 17.5px 8.75px 21px;
}
.timeline-items:first-child > .content {
  padding-top: 16.5px;
}
.timeline-items > .content > .card {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 4px 6.5px 0px rgba(0, 0, 0, 0.1);
  border: solid 1px #e6e6e6;
  box-sizing: border-box;
  padding: 12px;
  padding-right: 2px;
  padding-bottom: 8px;
  text-align: left;
  font-size: 16.5px;
  color: #000;
}
.timeline-items > .content > .card > p {
  margin: 0;
}
.timeline-items > .content > .card > .image-wrapper {
  position: relative;
  width: 239px;
  height: auto;
  display: block;
}
.timeline-items > .content > .card > .image-wrapper > img {
  width: 239px;
  height: 139px;
  margin: 8px 0 3px 0;
}
.timeline-items > .content > .card > .image-wrapper > span {
  display: inline-block;
  color: #fff;
  background-color: rgba(0, 0, 0, .5);
  padding: 0 10px;
  border-radius: 5px;
  font-size: 18.5px;
  position: absolute;
  right: 7px;
  bottom: 24px;
}
.timeline-items > .content > .card > .status-panel > span {
  display: inline-block;
}
.timeline-items > .content > .card > .status-panel > .icon_status {
  color: transparent;
  width: 16px;
  height: 16px;
  line-height: 16px;
  background: url('../../../static/images/status.png') 100% / 100% no-repeat;
}
.timeline-items > .content > .card > .status-panel > span:last-child {
  color: #888;
  font-size: 12.5px;
  line-height: 12.5px;
  margin-left: 4.5px;
}
</style>
