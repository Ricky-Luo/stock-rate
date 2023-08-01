import urldefine from './dataUtil/urlDefine'
import { postWithURL, upload, getWithOtherURL} from './dataUtil/httpUtils'
// 核心股票池调入调出申请
const optCorePool = function name(params) {
  return postWithURL(urldefine.PATH_OPT_CORE_POOL, params);

}

// 审核核心股票池操作
const authOptCore = function name(params) {
  return postWithURL(urldefine.PATH_AUTH_OPT_CORE, params);
}

// 调入调出otc申请
const optOtcPool = function name(params) {
  return postWithURL(urldefine.PATH_OPT_OTC_POOL, params);

}

// 个人调入调出列表/审核人审核 列表
const authPoolList = function name(params) {
  return postWithURL(urldefine.PATH_AUTH_POOL_LIST, params);
}

// 获取industryList 列表
const getIndustryList = function name(params) {
  return postWithURL(urldefine.PATH_GET_INDUSTRY_LIST, params);
}

// 关联保存赛道和股票
const saveRaceStocks = function (params) {
  return postWithURL(urldefine.PATH_SAVE_RACE_STOCKS, params);
}

// 更新股票信息
const updStock = function (params) {
  return postWithURL(urldefine.PATH_UPDATE_STOCK, params);
}

// 获取otc股票波动率历史
const getOTCBDLHis = function (params) {
  return postWithURL(urldefine.PATH_GET_OTC_BDLHIS, params);
}
// 获取调出池列表
const getOutStockList = function (params) {
  return postWithURL(urldefine.PATH_GET_OUT_STOCK_LIST, params);
}
// 修改调出池股票。
const updOutedStock = function (params) {
  return postWithURL(urldefine.PATH_UPD_OUT_STOCK, params);
}
// 推荐、取消推荐OTC股票。
const saveUpdOTCRecommend = function (params) {
  return postWithURL(urldefine.PATH_SAVE_UPD_OTC_RECOMMEND, params);
}

// 上传股票序号excel文件
const loadStockSequence = function (params) {
  return upload(urldefine.PATH_LOAD_SOTCK_SEQUENCE, params);
}
const fetchCurrentInfo = function (params) {
  var address = 'http://qt.gtimg.cn/q=';
  params.forEach(e => {
    let index = e.indexOf('.');
    let type = e.slice(0, index);
    let code = e.slice(index + 1, e.length).toLowerCase();
    if (code === 'hk') {
      type = '0' + type;
      address += 's_' + code + type + ',';
    } else if (code === 'sh' || code === 'sz') {
      address += 's_' + code + type + ',';
    } else {
      address += 's_us' + type + ',';
    }
    
  })
  return getWithOtherURL(address, params);
}
// 检查股票是否存在于股票池
const checkStkInPool = function (params) {
  return postWithURL(urldefine.PATH_CHECK_STK_IN_POOL, params);
}
// 获取移除出OTC股票池的股票list
const getOtcOutHis = function(params) {
  return postWithURL(urldefine.PATH_GET_OTC_OUT_HIS, params);
}

export default {
  optCorePool,
  authOptCore,
  optOtcPool,
  authPoolList,
  getIndustryList,
  saveRaceStocks,
  updStock,
  getOTCBDLHis,
  getOutStockList,
  updOutedStock,
  loadStockSequence,
  fetchCurrentInfo,
  checkStkInPool,
  getOtcOutHis,
  saveUpdOTCRecommend
}