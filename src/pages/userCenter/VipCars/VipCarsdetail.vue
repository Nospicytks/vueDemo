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
          <div class="box-item-font">车牌号:</div>
          <div class="box-item-button"><el-input v-model="car_number" placeholder="请输入"></el-input></div>
        </div>
        <div class="box-item">
          <div class="box-item-font">手机号:</div>
          <div class="box-item-button"><el-input v-model="car_user_phone" placeholder="请输入"></el-input></div>
        </div>
        <div class="box-item">
          <div class="box-item-font">系统备注（仅管理员可见）：</div>
          <div class="box-item-button"><el-input v-model="remark" placeholder="请输入"></el-input></div>
        </div>
        <div class="box-item">
          <div class="box-item-font">车辆类型:</div>
          <div class="box-item-button">
              <el-select
              style="width: 100%;"
              v-model="car_subdivision_type"
              placeholder="请选择">
                 <el-option
                   v-for="item in options2"
                   :key="item.id"
                   :label="item.label"
                   :value="item.id"
                   >
                 </el-option>
               </el-select>
          </div>
        </div>
        <div class="box-item">
          <div class="box-item-font">包时卡类型:</div>
          <div class="box-item-button">
              <el-select
              style="width: 100%;"
              v-model="card_base_id"
              placeholder="请选择">
                 <el-option
                   v-for="item in options"
                   :key="item.card_base_id"
                   :label="item.card_base_name"
                   :value="item.card_base_id"
                   >
                 </el-option>
               </el-select>
          </div>
        </div>
        <div v-if="noCard" class="box-item" style="width: 150%;margin-left: -17%;">
          <div class="box-item-font">各停车场有效时间:</div>
          <div class="box-item-button" >
            <div class="box-item-right-item">停车场</div>
            <div class="box-item-right-item">数量</div>
            <div class="box-item-right-item">操作</div>
          </div>
        </div>
        <!-- 表格 -->
        <div v-if="noCard" v-for="(item,index) in tableIdArr" :key="index" class="box-item" style="width: 150%;margin-left: -17%;margin-top: 0;">
          <div class="box-item-font"></div>
          <div class="box-item-button" >
            <div class="box-item-right-item" style="border:none;background-color:#fff;padding-top:1%;padding-bottom:1%;">{{item.park_name}}</div>
            <div class="box-item-right-item" style="border:none;background-color:#fff;padding-top:1%;padding-bottom:1%;">
              <el-input style="width: 100%;" v-model="item.num" class="elinput" placeholder="输入数量"></el-input>
            </div>
            <div class="box-item-right-item" style="border:none;background-color:#fff;padding-top:1%;padding-bottom:1%;">
              <el-button type="danger" icon="el-icon-delete" circle @click="delPark(item)"></el-button>
            </div>
          </div>
        </div>
        <!-- 表格 -->
      </div>

    </div>
    <br><br>
  </div>
</template>

<script>
  import { childCardList,childParking,getCardList,vipCardAdd } from '@/api/request'
  export default{
    data() {
      return {
        msg:['用户中心 /','会员车辆管理 /','添加会员车辆'],
        title:'添加会员车辆',
        button:['提交','取消'],
        titPath:'VipCarsdetail',
        tableIdArr:[],
        car_number:'',
        noCard:false,
        car_user_phone:'',
        remark:'',
        car_subdivision_type:'',
        card_base_id:'',
        options:[],
        options2:[
          {
            id:1,
            label:'小型汽车'
          },
          {
            id:2,
            label:'小型新能源汽车'
          },
          {
            id:3,
            label:'中、大型汽车'
          },
          {
            id:4,
            label:'大型新能源汽车'
          },
          {
            id:5,
            label:'教练汽车'
          },
          {
            id:6,
            label:'使馆汽车'
          },
          {
            id:7,
            label:'挂车'
          }
        ]
      }
    },
    watch:{
      card_base_id:{
        handler(card_base_id){
          if(card_base_id == '' || card_base_id == 'no'){
            this.noCard = false
            this.tableIdArr = []
          }else{
            this.tableIdArr = []
            childParking()
              .then(res => {
                if(res.data.code == 200){
                  let arr = []
                  for(let i = 0;i<res.data.data.length;i++){
                    arr.push(res.data.data[i].park_id)
                  }
                  getCardList(JSON.stringify(arr),this.card_base_id)
                    .then(res =>{
                     for(let j = 0;j<res.data.data.length;j++){
                       this.tableIdArr.push({
                         card_id:res.data.data[j].card_id,
                         park_id:res.data.data[j].park_id,
                         park_name:res.data.data[j].park_name,
                         num:''
                       })
                     }
                    })
                    this.noCard = true
                }
              })
          }
        },
        immediate:true,
        deep:true
      }
    },
    methods:{
      addCar(){
        if(this.car_number == ''){
          this.$message.warning('请输入车牌号',3);
        }else if(this.car_user_phone == ''){
          this.$message.warning('请输入电话',3);
        }else if(this.car_subdivision_type == ''){
          this.$message.warning('请选择车辆类型',3);
        }else if(this.remark == ''){
          this.$message.warning('请输入备注',3);
        }else if(this.card_base_id == ''){
          this.$message.warning('请选择卡型',3);
        }else{
          if(this.card_base_id !== 'no' && this.tableIdArr.findIndex(target=>target.num == '') !==-1){
                this.$message.warning('请将表单填写完整',3);
          }else{
            let arr = []
            for(let i = 0;i<this.tableIdArr.length;i++){
              arr.push({
                park_id:this.tableIdArr[i].park_id,
                num:this.tableIdArr[i].num,
                card_id:this.tableIdArr[i].card_id
              })
            }
            let params = {
             car_subdivision_type:this.car_subdivision_type,
             car_number:this.car_number,
             car_user_phone:this.car_user_phone,
             remark:this.remark,
             card_base_id:this.card_base_id,
             card_car_arr:JSON.stringify(arr),
             token:sessionStorage.getItem('token')
            }
            vipCardAdd(params)
              .then(res => {
                if(res.data.code == 200){
                  this.$message.success(res.data.msg,3);
                  setTimeout(res=>{
                    this.$router.push('/userCenter/VipCars/vipCarsAdmin');
                  },500)
                }else{
                  this.$message.warning(res.data.msg,3);
                }
              })
          }
        }
      },
      // 标题操作
      goPage(index){
        switch(index){
          case 1:
          this.$router.push('/userCenter/VipCars/vipCarsAdmin');
          break;
        }
      },
      goPages(index){
        switch(index){
          case 0:
          this.addCar()
          break;
          case 1:
          this.$router.push('/userCenter/VipCars/vipCarsAdmin');
          break;
        }
      },
      delPark(item){
        for(let i = 0;i<this.tableIdArr.length;i++){
          if(this.tableIdArr[i].park_id == item.park_id){
            this.tableIdArr.splice(i,1)
          }
        }
      },
     // 获取包时卡
     getCards(){
       childCardList('1')
         .then(res => {
           this.options = res.data.data
         })
     },
    },
    created() {
      this.getCards()
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
    width: 60%;
    margin-left:5%;
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
     width: 55%;
     margin-left: 1%;
     display: flex;
  }
  .box-item-right-item{
    width: 33.3%;
    background-color: rgb(250,250,250);
    border-bottom: 1px solid #d6d6d6;
    text-align: center;
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
