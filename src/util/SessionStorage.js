var setSessionStorage = function (key, obj) {
  if (key) {
    let objStr = JSON.stringify(obj)
    window.sessionStorage.setItem(key, objStr)
  }
}

var getSessionStorage = function (key) {
  var str = window.sessionStorage.getItem(key)
  if (str) {
    return JSON.parse(str)
  } else {
    return null
  }
}

var removeSessionStorage = function (key) {
  if (!key) return
  window.sessionStorage.removeItem(key)
}

export default {
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage
}
