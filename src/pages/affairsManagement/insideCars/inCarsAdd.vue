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
          <el-form-item  label="*车主姓名:">
           <el-input class="elinput" v-model="car_user_name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item  label="手机号:">
           <el-input class="elinput" v-model="car_user_phone" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item  label="*类型">
           <el-select v-model="internal_type" class="elinput" placeholder="请选择">
               <el-option
                 v-for="item in options1"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-select>
          </el-form-item>
          <el-form-item  label="*内部车有效期:">
            <div class="box-item-button" style="display: flex;">
              <div>
                <el-date-picker
                :disabled="internal_is_long"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                      v-model="internal_effective_start_date"
                      type="date"
                      placeholder="请选择开始日期">
                    </el-date-picker>
              </div>
              <div style="margin-left: 1%;margin-right: 1%;">至</div>
              <div>
                <el-date-picker
                :disabled="internal_is_long"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                      v-model="internal_effective_end_date"
                      type="date"
                      placeholder="请选择结束日期">
                    </el-date-picker>
              </div>
              <div style="margin-left: 3%;"><el-checkbox v-model="internal_is_long">长期</el-checkbox></div>
            </div>
          </el-form-item>
          <el-form-item
          label="*车辆信息:"
            v-for="(item, index) in remind_arr"
            :key="index"
          >
          <div style="display: flex;">
           <div style="width: 15%;">
             <el-select v-model="item.car_numbertitle" placeholder="请选择">
                 <el-option
                   v-for="item2 in cpOptions"
                   :key="item2.value"
                   :label="item2.label"
                   :value="item2.value">
                 </el-option>
               </el-select>
           </div>
           <div style="margin-left: 1%;margin-right: 1%;line-height: 40px;">--</div>
           <div style="width: 30%;margin-left: 1%;"><el-input  v-model="item.car_numberbody" placeholder="输入车牌号"></el-input></div>
           <div><el-button style="margin-left: 5%;border:none;" class="el-icon-remove-outline" @click.prevent="removeDomain(item)"></el-button></div>
          </div>
          </el-form-item>
          <el-form-item >
            <div @click="addDomain" style="height: 35px;line-height: 35px;text-align: center;width: 60%;border: 1px dashed #d6d6d6;">
              +  添加
            </div>
          </el-form-item>
          <el-form-item  label="*可使用停车场（多选）:">
           <el-select v-model="park_ids" multiple class="elinput" placeholder="请选择">
               <el-option
                 v-for="item in options2"
                 :key="item.park_id"
                 :label="item.park_name"
                 :value="item.park_id">
               </el-option>
             </el-select>
              <el-button type="primary" style="margin-left: 5%;" @click="selectAll">全部</el-button>
          </el-form-item>
          <el-form-item  label="启用设置:">
           <el-radio v-model="internal_status" label="1">启用</el-radio>
           <el-radio v-model="internal_status" label="2">不启用</el-radio>
           <el-radio v-model="internal_status" label="3">已过期</el-radio>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { childParking,openTheDoorListEdit } from '@/api/request'
  import { getcarNum } from '@/api/carNum'
  export default {
    data(){
      return {
        msg:['车厂事务管理  /','合作泊车管理 /','添加内部车'],
        title:'添加内部车',
        button:['提 交','取消'],
        titPath:'inCarsAdd',
        psyhj:'',
        lab1:'',
        lab2:'',
        cpValL:'',
        isUseParkings:'',
        options1: [
          {
            label:'员工',
            value:'1'
          },
          {
            label:'合作伙伴',
            value:'2'
          },
          {
            label:'访客',
            value:'3'
          }
        ],
        options2: [],
        cpOptions:[],
        remind_arr:[
          {
            car_numbertitle:'',
            car_numberbody:''
          }
        ],
        car_user_name:'',
        car_user_phone:'',
        internal_type:'',
        park_ids:[],
        internal_effective_start_date:'',
        internal_effective_end_date:'',
        internal_is_long:false,
        internal_status:'1',
        is_edit:0
      }
    },
    watch:{
      internal_is_long:{
        handler(internal_is_long){
          if(internal_is_long == true){
            this.internal_effective_start_date = ''
            this.internal_effective_end_date = ''
          }
        },
        deep: true,
        immediate: true
      },
    },
    methods:{
      // 全部
      selectAll(){
        let arr = []
        for(let i = 0;i<this.options2.length;i++){
          arr.push(this.options2[i].park_id)
        }
        this.park_ids = arr
      },
     // 标题操作
     goPage(index){
       switch(index){
         case 1:
         this.$router.push('/affairsManagement/insideCars/inCarsList');
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
         this.$router.push('/affairsManagement/insideCars/inCarsList');
         break;
       }
     },
     // 修改/增加
     changeData(){
      if(this.car_user_name == '' || this.internal_type == ''|| this.park_ids.length == 0){
        this.$message.warning('请将表单填写完整',3);
      }else{
        if(this.internal_is_long == false && (this.internal_effective_start_date == '' || this.internal_effective_start_date == null || this.internal_effective_end_date == '' || this.internal_effective_end_date == null)){
          this.$message.warning('请完善内部车有效期时间段!',3);
        }else{
           if(this.remind_arr.findIndex(target=>target.car_numbertitle == '')==-1 && this.remind_arr.findIndex(target=>target.car_numberbody == '')==-1){
               let internal_id;
               switch(this.is_edit){
                 case 0:
                 internal_id = ''
                 break;
                 case 1:
                 internal_id = this.$route.query.internal_id
                 break;
               }
               let internal_is_long;
               switch(this.internal_is_long){
                 case true:
                 internal_is_long = '1'
                 break;
                 case false:
                 internal_is_long = '2'
                 break;
               }
               let remind_arr = []
               for(let i = 0;i<this.remind_arr.length;i++){
                 remind_arr.push(this.remind_arr[i].car_numbertitle + this.remind_arr[i].car_numberbody)
               }
               let params = {
                 internal_id:internal_id,
                 car_user_name:this.car_user_name,
                 car_user_phone:this.car_user_phone,
                 internal_type:this.internal_type,
                 internal_effective_end_date:this.internal_effective_end_date,
                 internal_effective_start_date:this.internal_effective_start_date,
                 internal_is_long:internal_is_long,
                 car_number_arr:JSON.stringify(remind_arr),
                 park_ids:JSON.stringify(this.park_ids),
                 internal_status:this.internal_status,
                 token:sessionStorage.getItem('token')
               }
               openTheDoorListEdit(params)
                 .then( res=> {
                   if(res.data.code == 200){
                      this.$message.success(res.data.msg,3);

                        setTimeout(res=>{
                          this.$router.push('/affairsManagement/insideCars/inCarsList');
                        },1000)

                   }else{
                     this.$message.warning(res.data.msg,3);
                   }
                 })
            }else {
              this.$message.warning('请将车辆信息填写完整!',3);
              return false
            }
        }
      }
     },
      // 看是新增还是修改
      lookStatus(){
          if(this.$route.query.internal_id == undefined){
            this.car_user_name = ''
            this.car_user_phone = ''
            this.internal_type = ''
            this.remind_arr = [ {
              car_numbertitle:'',
              car_numberbody:''
            }],
            this.park_ids = []
            this.internal_effective_start_date = ''
            this.internal_effective_end_date = ''
            this.internal_status = '1'
            this.internal_is_long = false
            // 新增
            this.is_edit = 0
          }else{
           this.car_user_name = this.$route.query.car_user_name
           this.car_user_phone = this.$route.query.car_user_phone
           this.internal_type = this.$route.query.internal_type
           this.park_ids = JSON.parse(this.$route.query.park_ids)
           this.internal_status = this.$route.query.internal_status

           this.remind_arr = []
           for(let i = 0;i<this.$route.query.car_number_arr.length;i++){
              this.remind_arr.push({car_numbertitle:this.$route.query.car_number_arr[i].substring(0,1),car_numberbody:this.$route.query.car_number_arr[i].substring(1)})
           }

           if(this.$route.query.internal_effective_start_date == '0000-00-00'){
             this.internal_effective_start_date = ''
             this.internal_effective_end_date = ''
           }else{
             this.internal_effective_start_date = this.$route.query.internal_effective_start_date
             this.internal_effective_end_date = this.$route.query.internal_effective_end_date
           }
           if(this.$route.query.internal_is_long == '1'){
             this.internal_is_long =true
           }else{
             this.internal_is_long =false
           }
           // 修改
           this.is_edit = 1
          }
        },
      // 获取停车场数据
      getParkList(){
        childParking()
          .then( res=> {
            if(res.data.code == 200){
              this.options2 = res.data.data
            }else{
              this.$message.warning(res.data.msg,3);
            }
          })
      },
      removeDomain(item) {
        var index = this.remind_arr.indexOf(item)
        if(this.remind_arr.length == 1){
          this.$message.warning('不能再减了!',3);
          return false
        }else{
          if (index !== -1) {
            this.remind_arr.splice(index, 1)
          }
        }
      },
      addDomain() {
        this.remind_arr.push({
         car_numbertitle:'',
         car_numberbody:''
        });
      }
    },
    created() {
      this.cpOptions = getcarNum()
      this.getParkList()
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
