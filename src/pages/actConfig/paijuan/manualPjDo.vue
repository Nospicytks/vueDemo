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
            <div :class="item === '取消'?'qx':''" @click="goPages(index)" v-for="(item,index) in button" :key="index" class="title-font-right-item">{{item}}</div>
          </div>
        </div>
      </div>
      <!-- 头部按钮end -->
    <div class="center" v-loading="loading">
      <div class="box">
        <div class="box-item">
          <div class="box-item-left">*接收用户:</div>
          <div class="box-item-right">
            <el-input maxlength="11" v-model="phone" class="elinput" placeholder="请输入优惠券接收人电话"></el-input>
            <span style="color: red;">{{messages}}</span>
          </div>
        </div>
        <transition name="el-zoom-in-top" >
          <div class="box-item" v-show="user_id !== ''">
            <div class="box-item-left">*用户信息:</div>
            <div class="box-item-img">
             <img :src="head_img" alt="" >
            </div>
            <div class="box-item-name">{{nikename}}</div>
          </div>
        </transition>
        <div class="box-item">
          <div class="box-item-left">*选择派送的优惠券:</div>
          <div class="box-item-right">
             <el-select style="width: 80%;" @change="tabChange" v-model="coupon_arr" multiple placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.coupon_id"
                  :label="item.coupon_name"
                  :value="item.coupon_id">
                </el-option>
              </el-select>
          </div>
        </div>
        <div class="box-item">
          <div class="box-item-left">*优惠券发放数量:</div>
          <div class="box-item-right" style="display: flex;">
            <div class="box-item-right-item">优惠券</div>
            <div class="box-item-right-item">张数</div>
          </div>
        </div>
        <!-- 选择派送的优惠卷 -->
        <div v-for="(item,index) in tableData" :key="index" class="box-item" style="margin: 0 auto;">
          <div class="box-item-left"></div>
          <div class="box-item-right" style="display: flex;">
            <div style="background-color: #fff;" class="box-item-right-item">{{item.coupon_name}}</div>
            <div style="background-color: #fff;" class="box-item-right-item">
              <el-input class="elinput" v-model="item.num" placeholder="输入派券张数"></el-input>
            </div>
          </div>
        </div>
        <!-- 选择派送的优惠卷end -->
      </div>
    </div>
  </div>
</template>

<script>
  import { getUserByPhone,childCouponList,manualPjAdd } from '@/api/request'
  export default {
    data(){
      return {
        msg:['活动设置  /','派券设置 /','手动派券'],
        title:'手动派券',
        button:['提 交','取消'],
        titPath:'manualPjDo',
        loading:false,
        messages:'',
        tableData:[],
        options: [],
        phone:'',
        user_id:'',
        head_img:'',
        nikename:'',
        coupon_arr:[]
      }
    },
  watch:{
      phone:{
          handler(phone){
            if(phone.length == 11){
              this.getUser()
            }else{
              this.user_id = ''
              this.head_img = ''
              this.nikename = ''
              this.messages = ''
              console.log(this.user_id)
            }
          },
          deep: true,
          immediate: true,
        },
    },
    methods:{
      // 标题操作
      goPage(index){
        switch(index){
          case 1:
          this.$router.push('/actConfig/paijuan/manualPjList');
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
          this.$router.push('/actConfig/paijuan/manualPjList');
          break;
        }
      },
      // 清空
      refresh(){
        this.phone = '';
        this.tableData = [];
        this.coupon_arr = [];
      },
      // 查询用户
      getUser(){
        this.loading = true
        getUserByPhone(this.phone)
          .then(res => {
            if(res.data.code == 200){
              if(res.data.data){
                this.user_id = res.data.data.user_id
                this.head_img = res.data.data.head_img
                this.nikename = res.data.data.nikename
                this.messages = ''
              }else{
                 this.user_id = ''
                 this.head_img = ''
                 this.nikename = ''
                 this.messages = "*无此用户"
              }
              this.loading = false
            }else{
              this.$notify.error({
              	title: '错误',
              	message: res.data.msg,
              	duration: 0
              });
            }
          })
      },
      // 获取优惠卷列表
      getCoupon(){
        childCouponList()
        .then(res => {
          if(res.data.code == 200){
            this.options = res.data.data
          }else{
            this.$notify.error({
            	title: '错误',
            	message: res.data.msg,
            	duration: 0
            });
          }
        })
      },
      // 提交修改
      changeData(){

        if(this.phone == '' || this.coupon_arr == ''){
          this.$message.warning('请将表单填写完整',3);
          return false
        }else{
          if(this.user_id == ''){
            this.$message.warning('无此用户',3);
            return false
          }

          let postArray = []
          for(let i = 0;i<this.tableData.length;i++){
            postArray.push({coupon_id:this.tableData[i].coupon_id,num:this.tableData[i].num})
          }

          let params = {
            user_id:this.user_id,
            phone:this.phone,
            coupon_arr:JSON.stringify(postArray),
            token:sessionStorage.getItem('token')
          }
          console.log(params)
          manualPjAdd(params)
          .then(res => {
            if(res.data.code == 200){
               this.$message.success(res.data.msg,3);
                 setTimeout(res=>{
                  this.$router.push('/actConfig/paijuan/manualPjList');
                 },1000)
            }else{
              this.$message.warning(res.data.msg,3);
            }
          })
        }
      },
      tabChange(){
      this.tableData = []
       let arr = []
       for(let i = 0; i < this.options.length; i++){

        let aId = this.options[i].coupon_id

           for(let j = 0; j < this.coupon_arr.length; j++){

             let bId = this.coupon_arr[j]

              if(aId == bId){
               arr.push(this.options[i]);
              }
            }
        }
       for(let i = 0;i<arr.length;i++){
         this.tableData.push({coupon_id:arr[i].coupon_id,num:0,coupon_name:arr[i].coupon_name})
       }
      }
    },
    created() {
      this.getCoupon()
    }
  }
</script>

<style scoped>
  .center{
    width: 90%;
    margin: 0 auto;
    background-color: #fff;
    margin-top: 2%;
    padding-bottom: 2%;
    padding-top: 1%;
  }
  .box{
    width: 50%;
    margin: 0 auto;
  }
  .box-item{
    height: 60px;
    line-height: 60px;
    display: flex;
    margin-top: 3%;
  }
  .box-item-left{
    width: 30%;
    text-align: right;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .box-item-right{
    width: 68%;
    margin-left: 2%;
  }
  .elinput{
    width: 50%;
  }
  .box-item-img{
    background-color: rgb(117,128,139);
    border-radius: 49px;
    height: 100%;
    width: 62px;
    margin-left: 2%;
  }
  .box-item-img img{
    width: 100%;
    height: 100%;
    border-radius: 49px;
  }
  .box-item-name{
    margin-left: 1%;
    height: 60px;
    line-height: 60px;
    text-align: right;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .box-item-right-item{
    width: 50%;
    background-color: rgb(250,250,250);
    padding-left: 5%;
    border-bottom: 1px solid #d6d6d6;
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
