// 封装axios网络请求
import request from '@/api/api'

// const token = sessionStorage.getItem('token')
// 公共接口
// 单页面中的停车场列表
export function childParkingList(parkRule,couponRuleId){
  return request({
      url:'/View/getParkList',
      method:'post',
      data:{
        parkRule:parkRule,
        couponRuleId,couponRuleId,
        token:sessionStorage.getItem('token')
      }
    })
}
export function childParking(parkRule,couponRuleId){
  return request({
      url:'/View/getParkList',
      method:'post',
      data:{
        parkRule:parkRule,
        isAll:0,
        couponRuleId,couponRuleId,
        token:sessionStorage.getItem('token')
      }
    })
}
// 单页面中的职务列表
export function childJcconfigGroupList(){
  return request({
      url:'/View/getGroupList',
      method:'post',
      data:{
        token:sessionStorage.getItem('token')
      }
    })
}
// 单页面中的优惠卷列表
export function childCouponList(){
  return request({
      url:'/View/getCouponList',
      method:'post',
      data:{
        token:sessionStorage.getItem('token')
      }
    })
}
// 获取卡基础类型
export function childCardList(noCard){
  return request({
      url:'/View/getBaseCardList',
      method:'post',
      data:{
        noCard:noCard,
        token:sessionStorage.getItem('token')
      }
    })
}
// 通过手机号获取用户信息
export function getUserByPhone(phone){
  return request({
      url:'/View/getUserByPhone',
      method:'post',
      data:{
        phone:phone,
        token:sessionStorage.getItem('token')
      }
    })
}
 // 获取合作商列表
export function getCompanyList(){
  return request({
      url:'/View/getCompanyList',
      method:'post',
      data:{
        token:sessionStorage.getItem('token')
      }
    })
}
 // 获取摄像头列表
export function getCameraList(park_id){
  return request({
      url:'/View/getCameraList',
      method:'post',
      data:{
        park_id:park_id,
        token:sessionStorage.getItem('token')
      }
    })
}
 // 获取省级列表
export function getProvince(){
  return request({
      url:'/View/getProvince',
      method:'post',
      data:{
        token:sessionStorage.getItem('token')
      }
    })
}
 //  获取市级列表
export function getCity(id){
  return request({
      url:'/View/getCity',
      method:'post',
      data:{
        id:id,
        token:sessionStorage.getItem('token')
      }
    })
}
 //   获取区级列表
export function getDistinct(id){
  return request({
      url:'/View/getDistinct',
      method:'post',
      data:{
        id:id,
        token:sessionStorage.getItem('token')
      }
    })
}
// 根据主卡及停车场获取包时卡
export function getCardList(park_ids,card_base_id){
  return request({
      url:'/View/getCardList',
      method:'post',
      data:{
        park_ids:park_ids,
        card_base_id:card_base_id,
        token:sessionStorage.getItem('token')
      }
    })
}
// 公共接口end
// 登录
export function login(username,password){
	return request({
		url:'/Login/login',
		method:'post',
		data:{
      username:username,
      password:password
		}
	})
}
 // 系统人员管理
 // 系统管理员列表
export function jcconfigOfficeList(group_id,name,phone,current_page,per_page){
  return request({
      url:'/AdminUser/index',
      method:'post',
      data:{
        group_id:group_id,
        name:name,
        phone:phone,
        page:current_page,
        limit:per_page,
        token:sessionStorage.getItem('token')
      }
    })
}
// 系统管理员列表删除
export function jcconfigOfficeDelete(id){
  return request({
      url:'/AdminUser/delete',
      method:'post',
      data:{
        id:id,
        token:sessionStorage.getItem('token')
      }
    })
}
// 系统管理员列表新增/修改
export function jcconfigOfficeEdit(group_id,admin_name,admin_pwd,repassword,nikename,is_edit,park_ids,id){
  return request({
      url:'/AdminUser/add',
      method:'post',
      data:{
        group_id:group_id,
        admin_name:admin_name,
        admin_pwd:admin_pwd,
        repassword:repassword,
        nikename:nikename,
        is_edit:is_edit,
        park_ids:park_ids,
        id:id,
        token:sessionStorage.getItem('token')
      }
    })
}

// 系统管理员职务列表
export function jcconfigGroupList(title,current_page,per_page){
  return request({
      url:'/Adminuser/groupList',
      method:'post',
      data:{
        name:title,
        page:current_page,
        limit:per_page,
        token:sessionStorage.getItem('token')
      }
    })
}
// 系统管理员职务列表修改添加
export function jcconfigGroupListEdit(title,status,description,rules,is_edit,id){
  return request({
      url:'/Adminuser/addGroup',
      method:'post',
      data:{
        is_edit:is_edit,
        title:title,
        description:description,
        rules:rules,
        status:status,
        id:id,
        token:sessionStorage.getItem('token')
      }
    })
}
// 系统管理员职务列表删除
export function jcconfigGroupListDelete(id){
  return request({
      url:'/AdminUser/delGroup',
      method:'post',
      data:{
        id:id,
        token:sessionStorage.getItem('token')
      }
    })
}
// 停车场管理停车场列表
export function jcconfigParkingList(park_id,park_name,status,current_page,per_page){
  return request({
      url:'/Park/index',
      method:'post',
      data:{
        park_id:park_id,
        park_name:park_name,
        status:status,
        page:current_page,
        limit:per_page,
        token:sessionStorage.getItem('token')
      }
    })
}
// 停车场管理停车场列表删除
export function jcconfigParkingListDelete(id){
  return request({
      url:'/Park/delete',
      method:'post',
      data:{
        id:id,
        token:sessionStorage.getItem('token')
      }
    })
}
// 停车场管理停车场修改页信息
export function jcconfigParkingListEditPage(park_id){
  return request({
      url:'/Park/edit',
      method:'post',
      data:{
        park_id:park_id,
        token:sessionStorage.getItem('token')
      }
    })
}
// 停车场出入口管理列表
export function jcconfigGateList(park_id,current_page,per_page){
  return request({
      url:'/Park/gateList',
      method:'post',
      data:{
        park_id:park_id,
        page:current_page,
        limit:per_page,
        token:sessionStorage.getItem('token')
      }
    })
}
// 停车场管理出入口添加修改页信息
export function jcconfigAddGatePage(addList){
  return request({
      url:'/Park/addGate',
      method:'post',
      data:{
        park_id:addList.park_id,
        title: addList.title,
        type: addList.type,
        gate_id: addList.gate_id,
        token:sessionStorage.getItem('token')
      }
    })
}

// 停车场管理停车场列表删除
export function jcconfigGatetDelete(id){
  return request({
      url:'/Park/delGate',
      method:'post',
      data:{
        id:id,
        token:sessionStorage.getItem('token')
      }
    })
}

// 停车场管理出入口生成下载二维码
export function jcconfigGateGetQrc(data){
  return request({
      url:'/Park/getQrc?type=' + data.type + '&gate_id=' + data.gate_id + '&token=' + sessionStorage.getItem('token'),
      method:'get'
    })
}
// 上传图片
export function imgUpload(file){
  return request({
      url:'/api.Plugs/upload',
      method:'post',
      data:{
        file:file,
        token:sessionStorage.getItem('token')
      }
    })
}
// 意见反馈列表
export function opinionList(name,phone,park_id,current_page,per_page){
  return request({
      url:'/Opinion/index',
      method:'post',
      data:{
        name:name,
        phone:phone,
        park_id:park_id,
        page:current_page,
        limit:per_page,
        token:sessionStorage.getItem('token')
      }
    })
}
// 意见反馈详情
export function opinionDetail(id){
  return request({
      url:'/Opinion/getOne',
      method:'post',
      data:{
        id:id,
        token:sessionStorage.getItem('token')
      }
    })
}
// 意见反馈删除
export function opinionDelete(id){
  return request({
      url:'',
      method:'post',
      data:{
        id:id,
        token:sessionStorage.getItem('token')
      }
    })
}
// 包时卡类型列表
export function cardList(card_base_name,page,limit){
  return request({
      url:'/Card/cardBaseList',
      method:'post',
      data:{
        card_base_name:card_base_name,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
// 包时卡类型列表删除
export function cardListDelete(id){
  return request({
      url:'/Card/delCard',
      method:'post',
      data:{
        id:id,
        token:sessionStorage.getItem('token')
      }
    })
}
// 包时卡类型列表详情
export function cardListDetail(card_base_id){
  return request({
      url:'/Card/edit',
      method:'post',
      data:{
        card_base_id:card_base_id,
        token:sessionStorage.getItem('token')
      }
    })
}
// 广告列表
export function adverList(title,current_page,limit){
  return request({
      url:'/Advertisement/index',
      method:'post',
      data:{
        title:title,
        page:current_page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
// 广告列表删除
export function adverListDelete(id){
  return request({
      url:'/Advertisement/delete',
      method:'post',
      data:{
        id:id,
        token:sessionStorage.getItem('token')
      }
    })
}
// 广告列表修改
export function adverListEdit(id,pic,position,url,title){
  return request({
      url:'/Advertisement/add',
      method:'post',
      data:{
        id:id,
        pic:pic,
        position:position,
        url:url,
        title:title,
        token:sessionStorage.getItem('token')
      }
    })
}
// 优惠卷列表
export function couponList(coupon_name,status,current_page,per_page){
  return request({
      url:'/Coupon/index',
      method:'post',
      data:{
       coupon_name:coupon_name,
       status:status,
       page:current_page,
       limit:per_page,
       token:sessionStorage.getItem('token')
      }
    })
}
// 优惠卷列表删除
export function couponListDelete(coupon_id){
  return request({
      url:'/Coupon/delete',
      method:'post',
      data:{
       coupon_id:coupon_id,
       token:sessionStorage.getItem('token')
      }
    })
}
// 优惠卷列表修改
export function couponListEdit(params){
  return request({
      url:'/Coupon/add',
      method:'post',
      data:params
    })
}
// 优惠卷使用情况列表
export function couponDetailList(coupon_id,phone,sn,status,current_page,per_page){
  return request({
      url:'/Coupon/couponUsageList',
      method:'post',
      data:{
       coupon_id:coupon_id,
       phone:phone,
       sn:sn,
       status:status,
       page:current_page,
       limit:per_page,
       token:sessionStorage.getItem('token')
      }
    })
}
// 用卷规则列表
export function couponRuleList(name,park_ids,page,limit){
  return request({
      url:'/Coupon/couponRuleList',
      method:'post',
      data:{
       name:name,
       park_id:park_ids,
       page:page,
       limit:limit,
       token:sessionStorage.getItem('token')
      }
    })
}
// 用卷规则列表删除
export function couponRuleListDelete(rule_id){
  return request({
      url:'/Coupon/couponRuleDelete',
      method:'post',
      data:{
        rule_id:rule_id,
        token:sessionStorage.getItem('token')
      }
    })
}
// 用卷规则列表添加/修改
export function couponRuleListEdit(rule_id){
  return request({
      url:'/Coupon/couponRuleAdd',
      method:'post',
      data:params
    })
}
// 活动列表
export function lotteryList(start_date,end_date,page,limit){
  return request({
      url:'/Lottery/index',
      method:'post',
      data:{
       start_date:start_date,
       end_date:end_date,
       page:page,
       limit:limit,
       token:sessionStorage.getItem('token')
      }
    })
}
//  中奖纪录列表
export function winningRecordList(lottery_id,phone,start_date,end_date,page,limit){
  return request({
      url:'/Lottery/lotteryUserList',
      method:'post',
      data:{
       lottery_id:lottery_id,
       phone:phone,
       start_date:start_date,
       end_date:end_date,
       page:page,
       limit:limit,
       token:sessionStorage.getItem('token')
      }
    })
}
 // 签到列表
export function signList(start_date,end_date,page,limit){
  return request({
      url:'/Sign/index',
      method:'post',
      data:{
       start_date:start_date,
       end_date:end_date,
       page:page,
       limit:limit,
       token:sessionStorage.getItem('token')
      }
    })
}
 // 签到详情列表
export function signDetailList(sign_id,nikename,phone,page,limit){
  return request({
      url:'/Sign/userSignList',
      method:'post',
      data:{
       sign_id:sign_id,
       nikename:nikename,
       phone:phone,
       page:page,
       limit:limit,
       token:sessionStorage.getItem('token')
      }
    })
}
 // 添加签到
export function signAdd(reward_points,sign_cycle_status,days,reward,content){
  return request({
      url:'/Sign/add',
      method:'post',
      data:{
        reward_points:reward_points,
        sign_cycle_status:sign_cycle_status,
        days:days,
        reward:reward,
        content:content,
        token:sessionStorage.getItem('token')
      }
    })
}
// 积分兑换物列表
export function integralList(start_date,end_date,exchange_name,page,limit){
  return request({
      url:'/Points/pointsExchangeList',
      method:'post',
      data:{
        start_date:start_date,
        end_date:end_date,
        exchange_name:exchange_name,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
// 积分兑换物列表删除
export function integralDelete(exchange_id){
  return request({
      url:'/Points/exchangeDelete',
      method:'post',
      data:{
        exchange_id:exchange_id,
        token:sessionStorage.getItem('token')
      }
    })
}
// 积分兑换物列表修改上下架状态
export function integralStatus(exchange_id){
  return request({
      url:'/Points/exchangeEditStatus',
      method:'post',
      data:{
        exchange_id:exchange_id,
        token:sessionStorage.getItem('token')
      }
    })
}
// 积分兑换物添加 /修改
export function integralEdit(params){
  return request({
      url:'/Points/exchangeAdd',
      method:'post',
      data:params
    })
}
// 历史兑换记录
export function integralHistory(start_date,end_date,phone,page,limit){
  return request({
      url:'/Points/exchangeLogList',
      method:'post',
      data:{
        start_date:start_date,
        end_date:end_date,
        phone:phone,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
// 历史奖励记录
export function integralRewardList(start_date,end_date,phone,page,limit){
  return request({
      url:'/Points/pointsRewardList',
      method:'post',
      data:{
        start_date:start_date,
        end_date:end_date,
        phone:phone,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
// 积分奖励页
export function integralRewardEdit(){
  return request({
      url:'/Points/pointsRewardInfo',
      method:'post',
      data:{
        token:sessionStorage.getItem('token')
      }
    })
}
// 积分奖励页提交
export function integralRewardAction(params){
  return request({
      url:'/Points/pointsRewardEdit',
      method:'post',
      data:params
    })
}
// 手动派卷记录
export function manualPjList(nikename,phone,created_at,page,limit){
  return request({
      url:'/Couponmanual/manualLogList',
      method:'post',
      data:{
        nikename:nikename,
        phone:phone,
        created_at:created_at,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
// 手动派卷记录
export function manualPjAdd(params){
  return request({
      url:'/Couponmanual/add',
      method:'post',
      data:params
    })
}
// 自动派卷任务列表
export function automaticPjList(coupon_arr,status,page,limit){
  return request({
      url:'/Coupondeliver/index',
      method:'post',
      data:{
        coupon_arr:coupon_arr,
        status:status,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
// 自动派卷任务列表更改状态
export function automaticPjStatus(id){
  return request({
      url:'/Coupondeliver/couponDeliverChangeStatus',
      method:'post',
      data:{
        id:id,
        token:sessionStorage.getItem('token')
      }
    })
}
// 自动派卷任务列表删除
export function automaticPjDelete(id){
  return request({
      url:'/Coupondeliver/delete',
      method:'post',
      data:{
        id:id,
        token:sessionStorage.getItem('token')
      }
    })
}
// 合作泊车企业列表
export function partnerList(company_name,is_cooperation,page,limit){
  return request({
      url:'/Company/index',
      method:'post',
      data:{
        company_name:company_name,
        is_cooperation:is_cooperation,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
// 合作泊车企业修改合作状态
export function partnerChange(id){
  return request({
      url:'/Company/editStatus',
      method:'post',
      data:{
        id:id,
        token:sessionStorage.getItem('token')
      }
    })
}
// 合作泊车企业删除
export function partnerDelete(id){
  return request({
      url:'/Company/delete',
      method:'post',
      data:{
        id:id,
        token:sessionStorage.getItem('token')
      }
    })
}
// 合作泊车企业增加/修改
export function partnerEdit(params){
  return request({
      url:'/Company/add',
      method:'post',
      data:params
    })
}
//  合作商车列表
export function licensePlateList(company_name,car_number,page,limit){
  return request({
      url:'/Company/companyCarList',
      method:'post',
      data:{
        company_name:company_name,
        car_number:car_number,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
//  合作商车列表删除
export function licensePlateListDelete(id){
  return request({
      url:'/Company/deleteCompanyCar',
      method:'post',
      data:{
        id:id,
        token:sessionStorage.getItem('token')
      }
    })
}
//  合作商车列表增加/修改
export function licensePlateListEdit(params){
  return request({
      url:'/Company/addCompanyCar',
      method:'post',
      data:params
    })
}
//  内部车列表
export function inCarsList(car_number,car_user_name,car_user_phone,internal_status,park_ids,internal_type,page,limit){
  return request({
      url:'/Internal/index',
      method:'post',
      data:{
        car_number:car_number,
        car_user_name:car_user_name,
        car_user_phone:car_user_phone,
        internal_status:internal_status,
        park_id:park_ids,
        internal_type:internal_type,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
        }
    })
}
// 添加内部车
export function openTheDoorListEdit(params){
  return request({
      url:'/Internal/add',
      method:'post',
      data:params
    })
}
//   远程开门记录
export function openTheDoorList(car_number,park_id,start_date,end_date,page,limit){
  return request({
      url:'/Remotely/remotelyList',
      method:'post',
      data:{
        car_number:car_number,
        park_id:park_id,
        start_date:start_date,
        end_date:end_date,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
// 远程开门
export function openDo(park_id,camera_id){
  return request({
      url:'/Remotely/doRemotely',
      method:'post',
      data:{
        park_id:park_id,
        camera_id:camera_id,
        token:sessionStorage.getItem('token')
      }
    })
}
//  微信用户列表
export function wxUserList(nikename,phone,is_member,page,limit){
  return request({
      url:'/User/index',
      method:'post',
      data:{
        nikename:nikename,
        phone:phone,
        is_member:is_member,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
//  微信用户详情
export function wxUserDetail(user_id){
  return request({
      url:'/User/userInfo',
      method:'post',
      data:{
        user_id:user_id,
        token:sessionStorage.getItem('token')
      }
    })
}
//  微信用户详情记录列表
export function wxUserHistoryList(url,user_id,created_at,page,limit){
  return request({
      url:url,
      method:'post',
      data:{
        user_id:user_id,
        created_at:created_at,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
//  微信用户信息修改
export function wxUserEdit(params){
  return request({
      url:'/User/editUserMsg',
      method:'post',
      data:params
    })
}
//  微信用户退款
export function wxUserReturn(user_id,money,remark){
  return request({
      url:'/User/refundMoney',
      method:'post',
      data:{
        user_id:user_id,
        money:money,
        remark:remark,
        token:sessionStorage.getItem('token')
      }
    })
}

 // 余额卡规则管理页
 export function accountCards(){
   return request({
       url:'/Card/balanceCardInfo',
       method:'post',
       data:{
         token:sessionStorage.getItem('token')
       }
     })
 }
 // 余额卡规则管理页修改
 export function accountCardsEdit(params){
   return request({
       url:'/Card/balanceCardEdit',
       method:'post',
       data:params
     })
 }
 // 包时卡管理页
 export function remindCards(){
   return request({
       url:'/Card/timeCardInfo',
       method:'post',
       data:{
         token:sessionStorage.getItem('token')
       }
     })
 }
 // 包时卡管理页修改
 export function remindCardsEdit(params){
   return request({
       url:'/Card/timeCardEdit',
       method:'post',
       data:params
     })
 }
 // 启动页列表
 export function startPageList(){
   return request({
       url:'/Card/startPageInfo',
       method:'post',
       data:{
         token:sessionStorage.getItem('token')
       }
     })
 }
 // 启动页配置
 export function startPageEdit(start_page_pic){
   return request({
       url:'/Card/startPageEdit',
       method:'post',
       data:{
         start_page_pic:start_page_pic,
         token:sessionStorage.getItem('token')
       }
     })
 }
 // 抽奖修改页面参数
 export function addLotteryInfo(lottery_id){
   return request({
       url:'/Lottery/edit',
       method:'post',
       data:{
         lottery_id:lottery_id,
         token:sessionStorage.getItem('token')
       }
     })
 }
// 抽奖修改页面提交
 export function addLotteryEdit(params){
   return request({
       url:'/Lottery/add',
       method:'post',
       data:params
     })
 }
// 停车设备列表
 export function cameraList(park_id){
   return request({
       url:'/Park/parkCameraList',
       method:'post',
       data:{
         park_id:park_id,
         token:sessionStorage.getItem('token')
       }
     })
 }
// 停车设备新增/修改
 export function cameraListEdit(params){
   return request({
       url:'/Park/parkCameraAdd',
       method:'post',
       data:params
     })
 }
// 停车设备删除
 export function cameraListDel(id){
   return request({
       url:'/Park/parkCameraDel',
       method:'post',
       data:{
         id:id,
         token:sessionStorage.getItem('token')
       }
     })
 }
// 用户中心_车辆列表
export function vipCarsList(car_number,phone,page,limit){
  return request({
      url:'/Car/index',
      method:'post',
      data:{
        car_number:car_number,
        phone:phone,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
// 用户中心_车辆列表修改
export function vipCarsEdit(pamaras){
  return request({
      url:'/Car/editUserMsg',
      method:'post',
      data:pamaras
    })
}
// 临停收费明细列表
export function ltList(start_date,end_date,park_id,car_number,order_sn,page,limit){
  return request({
      url:'/Chargereport/parkDetails',
      method:'post',
      data:{
        start_date:start_date,
        end_date:end_date,
        park_id:park_id,
        car_number:car_number,
        order_sn:order_sn,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
// 车次计费明细列表
export function carsJfList(order_sn,start_date,end_date,park_id,car_number,page,limit){
  return request({
      url:'/Car/carCostList',
      method:'post',
      data:{
        order_sn:order_sn,
        start_date:start_date,
        end_date:end_date,
        park_id:park_id,
        car_number:car_number,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
// 车次计费明细详情
export function carsJfListDetail(order_id){
  return request({
      url:'/Car/carCostInfo',
      method:'post',
      data:{
        order_id:order_id,
        token:sessionStorage.getItem('token')
      }
    })
}
// 车辆进出列表
export function carsJcList(start_date,end_date,park_id,car_number,page,limit){
  return request({
      url:'/Car/carInOutList',
      method:'post',
      data:{
        start_date:start_date,
        end_date:end_date,
        park_id:park_id,
        car_number:car_number,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
// 车辆进出列表详情
export function carsJcListDetail(id){
  return request({
      url:'/Car/carInOutInfo',
      method:'post',
      data:{
        id:id,
        token:sessionStorage.getItem('token')
      }
    })
}
//  办卡收费明细
export function bkList(start_date,end_date,park_id,car_number,order_sn,page,limit){
  return request({
      url:'/Chargereport/cardDetails',
      method:'post',
      data:{
        start_date:start_date,
        end_date:end_date,
        park_id:park_id,
        car_number:car_number,
        order_sn:order_sn,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
//  储值收费明细
export function czList(start_date,end_date,car_number,order_sn,page,limit){
  return request({
      url:'/Chargereport/rechargeDetails',
      method:'post',
      data:{
        start_date:start_date,
        end_date:end_date,
        car_number:car_number,
        order_sn:order_sn,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
//  余额明细报表
export function yeList(start_date,end_date,park_id,car_number,order_sn,page,limit){
  return request({
      url:'/Chargereport/accountDetails',
      method:'post',
      data:{
        start_date:start_date,
        end_date:end_date,
        park_id:park_id,
        phone:car_number,
        order_sn:order_sn,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
//  在场车辆明细
export function carsZcList(start_date,end_date,park_id,car_number,page,limit){
  return request({
      url:'/Car/carInParkList',
      method:'post',
      data:{
        start_date:start_date,
        end_date:end_date,
        park_id:park_id,
        car_number:car_number,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
//  在场车辆设为立场
export function setCarLeave(order_id){
  return request({
      url:'/Car/setCarLeave',
      method:'post',
      data:{
        order_id:order_id,
        token:sessionStorage.getItem('token')
      }
    })
}
//   系统放行列表
export function carsFxList(start_date,end_date,park_id,car_number,page,limit){
  return request({
      url:'/Car/systemReleaseList',
      method:'post',
      data:{
        start_date:start_date,
        end_date:end_date,
        park_id:park_id,
        car_number:car_number,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
// 工作台
// 用户信息
export function homeUser(){
  return request({
      url:'/View/userInfo',
      method:'post',
      data:{
        token:sessionStorage.getItem('token')
      }
    })
}
//  系统消息
export function sysMsg(){
  return request({
      url:'/Workbench/sysMsg',
      method:'post',
      data:{
        token:sessionStorage.getItem('token')
      }
    })
}
//   车流量统计
export function trafficStatistics(page,limit){
  return request({
      url:'/Workbench/trafficStatistics',
      method:'post',
      data:{
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
//昨日收入
export function yesterdayIncome(page,limit){
  return request({
      url:'/Workbench/yesterdayIncome',
      method:'post',
      data:{
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
// 今日新增用户
export function newUser(){
  return request({
      url:'/Workbench/newUser',
      method:'post',
      data:{
        token:sessionStorage.getItem('token')
      }
    })
}
// 开卡用户数
export function cardUser(){
  return request({
      url:'/Workbench/cardUser',
      method:'post',
      data:{
        token:sessionStorage.getItem('token')
      }
    })
}
// 工作台end
//车场经营日报
export function getDay(start_date,end_date,park_id,page,limit){
  return request({
      url:'/Statistical/getDay',
      method:'post',
      data:{
        start_date:start_date,
        end_date:end_date,
        park_id:park_id,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
//车场经营月报
export function getMonth(start_month,end_month,park_id,page,limit){
  return request({
      url:'/Statistical/getMonth',
      method:'post',
      data:{
        start_month:start_month,
        end_month:end_month,
        park_id:park_id,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
// 包时卡统计列表
export function cardStatisticsList(phone,park_id,channel,start_date,end_date,page,limit){
  return request({
      url:'/Card/cardStatisticsList',
      method:'post',
      data:{
        phone:phone,
        park_id:park_id,
        channel:channel,
        start_date:start_date,
        end_date:end_date,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
// 包时卡 饼状图 /环状图
export function cardChat(){
  return request({
      url:'/Card/cardChat',
      method:'post',
      data:{
        token:sessionStorage.getItem('token')
      }
    })
}
// 优惠券抵扣明细列表
export function couponDetails(start_date,end_date,park_id,coupon_id,car_number,page,limit){
  return request({
      url:'/Chargereport/couponDetails',
      method:'post',
      data:{
        start_date:start_date,
        end_date:end_date,
        park_id:park_id,
        coupon_id:coupon_id,
        car_number:car_number,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
//  积分日志
export function indegralHistoryList(start_date,end_date,phone,page,limit){
  return request({
      url:'/Points/pointsList',
      method:'post',
      data:{
        start_date:start_date,
        end_date:end_date,
        phone:phone,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
//  包时卡添加/修改
export function cardListUpdate(params){
  return request({
      url:'/Card/add',
      method:'post',
      data:params
    })
}
//  停车场添加/修改
export function posListUpdate(params){
  return request({
      url:'/Park/add',
      method:'post',
      data:params
    })
}
// 自动派卷 添加 / 修改
export function automaticPjDo(params){
  return request({
      url:'/Coupondeliver/add',
      method:'post',
      data:params
    })
}
//  车辆详情
export function vipCarsAdd(car_id){
  return request({
      url:'/Car/carInfo',
      method:'post',
      data:{
        car_id:car_id,
        token:sessionStorage.getItem('token')
      }
    })
}
//   用户详情日志
export function vipCarsAddList(url,car_id,created_at,channel,page,limit){
  return request({
      url:url,
      method:'post',
      data:{
        car_id:car_id,
        created_at:created_at,
        channel:channel,
        page:page,
        limit:limit,
        token:sessionStorage.getItem('token')
      }
    })
}
//  车辆详情 添加包时卡
export function vipCarsAddCard(params){
  return request({
      url:'/Car/addCard',
      method:'post',
      data:params
    })
}
//  车辆详情  清空包时卡
export function vipCarsClearCard(ids){
  return request({
      url:'/Car/clearCard',
      method:'post',
      data:{
        ids:ids,
        token:sessionStorage.getItem('token')
      }
    })
}
 // 删除停车场图片
 export function delImg(id){
   return request({
       url:'/Park/delImg',
       method:'post',
       data:{
         id:id,
         token:sessionStorage.getItem('token')
       }
     })
 }
 // 删除内部车
 export function internalDelete(id){
   return request({
       url:'/Internal/delete',
       method:'post',
       data:{
         id:id,
         token:sessionStorage.getItem('token')
       }
     })
 }
 // 修改内部车状态
 export function InternalEditStatus(id){
   return request({
       url:'/Internal/editStatus',
       method:'post',
       data:{
         id:id,
         token:sessionStorage.getItem('token')
       }
     })
 }
 //  自动派券记录
 export function deliverLogList(id,phone,page,limit){
   return request({
       url:'/Coupondeliver/deliverLogList',
       method:'post',
       data:{
         id:id,
         phone:phone,
         page:page,
         limit:limit,
         token:sessionStorage.getItem('token')
       }
     })
 }
 // 会员车添加
 export function vipCardAdd(params){
   return request({
       url:'/Car/add',
       method:'post',
       data:params
     })
 }
 // 获取菜单
 export function getMenuList(){
   return request({
       url:'/View/getMenuList',
       method:'post',
       data:{
         token:sessionStorage.getItem('token')
       }
     })
 }
 // 权限树
 export function getPowerList(id){
   return request({
       url:'/View/getPowerList',
       method:'post',
       data:{
         id:id,
         token:sessionStorage.getItem('token')
       }
     })
 }
 // 获取当前签到周期日期[2021-05-17新增]
 export function getNowCycle(cycle){
   return request({
       url:'/Sign/getNowCycle',
       method:'post',
       data:{
         cycle:cycle,
         token:sessionStorage.getItem('token')
       }
     })
 }
