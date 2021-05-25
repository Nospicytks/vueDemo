<template>
	<div class="head">
    <div class="head-left">
      <span @click="goHome">大然泊车</span>
    </div>
		<div id="nav" class="nav">
		<el-menu active-text-color="#ffd04b" style="background:none;"  class="el-menu-demo" mode="horizontal" :default-active="this.$route.path" router @select="handleSelect">
    <!-- 车场事务管理 -->
		 <el-submenu id="first" index="1">
		    <template slot="title">车场事务管理</router-link></template>
        <el-submenu  index="1-1">
          <template slot="title" >内部车管理</template>
          <el-menu-item index="/affairsManagement/insideCars/inCarsList">内部车列表</el-menu-item>
          <el-menu-item index="/affairsManagement/insideCars/inCarsAdd">添加内部车</el-menu-item>
        </el-submenu>
        <el-submenu index="1-2">
          <template slot="title">合作泊车管理</template>
          <el-menu-item index="/affairsManagement/cooperation/partnerList">合作泊车企业</el-menu-item>
          <el-menu-item index="/affairsManagement/cooperation/partnerAdd">添加合作企业</el-menu-item>
          <el-menu-item index="/affairsManagement/cooperation/licensePlateList">合作泊车车牌</el-menu-item>
          <el-menu-item index="/affairsManagement/cooperation/licensePlateAdd">合作泊车车牌维护</el-menu-item>
        </el-submenu>
        <el-submenu index="1-3">
          <template slot="title">远程开门</template>
          <el-menu-item index="/affairsManagement/openTheDoor/openDo">远程开门</el-menu-item>
          <el-menu-item index="/affairsManagement/openTheDoor/openList">远程开门记录</el-menu-item>
        </el-submenu>
		 </el-submenu>
    <!-- 报表中心 -->
		  <el-submenu index="2">
		    <template slot="title">报表中心</template>
        <el-submenu index="2-1">
          <template slot="title">汇总报表</template>
          <el-menu-item index="/statementCenter/hzStatement/parkingsDay">车场经营日报</el-menu-item>
          <el-menu-item index="/statementCenter/hzStatement/parkingsMonth">车场经营月报</el-menu-item>
          <el-menu-item index="/statementCenter/hzStatement/timeCard">包时卡统计报表</el-menu-item>
        </el-submenu>
        <el-submenu index="2-2">
          <template slot="title">收费报表</template>
          <el-menu-item index="/statementCenter/sfStatement/ltList">临停收费明细</el-menu-item>
          <el-menu-item index="/statementCenter/sfStatement/bkList">办卡收费明细</el-menu-item>
          <el-menu-item index="/statementCenter/sfStatement/czList">储值收费明细</el-menu-item>
          <el-menu-item index="/statementCenter/sfStatement/yeList">余额明细报表</el-menu-item>
        </el-submenu>
        <el-submenu index="2-3">
          <template slot="title">车辆明细</template>
          <el-menu-item index="/statementCenter/carsDetail/carsJfList">车次计费明细</el-menu-item>
          <el-menu-item index="/statementCenter/carsDetail/carsJcList">车辆进出明细</el-menu-item>
          <el-menu-item index="/statementCenter/carsDetail/carsZcList">在场车辆明细</el-menu-item>
          <el-menu-item index="/statementCenter/carsDetail/carsFxList">车辆放行记录</el-menu-item>
        </el-submenu>
        <el-submenu index="2-4">
          <template slot="title">优惠券抵扣明细</template>
          <el-menu-item index="/statementCenter/couponDetail/couponDeList">优惠券抵扣明细</el-menu-item>
        </el-submenu>
		  </el-submenu>
      <!-- 用户中心 -->
      <el-submenu index="3">
        <template slot="title">用户中心</template>
        <el-submenu index="3-1">
          <template slot="title">用户管理</template>
          <el-menu-item index="/userCenter/userAdmin/wxUserList">微信用户</el-menu-item>
        </el-submenu>
        <el-submenu index="3-2">
          <template slot="title">会员车辆</template>
          <el-menu-item index="/userCenter/VipCars/vipCarsAdmin">会员车辆管理</el-menu-item>
          <el-menu-item index="/userCenter/VipCars/vipCarsAdd">添加会员车辆</el-menu-item>
        </el-submenu>
        <el-submenu index="3-3">
          <template slot="title">积分管理</template>
          <el-menu-item index="/userCenter/integralAdmin/indegralHistory">积分记录</el-menu-item>
        </el-submenu>
      </el-submenu>
      <!-- 活动设置 -->
      <el-submenu index="4">
        <template slot="title">活动设置</template>
        <el-submenu index="4-1">
          <template slot="title">优惠券管理</template>
          <el-menu-item index="/actConfig/coupon/couponList">优惠券列表</el-menu-item>
          <el-menu-item index="/actConfig/coupon/addCoupon">添加优惠卷</el-menu-item>
          <el-menu-item index="/actConfig/coupon/couponRuleList">用卷规则列表</el-menu-item>
          <el-menu-item index="/actConfig/coupon/couponRule">配置用券规则</el-menu-item>
        </el-submenu>
        <el-submenu index="4-2">
          <template slot="title">抽奖活动</template>
          <el-menu-item index="/actConfig/lottery/lotteryList">活动清单</el-menu-item>
          <el-menu-item index="/actConfig/lottery/addLottery">添加抽奖活动</el-menu-item>
          <el-menu-item index="/actConfig/lottery/winningRecord">中奖记录</el-menu-item>
        </el-submenu>
        <el-submenu index="4-3">
          <template slot="title">签到活动</template>
          <el-menu-item index="/actConfig/sign/signList">签到活动清单</el-menu-item>
          <el-menu-item index="/actConfig/sign/addSign">添加签到活动</el-menu-item>
        </el-submenu>
        <el-submenu index="4-4">
          <template slot="title">积分管理</template>
          <el-menu-item index="/actConfig/integral/integralList">积分兑换列表</el-menu-item>
          <el-menu-item index="/actConfig/integral/integralHistory">积分兑换记录</el-menu-item>
          <el-menu-item index="/actConfig/integral/integralReward">积分奖励设置</el-menu-item>
          <el-menu-item index="/actConfig/integral/rewardHistory">积分奖励记录</el-menu-item>
        </el-submenu>
        <el-submenu index="4-5">
          <template slot="title">派券设置</template>
          <el-menu-item index="/actConfig/paijuan/manualPjDo">手动派券</el-menu-item>
          <el-menu-item index="/actConfig/paijuan/manualPjList">手动派券记录</el-menu-item>
          <el-menu-item index="/actConfig/paijuan/automaticPjDo">自动派券</el-menu-item>
          <el-menu-item index="/actConfig/paijuan/automaticPjList">自动派券记录</el-menu-item>
        </el-submenu>
      </el-submenu>
      <!-- 基础设置 -->
      <el-submenu index="5">
        <template slot="title">基础设置</template>
        <el-submenu index="5-1">
          <template slot="title">停车场管理</router-link></template>
          <el-menu-item index="/jcconfig/parkingList">停车场列表</el-menu-item>
          <el-menu-item index="/jcconfig/parkingListUpdate">添加停车场</el-menu-item>
        </el-submenu>
        <el-submenu index="5-2">
          <template slot="title">职员管理</template>
          <el-menu-item index="/jcconfig/officeList">职员列表</el-menu-item>
          <el-menu-item index="/jcconfig/officeListUpdate">添加职员</el-menu-item>
          <el-menu-item index="/jcconfig/posList">职务列表</el-menu-item>
          <el-menu-item index="/jcconfig/posListUpdate">添加职务</el-menu-item>
        </el-submenu>
        <el-submenu index="5-3">
          <template slot="title">意见反馈</template>
          <el-menu-item index="/jcconfig/opinionList">反馈意见处理</el-menu-item>
        </el-submenu>
        <el-submenu index="5-4">
          <template slot="title">会员规则管理</template>
          <el-menu-item index="/jcconfig/cardList">包时卡类型管理</el-menu-item>
          <el-menu-item index="/jcconfig/cardListUpdate">添加包时卡类型</el-menu-item>
          <el-menu-item index="/jcconfig/accountCards">储值卡规则管理</el-menu-item>
          <el-menu-item index="/jcconfig/remindCards">包时卡到期提醒设置</el-menu-item>
        </el-submenu>
        <el-submenu index="5-5">
          <template slot="title">广告位设置</template>
          <el-menu-item index="/jcconfig/advertList">广告列表</el-menu-item>
          <el-menu-item index="/jcconfig/advertAdd">广告添加</el-menu-item>
        </el-submenu>
        <el-submenu index="5-6">
          <template slot="title">启动页设置</template>
          <el-menu-item index="/jcconfig/startPage">启动页配置页</el-menu-item>
        </el-submenu>
      </el-submenu>
		</el-menu>
		</div>
    <div class="head-right">
      <div class="head-img">

      </div>
      <div class="head-mess">
        Jay.Liu
      </div>
    </div>
	</div>
</template>

<script>
	export default{
		data () {
		  return {

		  }
		},
		methods:{
			handleSelect(key, keyPath) {
			  console.log(key, keyPath);
			},
      goHome(){
        this.$router.push('/home')
      }
		}
	}
</script>

<style scoped >
	.head{
		height: 60px;
		/* background: linear-gradient(0deg, #007ac5 0%, #00acd2 100%); */
    background-color: rgb(0,21,41);
    display: flex;
	}
  .head-left{
    width: 15%;
    line-height:60px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
  }
  .head-right{
    width: 300px;
    margin-left: 10%;
    line-height: 60px;
    display: flex;
  }
  .head-img{
    width: 47px;
    height: 47px;
    margin-top: 2%;
    border-radius: 49px;
    background-color: rgb(117,128,139);
  }
  .head-mess{
     width: 80%;
     margin-left: 5%;
     line-height: 60px;
     font-size: 15px;
     color:rgba(255, 255, 255, 0.447058823529412);
  }
	.nav{
		width: 60%;
		display: flex;
    height: 61px;
	/* 	justify-content: space-between;
		flex-direction: row; */
	}
	.nav-item:hover{
		background-color: #d6d6d6;
	}
	.router-link-active {
		color: #fff;
	  text-decoration: none;
	}
	#nav /deep/ .el-submenu__title{
		color:rgba(255, 255, 255, 0.447058823529412);
		text-align: center;
		font-size:16px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
	}
	#nav /deep/ .el-submenu__title:hover{
		color: #FFF;
		background-color:rgba(255, 255, 255, 0.447058823529412);
	}
	#nav /deep/ .el-menu{
		width: 100%;

	}
	#nav /deep/ .el-submenu{
		width: 20%;

	}
	#nav /deep/  .el-menu .el-menu--popup .el-menu--popup-bottom-start{

	}
/* 	#nav /deep/ .el-menu-item{
		font-size: 16px;
		width: 12.5%;
		color: #fff;
	} */
/* 	#nav /deep/ .el-menu-item:hover{
		color: #fff;
		background-color: rgb(0,178,210);
	} */

</style>
