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
          <div class="box-item-font">*职务名称:</div>
          <div class="box-item-button"><el-input v-model="zwtitle" placeholder="给目标起个名字"></el-input></div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*描述:</div>
          <div class="box-item-button"><el-input v-model="description" placeholder="请输入"></el-input></div>
        </div>
        <div v-if="status == 1" class="box-item">
        <!-- 权限树 -->
        <div class="box-item-font">*权限设置:</div>
          <div class="quanxian">
            <el-tree
              ref="tree"
              :data="qxdata"
              default-expand-all
              show-checkbox
              node-key="id"
              :default-checked-keys="defaultSelect"
              :props="defaultProps">
            </el-tree>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import { jcconfigGroupListEdit,getPowerList } from '@/api/request'
  export default{
    data() {
      return {
        msg:['基础设置  /','职员管理    /','添加职员'],
        title:'添加职员',
        button:['提交','取消'],
        titPath:'parkingList',
        zwtitle:'',
        description:'',
        status:'1',
        id:'',
        is_edit:0,
        checkList:[],
        qxdata: [],
        defaultProps: {
          children: 'sub',
          label: 'title'
        },
        defaultSelect:[]
      }
    },
    methods:{
      // 权限
      getQxList(){
        getPowerList()
          .then(res => {
            if(res.data.code == 200){
              this.qxdata = res.data.data
            }
          })
      },
      // 标题操作
      goPage(index){
        switch(index){
          case 1:
          this.$router.push('/jcconfig/posList');
        }
      },
      // 按钮操作
      goPages(index){
        switch (index){
          case 0:
          this.changeData()
          break;
          case 1:
          this.$router.push('/jcconfig/posList');
          break;
        }
      },
      // 看是新增还是修改
      lookStatus(){
        if(this.$route.query.id == undefined){
          this.zwtitle = ''
          this.description = ''
          this.status = '1'
          // 新增
          this.is_edit = 0
        }else{
          // 修改
          this.is_edit = 1
          this.zwtitle = this.$route.query.title
          this.id = this.$route.query.id
          this.description = this.$route.query.description
          this.defaultSelect = this.$route.query.rules.split(",")
        }
      },
      // 添加/修改
      changeData(){
        let res = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
        if(this.zwtitle == '' || this.status == '' || this.description == ''){
          this.$message.warning('请将表单填写完整',3);
        }else{
          if(res.length == 0){
           this.$message.warning('请选择菜单',3);
          }else{
            let arr = res.toString();
            jcconfigGroupListEdit(this.zwtitle,'1',this.description,arr,this.is_edit,this.id)
              .then(res => {
                if(res.data.code == 200){
                    this.$message.success(res.data.msg,3);

                    setTimeout(res=>{
                      this.$router.push('/jcconfig/posList');
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
      this.getQxList()
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
    width: 50%;
    margin: 0 auto;
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
  .quanxian{
    width: 90%;
    margin-left: 2%;
  }
   /* 头部按钮end */
</style>
