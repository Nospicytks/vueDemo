<template>
  <div style="background-color: rgb(240,242,245);">
    <Naving />
    <!-- 头部按钮 -->
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
            <div :class="item === '重置'?'qx':''" @click="goPages(index)" v-for="(item,index) in button" :key="index" class="title-font-right-item">{{item}}</div>
          </div>
        </div>
      </div>
      <!-- 头部按钮end -->
    <div class="center">
      <div class="box" v-loading="pageLoading">
         <el-form style="margin-top: 5%;margin-left: 5%;" :model="dynamicValidateForm" ref="dynamicValidateForm"  class="demo-dynamic">
          <!-- <el-form-item
            label="可使用停车场（多选）:"
          >
          <div style="display: flex;">
           <el-select style="width: 50%;" v-model="debit_card_park_ids" multiple placeholder="请选择">
               <el-option
                 v-for="item in options"
                 :key="item.park_id"
                 :label="item.park_name"
                 :value="item.park_id"
                 >
               </el-option>
             </el-select>
          </div>
          </el-form-item> -->
           <el-form-item
             v-for="(item, index) in debit_card_recharge_amount"
             :key="index"
             style="margin-left: 6.5%;"
             label="*充值档位:"
           >
           <div style="display: flex;white-space: normal;overflow: hidden;text-overflow: ellipsis;">
             <el-input style="width: 15%;margin-left: 1%;" v-model="item.recharge_amount" placeholder="输入充值金额"></el-input>
             <span style="margin-left: 1%;">--赠额</span>
             <el-input style="width: 15%;margin-left: 1%;" v-model="item.credit" placeholder="输入赠送金额"></el-input>
             <span style="margin-left: 1%;">--会员时长</span>
             <el-input style="width: 15%;margin-left: 1%;" v-model="item.member_time" placeholder="输入数字"></el-input>
             <span style="margin-left: 1%;">个</span>
             <el-select style="width: 15%;margin-left: 1%;" v-model="item.member_unit "  placeholder="年/月/日">
                 <el-option
                   v-for="item in options2"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value"
                   >
                 </el-option>
               </el-select>
             <i class="el-icon-remove-outline" style="margin-left: 1%;line-height: 45px;" @click.prevent="removeDomain(item)"></i>
           </div>
           </el-form-item>
           <el-form-item>
             <div @click="addDomain" style="height: 35px;line-height: 35px;text-align: center;width: 70%;border: 1px dashed #d6d6d6;margin-left: 9.5%;">
               +  添加
             </div>
           </el-form-item>
           <el-form-item
           style="margin-left: 3.5%;"
             label="余额不足提醒:"
           >
           <div><el-checkbox v-model="debit_card_is_remind">开启</el-checkbox></div>
           </el-form-item>

          <transition name="el-fade-in-linear">
            <el-form-item
            v-if="debit_card_is_remind"
            style="margin-left: 6.5%;"
              label="*提醒金额:"
            >
            <div>
              <span style="margin-left: 2%;">余额低于</span>
              <el-input style="width: 7%;margin-left: 1%;" v-model="debit_card_remind_money" placeholder="单位元" ></el-input>
              <span style="margin-left: 2%;">提醒消费者</span>
            </div>
            </el-form-item>
          </transition>

         </el-form>
      </div>
    </div>
    <br><br>
  </div>
</template>

<script>
  import { childParkingList,accountCards,accountCardsEdit } from '@/api/request'
  export default{
    data() {
      return {
        msg:['基础设置  /','会员规则管理 /','储值规则'],
        title:'储值规则',
        button:['提交','重置'],
        titPath:'accountCards',
        options: [],
        options2: [
          {
            label:'日',
            value:1
          },
          {
            label:'月',
            value:2
          },
          {
            label:'年',
            value:3
          }
        ],
        dynamicValidateForm: {
          domains: [{
            days: '',
            ins:''
          }],
          ins:'',
          days:''
        },
        debit_card_recharge_amount:[],
        pageLoading:false,
        debit_card_park_ids:[],
        debit_card_remind_money:'',
        debit_card_is_remind:false
      }
    },
    watch:{
      debit_card_is_remind:{
        handler(is_restricted_period){
          this.debit_card_remind_money = '';
        },
        deep: true,
        immediate: true
      },
      options:{
        handler(options){
          if(options.length !== 0){
            this.getCarsInfo()
          }else{
            this.pageLoading = false
            this.$message.warning('未获取到数据!',3);
          }
        }
      }
    },
    methods: {
      // 按钮操作
      goPages(index){
        switch (index){
          case 0:
          this.changeData()
          break;
          case 1:
          this.getParkList()
          break;
        }
      },
      // 提交修改
      changeData(){
         if(this.debit_card_park_ids.length == 0 || this.debit_card_recharge_amount.length == 0 || (this.debit_card_is_remind == true && this.debit_card_remind_money == '')){
           this.$message.warning('请将表单填写完整',3);
         }else{
            if(this.debit_card_recharge_amount.findIndex(target=>target.recharge_amount == '')==-1 && this.debit_card_recharge_amount.findIndex(target=>target.credit == '')==-1 && this.debit_card_recharge_amount.findIndex(target=>target.member_time == '')==-1 && this.debit_card_recharge_amount.findIndex(target=>target.member_unit == '')==-1){
              let debit_card_is_remind;
              switch(this.debit_card_is_remind){
                case true:
                debit_card_is_remind = 1
                break;
                case false:
                debit_card_is_remind = 2
                break;
              }
              let params = {
                debit_card_park_ids:JSON.stringify(this.debit_card_park_ids),
                debit_card_recharge_amount:JSON.stringify(this.debit_card_recharge_amount),
                debit_card_remind_money:this.debit_card_remind_money,
                debit_card_is_remind:debit_card_is_remind,
                token:sessionStorage.getItem('token')
              }
              accountCardsEdit(params)
                .then( res=> {
                  if(res.data.code == 200){
                    this.$message.success(res.data.msg,3);
                    this.getParkList()
                  }else{
                    this.$message.warning(res.data.msg,3);
                  }
                })
            }else {
              this.$message.warning('请将充值档位填写完整!',3);
              return false
            }
         }
      },
      // 获取停车场数据
      getParkList(){
        this.pageLoading = true
        childParkingList()
          .then( res=> {
            if(res.data.code == 200){
              this.options = res.data.data
            }else{
              this.$message.warning(res.data.msg,3);
            }
          })
      },
      // 获取配置信息
      getCarsInfo(){
        accountCards()
          .then( res=> {
            if(res.data.code == 200){
              this.debit_card_park_ids = JSON.parse(res.data.data[0].value)
              this.debit_card_recharge_amount = JSON.parse(res.data.data[1].value)
              if(res.data.data[2].value == 1){
                this.debit_card_is_remind = true
              }else{
                this.debit_card_is_remind = false
              }
              this.debit_card_remind_money = res.data.data[3].value
              this.pageLoading = false
            }else{
              this.$message.warning(res.data.msg,3);
            }
          })
      },
      removeDomain(item) {
        var index = this.debit_card_recharge_amount.indexOf(item)
        if (index !== -1) {
          this.debit_card_recharge_amount.splice(index, 1)
        }
      },
      addDomain() {
        this.debit_card_recharge_amount.push({
          member_time: '',
          member_unit :'',
          credit: '',
          recharge_amount:''
        });
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
    background-color: #fff;
    margin: 0 auto;
    margin-top: 2%;
    padding-bottom: 2%;
  }
  .box{
    width: 80%;
    margin: 0 auto;
    padding-top: 2%;
  }
  .box-item{
    display: flex;
    line-height: 40px;
    margin-top: 3%;
  }
  .box-item-font{
    text-align: right;
    width: 20%;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .box-item-button{
     width: 65%;
     margin-left: 1%;
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
