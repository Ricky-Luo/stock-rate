import urldefine from './dataUtil/urlDefine'
import { postWithURL } from './dataUtil/httpUtils'
import session from '../util/SessionStorage'
import notice from "../util/Notice";

// 根据key模糊查询股票代码
const getStocksByKey = function (params) {
  return postWithURL(urldefine.PATH_GET_STOCK_BY_KEY, params);
}
// 根据因子Id获取因子下所有股票
const getStocklistByFid = function(params) {
    return postWithURL(urldefine.PATH_GET_STOCKLIST_BY_FID, params);
  }
// 查询全部赛道
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
// 获取industryList 列表
const getIndustryList = function (params) {
  return postWithURL(urldefine.PATH_GET_INDUSTRY_LIST, params);
}
// 根据关键词查询用户列表
const getUsersByKey = function (params) {
  return postWithURL(urldefine.GET_USERS_BY_KEY, params);
}
// 根据股票代码查询对应因子
const getFacByStkCode = function (params) {
  return postWithURL(urldefine.PATH_GET_OVERALL_RATE_RESULT, params);
    
}
// 获取公告
var annoucements = [];
const getAnnouncements = function (params) {
  return postWithURL(urldefine.GET_ANNOUCEMENTS, params).then(res => {
    if (!params.key) {
      if (res.list.length > annoucements.length && annoucements.length > 0) {
        let temp = res.list;
        let calcGroup = res.list;
        for (let i = 0; i < calcGroup.length; i++) {
          for (let j = 0; j < annoucements.length; j++) {
            if (calcGroup[i].ID === annoucements[j].ID) {
              calcGroup.splice(i, 1);
              annoucements.splice(j, 1);
              i = 0;
              j = 0;
              break;
            }
          }
        }
        notice.setAnnouncementNotice(calcGroup);
        annoucements = temp;
      }
    }
    return new Promise((resolve) => {
      resolve(res)
    })
  })
}
export default {
    getStocksByKey,
    getStocklistByFid,
    getRaceList,
    getUsersByKey,
    getFacByStkCode,
    getIndustryList,
    getAnnouncements
}
