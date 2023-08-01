import urldefine from './dataUtil/urlDefine'
import { postWithURL } from './dataUtil/httpUtils'

// 获取总体股票得分结果
const getOverallResult = function name(params) {
  return postWithURL(urldefine.PATH_GET_OVERALL_RATE_RESULT, params);
    
}

// 按象限查询因子排名
const getStockrateByXx = function name(params) {
  return postWithURL(urldefine.PATH_GET_STOCKRATE_BY_XX, params);
    
}

// 查询OTC推荐列表
const getOTCRecdList = function name(params) {
  return postWithURL(urldefine.PATH_GET_OTC_RECD_LIST, params);
    
}

export default {
    getOverallResult,
    getStockrateByXx,
    getOTCRecdList
}
