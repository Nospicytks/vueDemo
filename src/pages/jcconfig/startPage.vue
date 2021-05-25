<template>
  <div>
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
            <div :class="item === '取消'?'qx':''" @click="goPages(index)" v-for="(item,index) in button" :key="index" class="title-font-right-item">{{item}}</div>
          </div>
        </div>
      </div>
      <!-- 头部按钮end -->
    <div class="center">
      <div class="box">
        <el-form  ref="ruleForm" label-width="200px" style="margin-top: 15%;" >
          </el-form-item>
          <el-form-item  label="上传图片（单张）：">
          <div style="display: flex;">
            <uploadImgNew :pic="picture" @picArr="picArr" @fileList="fileList" @fileAdd="fileAdd"></uploadImgNew>
          </div>
            <!-- <div style="display: flex;">
              <div class="box-item-button" style="width: 20%;">
                <uploadImg :pic="pic1" @filename="filename1($event)"></uploadImg>
              </div>
              <div class="box-item-button" style="width: 20%;">
                <uploadImg :pic="pic2" @filename="filename2($event)"></uploadImg>
              </div>
            </div> -->
          </el-form-item>

         <!-- <el-form-item  label=":">
            <div>
              建议尺寸：？？*？？
            </div>
          </el-form-item> -->
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { startPageList,startPageEdit } from '@/api/request'
  import uploadImg from '../../components/uploadImg.vue'
  import uploadImgNew from '../../components/uploadImgNew.vue'
  export default {
    components: {
        uploadImg,
        uploadImgNew
      },
    data(){
      return {
        msg:['基础设置  /','启动页管理 /','启动页维护'],
        title:'启动页维护',
        button:['提 交'],
        titPath:'startPage',
        pic1:'',
        pic2:'',
        pic3:'',
        pic4:'',
        picList:[],
        picture:[],
        fileListArr:[],
      }
    },
    methods:{
      // 按钮操作
      goPages(index){
        switch (index){
          case 0:
          this.changeData()
          break;
        }
      },
      // 提交修改
      changeData(){
          let start_page_pic = []
          if(this.fileListArr.length == 0){
            start_page_pic = this.picture
          }else{
            for(let i = 0;i<this.fileListArr.length;i++){
              if(this.fileListArr[i].response){
                start_page_pic.push(this.fileListArr[i].response.url)
              }else{
                start_page_pic.push(this.fileListArr[i].url)
              }
            }
          }
          startPageEdit(JSON.stringify(start_page_pic))
            .then(res => {
              if(res.data.code == 200){
                this.$message.success(res.data.msg,3);
                this.pic1 = ''
                this.pic2 = ''
                this.pic3 = ''
                this.pic4 = ''
                this.getPagePath()
              }else{
                this.$notify.error({
                  title: '错误',
                  message: res.data.msg,
                  duration: 0
                });
              }
            })
      },
      // 获取上传后的图片路径
      filename1(val){
        this.pic1 = val.imageUrl
        this.pic3 = val.filename
      },
      filename2(val){
        this.pic2 = val.imageUrl
        this.pic4 = val.filename
      },
      getPagePath(){
        startPageList()
          .then(res => {
            if(res.data.code == 200){
              this.picture = []
              // this.pic1 = res.data.data[0]
              // this.pic2 = res.data.data[1]
              for(let i = 0;i<res.data.data.length;i++){
                this.picture.push({
                  url:res.data.data[i]
                })
              }
            }else{
              this.$notify.error({
                title: '错误',
                message: res.data.msg,
                duration: 0
              });
            }
          })
      },
      // 获取上传后的图片路径
      fileList(val){
        this.fileListArr = val
      },
      fileAdd(val){
        this.fileListArr = val
      },
      picArr(val){
        this.picList = val
      }
    },
    created() {
      this.getPagePath()
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
    height: 500px;
  }
  .box-item{
    height: 60px;
    line-height: 60px;
    margin-top: 3%;
  }
  .box-item-left{
    width: 19%;
    text-align: right;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .box-item-right{
    margin-left: 1%;
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
    width: 25%;
    background-color: rgb(250,250,250);
    padding-left: 5%;
    border-bottom: 1px solid #d6d6d6;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bm-view {
    width: 100%;
    height: 300px;
    margin-top: 2%;
  }
  /deep/ .anchorBL{
      display:none;
  }
  .diaselect{
    display: flex;
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
