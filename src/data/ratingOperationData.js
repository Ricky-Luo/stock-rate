import urldefine from './dataUtil/urlDefine'
import { postWithURL } from './dataUtil/httpUtils'

// 获取打分因子列表
const getFactorList = function(params) {
  return postWithURL(urldefine.PATH_GET_FACTOR_LIST, params);
}
const getStocklistByFid = function(params) {
  return postWithURL(urldefine.PATH_GET_STOCKLIST_BY_FID, params);
}
// 保存评分结果
const saveRate = function(params) {
  return postWithURL(urldefine.PATH_SAVE_RATE, params);
}
// 根据用户获取所有的要打分的股票。
const getStocksByUser = function(params) {
  return postWithURL(urldefine.PATH_GET_STKLIST_BY_USER, params);
}
// 基金经理旗下所有的因子。
const getAdminFactorByUser = function(params) {
  return postWithURL(urldefine.PATH_GET_ADMIN_FACTOR_BUSER, params);
}
// 基金经理旗下所有的因子。
const getAdminStkList = function(params) {
  return postWithURL(urldefine.PATH_GET_ADMIN_STKLIST, params);
}
// 获取历史评分和理由
const getRateHis = function(params) {
  return postWithURL(urldefine.PATH_GET_RATE_HIS, params);
}
export default {
    getFactorList,
    getStocklistByFid,
    saveRate,
    getStocksByUser,
    getAdminFactorByUser,
    getAdminStkList,
    getRateHis
}