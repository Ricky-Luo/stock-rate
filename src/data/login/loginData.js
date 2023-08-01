import urldefine from '../dataUtil/urlDefine'
import { postWithURL } from '../dataUtil/httpUtils'

// 执行登录请求
const doLogin = function(params) {
  return postWithURL(urldefine.PATH_LOGIN, params);
}

// 修改密码
const changePwd = function (params) {
  return postWithURL(urldefine.PATH_CHANGE_PWD, params);
}
export default {
  doLogin,
  changePwd
}
