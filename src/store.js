import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  inClass: 'slideInLeft',
  leaveClass: 'slideOutRight',
  isHome: true
}

const mutations = {
  modClass (state, classes) {
    state.inClass = classes.inclass
    state.leaveClass = classes.leaveclass
  },
  modNavbar (state, button) {
    state.isHome = button
  }
}

export default new Vuex.Store({
  state,
  mutations
})