<template>
  <div style="background-color: rgb(240,242,245);">
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
            <div :class="item === '取消'?'qx':''" @click="goPages(index)" v-for="(item,index) in button" :key="index" class="title-font-right-item">{{item}}</div>
          </div>
        </div>
      </div>
      <!-- 头部按钮end -->
    <div v-loading="pageLoading" class="center">
      <div class="box">
        <div class="box-item">
          <div class="box-item-font">可使用停车场（多选）:</div>
          <div class="box-item-button">
            <el-select style="width: 100%;" v-model="park_id" multiple placeholder="请选择">
               <el-option
                 v-for="item in cardArr"
                 :key="item.park_id"
                 :label="item.park_name"
                 :value="item.park_id">
               </el-option>
             </el-select>
          </div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*规则名称:</div>
          <div class="box-item-button"><el-input v-model="name" placeholder="给目标起个名字"></el-input></div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*同一车，一天最多抵用（元）:</div>
          <div class="box-item-button"><el-input v-model="same_car_use" placeholder="请输入金额"></el-input></div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*同一车，一天最多抵用（小时）：</div>
          <div class="box-item-button"><el-input v-model="same_car_hour" placeholder="请输入时间"></el-input></div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*同一车，一次最多抵用（元）：</div>
          <div class="box-item-button"><el-input v-model="same_car_once_use" placeholder="请输入金额"></el-input></div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*同一车，一次最多抵用（小时）：</div>
          <div class="box-item-button"><el-input v-model="same_car_once_hour" placeholder="请输入时间"></el-input></div>
        </div>
      </div>
    </div>
    <br><br>
  </div>
</template>

<script>
  import { childParkingList,couponRuleListEdit } from '@/api/request'
  export default{
    data() {
      return {
        msg:['活动设置  /','优惠券管理 /','用券规则'],
        title:'配置用券规则',
        button:['提交','取消'],
        titPath:'couponRule',
        useParkings:'',
        cardArr: [],
        pageLoading:false,
        is_edit:0,
        park_id:[],
        name:'',
        same_car_use:'',
        same_car_hour:'',
        same_car_once_use:'',
        same_car_once_hour:''
      }
    },
    watch:{
      cardArr:{
        handler(options){
          setTimeout(res=>{
            this.lookStatus()
          },500)
        },
        deep: true,
        immediate: true
      }
    },
    methods:{
      // 标题操作
      goPage(index){
        switch(index){
          case 1:
          this.$router.push('/actConfig/coupon/couponRuleList');
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
          this.$router.push('/actConfig/coupon/couponRuleList');
          break;
        }
      },
      // 修改
      changeData(){
        if(this.park_id == '' || this.name == '' || this.same_car_use == '' || this.same_car_hour == '' || this.same_car_once_use == ''  || this.same_car_once_hour == '' ){
          this.$message.warning('请将表单填写完整',3);
        }else{
           let park_id = JSON.stringify(this.park_id)
           let params = {}
           switch (this.is_edit){
             case 0:
             params = {
               park_ids:park_id,
               name:this.name,
               same_car_use:this.same_car_use,
               same_car_hour:this.same_car_hour,
               same_car_once_use:this.same_car_once_use,
               same_car_once_hour:this.same_car_once_hour,
               token:sessionStorage.getItem('token')
             }
             break;
             case 1:
             params = {
               rule_id:this.$route.query.rule_id,
               park_ids:park_id,
               name:this.name,
               same_car_use:this.same_car_use,
               same_car_hour:this.same_car_hour,
               same_car_once_use:this.same_car_once_use,
               same_car_once_hour:this.same_car_once_hour,
               token:sessionStorage.getItem('token')
             }
             break;
           }
            couponRuleListEdit(params)
              .then(res => {
                if(res.data.code == 200){
                   this.$message.success(res.data.msg,3);

                     setTimeout(res=>{
                       this.$router.push('/actConfig/coupon/couponRuleList');
                     },1000)

                }else{
                  this.$message.warning(res.data.msg,3);
                }
              })
        }
      },
      // 看是新增还是修改
      lookStatus(){
          if(this.$route.query.rule_id == undefined){
            this.park_id = ''
            this.name = ''
            this.same_car_use = ''
            this.same_car_hour = ''
            this.same_car_once_use = ''
            this.same_car_once_hour = ''
            // 新增
            this.is_edit = 0
          }else{
            // 修改
            this.is_edit = 1
            this.park_id = JSON.parse(this.$route.query.park_ids)
            this.name = this.$route.query.name
            this.same_car_use = this.$route.query.same_car_use
            this.same_car_hour = this.$route.query.same_car_hour
            this.same_car_once_use = this.$route.query.same_car_once_use
            this.same_car_once_hour = this.$route.query.same_car_once_hour
          }
            this.pageLoading = false
        },
        // 获取停车场列表
        getParkList(){
           this.pageLoading = true
           childParkingList('1',this.$route.query.rule_id)
           .then(res => {
              if(res.data.code == 200){
                this.cardArr = res.data.data
              }else{
                this.$message.warning(res.data.msg,3);
              }
           })
         }
    },
    created() {
      this.getParkList()
    }
  }
</script>

<style scoped>
  .center{
    width: 80%;
    height: 810px;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 2%;
  }
  .box{
    width: 50%;
    margin: 0 auto;
    padding-top: 2%;
  }
  .box-item{
    display: flex;
    height: 40px;
    line-height: 40px;
    margin-top: 5%;
  }
  .box-item-font{
    text-align: right;
    width: 34%;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .box-item-button{
     width: 65%;
     margin-left: 1%;
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
