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
          <div class="box-item-font">*用户姓名:</div>
          <div class="box-item-button"><el-input v-model="nikename" placeholder="给目标起个名字"></el-input></div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*手机号:</div>
          <div class="box-item-button"><el-input v-model="admin_name" placeholder="手机号用作登录使用"></el-input></div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*用户角色:</div>
          <div class="box-item-button">
              <el-select v-model="group_id" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id">
                  </el-option>
                </el-select>
          </div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*输入密码:</div>
          <div class="box-item-button"><el-input v-model="admin_pwd" placeholder="手机号用作登录使用"></el-input></div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*确认密码:</div>
          <div class="box-item-button"><el-input v-model="repassword" placeholder="手机号用作登录使用"></el-input></div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*可管理停车场（多选）:</div>
          <div class="box-item-button">
             <el-select style="width: 100%;" v-model="park_ids" multiple placeholder="请选择">
                <el-option
                  v-for="item in options2"
                  :key="item.park_id"
                  :label="item.park_name"
                  :value="item.park_id"
                  >
                </el-option>
             </el-select>
          </div>
          <div>
            <el-button type="primary" style="margin-left: 20%;" @click="selectAll">全部</el-button>
          </div>
        </div>
      </div>
    </div>
    <br><br>
  </div>
</template>

<script>
  import { jcconfigOfficeEdit,childJcconfigGroupList,childParking } from '@/api/request'
  export default{
    data() {
      return {
        msg:['基础设置  /','职员管理    /','添加职员'],
        title:'添加职员',
        button:['提交','取消'],
        titPath:'officeListUpdate',
        options:[],
        options2:[],
        nikename:'',
        admin_name:'',
        admin_pwd:'',
        repassword:'',
        group_id:'',
        park_ids:[],
        id:0,
        is_edit:0

      }
    },
    props:{
      data: {
         type: String
      }
    },
    // watch:{
    //   park_ids:{
    //     handler(park_ids){
    //       if(park_ids.indexOf("all") !== -1){
    //         let arr = []
    //         for(let i = 0;i<this.options2.length;i++){
    //           arr.push(this.options2[i].park_id)
    //         }
    //         park_ids = arr
    //         console.log(park_ids)
    //       }else{
    //         console.log(park_ids)
    //       }
    //     },
    //     deep:true,
    //     immediate:true
    //   }
    // },
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
          this.$router.push('/jcconfig/officeList');
        }
      },
      // 按钮操作
      goPages(index){
        switch (index){
          case 0:
          this.changeData()
          break;
          case 1:
          this.$router.push('/jcconfig/officeList');
          break;
        }
      },
      // 职务列表
      getOptions(){
        childJcconfigGroupList()
          .then(res => {
             if(res.data.code == 200){
                this.options = res.data.data
             }else{
               this.$message.warning(res.data.msg,3);
             }
          })
      },
      // 停车场列表
      getOptions2(){
        childParking()
          .then(res => {
             if(res.data.code == 200){
                this.options2 = res.data.data
             }else{
               this.$message.warning(res.data.msg,3);
             }
          })
      },
      // 看是新增还是修改
      async lookStatus(){
        await this.getOptions2()
        if(this.$route.query.id == undefined){
          this.admin_name = ''
          this.admin_pwd = ''
          this.repassword = ''
          this.nikename = ''
          this.id = ''
          this.group_id = ''
          this.repassword = ''
          this.admin_pwd = ''
          this.park_ids = []
          // 新增
          this.is_edit = 0
        }else{
          console.log()
          // 修改
          this.is_edit = 1
          this.admin_name = this.$route.query.admin_name
          this.admin_pwd = this.$route.query.admin_pwd
          this.repassword = this.$route.query.repassword
          this.nikename = this.$route.query.nikename
          this.park_ids = JSON.parse(this.$route.query.park_ids)

          console.log(typeof(this.park_ids))
          this.id = this.$route.query.id
          this.group_id = Number(this.$route.query.group_id)
        }
      },
      // 添加/修改
      changeData(){

        let bl = this.park_ids.indexOf("all")
        let arr = []
        if(bl !== -1){
          for(let i = 0;i<this.options2.length;i++) {
            if(this.options2[i].park_id !== "all") {
             arr.push(this.options2[i].park_id)
            }
          }
        }else{
          arr = this.park_ids
        }
        var park_ids = JSON.stringify(arr)
        if(this.group_id == '' || this.admin_name == '' || this.nikename == '' || this.park_ids == ''){
           this.$message.warning('请将表单填写完整',3);
        }else{
          if((this.admin_pwd !== '' && this.repassword == '') || (this.admin_pwd == '' && this.repassword !== '')){
            this.$message.warning('请确认密码!',3);
          }else{
            jcconfigOfficeEdit(this.group_id,this.admin_name,this.admin_pwd,this.repassword,this.nikename,this.is_edit,park_ids,this.id)
              .then(res => {
                if(res.data.code == 200){
                    this.$message.success(res.data.msg,3);
                    setTimeout(res=>{
                      this.$router.push('/jcconfig/officeList')
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
      this.getOptions()
      this.lookStatus()
    }
  }
</script>

<style scoped>
  .center{
    width: 80%;
    height: 700px;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 2%;
  }
  .box{
    width: 50%;
    height: 600px;
    margin: 0 auto;
    padding-top: 2%;
  }
  .box-item{
    display: flex;
    height: 40px;
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
