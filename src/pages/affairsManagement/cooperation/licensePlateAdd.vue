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
        <div class="box-item">
          <div class="box-item-left">
            *合作泊车企业:
          </div>
          <div class="box-item-right">
            <el-select class="elinput" v-model="company_id" placeholder="选择合作泊车企业">
                <el-option
                  v-for="item in options"
                  :key="item.company_id"
                  :label="item.company_name"
                  :value="item.company_id">
                </el-option>
              </el-select>
          </div>
        </div>
        <div class="box-item">
          <div class="box-item-left">
            *车牌号:
          </div>
          <div class="box-item-right" style="display: flex;">
            <el-select style="width: 15%;" v-model="car_numbertitle" placeholder="选择">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <div style="line-height: 40px;margin-left: 1%;margin-right: 1%;">--</div>
              <div><el-input class="elinput" v-model="car_numberbody" placeholder="输入车牌号"></el-input></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getCompanyList,licensePlateListEdit } from '@/api/request'
  import { getcarNum } from '@/api/carNum'
  export default{
    data() {
      return {
        msg:['车场事务管理  /','合作泊车管理 /','添加合作泊车车牌'],
        title:'添加合作泊车车牌',
        button:['提 交','取消'],
        titPath:'licensePlateAdd',
        options:[],
        options2:[],
        company_id:'',
        car_number:'',
        car_numbertitle:'',
        car_numberbody:'',
        car_id:'',
        is_edit:0
      }
    },
    methods:{
      // 标题操作
      goPage(index){
        switch(index){
          case 1:
          this.$router.push('/affairsManagement/cooperation/licensePlateList');
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
          this.$router.push('/affairsManagement/cooperation/licensePlateList');
          break;
        }
      },
      // 修改/添加
      changeData(){
        if(this.company_id == '' || this.car_numbertitle == '' || this.car_numberbody == ''){
          this.$message.warning('请将表单填写完整',3);
        }else{
          let params = {
            company_id:this.company_id,
            car_number:this.car_numbertitle + this.car_numberbody,
            car_id:this.car_id,
            token:sessionStorage.getItem('token')
          }
          licensePlateListEdit(params)
            .then( res=> {
              if(res.data.code == 200){
                 this.$message.success(res.data.msg,3);
                   setTimeout(res=>{
                     this.$router.push('/affairsManagement/cooperation/licensePlateList');
                   },1000)
              }else{
                this.$message.warning(res.data.msg,3);
              }
            })
        }
      },
      // 看是新增还是修改
      lookStatus(){
          if(this.$route.query.company_id == undefined){
            this.car_number = ''
            this.company_id = ''
            this.car_numbertitle = ''
            this.car_numberbody = ''
            this.car_id = ''
            // 新增
            this.is_edit = 0
          }else{
           this.company_id = JSON.parse(this.$route.query.company_id)
           this.car_number = this.$route.query.car_number
           this.car_id = this.$route.query.car_id
           this.car_numbertitle = this.$route.query.car_number.substring(0,1)
           this.car_numberbody = this.$route.query.car_number.substring(1)
           // 修改
           this.is_edit = 1
          }
        },
      // 合作泊车企业
      getList(){
        getCompanyList()
          .then(res => {
            if(res.data.code == 200){
              this.options = res.data.data
            }else{
              this.$notify.error({
              	title: '错误',
              	message: res.data.msg,
              	duration: 0
              });
            }
          })
      }
    },
    created() {
      this.options2 = getcarNum()
      this.getList()
      this.lookStatus()
    }
  }
</script>

<style scoped>
  .center{
    width: 80%;
    background-color: #FFFFFF;
    height: 700px;
    margin: 0 auto;
    margin-top: 2%;
    padding-top: 2%;
  }
  .box{
    width: 50%;
    margin: 0 auto;
  }
  .box-item{
    display: flex;
    margin-top: 5%;
  }
  .box-item-left{
    width: 30%;
    height: 40px;
    line-height: 40px;
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
    width: 60%;
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
