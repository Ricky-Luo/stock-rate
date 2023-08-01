import urldefine from './dataUtil/urlDefine'
import { postWithURL } from './dataUtil/httpUtils'
import session from '../util/SessionStorage'

// 查询因子列表管理界面
const getFactorListM = function (params) {
  return postWithURL(urldefine.PATH_GET_FACTOR_LIST_M, params);
}
// 保存修改因子
const saveUpdFactor = function (params) {
  return postWithURL(urldefine.PATH_SAVE_UPD_FACTOR, params);
}
// 查询象限或行业
const getCategoryList = function (params) {
  return postWithURL(urldefine.PATH_GET_CATEGORY_LIST, params);
}
// 查询全部赛道，赛道会缓存在本地，forceRefresh = true 的时候会强制从后台刷新。
const getRaceList = function (params, forceRefresh) {
  if (session.getSessionStorage('raceList') && !forceRefresh) {
    return new Promise((resolve) => {
      resolve(session.getSessionStorage('raceList'))
    }
    )
  } else {
    return postWithURL(urldefine.PATH_GET_RACE_LIST, params).then(res => {
      session.setSessionStorage('raceList', res.list);
      return new Promise((resolve) => {
        resolve(res.list)
      }
      )
    })
  }
}
// 保存修改删除赛道
const saveUpdRace = function (params) {
  return postWithURL(urldefine.PATH_SAVE_UPD_RACE, params);
}

// 按因子id查询用户、股票
const getUsersByFid = function (params) {
  return postWithURL(urldefine.PATH_GET_USERS_BY_FID, params);
}

// 关联保存赛道和股票
const saveRaceStocks = function (params) {
  return postWithURL(urldefine.PATH_SAVE_RACE_STOCKS, params);
}
// 根据赛道Id查询关联的股票
const getStocksByRaceid =  function (params) {
  return postWithURL(urldefine.PATH_GET_STOCKS_BY_RACEID, params);
}
// 保存股票、因子、用户关联关系
const saveUpdUserStkFac =  function (params) {
  return postWithURL(urldefine.PATH_SAVE_UPD_USER_STK_FAC, params);
}
// 获取industryList 列表
const getIndustryList = function name(params) {
  return postWithURL(urldefine.PATH_GET_INDUSTRY_LIST, params);
}
// 保存或修改行业
const saveUpdIndustry = function (params) {
  return postWithURL(urldefine.PATH_SAVE_UPD_INDUSTRY, params);
}
export default {
  getFactorListM,
  saveUpdFactor,
  getCategoryList,
  getRaceList,
  saveUpdRace,
  getUsersByFid,
  saveRaceStocks,
  getStocksByRaceid,
  saveUpdUserStkFac,
  getIndustryList,
  saveUpdIndustry
}
