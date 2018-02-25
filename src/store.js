import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  inClass: 'slideInLeft',
  leaveClass: 'slideOutRight',
  isHome: true,
  isTimeline: false,
  processed: '',
  images: [],
  referer: '/index',
  title: '宠物秀',
  showLogin: false,
  showRegister: false,
  showTitle: true,
  pets: []
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
  setTitle (state, newTitle) {
    state.title = newTitle
  },
  setRef (state, newRef) {
    state.referer = newRef
  },
  toggleLogin (state, option) {
    state.showLogin = option
  },
  togglleRegister (state, option) {
    state.showRegister = option
  },
  isTimeline (state, option) {
    state.isTimeline = option
  },
  toggleHeader (state, option) {
    state.showTitle = option
  },
  setPets (state, pets) {
    state.pets = pets
  },
  addPet (state, pet) {
    state.pets.push(pet)
  }
}

export default new Vuex.Store({
  state,
  mutations
})