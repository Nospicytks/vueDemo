<template>
  <div class="body">
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
            <div :class="item === '取消'?'qx':''" @click="goPage(1)" v-for="(item,index) in button" :key="index" class="title-font-right-item">{{item}}</div>
          </div>
        </div>
      </div>
      <!-- 头部按钮end -->
    <div class="center">
      <div class="center-fg"></div>
      <div class="center-box">
        <div class="center-box-title">
          <div class="center-box-title-img">
            <el-image
                style="width: 100%; height: 100%;"
                :src="head_img?head_img : headImg"
                >
              </el-image>
          </div>
          <div class="center-box-font">
            <span>手机号:</span>
            <span style="margin-left: 1%;">{{user_phone}}</span>
          </div>
        </div>
        <div class="center-box-list">
          <div class="center-box-list-item">
           <div class="center-box-list-item-child">用户昵称:{{nikename}}</div>
           <div class="center-box-list-item-child">首次会员注册时间:{{created_at}}</div>
          </div>
          <div class="center-box-list-item">
           <div class="center-box-list-item-child">会员类型:{{is_member_text}}</div>
           <div class="center-box-list-item-child">消费金额:{{consumption}}</div>
          </div>
          <div class="center-box-list-item">
           <div class="center-box-list-item-child">会员到期时间:{{member_end_time}}</div>
           <div class="center-box-list-item-child">联系电话:{{phone}}</div>
          </div>
        </div>
      </div>
      <div class="center-box-desc-title">反馈内容</div>
      <div class="center-box-desc">
        {{content}}
      </div>
    </div>
    <br><br>
  </div>
</template>

<script>
  import { opinionDetail } from '@/api/request'
  export default{
    data(){
      return {
        msg:['基础设置  /','联系我们 /','意见详情'],
        title:'意见详情',
        button:['返回列表'],
        titPath:'opinionDetail',
        headImg:require('@/assets/imgs/head.jpg'),
        pageLoading:false,
        head_img:'',
        user_phone:'',
        nikename:'',
        created_at:'',
        is_member_text:'',
        consumption:'',
        member_end_time:'',
        phone:'',
        content:''
      }
    },
    methods:{
     // 标题操作
     goPage(index){
       switch(index){
         case 1:
         this.$router.push('/jcconfig/opinionList');
       }
     },
     // 获取详情信息
     getMessages(){
       this.pageLoading = true
       opinionDetail(this.$route.query.id)
         .then(res => {
            if(res.data.code == 200){
               if(res.data.data.head_img){
                 this.head_img = this.$store.state.user.baseurl+res.data.data.head_img
               }
               this.user_phone = res.data.data.user_phone
               this.nikename = res.data.data.nikename
               this.created_at = res.data.data.created_at
               this.is_member_text = res.data.data.is_member_text
               this.consumption = res.data.data.consumption
               this.member_end_time = res.data.data.member_end_time
               this.phone = res.data.data.phone
               this.content = res.data.data.content

               this.pageLoading = false
            }else{
              this.$message.warning(res.data.msg,3);
            }
         })
     },
    },
    created() {
      this.getMessages()
    }
  }
</script>

<style scoped>
  .body{
    background-color: rgb(240,242,245);
  }
  .center{
    width: 90%;
    margin: 0 auto;
    height: 705px;
    background-color: #fff;
    margin-top: 2%;
    padding-top: 2%;
  }
  .center-fg{
    width: 95%;
    margin: 0 auto;
    border-bottom: 1px solid #d6d6d6;
    height: 20px;
  }
  .center-box{
     width: 95%;
     height: 180px;
     margin: 0 auto;
     border-bottom: 1px solid #d6d6d6;
  }
  .center-box-title{
    height: 50px;
    display: flex;
    line-height: 50px;
    margin-top: 3%;
  }
  .center-box-title-img{
    width: 50px;
    background: rgb(117,128,139);
    border-radius: 49px;
    margin-left: 1%;
  }
  .center-box-font{
     width: 95%;
     margin-left: 1%;
     font-weight: bold;
     font-size: 20px;
  }
  .center-box-list{
    width: 90%;
    margin: 0 auto;
    height: 80px;

    display: flex;
  }
  .center-box-list-item{
    width: 33%;
    margin-left: 3%;
  }
  .center-box-list-item-child{
    height: 40px;
    line-height: 40px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .center-box-desc-title{
    width: 85%;
    margin: 0 auto;
    height: 80px;
    line-height: 80px;
    font-weight: bold;
    font-size: 18px;
    border-bottom: 1px solid #d6d6d6;
  }
  .center-box-desc{
    width: 80%;
    margin: 0 auto;
    margin-top: 2%;
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
