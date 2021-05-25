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
    <div class="center">
      <div class="box">
        <el-form  ref="ruleForm" label-width="200px" class="demo-ruleForm">
          <el-form-item  label="*派送事件:">
            <el-select v-model="deliver_type" class="elinput" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item  label="*选择派送的优惠券:">
           <el-select
           @change="selectChange(coupon_arr)"
           v-model="coupon_arr"
           multiple
           class="elinput"
           placeholder="请选择">
               <el-option
                 v-for="item in options2"
                 :key="item.coupon_id"
                 :label="item.coupon_name"
                 :value="item.coupon_id">
               </el-option>
             </el-select>
          </el-form-item>
          <el-form-item  label="*优惠券发放数量:">
            <div class="box-item-right" style="display: flex;">
              <div class="box-item-right-item">优惠券</div>
              <div class="box-item-right-item">张数</div>
            </div>
            <!-- 选择派送的优惠卷 -->
            <div v-for="(item,index) in tableData" :key="index" class="box-item" style="margin: 0 auto;">
              <div class="box-item-right" style="display: flex;">
                <div style="background-color: #fff;" class="box-item-right-item">{{item.coupon_name}}</div>
                <div style="background-color: #fff;" class="box-item-right-item">
                  <el-input class="elinput" placeholder="输入派券张数" v-model="item.num"></el-input>
                </div>
              </div>
            </div>
            <!-- 选择派送的优惠卷end -->
          </el-form-item>
          <el-form-item  label="*派券任务有效期:">
            <div class="box-item-button" style="display: flex;">
              <div>
                <el-date-picker
                :disabled="is_long"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      v-model="deliver_start_date"
                      type="date"
                      placeholder="请选择开始日期">
                    </el-date-picker>
              </div>
              <div style="margin-left: 1%;margin-right: 1%;">至</div>
              <div>
                <el-date-picker
                :disabled="is_long"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      v-model="deliver_end_date"
                      type="date"
                      placeholder="请选择结束日期">
                    </el-date-picker>
              </div>
              <div style="margin-left: 3%;"><el-checkbox v-model="is_long">长期</el-checkbox></div>
            </div>
          </el-form-item>
          <el-form-item  label="背景图:">
            <div style="display: flex;">
              <div class="box-item-button" style="width: 20%;">
                <uploadImg :pic="pic" @filename="filename($event)"></uploadImg>
              </div>
          <!--    <div style="color: rgba(0, 0, 0, 0.247058823529412);margin-top: 3%;height: 30px; white-space: normal;overflow: hidden;text-overflow: ellipsis;">
                建议尺寸？X  ？像素，支持JPG、PNG、JEPG格式
              </div> -->
            </div>
          </el-form-item>
          <el-form-item  label="活动状态:">
           <el-radio v-model="status" :label="1">启用</el-radio>
           <el-radio v-model="status" :label="2">不启用</el-radio>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { childCouponList,automaticPjDo } from '@/api/request'
  import uploadImg from '@/components/uploadImg.vue'
  export default {
    components: {
        uploadImg
   },
    data(){
      return {
        msg:['活动设置  /','派券设置 /','添加自动派券任务'],
        title:'自动派券任务',
        button:['提 交','取消'],
        titPath:'automaticPjDo',
        options1: [
          {
            label:'新用户注册',
            value:2
          },
          {
            label:'拉新奖励',
            value:1
          }
        ],
        options2: [],
        tableData:[],
        tableIdArr:[],
        deliver_type:'',
        deliver_start_date:'',
        deliver_end_date:'',
        is_long:false,
        pic:'',
        pic2:'',
        id:'',
        status:1,
        coupon_arr:[],
        is_edit:0
      }
    },
    watch:{
      is_long:{
        handler(is_long){
          if(is_long == true){
            this.deliver_start_date = ''
            this.deliver_end_date = ''
          }
        },
        deep:true,
        immediate:true
      }
    },
    methods:{
      // 标题操作
      goPage(index){
        switch(index){
          case 1:
          this.$router.push('/actConfig/paijuan/automaticPjList');
        }
      },
      // 按钮操作
      goPages(index){
        switch (index){
          case 0:
          this.editData()
          break;
          case 1:
          this.$router.push('/actConfig/paijuan/automaticPjList');
          break;
        }
      },
      // 修改
      editData(){
        if(this.deliver_type == '' || this.tableData.length == 0 || this.pic2 == ''){
          this.$message.warning('请将表单填写完整!',3);
        }else{
          if(this.tableData.findIndex(target=>target.num == '')==-1){
            let arr = []
            for(let i = 0;i<this.tableData.length;i++){
              arr.push({
                coupon_id:this.tableData[i].coupon_id,
                num:this.tableData[i].num
              })
            }
            let is_long;
            switch(this.is_long){
              case true:
              is_long = 1
              break;
              case false:
              is_long = 2
              break;
            }
            let params = {
              id:this.id,
              deliver_type:this.deliver_type,
              coupon_arr:JSON.stringify(arr),
              deliver_start_date:this.deliver_start_date,
              deliver_end_date:this.deliver_end_date,
              pic:this.pic,
              status:this.status,
              is_long:is_long,
              token:sessionStorage.getItem('token')
            }
            automaticPjDo(params)
              .then(res => {
                if(res.data.code == 200){
                  this.$message.success(res.data.msg,3);
                  setTimeout(res=>{
                    this.$router.push('/actConfig/paijuan/automaticPjList');
                  },1000)
                }else{
                  this.$message.warning(res.data.msg,3);
                }
              })
          }else{
            this.$message.warning('优惠券发放数量填写完整!',3);
            return false
          }
        }
      },
      selectChange(parkId){
        if (this.tableIdArr.length > parkId.length){
          for(var index in this.tableIdArr){
            for (var x in this.options2){
              if (this.tableIdArr[index] == this.options2[x].coupon_id && parkId.indexOf(this.tableIdArr[index]) == -1){
                this.tableData.splice(index,1)
                this.tableIdArr.splice(index,1)
              }
            }
          }
        }else{
          for(var index in parkId){
            for (var x in this.options2){
              if (parkId[index] == this.options2[x].coupon_id && this.tableIdArr.indexOf(parkId[index]) == -1){
                this.tableData.push({
                  coupon_name:this.options2[x].coupon_name,
                  coupon_id:this.options2[x].coupon_id,
                  num:''
                })
                this.tableIdArr.push(parkId[index])
              }
            }
          }
        }
      },
      // 看是新增还是修改
     async lookStatus(){
        if(this.$route.query.id == undefined){
          this.tableData = []
          this.tableIdArr = []
          this.deliver_type = ''
          this.deliver_start_date = ''
          this.deliver_end_date = ''
          this.is_long = false,
          this.pic = ''
          this.pic2 = ''
          this.status = 1
          this.coupon_arr = []
          this.id = ''
          // 新增
          this.is_edit = 0
          this.getCoupon()
        }else{
          await this.getCoupon()
          this.deliver_type = JSON.parse(this.$route.query.deliver_type)
          this.deliver_start_date = this.$route.query.deliver_start_date
          this.id = this.$route.query.id
          this.deliver_end_date = this.$route.query.deliver_end_date
          if(this.$route.query.is_long == 1){
            this.is_long = true
          }else{
            this.is_long = false
          }
          this.pic = this.$route.query.pic
          this.status = Number(this.$route.query.status)
          let arr = [];
          for(let i = 0;i<JSON.parse(this.$route.query.coupon_arr).length;i++){
             arr[i] = JSON.parse(this.$route.query.coupon_arr)[i].coupon_id
             this.tableData.push({
               coupon_name:'',
               coupon_id:JSON.parse(this.$route.query.coupon_arr)[i].coupon_id,
               num:JSON.parse(this.$route.query.coupon_arr)[i].num
             })
          }
          this.coupon_arr = arr

          this.tableIdArr = []
          for(var index in this.tableData){
            this.tableIdArr.push(this.tableData[index].coupon_id)
          }
          this.is_edit = 1
        }
      },
      // 获取优惠卷
      getCoupon(){
        childCouponList()
            .then(res => {
               if(res.data.code == 200){
                 this.options2 =  res.data.data
               }else{
                 this.$message.warning(res.data.msg,3);
               }
            })
      },
      // 获取上传后的图片路径
      filename(val){
        this.pic = val.imageUrl
        this.pic2 = val.filename
      },
    },
    created() {
      this.lookStatus()
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
