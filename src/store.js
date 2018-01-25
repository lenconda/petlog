import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  inClass: 'slideInLeft',
  leaveClass: 'slideOutRight',
  isHome: true,
  processed: ''
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
  }
}

export default new Vuex.Store({
  state,
  mutations
})