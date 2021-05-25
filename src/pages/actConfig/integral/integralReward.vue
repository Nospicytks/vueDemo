<template>
  <div>
    <Naving />
    <!-- 头部按钮 -->
    <div class="title">
        <div class="title-font">
          <div class="title-font-left">
            <div class="title-font-left-top">
              <div :class="index === (msg.length-1)?'last':''" @click="goPage(index)" class="title-font-left-top-item" v-for="(item,index) in msg" :key="index" >
                {{item}}
              </div>
            </div>
            <div class="title-font-left-bottom">{{title}}</div>
          </div>
          <div class="title-font-right">
            <div :class="item === '重置'?'qx':''" @click="goPages(index)" v-for="(item,index) in button" :key="index" class="title-font-right-item">{{item}}</div>
          </div>
        </div>
      </div>
      <!-- 头部按钮end -->
    <div class="box" v-loading="loading">
      <!-- 认证个人身份证 -->
      <div class="box-item">
        <div class="box-item-title hide">
          <div>认证个人身份证:</div>
          <div>
            <el-radio v-model="user_authentication_status" label="1">启用</el-radio>
            <el-radio v-model="user_authentication_status" label="2">不启用</el-radio>
          </div>
        </div>
        <div class="box-item-center">
          <div class="hide">积分奖励数值:</div>
          <div><el-input style="width: 60%;" v-model="user_authentication_points" placeholder="请输入正整数"></el-input></div>
        </div>
        <div class="box-item-center">
          <div class="hide">介绍文案:</div>
          <div><quill-editor ref="myTextEditor" v-model="user_authentication_introduction" :options="editorOption" style="width: 60%;"></quill-editor></div>
        </div>
      </div>
       <!-- 认证个人身份证end -->
       <!-- 车辆认证 -->
       <div class="box-item">
         <div class="box-item-title hide">
           <div>车辆认证:</div>
           <div>
             <el-radio v-model="car_authentication_status" label="1">启用</el-radio>
             <el-radio v-model="car_authentication_status" label="2">不启用</el-radio>
           </div>
         </div>
         <div class="box-item-center">
           <div class="hide">积分奖励数值:</div>
           <div style="display: flex;" class="hide">
             <el-input style="width: 60%;" v-model="car_authentication_points" placeholder="请输入正整数"></el-input>
             <el-radio style="margin-left: 5%;margin-top: 2%;" label="1" v-model="elradio" >每辆车仅奖励首次绑定用户</el-radio>
           </div>
         </div>
         <div class="box-item-center">
           <div class="hide">介绍文案:</div>
           <div><quill-editor ref="myTextEditor" v-model="car_authentication_introduction" :options="editorOption" style="width: 60%;"></quill-editor></div>
         </div>
       </div>
        <!-- 车辆认证end -->
		<!-- 认证弹框 -->
		<div class="box-item">
		  <div class="box-item-title hide">
		    <div>认证弹出提醒:</div>
		    <div>
		      <el-radio v-model="car_certification_remind" label="1">启用</el-radio>
		      <el-radio v-model="car_certification_remind" label="2">不启用</el-radio>
		    </div>
		  </div>
		  <div class="box-item-center">

		  </div>
		  <div class="box-item-center">

		  </div>
		</div>
		<!-- 认证弹框end -->
        <!-- 储值奖励 -->
        <div class="box-item">
          <div class="box-item-title hide">
            <div>储值奖励:</div>
            <div>
              <el-radio v-model="recharge_status" label="1">启用</el-radio>
              <el-radio v-model="recharge_status" label="2">不启用</el-radio>
            </div>
          </div>
          <div class="box-item-center">
            <div class="hide">积分奖励系数:</div>
            <div><el-input style="width: 60%;" v-model="recharge_points_coefficient" placeholder="请输入正整数"></el-input></div>
          </div>
          <div class="box-item-center">
            <div class="hide"></div>
            <div>
              <el-radio style="margin-top: 2%;width: 9%;" v-model="elradio" label="1">奖励门槛</el-radio>
              <el-input style="width: 42%;" v-model="recharge_points_threshold" placeholder="请输入正整数"></el-input>
            </div>
          </div>
          <div class="box-item-center">
            <div class="hide">介绍文案:</div>
            <div><quill-editor ref="myTextEditor" v-model="recharge_introduction" :options="editorOption" style="width: 60%;"></quill-editor></div>
          </div>
        </div>
         <!-- 储值奖励end -->
         <!-- 办卡奖励 -->
         <div class="box-item">
           <div class="box-item-title hide">
             <div>办卡奖励:</div>
             <div>
               <el-radio v-model="time_status" label="1">启用</el-radio>
               <el-radio v-model="time_status" label="2">不启用</el-radio>
             </div>
           </div>
           <div class="box-item-center">
             <div class="hide">积分奖励系数:</div>
             <div><el-input style="width: 60%;" v-model="time_points_coefficient" placeholder="请输入正整数"></el-input></div>
           </div>
           <div class="box-item-center">
             <div class="hide"></div>
             <div>
               <el-radio style="margin-top: 2%;width: 9%;" v-model="elradio" label="1">奖励门槛</el-radio>
               <el-input style="width: 42%;" v-model="time_points_threshold" placeholder="请输入正整数"></el-input>
             </div>
           </div>
           <div class="box-item-center">
             <div class="hide">介绍文案:</div>
             <div><quill-editor ref="myTextEditor" v-model="time_introduction" :options="editorOption" style="width: 60%;"></quill-editor></div>
           </div>
         </div>
          <!-- 办卡奖励end -->
          <!-- 关注公众号奖励 -->
          <div class="box-item">
            <div class="box-item-title hide">
              <div>关注公众号奖励:</div>
              <div>
                <el-radio v-model="follow_wechat_status" label="1">启用</el-radio>
                <el-radio v-model="follow_wechat_status" label="2">不启用</el-radio>
              </div>
            </div>
            <div class="box-item-center">
              <div class="hide">积分奖励数值:</div>
              <div><el-input style="width: 60%;" v-model="follow_wechat_points" placeholder="请输入正整数"></el-input></div>
            </div>
            <div class="box-item-center">
              <div class="hide">介绍文案:</div>
              <div><quill-editor ref="myTextEditor" v-model="follow_wechat_introduction" :options="editorOption" style="width: 60%;"></quill-editor></div>
            </div>
          </div>
           <!-- 关注公众号奖励end -->
    </div>
  </div>
</template>

<script>
  import { integralRewardEdit,integralRewardAction } from '@/api/request'
  export default {
    data() {
      return {
        msg:['活动设置  /','积分活动 /','积分奖励'],
        title:'积分奖励',
        button:['提 交','重置'],
        titPath:'integralReward',
        editorOption: {
           placeholder: '编辑文章内容',
           modules:{
             toolbar:[
               [],
               [],
               ['image'],
               [{'color':[]}]
             ]
           }
        },
        loading:false,
        elradio:'1',
        user_authentication_status:'1',
        user_authentication_points:'',
        user_authentication_introduction:'',
        car_authentication_status:'1',
        car_authentication_points:'',
        car_authentication_introduction:'',
        recharge_status:'1',
        recharge_points_coefficient:'',
        recharge_points_threshold:'',
        recharge_introduction:'',
        time_status:'1',
        time_points_coefficient:'',
        time_points_threshold:'',
        time_introduction:'',
        follow_wechat_status:'1',
        follow_wechat_points:'',
        follow_wechat_introduction:'',
        car_certification_remind:'2'
      }
    },
    methods:{
      // 标题操作
      goPage(index){
        switch(index){
          case 1:
          this.$router.push('/actConfig/integral/integralList');
          break;
        }
      },
      // 按钮操作
      goPages(index){
        switch (index){
          case 0:
          this.changeData()
          break;
          case 1:
          this.getData()
          break;
        }
      },
      // 修改
      changeData(){
        let params = {
          user_authentication_status:this.user_authentication_status,
          user_authentication_points:this.user_authentication_points,
          user_authentication_introduction:this.user_authentication_introduction,
          car_authentication_status:this.car_authentication_status,
          car_authentication_points:this.car_authentication_points,
          car_authentication_introduction:this.car_authentication_introduction,
          recharge_status:this.recharge_status,
          recharge_points_coefficient:this.recharge_points_coefficient,
          recharge_points_threshold:this.recharge_points_threshold,
          recharge_introduction:this.recharge_introduction,
          time_status:this.time_status,
          time_points_coefficient:this.time_points_coefficient,
          time_points_threshold:this.time_points_threshold,
          time_introduction:this.time_introduction,
          follow_wechat_status:this.follow_wechat_status,
          follow_wechat_points:this.follow_wechat_points,
          follow_wechat_introduction:this.follow_wechat_introduction,
          car_certification_remind:this.car_certification_remind,
          token:sessionStorage.getItem('token')
        }
        integralRewardAction(params)
          .then(res => {
            if(res.data.code == 200){
               this.$message.success(res.data.msg,3);
                 setTimeout(res=>{
                  this.getData()
                 },1000)
            }else{
              this.$message.warning(res.data.msg,3);
            }
          })
      },
      // 获取奖励页数据
      getData(){
        this.loading = true
        integralRewardEdit()
          .then(res => {
            if(res.data.code == 200){
              this.user_authentication_status = res.data.data[0].value
              this.user_authentication_points = res.data.data[1].value
              this.user_authentication_introduction = res.data.data[2].value
              this.car_authentication_status = res.data.data[3].value
              this.car_authentication_points = res.data.data[4].value
              this.car_authentication_introduction = res.data.data[5].value

              this.recharge_status = res.data.data[16].value
              this.recharge_points_coefficient = res.data.data[14].value
              this.recharge_points_threshold = res.data.data[15].value
              this.recharge_introduction = res.data.data[12].value
              this.time_status = res.data.data[6].value
              this.time_points_coefficient = res.data.data[13].value
              this.time_points_threshold = res.data.data[7].value
              this.time_introduction = res.data.data[8].value
              this.follow_wechat_status = res.data.data[9].value
              this.follow_wechat_points = res.data.data[10].value
              this.follow_wechat_introduction = res.data.data[11].value

              this.car_certification_remind = res.data.data[17].value

              this.loading = false
              console.log(this.time_introduction)
            }else{
              this.$notify.error({
              	title: '错误',
              	message: res.data.msg,
              	duration: 0
              });
            }
          })
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped>
  .box{
    width: 90%;
    margin: 0 auto;
    margin-top: 2%;
    padding-bottom: 10%;
    display: flex;
    background-color: #fff;
    flex-wrap: wrap;
  }
  .box-item{
    width: 35%;
    height: 200px;
    margin-left: 8%;
    margin-top: 5%;
  }
  .box-item-title{
    display: flex;
  }
  .box-item-title div:nth-child(1){
    text-align: right;
    width: 16.5%;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 20px;
  }
  .box-item-title div:nth-child(2){
    margin-left: 3%;
  }
  .box-item-center{
    display: flex;
    margin-top: 2%;
  }
  .box-item-center div:nth-child(1){
    height: 40px;
    line-height: 40px;
    width: 20%;
    text-align: right;

  }
  .box-item-center div:nth-child(2){
    margin-left: 2%;
    width: 100%;
  }
  .hide{
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /* 头部按钮 */
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
   /* 头部按钮end */
</style>
