<template>
	<div class="title">
		<div class="title-font">
      <div class="title-font-left">
        <div class="title-font-left-top">
          <div :class="index === (msg.length-1)?'last':''" class="title-font-left-top-item" v-for="(item,index) in msg" :key="index" >
            {{item}}
          </div>
        </div>
        <div class="title-font-left-bottom">{{title}}</div>
      </div>
      <div class="title-font-right">
        <div :class="item === '取消'?'qx':''" @click="goPages(item)" v-for="(item,index) in button" :key="index" class="title-font-right-item">{{item}}</div>
      </div>
		</div>
	</div>
</template>

<script>
	export default{
		props:["titPath","msg","title","button","left"],
		data() {
			return {

			}
		},
		methods:{
      goPages(mes){
        console.log(mes)
        console.log(this.$props.titPath)
        if(this.$props.titPath === 'parkingList' && mes === '+ 新建'){
          this.$router.push('/jcconfig/parkingListUpdate')
        }
        else if(this.$props.titPath === 'officeList' && mes === '+ 新建'){
          this.$router.push('/jcconfig/officeListUpdate')
        }
        else if(this.$props.titPath === 'posList' && mes === '+ 新建'){
          this.$router.push('/jcconfig/posListUpdate')
        }else if(this.$props.titPath === 'opinionDetail' && mes === '返回列表'){
          this.$router.go(-1)
        }else if(this.$props.titPath === 'cardList' && mes === '+ 新建'){
          this.$router.push('/jcconfig/cardListUpdate')
        }else if(this.$props.titPath === 'couponList' && mes === '+ 新建'){
          this.$router.push('/actConfig/coupon/addCoupon')
        }else if(this.$props.titPath === 'couponRuleList' && mes === '+ 新建'){
          this.$router.push('/actConfig/coupon/couponRule')
        }else if(this.$props.titPath === 'lotteryList' && mes === '新建抽奖活动'){
          this.$router.push('/actConfig/lottery/addLottery')
        }else if((this.$props.titPath === 'integralList' || this.$props.titPath === 'rewardHistory') && mes === '添加积分兑换项'){
          this.$router.push('/actConfig/integral/integralAdd')
        }else if(this.$props.titPath === 'automaticPjList' && mes === '+ 新建'){
          this.$router.push('/actConfig/paijuan/automaticPjDo')
        }else if(this.$props.titPath === 'partnerList' && mes === '+ 新建'){
          this.$router.push('/affairsManagement/cooperation/partnerAdd')
        }else if(this.$props.titPath === 'licensePlateList' && mes === '+ 新建'){
          this.$router.push('/affairsManagement/cooperation/licensePlateAdd')
        }else if(this.$props.titPath === 'inCarsList' && mes === '+ 新建'){
          this.$router.push('/affairsManagement/insideCars/inCarsAdd')
        }else if(this.$props.titPath === 'openList' && mes === '远程开门'){
          this.$router.push('/affairsManagement/openTheDoor/openDo')
        }else if(this.$props.titPath === 'vipCarsAdmin' && mes === '+ 新建'){
          this.$router.push('/userCenter/VipCars/vipCarsAdd')
        }else if(this.$props.titPath === 'advertList' && mes === '+ 新建'){
          this.$router.push('/jcconfig/advertAdd')
        }else if(this.$props.titPath === 'officeListUpdate' && mes === '提交'){
          
        }

      }
		}
	}
</script>

<style scoped>
	.title{
		width: 100%;
		height: 90px;
		border-bottom: 1px solid #d6d6d6;
		background-color: #fff;
	}
	.title-font{
		height: 90px;
		width: 95%;
		margin: 0 auto;
    display: flex;
	}
  .title-font-left{
    width: 60%;
  }
  .title-font-left-top{
    font-size: 15px;
    color: rgba(0, 0, 0, 0.447058823529412);
    margin-top: 1%;
    display: flex;
  }
  .title-font-left-top-item:nth-child(1){
    margin-left: 0%;
  }
  .title-font-left-top-item{
    margin-left: 1%;
  }
  .title-font-left-bottom{
    font-size: 20px;
    margin-top: 1%;
    font-weight: bold;
  }
  .last{
    color: #333333;
  }
  .title-font-right{
    width: 40%;
    display: flex;
    text-overflow: ellipsis;
  }
  .title-font-right-item:nth-child(1){
    /* margin-left: 40%; */
  }
  .title-font-right-item{
    padding-left: 3%;
    padding-right: 3%;
    height: 35px;
    line-height: 35px;
    background-color: rgb(24,144,255);
    border-radius: 4px;
    text-align: center;
    margin-top: 3.5%;
    margin-left: 3%;
    color: #fff;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
.qx{
  border: 1px solid #d6d6d6;
  color: #333333;
  background-color: #fff;
}
</style>
