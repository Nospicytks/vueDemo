<template>
  <div  style="background-color: rgb(240,242,245);">
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
          <div>
            <el-button type="primary" style="margin-left: 20%;" @click="selectAll">全部</el-button>
          </div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*优惠券名称:</div>
          <div class="box-item-button"><el-input v-model="coupon_name" placeholder="给目标起个名字"></el-input></div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*抵扣券类型:</div>
          <div class="box-item-button">
            <el-radio v-model="coupon_type" label="1">抵时间</el-radio>
            <el-radio v-model="coupon_type" label="2">抵金额</el-radio>
            <el-radio v-model="coupon_type" label="3">折扣</el-radio>
            <el-radio v-model="coupon_type" label="4">全免</el-radio>
          </div>
        </div>
        <div class="box-item">
          <div class="box-item-font">
            <span v-if="coupon_type == '1'">*抵扣时间（小时）:</span>
            <span v-if="coupon_type == '2'">*抵扣金额（元）:</span>
            <span v-if="coupon_type == '3'">*抵扣(小数):</span>
            <span v-if="coupon_type == '4'">*全免:</span>
          </div>
          <div class="box-item-button"><el-input :disabled="coupon_type == '4'" v-model="deduction_amount" placeholder="请输入"></el-input></div>
        </div>
        <div v-if="coupon_type == '3'" class="box-item">
          <div class="box-item-font">
             <span>*抵扣上限:</span>
          </div>
          <div class="box-item-button">
            <el-input v-model="discount_amount" placeholder="请输入抵扣上限"></el-input>
          </div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*一次停车最多使用（张）:</div>
          <div class="box-item-button"><el-input v-model="most_used" placeholder="请输入张数"></el-input></div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*优惠券有效期:</div>
          <div class="box-item-button" style="display: flex;">
            <div>
              <el-date-picker
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                    v-model="start_valid_period"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
            </div>
            <div style="margin-left: 1%;margin-right: 1%;">至</div>
            <div>
              <el-date-picker
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    v-model="end_valid_period"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
            </div>
          </div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*允许与其他优惠券共用:</div>
          <div class="box-item-button">
            <el-radio v-model="is_public" label="1">允许</el-radio>
            <el-radio v-model="is_public" label="2">不允许</el-radio>
          </div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*是否启用:</div>
          <div class="box-item-button">
            <el-radio v-model="status" label="1">启用</el-radio>
            <el-radio v-model="status" label="2">禁用</el-radio>
          </div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*领券后有效期（小时）:</div>
          <div class="box-item-button"><el-input v-model="receive_valid_period" placeholder="请输入有效期时间"></el-input></div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*限定时间段使用:</div>
          <div class="box-item-button">
            <el-radio v-model="is_restricted_period" label="1">启用</el-radio>
            <el-radio v-model="is_restricted_period" label="2">禁用</el-radio>
          </div>
        </div>
        <div v-if="is_restricted_period == '1'" class="box-item">
          <div style="margin-left: 30%;">
            <el-time-picker
                format='HH'
                value-format="HH"
                v-model="start_restricted_period"
                placeholder="请选择开始时间">
              </el-time-picker>
          </div>
          <div style="margin-left: 1%;margin-right: 1%;">至</div>
          <div>
            <el-time-picker
                format='HH'
                value-format="HH"
                v-model="end_restricted_period"
                placeholder="请选择结束时间">
              </el-time-picker>
          </div>

        </div>
      </div>
    </div>
    <br><br>
  </div>
</template>

<script>
  import { childParking,couponListEdit } from '@/api/request'
  export default{
    data() {
      return {
        msg:['活动设置  /','优惠券管理 /','添加优惠券'],
        title:'添加优惠券',
        button:['提交','取消'],
        titPath:'addCoupon',
        pageLoading:false,
        is_edit:'',
        cardArr: [],
        park_id:[],
        arr:[],
        coupon_name:'',
        coupon_type:'',
        deduction_amount:'',
        discount_amount:'',
        most_used:'',
        start_valid_period:'',
        end_valid_period:'',
        is_public:'',
        status:'',
        receive_valid_period:'',
        is_restricted_period:'',
        start_restricted_period:'',
        end_restricted_period:'',
        coupon_id:''
      }
    },
    watch:{
      is_restricted_period:{
        handler(is_restricted_period){
          this.start_restricted_period = '';
          this.end_restricted_period = '';
        },
        deep: true,
        immediate: true
      },
      coupon_type:{
        handler(coupon_type){
           this.deduction_amount = '';
           this.discount_amount = ''
        },
        deep: true,
        immediate: true
      },
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
      // 全部
      selectAll(){
        let arr = []
        for(let i = 0;i<this.cardArr.length;i++){
          arr.push(this.cardArr[i].park_id)
        }
        this.park_id = arr
      },
      // 标题操作
      goPage(index){
        switch(index){
          case 1:
          this.$router.push('/actConfig/coupon/couponList');
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
          this.$router.push('/actConfig/coupon/couponList');
          break;
        }
      },
      // 修改/添加
      changeData(){

          if(this.park_id.length == 0 || this.coupon_name == '' || this.most_used == '' || this.start_valid_period == '' || this.end_valid_period == ''  || this.receive_valid_period == '' ){
            this.$message.warning('请将表单填写完整',3);
          }else{
            if((this.coupon_type !== '4' && this.deduction_amount == '') || (this.is_restricted_period == '1' && (this.start_restricted_period == '' || this.end_restricted_period == ''))){
              this.$message.warning('请将表单填写完整',3);
            }else{
                let park_id = JSON.stringify(this.park_id)
                let deduction_amount = ''
                let deduction_time = ''
                let discount = ''
                let discount_amount = ''

                switch(this.coupon_type){
                  case '1':
                  deduction_time = this.deduction_amount;
                  break;
                  case '2':
                  deduction_amount = this.deduction_amount;
                  break;
                  case '3':
                  discount = this.deduction_amount;
                  discount_amount = this.discount_amount;
                  break;
                  case '4':

                  break;
                }

                let params = {}

              if(this.is_edit == '0'){
                console.log(this.is_edit)
               params = {
                  park_ids:park_id,
                  coupon_name:this.coupon_name,
                  most_used:this.most_used,
                  start_valid_period:this.start_valid_period,
                  end_valid_period:this.end_valid_period,
                  is_public:this.is_public,
                  receive_valid_period:this.receive_valid_period,
                  status:this.status,
                  coupon_type:this.coupon_type,
                  deduction_amount:deduction_amount,
                  deduction_time:deduction_time,
                  discount:discount,
                  discount_amount:discount_amount,
                  is_restricted_period:this.is_restricted_period,
                  start_restricted_period:this.start_restricted_period,
                  end_restricted_period:this.end_restricted_period,
                  token:sessionStorage.getItem('token')
                }
              }else{

                params = {
                  coupon_id:this.coupon_id,
                  park_ids:park_id,
                  coupon_name:this.coupon_name,
                  most_used:this.most_used,
                  start_valid_period:this.start_valid_period,
                  end_valid_period:this.end_valid_period,
                  is_public:this.is_public,
                  receive_valid_period:this.receive_valid_period,
                  status:this.status,
                  coupon_type:this.coupon_type,
                  deduction_amount:deduction_amount,
                  deduction_time:deduction_time,
                  discount:discount,
                  discount_amount:discount_amount,
                  is_restricted_period:this.is_restricted_period,
                  start_restricted_period:this.start_restricted_period,
                  end_restricted_period:this.end_restricted_period,
                  token:sessionStorage.getItem('token')
                }
              }
              couponListEdit(params)
                .then(res => {
                  if(res.data.code == 200){
                     this.$message.success(res.data.msg,3);

                       setTimeout(res=>{
                         this.$router.push('/actConfig/coupon/couponList');
                       },1000)

                  }else{
                    this.$message.warning(res.data.msg,3);
                  }
                })
            }
          }
        },
      // 看是新增还是修改
    lookStatus(){
        if(this.$route.query.coupon_id == undefined){
          this.park_id = []
          this.coupon_name = ''
          this.coupon_type = '1'
          this.deduction_amount = ''
          this.most_used = ''
          this.start_valid_period = ''
          this.end_valid_period = ''
          this.is_public = '1'
          this.status = '1'
          this.receive_valid_period = ''
          this.is_restricted_period = '1'
          this.start_restricted_period = ''
          this.end_restricted_period = ''
          this.discount_amount = ''
          // 新增
          this.is_edit = 0
        }else{
          // 修改
          this.is_edit = 1
          this.park_id = JSON.parse(this.$route.query.park_ids)
          this.coupon_name = this.$route.query.coupon_name
          this.coupon_type = String(this.$route.query.coupon_type)
          this.most_used = this.$route.query.most_used
          this.start_valid_period = this.$route.query.start_valid_period
          this.end_valid_period = this.$route.query.end_valid_period
          this.is_public = String(this.$route.query.is_public)
          this.status = String(this.$route.query.status)
          this.receive_valid_period = this.$route.query.receive_valid_period
          this.is_restricted_period = String(this.$route.query.is_restricted_period)
          this.start_restricted_period = String(this.$route.query.start_restricted_period)
          this.deduction_amount = this.$route.query.deduction_amount
          this.end_restricted_period = String(this.$route.query.end_restricted_period)
          this.coupon_id = this.$route.query.coupon_id
          this.discount_amount = this.$route.query.discount_amount


        }
          this.pageLoading = false
      },
      // 获取停车场列表
     getParkList(){
        this.pageLoading = true
        childParking()
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
    background-color: #fff;
    margin: 0 auto;
    margin-top: 2%;
  }
  .box{
    width: 50%;
    margin: 0 auto;
    padding-top: 2%;
    padding-bottom: 5%;
  }
  .box-item{
    display: flex;
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
