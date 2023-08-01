// vuex状态管理工具集
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const alertStatus = {
  state: {
    show: 0,
    type: '',
    alertText: ''
  },
  mutations: {
    saveShow(state, show) {
      state.show = state.show + show
    },
    saveType(state, type) {
      state.type = type
    },
    saveAlertText(state, alertText) {
      state.alertText = alertText
    }
  }
}
const annouceStatus = {
  state: {
    announceShow: 0,
    announcementItems: '',
  },
  mutations: {
    saveAnnounceShow(state, show) {
      state.announceShow = state.announceShow + show
    },
    saveAnnouncementItems(state, announcementItems) {
      state.announcementItems = announcementItems
    }
  }
}
// 速记面板界面状态
const memorandumStatus = {
  state: {
    memorandumShow: 0,
    memorandumItems: '',
  },
  mutations: {
    saveMemorandumShow(state, show) {
      state.memorandumShow = state.memorandumShow + show;
    },
    saveMemorandumItems(state, memorandumItems) {
      state.memorandumItems = memorandumItems;
    }
  }
}
export default new Vuex.Store({
  modules: {
    alertStatus,
    annouceStatus,
    memorandumStatus,
  }
})
