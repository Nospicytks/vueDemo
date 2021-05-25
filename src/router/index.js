import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'login',
      meta:{
        title:'登录'
      },
      component: () => import('@/pages/login/login.vue')
    },
    {
      path: '/nohome',
      name: 'login',
      meta:{
        title:'首页'
      },
      component: () => import('@/pages/nohome/nohome.vue')
    },
    {
      path: '/home',
      name: 'home',
      meta:{
        title:'工作台'
      },
      component: () => import('@/pages/home/home.vue')
    },
    {
      path: '/jcconfig/parkingList',
      name: 'parkingList',
      meta:{
        title:'停车场列表'
      },
      component: () => import('@/pages/jcconfig/parkingList.vue')
    },
    {
      path: '/jcconfig/parkingListUpdate/',
      name: 'parkingListUpdate',
      meta:{
        title:'添加车场'
      },
      component: () => import('@/pages/jcconfig/parkingListUpdate.vue')
    },
    {
      path: '/jcconfig/camera/',
      name: 'camera',
      meta:{
        title:'停车场硬件配置'
      },
      component: () => import('@/pages/jcconfig/camera.vue')
    },
    {
      path: '/jcconfig/gateManage/',
      name: 'gateManage',
      meta:{
        title:'停车场出入口管理'
      },
      component: () => import('@/pages/jcconfig/gateManage.vue')
    },
    {
      path: '/jcconfig/gateManageAdd/',
      name: 'gateManageAdd',
      meta:{
        title:'停车场出入口管理'
      },
      component: () => import('@/pages/jcconfig/gateManageAdd.vue')
    },
    {
      path: '/jcconfig/officeList',
      name: 'officeList',
      meta:{
        title:'职员列表'
      },
      component: () => import('@/pages/jcconfig/officeList.vue')
    },
    {
      path: '/jcconfig/officeListUpdate/',
      // :id/:admin_name/:nikename/:group_id
      name: 'officeListUpdate',
      meta:{
        title:'添加职员'
      },
      component: () => import('@/pages/jcconfig/officeListUpdate.vue')
    },
    {
      path: '/jcconfig/posList',
      name: 'posList',
      meta:{
        title:'职务管理'
      },
      component: () => import('@/pages/jcconfig/posList.vue')
    },
    {
      path: '/jcconfig/posListUpdate',
      name: 'posListUpdate',
      meta:{
        title:'添加职务'
      },
      component: () => import('@/pages/jcconfig/posListUpdate.vue')
    },
    {
      path: '/jcconfig/opinionList',
      name: 'opinionList',
      meta:{
        title:'意见列表'
      },
      component: () => import('@/pages/jcconfig/opinionList.vue')
    },
    {
      path: '/jcconfig/opinionDetail',
      name: 'opinionDetail',
      meta:{
        title:'意见明细'
      },
      component: () => import('@/pages/jcconfig/opinionDetail.vue')
    },
    {
      path: '/jcconfig/cardList',
      name: 'cardList',
      meta:{
        title:'包时卡类型列表'
      },
      component: () => import('@/pages/jcconfig/cardList.vue')
    },
    {
      path: '/jcconfig/cardListUpdate',
      name: 'cardListUpdate',
      meta:{
        title:'添加包时卡'
      },
      component: () => import('@/pages/jcconfig/cardListUpdate.vue')
    },
    {
      path: '/jcconfig/accountCards',
      name: 'accountCards',
      meta:{
        title:'储值卡规则管理'
      },
      component: () => import('@/pages/jcconfig/accountCards.vue')
    },
    {
      path: '/jcconfig/remindCards',
      name: 'remindCards',
      meta:{
        title:'包时卡到期提醒设置'
      },
      component: () => import('@/pages/jcconfig/remindCards.vue')
    },
    {
      path: '/jcconfig/advertList',
      name: 'advertList',
      meta:{
        title:'广告列表'
      },
      component: () => import('@/pages/jcconfig/advertList.vue')
    },
    {
      path: '/jcconfig/advertAdd',
      name: 'advertAdd',
      meta:{
        title:'添加广告'
      },
      component: () => import('@/pages/jcconfig/advertAdd.vue')
    },
    {
      path: '/jcconfig/startPageList',
      name: 'startPageList',
      meta:{
        title:'启动页列表'
      },
      component: () => import('@/pages/jcconfig/startPageList.vue')
    },
    {
      path: '/jcconfig/startPage',
      name: 'startPage',
      meta:{
        title:'启动页配置'
      },
      component: () => import('@/pages/jcconfig/startPage.vue')
    },
    {
      path: '/actConfig/coupon/couponList',
      name: 'couponList',
      meta:{
        title:'优惠券列表'
      },
      component: () => import('@/pages/actConfig/coupon/couponList.vue')
    },
    {
      path: '/actConfig/coupon/couponDetail',
      name: 'couponDetail',
      meta:{
        title:'优惠券使用明细'
      },
      component: () => import('@/pages/actConfig/coupon/couponDetail.vue')
    },
    {
      path: '/actConfig/coupon/addCoupon',
      name: 'addCoupon',
      meta:{
        title:'添加优惠券'
      },
      component: () => import('@/pages/actConfig/coupon/addCoupon.vue')
    },
    {
      path: '/actConfig/coupon/couponRuleList',
      name: 'couponRuleList',
      meta:{
        title:'规则列表'
      },
      component: () => import('@/pages/actConfig/coupon/couponRuleList.vue')
    },
    {
      path: '/actConfig/coupon/couponRule',
      name: 'couponRule',
      meta:{
        title:'配置用券规则'
      },
      component: () => import('@/pages/actConfig/coupon/couponRule.vue')
    },
    {
      path: '/actConfig/lottery/lotteryList',
      name: 'lotteryList',
      meta:{
        title:'活动清单'
      },
      component: () => import('@/pages/actConfig/lottery/lotteryList.vue')
    },
    {
      path: '/actConfig/lottery/winningRecord',
      name: 'winningRecord',
      meta:{
        title:'中奖记录'
      },
      component: () => import('@/pages/actConfig/lottery/winningRecord.vue')
    },
    {
      path: '/actConfig/lottery/addLottery',
      name: 'addLottery',
      meta:{
        title:'添加抽奖活动'
      },
      component: () => import('@/pages/actConfig/lottery/addLottery.vue')
    },
    {
      path: '/actConfig/sign/signList',
      name: 'signList',
      meta:{
        title:'签到记录'
      },
      component: () => import('@/pages/actConfig/sign/signList.vue')
    },
    {
      path: '/actConfig/sign/signDetail',
      name: 'signDetail',
      meta:{
        title:'签到记录详情'
      },
      component: () => import('@/pages/actConfig/sign/signDetail.vue')
    },
    {
      path: '/actConfig/sign/addSign',
      name: 'addSign',
      meta:{
        title:'添加签到活动'
      },
      component: () => import('@/pages/actConfig/sign/addSign.vue')
    },
    {
      path: '/actConfig/integral/integralList',
      name: 'integralList',
      meta:{
        title:'积分兑换列表'
      },
      component: () => import('@/pages/actConfig/integral/integralList.vue')
    },
    {
      path: '/actConfig/integral/integralHistory',
      name: 'integralHistory',
      meta:{
        title:'积分兑换记录'
      },
      component: () => import('@/pages/actConfig/integral/integralHistory.vue')
    },
    {
      path: '/actConfig/integral/rewardHistory',
      name: 'rewardHistory',
      meta:{
        title:'积分奖励记录'
      },
      component: () => import('@/pages/actConfig/integral/rewardHistory.vue')
    },
    {
      path: '/actConfig/integral/integralAdd',
      name: 'integralAdd',
      meta:{
        title:'添加积分兑换项'
      },
      component: () => import('@/pages/actConfig/integral/integralAdd.vue')
    },
    {
      path: '/actConfig/integral/integralReward',
      name: 'integralReward',
      meta:{
        title:'积分奖励设置'
      },
      component: () => import('@/pages/actConfig/integral/integralReward.vue')
    },
    {
      path: '/actConfig/paijuan/manualPjList',
      name: 'manualPjList',
      meta:{
        title:'手动派券记录'
      },
      component: () => import('@/pages/actConfig/paijuan/manualPjList.vue')
    },
    {
      path: '/actConfig/paijuan/manualPjDo',
      name: 'manualPjDo',
      meta:{
        title:'手动派券'
      },
      component: () => import('@/pages/actConfig/paijuan/manualPjDo.vue')
    },
    {
      path: '/actConfig/paijuan/automaticPjList',
      name: 'automaticPjList',
      meta:{
        title:'自动派卷任务列表'
      },
      component: () => import('@/pages/actConfig/paijuan/automaticPjList.vue')
    },
    {
      path: '/actConfig/paijuan/automaticPjHistory',
      name: 'automaticPjHistory',
      meta:{
        title:'自动派卷记录'
      },
      component: () => import('@/pages/actConfig/paijuan/automaticPjHistory.vue')
    },
    {
      path: '/actConfig/paijuan/automaticPjDo',
      name: 'automaticPjDo',
      meta:{
        title:'自动派券任务'
      },
      component: () => import('@/pages/actConfig/paijuan/automaticPjDo.vue')
    },
    {
      path: '/affairsManagement/cooperation/partnerList',
      name: 'partnerList',
      meta:{
        title:'合作泊车企业列表'
      },
      component: () => import('@/pages/affairsManagement/cooperation/partnerList.vue')
    },
    {
      path: '/affairsManagement/cooperation/licensePlateList',
      name: 'licensePlateList',
      meta:{
        title:'合作泊车车牌列表'
      },
      component: () => import('@/pages/affairsManagement/cooperation/licensePlateList.vue')
    },
    {
      path: '/affairsManagement/cooperation/partnerAdd',
      name: 'partnerAdd',
      meta:{
        title:'添加合作泊车企业'
      },
      component: () => import('@/pages/affairsManagement/cooperation/partnerAdd.vue')
    },
    {
      path: '/affairsManagement/cooperation/licensePlateAdd',
      name: 'licensePlateAdd',
      meta:{
        title:'添加合作泊车车牌'
      },
      component: () => import('@/pages/affairsManagement/cooperation/licensePlateAdd.vue')
    },
    {
      path: '/affairsManagement/insideCars/inCarsList',
      name: 'inCarsList',
      meta:{
        title:'内部车列表'
      },
      component: () => import('@/pages/affairsManagement/insideCars/inCarsList.vue')
    },
    {
      path: '/affairsManagement/insideCars/inCarsAdd',
      name: 'inCarsAdd',
      meta:{
        title:'添加内部车'
      },
      component: () => import('@/pages/affairsManagement/insideCars/inCarsAdd.vue')
    },
    {
      path: '/affairsManagement/openTheDoor/openList',
      name: 'openList',
      meta:{
        title:'远程开门记录'
      },
      component: () => import('@/pages/affairsManagement/openTheDoor/openList.vue')
    },
    {
      path: '/affairsManagement/openTheDoor/openDo',
      name: 'openDo',
      meta:{
        title:'远程开门'
      },
      component: () => import('@/pages/affairsManagement/openTheDoor/openDo.vue')
    },
    {
      path: '/userCenter/userAdmin/wxUserList',
      name: 'wxUserList',
      meta:{
        title:'微信用户列表'
      },
      component: () => import('@/pages/userCenter/userAdmin/wxUserList.vue')
    },
    {
      path: '/userCenter/userAdmin/wxUserDetail',
      name: 'wxUserDetail',
      meta:{
        title:'用户详情'
      },
      component: () => import('@/pages/userCenter/userAdmin/wxUserDetail.vue')
    },
    {
      path: '/userCenter/VipCars/vipCarsAdmin',
      name: 'vipCarsAdmin',
      meta:{
        title:'车辆列表'
      },
      component: () => import('@/pages/userCenter/VipCars/vipCarsAdmin.vue')
    },
    {
      path: '/userCenter/VipCars/vipCarsAdd',
      name: 'vipCarsAdd',
      meta:{
        title:'会员车辆详情'
      },
      component: () => import('@/pages/userCenter/VipCars/vipCarsAdd.vue')
    },
	{
	  path: '/userCenter/VipCars/VipCarsdetail',
	  name: 'VipCarsdetail',
	  meta:{
	    title:'添加会员车辆'
	  },
	  component: () => import('@/pages/userCenter/VipCars/VipCarsdetail.vue')
	},
    {
      path: '/userCenter/integralAdmin/indegralHistory',
      name: 'indegralHistory',
      meta:{
        title:'积分记录'
      },
      component: () => import('@/pages/userCenter/integralAdmin/indegralHistory.vue')
    },
    {
      path: '/statementCenter/hzStatement/parkingsDay',
      name: 'parkingsDay',
      meta:{
        title:'车场经营日报'
      },
      component: () => import('@/pages/statementCenter/hzStatement/parkingsDay.vue')
    },
    {
      path: '/statementCenter/hzStatement/parkingsMonth',
      name: 'parkingsMonth',
      meta:{
        title:'车场经营月报'
      },
      component: () => import('@/pages/statementCenter/hzStatement/parkingsMonth.vue')
    },
    {
      path: '/statementCenter/hzStatement/timeCard',
      name: 'timeCard',
      meta:{
        title:'包时卡统计报表'
      },
      component: () => import('@/pages/statementCenter/hzStatement/timeCard.vue')
    },
    {
      path: '/statementCenter/sfStatement/ltList',
      name: 'ltList',
      meta:{
        title:'临停收费明细'
      },
      component: () => import('@/pages/statementCenter/sfStatement/ltList.vue')
    },
    {
      path: '/statementCenter/sfStatement/bkList',
      name: 'bkList',
      meta:{
        title:'办卡收费明细'
      },
      component: () => import('@/pages/statementCenter/sfStatement/bkList.vue')
    },
    {
      path: '/statementCenter/sfStatement/czList',
      name: 'czList',
      meta:{
        title:'储值收费明细'
      },
      component: () => import('@/pages/statementCenter/sfStatement/czList.vue')
    },
    {
      path: '/statementCenter/sfStatement/yeList',
      name: 'yeList',
      meta:{
        title:'余额明细报表'
      },
      component: () => import('@/pages/statementCenter/sfStatement/yeList.vue')
    },
    {
      path: '/statementCenter/carsDetail/carsJfList',
      name: 'carsJfList',
      meta:{
        title:'车次计费明细'
      },
      component: () => import('@/pages/statementCenter/carsDetail/carsJfList.vue')
    },
    {
      path: '/statementCenter/carsDetail/carsJcList',
      name: 'carsJcList',
      meta:{
        title:'车辆进出明细'
      },
      component: () => import('@/pages/statementCenter/carsDetail/carsJcList.vue')
    },
    {
      path: '/statementCenter/carsDetail/carsZcList',
      name: 'carsZcList',
      meta:{
        title:'在场车辆明细'
      },
      component: () => import('@/pages/statementCenter/carsDetail/carsZcList.vue')
    },
    {
      path: '/statementCenter/carsDetail/carsFxList',
      name: 'carsFxList',
      meta:{
        title:'车辆放行记录'
      },
      component: () => import('@/pages/statementCenter/carsDetail/carsFxList.vue')
    },
    {
      path: '/statementCenter/couponDetail/couponDeList',
      name: 'couponDeList',
      meta:{
        title:'优惠券抵扣明细'
      },
      component: () => import('@/pages/statementCenter/couponDetail/couponDeList.vue')
    }
  ]
})

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

router.beforeEach((to, from, next) => {
  if (to.meta.title) {//如果设置标题，拦截后设置标题
    document.title = to.meta.title
  }
  const token = sessionStorage.getItem('token')
  if (!token && to.path !== '/') {
    next('/')
  } else if(token && to.path == '/'){
    next('/nohome')
  } else {
    next()
  }
})

export default router
