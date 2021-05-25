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
      <div class="box">
         <el-form style="margin-top: 5%;margin-left: 5%;" class="demo-dynamic">
            <el-form-item
            style="margin-left: 3.5%;"
              label="包时卡到期提醒:"
            >
            <div><el-checkbox v-model="time_card_is_remind">开启</el-checkbox></div>
            </el-form-item>

             <el-form-item
               v-for="(item, index) in time_card_remind_days"
               :key="index"
               style="margin-left: 6.5%;"
               label="*提醒时间:"
             >

             <div style="display: flex;white-space: normal;overflow: hidden;text-overflow: ellipsis;">
               <span style="margin-left: 1%;">到期前</span>
               <el-input style="width: 8%;margin-left: 1%;" v-model="item.val" ></el-input>
               <span style="margin-left: 1%;">天提醒消费者</span>
               <i class="el-icon-remove-outline" style="margin-left: 1%;line-height: 42px;" @click.prevent="removeDomain(item)"></i>
             </div>
             </el-form-item>

             <el-form-item>
               <div @click="addDomain" style="height: 35px;line-height: 35px;text-align: center;width: 40%;border: 1px dashed #d6d6d6;margin-left: 9.5%;">
                 +  添加
               </div>
             </el-form-item>

         </el-form>
      </div>
    </div>
    <br><br>
  </div>
</template>

<script>
  import { remindCards,remindCardsEdit } from '@/api/request'
  export default{
    data() {
      return {
        msg:['基础设置  /','会员规则管理 /',' 包时卡提醒设置'],
        title:'包时卡提醒设置',
        button:['提交','重置'],
        titPath:'remindCards',
        time_card_is_remind:false,
        time_card_remind_days:[]
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
          this.getInfo()
          break;
        }
      },
      // 修改提交
      changeData(){
        if(this.time_card_remind_days.findIndex(target=>target == '')!==-1){
          this.$message.warning('请将表单填写完整',3);
        }else{
          let time_card_is_remind;
          switch(this.time_card_is_remind){
            case true:
            time_card_is_remind = 1
            break;
            case false:
            time_card_is_remind = 2
            break;
          }
          let arr = []
          for(let i = 0;i<this.time_card_remind_days.length;i++){
            arr.push(Number(this.time_card_remind_days[i].val))
          }
          if(arr.findIndex(target=>isNaN(target) == true)!==-1){
            this.$message.warning('数据只能是整数',3);
          }else{
            let params = {
              time_card_is_remind:time_card_is_remind,
              time_card_remind_days:JSON.stringify(arr),
              token:sessionStorage.getItem('token')
            }
            remindCardsEdit(params)
              .then( res=> {
                if(res.data.code == 200){
                  this.$message.success(res.data.msg,3);
                  this.getInfo()
                }else{
                  this.$message.warning(res.data.msg,3);
                }
              })
          }
        }
      },
      // 查看配置
      getInfo(){
        this.time_card_remind_days = []
        remindCards()
          .then( res=> {
            if(res.data.code == 200){
              if(res.data.data[0].value == 1){
                this.time_card_is_remind = true
              }else{
                this.time_card_is_remind = false
              }
              let arr = []
              arr = JSON.parse(res.data.data[1].value)
              for(let i = 0;i<arr.length;i++){
                this.time_card_remind_days.push({val:arr[i]})
              }
            }else{
              this.$message.warning(res.data.msg,3);
            }
          })
      },
      removeDomain(item) {
        var index = this.time_card_remind_days.indexOf(item)
        if (index !== -1) {
          this.time_card_remind_days.splice(index, 1)
        }
      },
      addDomain() {
        this.time_card_remind_days.push({val:''});
      }
    },
    created() {
      this.getInfo()
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
