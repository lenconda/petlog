import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  inClass: 'slideInLeft',
  leaveClass: 'slideOutRight',
  isHome: true,
  processed: '',
  images: [],
  referer: '/index',
  title: '宠物秀'
}

const mutations = {
  modClass (state, classes) {
    state.inClass = classes.inclass
    state.leaveClass = classes.leaveclass
  },
  modNavbar (state, button) {
    state.isHome = button
  },
  processImg (state, imgSrc) {
    state.processed = imgSrc
  },
  delProcessed (state) {
    state.processed = ''
  },
  setRef (state, newRef) {
    state.referer = newRef
  },
  setTitle (state, newTitle) {
    state.title = newTitle
  }
}

export default new Vuex.Store({
  state,
  mutations
})