import urldefine from './dataUtil/urlDefine'
import { postWithURL } from './dataUtil/httpUtils'

// 查询单个股票，多个因子的打分历史。
const getStockFacHis = function (params) {
  return postWithURL(urldefine.PATH_STOCK_FAC_HIS, params);
}
// 查询四个象限总分
const getQuadrantsRate = function(params) {
  return postWithURL(urldefine.PATH_GET_QUADRANTS_RATE, params);
}

const getWindForecast = function(params) {
  return postWithURL(urldefine.PATH_GET_WIND_FORECAST, params);
}
const getJyScoreHis = function(params) {
  return postWithURL(urldefine.PATH_GET_JY_SCORE_HIS, params);
}

const getPePbBand = function(params) {
  return postWithURL(urldefine.PATH_GET_PE_PB_BAND, params);
}

export default {
    getStockFacHis,
    getQuadrantsRate,
    getWindForecast,
    getJyScoreHis,
    getPePbBand
}
