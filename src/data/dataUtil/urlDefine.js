/**
 * URL常量定义类
 * 
 * */
// 登录相关接口定义
const PATH_LOGIN = 'controller/loginController.php?login'; // 登录
const PATH_CHANGE_PWD = 'controller/userController.php?updatePwd'; // 修改密码

// 打分操作相关接口定义
const PATH_GET_FACTOR_LIST = 'controller/stockFactorController.php?getFactorByUser' // 获取打分因子列表
const PATH_GET_STOCKLIST_BY_FID = 'controller/stockFactorController.php?getStockRateByFactorid' // 查询因子下所有股票分数
const PATH_SAVE_RATE = 'controller/stockFactorController.php?saveOrUpdateRate' // 保存或更新评分结果
const PATH_GET_STKLIST_BY_USER = 'controller/stockFactorController.php?getStockListByUser' // 根据用户获取所有的要打分的股票。
const PATH_GET_ADMIN_FACTOR_BUSER = 'controller/stockFactorController.php?getAdminStockFactorRate' // 基金经理旗下所有的因子。
const PATH_GET_ADMIN_STKLIST = 'controller/stockFactorController.php?getCoreStockList' // 基金经理旗下所有股票。
const PATH_GET_RATE_HIS = 'controller/stockFactorController.php?getRateHis' // 查询因子历史分数和理由

// 今日推荐相关接口定义
const PATH_GET_OVERALL_RATE_RESULT = 'controller/stockFactorController.php?getStockFactorRate' // 获取总体股票得分结果
const PATH_GET_STOCKRATE_BY_XX = 'controller/stockFactorController.php?getStockRateByXx' // 按象限查询因子排名
const PATH_GET_OTC_RECD_LIST = 'controller/stockController.php?getOtcRecommendList' // 查询OTC推荐列表
// 

// 管理员界面相关接口定义
const PATH_GET_FACTOR_LIST_M = 'controller/stockFactorController.php?getFactorList' // 查询因子列表管理界面
const PATH_SAVE_UPD_FACTOR = 'controller/stockFactorController.php?saveOrUpdateFactor' // 保存修改因子
const PATH_GET_CATEGORY_LIST = 'controller/categoryController.php?getCategoryList' // 查询象限或行业
const PATH_GET_RACE_LIST = 'controller/raceController.php?getRaceList' // 查询全部赛道
const PATH_SAVE_UPD_RACE = 'controller/raceController.php?saveOrUpdateRace' // 保存修改删除赛道
const PATH_GET_USERS_BY_FID = 'controller/stockFactorController.php?getUserListByFactorid' // 按因子id查询用户、股票
const PATH_SAVE_RACE_STOCKS = 'controller/raceController.php?saveStockRace' // 关联保存赛道和股票
const PATH_GET_STOCKS_BY_RACEID = 'controller/raceController.php?getStockListByRaceId' // 按赛道id查询相关股票
const PATH_SAVE_UPD_USER_STK_FAC = 'controller/stockFactorController.php?saveOrUpdateUserStockFactor' // 保存股票、因子、用户关联关系
const PATH_SAVE_UPD_INDUSTRY = 'controller/industryController.php?saveOrUpdateIndustry' // 保存或者修改行业

// 通用接口定义
const PATH_GET_STOCK_BY_KEY = 'controller/stockController.php?getStockList' // 股票代码模糊查询
const GET_USERS_BY_KEY = 'controller/userController.php?getUserList' // 根据关键词查询用户列表
const GET_ANNOUCEMENTS = 'controller/announcementController.php?getAnnouncementList' // 公告查询

// 股票池相关接口定义
const PATH_OPT_CORE_POOL = 'controller/stockController.php?saveOrUpdateTransfer' // 核心股票池调入调出申请
const PATH_AUTH_OPT_CORE = 'controller/stockController.php?transferStock' // 审核核心股票池操作
const PATH_OPT_OTC_POOL = 'controller/stockController.php?saveOrUpdateOTC' // 调入调出otc申请
const PATH_AUTH_POOL_LIST = 'controller/stockController.php?getTransferList' // 个人调入调出列表/审核人审核 列表
const PATH_GET_INDUSTRY_LIST = 'controller/industryController.php?getIndustryList' // 个人调入调出列表/审核人审核 列表
const PATH_UPDATE_STOCK = 'controller/stockController.php?updateStock' // 更新OTC股票信息
const PATH_GET_OTC_BDLHIS = 'controller/stockController.php?getOtcBdlHis'  // 获取波动率历史
const PATH_GET_OUT_STOCK_LIST = 'controller/stockController.php?getOutStockList'  // 获取调出池列表
const PATH_UPD_OUT_STOCK = 'controller/stockController.php?updateOutStock'  // 修改保存调出池item
const PATH_LOAD_SOTCK_SEQUENCE = 'controller/stockController.php?uploadStockNum'  // 上传股票序号excel文件
const PATH_CHECK_STK_IN_POOL = 'controller/stockController.php?checkStockInPool'  // 
const PATH_GET_OTC_OUT_HIS = 'controller/stockController.php?getOtcOutStockList' // 获取移除出OTC股票池的股票list
const PATH_SAVE_UPD_OTC_RECOMMEND = 'controller/stockController.php?saveOrUpdateOtcRecommend' // 推荐、取消推荐otc股票。
 


// 股票详情相关接口定义
const PATH_STOCK_FAC_HIS = 'controller/stockFactorController.php?getStockFactorRateHis' // 获取单个股票的单个因子的得分历史
const PATH_GET_QUADRANTS_RATE = 'controller/stockFactorController.php?getXxRate' // 查询四个象限总分
const PATH_GET_WIND_FORECAST = 'controller/stockController.php?getWdYzyq' // 获取wind盈利预测
const PATH_GET_JY_SCORE_HIS = 'controller/stockFactorController.php?getJyStockFactorRateHis' // 获取交易（综合）因子的历史得分
const PATH_GET_PE_PB_BAND = 'controller/stockController.php?getPePbBand' // 获取PE Band的数据


// 市场总览相关接口定义
const A_MARKET_WAVE_VIEW = 'controller/marketController.php?AMarketWaveView' // 获取A股近5日涨跌幅前二十名
const CORE_STATIC_WAVE = 'controller/marketController.php?coreStaticWave' // 获取核心池股票涨跌幅统计（近5日，三十天，入池已来）
const CORE_STATIC_WAVE_INDUS = 'controller/marketController.php?coreStaticWaveIndus' // 获取核心池行业涨跌幅统计（近5日，三十天，入池已来）
const GET_ALL_MARKET_CHANGE = 'controller/marketController.php?AMarketChg' // 获取全市场个股涨跌幅统计
const GET_EV_MARCKET_CHG = 'controller/marketController.php?evMarketChg' // 按照市值分类，获取市场涨跌幅统计
const GET_INDUSTRY_STATISTIC = 'controller/marketController.php?industryMarketChg' // 获取行业统计数据，涨跌幅。
const GET_ALL_MARKET_CHG = 'controller/marketController.php?allMarketChg' // 全市场统计
const SW_INDUSTRY_TOP2 = 'controller/marketController.php?swIndustryTop2' // 申万三级行业top2周期涨跌幅
const GET_ALL_A_MARKET_CHG = 'controller/marketController.php?AllAStockChg' //a股全市场周期涨跌幅
const GET_IND_TWO_MARKET_CHG = "controller/marketController.php?industryTwoMarketChg" //全市场行业区间涨跌幅

const SAVE_UPDATE_CONTENT = 'controller/contentController.php?saveOrUpdateContent' //  保存或修改点评
const GET_CONTENT_LIST = 'controller/contentController.php?getContentList' // 查询点评集合
const GET_RACE_MARKET_CHG = 'controller/marketController.php?raceMarketChg' // 赛道维度统计信息

export default {
  PATH_LOGIN,
  PATH_CHANGE_PWD,
  PATH_GET_FACTOR_LIST,
  PATH_GET_STOCKLIST_BY_FID,
  PATH_SAVE_RATE,
  PATH_GET_OVERALL_RATE_RESULT,
  PATH_GET_FACTOR_LIST_M,
  PATH_SAVE_UPD_FACTOR,
  PATH_GET_CATEGORY_LIST,
  PATH_GET_RACE_LIST,
  PATH_SAVE_UPD_RACE,
  PATH_GET_STOCK_BY_KEY,
  PATH_GET_STOCKRATE_BY_XX,
  PATH_GET_USERS_BY_FID,
  PATH_SAVE_RACE_STOCKS,
  PATH_GET_STOCKS_BY_RACEID,
  PATH_OPT_CORE_POOL,
  PATH_AUTH_OPT_CORE,
  PATH_OPT_OTC_POOL,
  PATH_AUTH_POOL_LIST,
  GET_USERS_BY_KEY,
  PATH_STOCK_FAC_HIS,
  PATH_SAVE_UPD_USER_STK_FAC,
  PATH_GET_QUADRANTS_RATE,
  PATH_GET_WIND_FORECAST,
  A_MARKET_WAVE_VIEW,
  CORE_STATIC_WAVE,
  CORE_STATIC_WAVE_INDUS,
  PATH_GET_INDUSTRY_LIST,
  PATH_UPDATE_STOCK,
  PATH_GET_OTC_BDLHIS,
  PATH_GET_STKLIST_BY_USER,
  PATH_GET_ADMIN_STKLIST,
  PATH_GET_ADMIN_FACTOR_BUSER,
  PATH_SAVE_UPD_INDUSTRY,
  GET_ALL_MARKET_CHANGE,
  PATH_GET_OUT_STOCK_LIST,
  PATH_UPD_OUT_STOCK,
  PATH_LOAD_SOTCK_SEQUENCE,
  GET_EV_MARCKET_CHG,
  GET_INDUSTRY_STATISTIC,
  GET_ALL_MARKET_CHG,
  PATH_CHECK_STK_IN_POOL,
  PATH_GET_JY_SCORE_HIS,
  PATH_GET_OTC_OUT_HIS,
  PATH_GET_PE_PB_BAND,
  GET_ANNOUCEMENTS,
  PATH_GET_RATE_HIS,
  SW_INDUSTRY_TOP2,
  SAVE_UPDATE_CONTENT,
  GET_CONTENT_LIST,
  PATH_SAVE_UPD_OTC_RECOMMEND,
  PATH_GET_OTC_RECD_LIST,
  GET_ALL_A_MARKET_CHG,
  GET_IND_TWO_MARKET_CHG,
  GET_RACE_MARKET_CHG
}
