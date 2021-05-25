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
          <el-form-item  label="*名称:">

            <el-input class="elinput" v-model="advTitle"  placeholder="给目标起个名字"></el-input>

          </el-form-item>
          <el-form-item  label="位置（单选）:">
           <el-select v-model="position"  class="elinput" placeholder="请选择">
               <el-option
                 v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value"
                 :disabled="item.disabled"
                 >
               </el-option>
             </el-select>
          </el-form-item>
          <el-form-item  label="*链接:">
            <el-input class="elinput" v-model="url" placeholder="给目标起个名字"></el-input>
          </el-form-item>
          <el-form-item  label="上传图片（单张）:">
            <div style="display: flex;">
              <div class="box-item-button" style="width: 20%;">
                <uploadImg :pic="pic" @filename="imageUrl($event)"></uploadImg>
              </div>
              <div class="box-item-button" style="width: 20%;">

              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import uploadImg from '../../components/uploadImg.vue'
  import { adverListEdit } from '@/api/request'
  export default {
    components: {
        uploadImg
      },
    data(){
      return {
        msg:['基础设置  /','广告管理 /','添加广告'],
        title:'添加广告',
        button:['提 交','取消'],
        titPath:'advertAdd',
        dialogVisible:false,
        options: [{
                  value: '首页',
                  label: '首页'
                }],
        is_edit:0,
        position:'',
        url:'',
        advTitle:'',
        pic:''
      }
    },
    methods:{
      // 标题操作
      goPage(index){
        switch(index){
          case 1:
          this.$router.push('/jcconfig/advertList');
        }
      },
      // 按钮操作
      goPages(index){
        switch (index){
          case 0:
          this.changeData()
          break;
          case 1:
          this.$router.push('/jcconfig/advertList');
          break;
        }
      },
      // 获取上传后的图片路径
      imageUrl(val){
        this.pic = val.imageUrl
        this.picLook = val.filename
      },
      // 看是新增还是修改
      lookStatus(){
        if(this.$route.query.id == undefined){
          this.position = ''
          this.url = ''
          this.advTitle = ''
          this.pic = ''
          // 新增
          this.is_edit = 0
        }else{
          // 修改
          this.is_edit = 1
          this.position = this.$route.query.position
          this.url = this.$route.query.url
          this.advTitle = this.$route.query.title
          this.pic = this.$route.query.pic
          this.id = this.$route.query.id
        }
      },
      // 添加/修改
      changeData(){
        if(this.position == '' || this.advTitle == ''){
          this.$message.warning('请将表单填写完整',3);
        }else{
          if(this.picLook == '' && this.picLook == null && typeof(this.picLook) == 'undefind'){
            this.$message.warning('请等待图片上传完成!',3);
          }else{
            adverListEdit(this.id,this.pic,this.position,this.url,this.title)
              .then(res => {
                if(res.data.code == 200){
                    this.$message.success(res.data.msg,3);
                    setTimeout(res=>{
                      this.$router.push('/jcconfig/advertList');
                    },1000)
                }else{
                  this.$message.warning(res.data.msg,3);
                }
              })
          }
        }
      }
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
