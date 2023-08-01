import store from './Store';

// 全局提示方法
// type: error, warning, success
const setNotice = (type, text) => {
    store.commit('saveAlertText', text);
    store.commit('saveType', type);
    store.commit('saveShow', 1);
}
const setAnnouncementNotice = (item) => {
    store.commit('saveAnnouncementItems', item);
    store.commit('saveAnnounceShow', 1);
}

export default {
    setNotice,
    setAnnouncementNotice
}