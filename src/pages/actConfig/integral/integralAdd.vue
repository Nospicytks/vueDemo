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
    <div class="center">
      <div class="box">
        <div class="box-item">
          <div class="box-item-font">*兑换物类型:</div>
          <div class="box-item-button">
            <el-input v-model="dhwtitle" disabled></el-input>
          </div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*兑换物:</div>
          <div class="box-item-button">
            <el-select v-model="coupon_id" style="width: 100%;" placeholder="优惠券名">
                <el-option
                  v-for="item in couponList"
                  :key="item.coupon_id"
                  :label="item.coupon_name"
                  :value="item.coupon_id">
                </el-option>
              </el-select>
          </div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*兑换名称:</div>
          <div class="box-item-button"><el-input v-model="exchange_name"  placeholder="兑换物参加兑换活动的名称"></el-input></div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*总张数:</div>
          <div class="box-item-button"><el-input v-model="stock" placeholder="输入正整数"></el-input></div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*个人总可兑换张数:</div>
          <div class="box-item-button"><el-input v-model="exchange_max_num"  placeholder="输入正整数"></el-input></div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*单次可兑换张数:</div>
          <div class="box-item-button"><el-input v-model="exchange_once_num"  placeholder="输入正整数"></el-input></div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*消耗积分:</div>
          <div class="box-item-button"><el-input v-model="exchange_unit_points" placeholder="输入正整数"></el-input></div>
        </div>
        <div class="box-item">
          <div class="box-item-font">兑换描述:</div>
          <div class="box-item-button"><el-input v-model="exchange_description" placeholder="输入描述"></el-input></div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*状态:</div>
          <div class="box-item-button">
            <el-radio v-model="status" label="1">上架</el-radio>
            <el-radio v-model="status" label="2">下架</el-radio>
          </div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*兑换活动有效期:</div>
          <div class="box-item-button">
            <div class="box-item-button" style="display: flex;">
              <div>
                <el-date-picker
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      v-model="exchange_start_date"
                      type="date"
                      placeholder="请选择开始日期">
                    </el-date-picker>
              </div>
              <div style="margin-left: 5%;margin-right: 5%;">至</div>
              <div>
                <el-date-picker
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      v-model="exchange_end_date"
                      type="date"
                      placeholder="请选择结束日期">
                    </el-date-picker>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br><br>
  </div>
</template>

<script>
  import { childCouponList,integralEdit } from '@/api/request'
  export default{
    data() {
      return {
        msg:['活动设置  /','积分管理    /','添加积分兑换'],
        title:'添加积分兑换',
        button:['提交','取消'],
        titPath:'integralAdd',
        couponList:[],
        dhwtitle:'优惠卷',
        coupon_id:'',
        exchange_name:'',
        stock:'',
        exchange_max_num:'',
        exchange_once_num:'',
        exchange_unit_points:'',
        exchange_description:'',
        exchange_start_date:'',
        exchange_end_date:'',
        is_edit:0,
        status:'1'
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
          this.$router.push('/actConfig/integral/integralList');
          break;
        }
      },
      // 修改/添加
      changeData(){
        if(this.exchange_name == '' || this.stock == '' || this.exchange_max_num == '' || this.exchange_once_num == '' || this.exchange_unit_points == '' || this.exchange_start_date == '' || this.exchange_start_date == null || this.exchange_end_date == '' || this.exchange_end_date == null){
          this.$message.warning('请将表单填写完整',3);
        }else{
          let exchange_id;
          switch(this.is_edit){
            case 0:
            exchange_id = ''
            break;
            case 1:
            exchange_id = this.$route.query.exchange_id
            break;
          }
          let params = {
            exchange_id:exchange_id,
            exchange_name:this.exchange_name,
            coupon_id:this.coupon_id,
            stock:this.stock,
            exchange_max_num:this.exchange_max_num,
            exchange_once_num:this.exchange_once_num,
            exchange_unit_points:this.exchange_unit_points,
            exchange_description:this.exchange_description,
            exchange_start_date:this.exchange_start_date,
            exchange_end_date:this.exchange_end_date,
            status:this.status,
            token:sessionStorage.getItem('token')
          }
          integralEdit(params)
            .then( res=> {
              if(res.data.code == 200){
                 this.$message.success(res.data.msg,3);
                   setTimeout(res=>{
                     this.$router.push('/actConfig/integral/integralList');
                   },1000)
              }else{
                this.$message.warning(res.data.msg,3);
              }
            })
        }
      },
      // 看是新增还是修改
      lookStatus(){
          if(this.$route.query.exchange_id == undefined){
            this.exchange_name = ''
            this.coupon_id = ''
            this.stock = ''
            this.exchange_max_num = ''
            this.exchange_once_num = ''
            this.exchange_unit_points = ''
            this.exchange_description = ''
            this.exchange_start_date = ''
            this.exchange_end_date = ''
            this.status = '1'
            // 新增
            this.is_edit = 0
          }else{
           this.exchange_name = this.$route.query.exchange_name
           this.stock = this.$route.query.stock
           this.exchange_max_num = this.$route.query.exchange_max_num
           this.exchange_once_num = this.$route.query.exchange_once_num
           this.exchange_unit_points = this.$route.query.exchange_unit_points
           this.exchange_description = this.$route.query.exchange_description
           this.exchange_start_date = this.$route.query.exchange_start_date
           this.exchange_end_date = this.$route.query.exchange_end_date
           this.status = String(this.$route.query.status)
           this.coupon_id = JSON.parse(this.$route.query.coupon_id)
           this.is_edit = 1
           // 修改
          }
        },
      // 获取优惠卷
      getCouponList(){
        childCouponList()
        .then(res => {
          if(res.data.code == 200){
            this.couponList = res.data.data
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
      this.getCouponList()
      this.lookStatus()
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
     width: 45%;
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
