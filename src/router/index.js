import Vue from 'vue'
import Router from 'vue-router'
// import userVm from '../vm/user/UserVm.js'
// import sessionStorage from '../utils/SessionStorage.js'

import Login from '../components/Login';
import StockRating from '../components/StockRating';
import IndexFrame from '../components/IndexFrame' // 单页应用里的菜单框架
import TodaySuggestion from '../components/TodaySuggestion/TodaySuggestion.vue' // 今日推荐
import Management from '../components/Management/Management.vue' // 管理员界面
import StockPools from '../components/StockPools.vue' // 股票池
import MarketOverview from '../components/MakertOverview/MarketOverview.vue' // 市场总览
import Anouncements from '../components/Anouncements.vue' // 公告汇总
const StockDetail = () => import('../components/StockDetail.vue') // 股票详情
const FileUploadTest = () => import('../components/FileUploadTest.vue') // 上传测试


// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes: [
    // 根路径，直接导航去login
    {
      path: '/',
      name: 'index',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login

    },
    {
      path: '/indexFrame',
      name: 'indexFrame',
      component: IndexFrame,
      redirect: '/indexFrame/stockRating',
      children: [
        {
          path: '/indexFrame/stockRating',
          name: 'stockRating',
          component: StockRating
        },
        {
          path: '/indexFrame/todaySuggestion',
          name: 'todaySuggestion',
          component: TodaySuggestion
        },
        {
          path: '/indexFrame/management',
          name: 'management',
          component: Management
        },
        {
          path: '/indexFrame/stockPools',
          name: 'stockPools',
          component: StockPools
        },
        {
          path: '/indexFrame/stockDetail',
          name: 'stockDetail',
          component: StockDetail
        },
        {
          path: '/indexFrame/MarketOverview',
          name: 'marketOverview',
          component: MarketOverview
        },
        {
          path: '/indexFrame/FileUploadTest',
          name: 'fileUploadTest',
          component: FileUploadTest
        },
        {
          path: '/indexFrame/Anouncements',
          name: 'anouncements',
          component: Anouncements
        }
      ]
    }
  ]
})
