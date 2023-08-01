import urldefine from './dataUtil/urlDefine'
import { postWithURL } from './dataUtil/httpUtils'
// import session from '../util/SessionStorage'

// 获取A股近5日涨跌幅前二十名
const getAMarketWaveView = function (params) {
    return postWithURL(urldefine.A_MARKET_WAVE_VIEW, params);
}
const getCoreStaticWave = function(params) {
    return postWithURL(urldefine.CORE_STATIC_WAVE, params);
}
const getCoreStaticWaveIndus = function(params) {
    return postWithURL(urldefine.CORE_STATIC_WAVE_INDUS, params);
}
// 获取全市场个股涨跌幅统计
const getAllMarketChange = function(params) {
    return postWithURL(urldefine.GET_ALL_MARKET_CHANGE, params);
}

// 按照市值分类，获取市场涨跌幅统计
const getEvMarketChg = function(params) {
    return postWithURL(urldefine.GET_EV_MARCKET_CHG, params);
}

// 获取行业统计数据，涨跌幅。
const getIndusStc = function(params) {
    return postWithURL(urldefine.GET_INDUSTRY_STATISTIC, params);
}
// 获取全市场统计
const getAllMarketChg = function(params) {
    return postWithURL(urldefine.GET_ALL_MARKET_CHG, params);
}
// 申万行业三级市值龙头Top异常排序
const swIndustryTop2 = function(params) {
    return postWithURL(urldefine.SW_INDUSTRY_TOP2, params);
}
// a股全市场周期涨跌幅
const getAllAMarketChg = function(params) {
    return postWithURL(urldefine.GET_ALL_A_MARKET_CHG, params);
}
// 全市场行业区间涨跌幅
const getIndTwoMarketChg = function(params) {
    return postWithURL(urldefine.GET_IND_TWO_MARKET_CHG, params);
}
// 赛道维度统计信息
const getRaceMarketChg = function name(params) {
    return postWithURL(urldefine.GET_RACE_MARKET_CHG, params);
}

export default {
    getAMarketWaveView,
    getCoreStaticWave,
    getCoreStaticWaveIndus,
    getAllMarketChange,
    getEvMarketChg,
    getIndusStc,
    getAllMarketChg,
    swIndustryTop2,
    getAllAMarketChg,
    getIndTwoMarketChg,
    getRaceMarketChg
}
