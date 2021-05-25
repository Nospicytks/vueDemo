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
      <div class="public">
        <div class="public-left"><i class="el-icon-warning-outline"></i></div>
        <div class="public-right">
          <div>请注意!</div>
          <div>操作后门禁杆将抬起，将会导致车辆出入停车场，请谨慎操作！！！</div>
        </div>
      </div>
      <div class="box">
        <div class="box-item">
          <div class="box-item-left">*可使用停车场（单选）:</div>
           <div class="box-item-right">
             <el-select style="width: 60%;" @change="getCameraList(park_id)" v-model="park_id"  placeholder="请选择">
                 <el-option
                   v-for="item in options"
                   :key="item.park_id"
                   :label="item.park_name"
                   :value="item.park_id">
                 </el-option>
               </el-select>
           </div>
        </div>
        <div class="box-item">
          <div class="box-item-left">*出/入口:</div>
           <div class="box-item-right">
             <el-select style="width: 60%;" v-model="camera_id"  placeholder="请先选择停车场">
                 <el-option
                   v-for="item in options2"
                   :key="item.camera_id"
                   :label="item.title"
                   :value="item.camera_id">
                 </el-option>
               </el-select>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { childParking,getCameraList,openDo } from '@/api/request'
  export default{
    data() {
      return {
         msg:['车场事务管理  /','远程开门管理 /','远程开门'],
         title:'远程开门',
         button:['执行','取消'],
         titPath:'openDo',
         park_id:'',
         camera_id:'',
         options:[],
         options2:[]
      }
    },
    methods:{
      // 标题操作
      goPage(index){
        switch(index){
          case 1:
          this.$router.push('/affairsManagement/openTheDoor/openList');
          break;
        }
      },
      // 按钮操作
      goPages(index){
        switch (index){
          case 0:
          this.doAction()
          break;
          case 1:
          this.$router.push('/affairsManagement/openTheDoor/openList');
          break;
        }
      },
      doAction(){
        if(this.park_id == '' || this.camera_id == ''){
          this.$message.warning('请将表单填写完整',3);
        }else{
          openDo(this.park_id,this.camera_id)
            .then( res=> {
              if(res.data.code == 200){
                 this.$message.success(res.data.msg,3);
                   setTimeout(res=>{
                     this.$router.push('/affairsManagement/openTheDoor/openList');
                   },1000)
              }else{
                this.$message.warning(res.data.msg,3);
              }
            })
        }
      },
      refresh(){
        this.park_id = ''
        this.camera_id = ''
      },
      // 获取停车场数据
      getParkList(){
        childParking()
          .then( res=> {
            if(res.data.code == 200){
              this.options = res.data.data
            }else{
              this.$message.warning(res.data.msg,3);
            }
          })
      },
      // 获取摄像头列表
      getCameraList(park_id){
        this.camera_id = ''
        let parkId = park_id
        getCameraList(parkId)
          .then( res=> {
            if(res.data.code == 200){
              this.options2 = res.data.data
            }else{
              this.$message.warning(res.data.msg,3);
            }
          })
      },
    },
    created() {
      this.getParkList()
    }
  }
</script>

<style scoped>
  .center{
    background-color: #fff;
    width: 80%;
    margin: 0 auto;
    height: 750px;
    margin-top: 1%;
    padding-top: 3%;
  }
  .public{
    height: 120px;
    width: 95%;
    margin: 0 auto;
    background-color: rgb(255,251,230);
    border: 1px solid rgba(255, 229, 143, 1);
    border-radius: 4px;
    display: flex;
  }
  .public-left{
    width: 6%;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #FAAD14;
  }
  .public-right{
    width: 94%;
  }
  .public-right div:nth-child(1){
    margin-top: 2%;
    font-weight: bold;
    font-size: 20px;
    color: #333;
  }
  .public-right div{
    color: rgba(0, 0, 0, 0.447058823529412);
  }
  .box{
    width: 60%;
    margin: 0 auto;
  }
  .box-item{
    display: flex;
    margin-top: 4%;
  }
  .box-item-left{
    height: 40px;
    line-height: 40px;
    width: 30%;
    text-align: right;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .box-item-right{
    width: 69%;
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
