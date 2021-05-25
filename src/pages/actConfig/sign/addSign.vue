<template>
  <div style="background-color: rgb(240,242,245);">
    <Naving />
    <!-- 头部按钮 -->
    <div class="title">
        <div class="title-font">
          <div class="title-font-left">
            <div class="title-font-left-top">
              <div :class="index === (msg.length-1)?'last':''" @click="goPage(index)"  class="title-font-left-top-item" v-for="(item,index) in msg" :key="index" >
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
          <div class="box-item-font">日签奖励:</div>
          <div class="box-item-button">
            <div class="box-item-button"><el-input v-model="reward_points" placeholder="用户每日签到得分"></el-input></div>
          </div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*循环模式:</div>
          <div class="box-item-button" style="display: flex;">
            <div style="margin-left: 1%;">
              <el-checkbox v-model="sign_cycle_status">开启</el-checkbox>
            </div>
            <div style="margin-left: 5%;">
              固定周期（天）
            </div>
            <div style="margin-left: 3%;">
              <el-input
               placeholder="请输入次数"
               v-model="days"
               :disabled="sign_cycle_status === false"></el-input>
            </div>
          </div>
        </div>
        <div class="box-item" style="margin-top: 0%;">
          <div class="box-item-font"></div>
          <div class="box-item-button" style="display: flex;height: 70px;">
            <div>
              <span v-if="days !== ''" style="color:rgba(0, 0, 0, 0.247058823529412);">
                {{timeZq.start_date == '' || timeZq.end_date == '' || timeZq.start_date == null || timeZq.end_date == null?'暂无当前周期':'当前周期:'+timeZq.start_date +' ---'+timeZq.end_date}}
              </span><br>
              <span style="color:rgba(255, 0, 0, 0.247058823529412)">*温馨提示：</span><span style="color:rgba(0, 0, 0, 0.247058823529412)">更改周期将在次日生效</span>
            </div>
            <div style="margin-left: 5%;">
              <span v-if="days !== ''" style="color:rgba(0, 0, 0, 0.247058823529412)">
                 {{timeZq.next_start_date == '' || timeZq.next_end_date == ''?'暂无周期':'下个周期:'+timeZq.next_start_date +' ---'+timeZq.next_end_date}}
              </span>
            </div>
          </div>
        </div>
         <el-form style="margin-top: 5%;margin-left: 5%;" :model="dynamicValidateForm" ref="dynamicValidateForm"  class="demo-dynamic">
           <el-form-item
             v-for="(domain, index) in dynamicValidateForm.domains"
             :key="domain.key"
             label="奖励数值:"
             :prop="'domains.' + index + '.value'"
           >
           <div style="display: flex;">
             <span style="margin-left: 1%;">天数</span>
             <el-input style="width: 10%;margin-left: 1%;" v-model="domain.day" placeholder="输入天数"></el-input>
             <span style="margin-left: 1%;">--奖励</span>
             <el-input style="width: 10%;margin-left: 1%;" v-model="domain.points" placeholder="输入积分"></el-input>
             <el-button style="margin-left: 5%;" @click.prevent="removeDomain(domain)">删除</el-button>
           </div>
           </el-form-item>
           <el-form-item>
             <div @click="addDomain" style="height: 35px;line-height: 35px;text-align: center;width: 30%;border: 1px dashed #d6d6d6;margin-left: 9.5%;">
               +  添加
             </div>
           </el-form-item>
         </el-form>
        <div class="box-item">
          <div class="box-item-font">规则说明:</div>
          <div class="box-item-button">
            <!-- 需要上传图片的时候打开 -->
            <!-- :options="editorOption" -->
            <quill-editor :options="editorOption" ref="myTextEditor" v-model="content"  style="width: 49%;"></quill-editor>
          </div>
        </div>
      </div>
    </div>
    <br><br>
  </div>
</template>

<script>
  import { signAdd,getNowCycle } from '@/api/request'
  export default{
    data() {
      return {
        msg:['活动设置  /','优惠券管理 /','用券规则'],
        title:'配置用券规则',
        button:['提交','取消'],
        titPath:'couponRule',
        useParkings:'',
        editorOption: {
           placeholder: '编辑文章内容',
           modules:{
             toolbar:[
               [],
               [],
               [{'color':[]}]
             ]
           }
        },
        dynamicValidateForm: {
          domains: [{
            day: '',
            points:''
          }],
          points:'',
          day:''
        },
        timeZq:{},
        reward_points:'',
        sign_cycle_status:false,
        days:'',
        content:''

      }
    },
    watch:{
      sign_cycle_status:{
          handler(sign_cycle_status){
            this.days = ''
          },
          deep: true,
          immediate: true,
        },
        days:{
          handler(days){
            if(days !== ''){
              this.getNowZq()
            }
          },
          deep: true,
        }
    },
    methods: {
      getNowZq(){
        getNowCycle(this.days)
          .then(res =>{
              if(res.data.code == 200){
                this.timeZq = res.data.data
              }
          })
          .catch(err =>{
            this.timeZq = {}
            this.$notify.error({
            	title: '错误',
            	message: '请输入正整数!',
            	duration: 0
            });
          })
      },
      // 标题操作
        goPage(index){
          switch(index){
            case 1:
            this.$router.push('/actConfig/sign/signList')
            break;
          }
        },
        // 按钮操作
        goPages(index){
          switch (index){
            case 0:
            this.addData()
            break;
            case 1:
            this.$router.push('/actConfig/sign/signList')
            break;
          }
        },
        // 重置
        reload(){
          this.sign_cycle_status = false
          this.reward_points = ''
          this.days = ''
          this.content = ''
          this.dynamicValidateForm = {
            domains: [{
              day: '',
              points:''
            }],
            points:'',
            day:''
          }
        },
        // 添加
        addData(){

          let reward = []
          reward = this.dynamicValidateForm.domains
          let sign_cycle_status = ''
          let days = ''
          if(this.sign_cycle_status == false){
            sign_cycle_status = ''
          }else{
            sign_cycle_status = '1'
            days = this.days
          }
          signAdd(this.reward_points,sign_cycle_status,days,JSON.stringify(reward),this.content)
            .then(res => {
              if(res.data.code == 200){
                this.$message.success(res.data.msg,3);
                setTimeout(res=>{
                  this.$router.push('/actConfig/sign/signList')
                },1000)
              }else{
                this.$notify.error({
                	title: '错误',
                	message: res.data.msg,
                	duration: 0
                });
              }
            })
        },
         // 删除
        removeDomain(item) {
          if(this.dynamicValidateForm.domains.length == 1){
            this.$message.warning('不能再减了!',3);
          }else{
            var index = this.dynamicValidateForm.domains.indexOf(item)
            if (index !== -1) {
              this.dynamicValidateForm.domains.splice(index, 1)
            }
          }
        },
        // 添加
        addDomain() {
            this.dynamicValidateForm.domains.push({
              day: '',
              points:''
            });
          }
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
    width: 90%;
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
    width: 10%;
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
