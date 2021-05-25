<template>
  <div style="background-color: rgb(240,242,245);">
    <Naving />
    <!-- 头部按钮 -->
    <div class="title">
        <div class="title-font">
          <div class="title-font-left">
            <div class="title-font-left-top">
              <div :class="index === (msg.length-1)?'last':''"  class="title-font-left-top-item" v-for="(item,index) in msg" :key="index" >
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
      <div class="centerbody">
        <div class="center-title">
          <div class="center-title-left">
            <div class="center-title-left-item">
              <div class="center-title-left-item-left">车牌号:</div>
              <div class="center-title-left-item-right"><el-input v-model="car_number" placeholder="请输入"></el-input></div>
            </div>
            <div class="center-title-left-item">
              <div class="center-title-left-item-left">车主手机号:</div>
              <div class="center-title-left-item-right"><el-input v-model="phone" placeholder="请输入"></el-input></div>
            </div>

          </div>
          <div class="center-title-right">
            <div class="center-title-right-item" @click="search">查询</div>
            <div class="center-title-right-item" @click="reload">重置</div>
          </div>
        </div>
        <div class="center-mess">
          <i class="el-icon-warning" style="color: #0E77D1;margin-left: 1%;"></i>
          <span style="margin-left: 1%;">符合当前查询条件数据总计:</span>
          <span style="margin-left: 0.5%;font-weight: bold;">{{total}}</span>
          <span>条</span>
        </div>
        <div class="center-tab">
          <el-table
          v-loading="tabloading"
          :header-cell-style="{background:'rgb(250,250,250)',color:'#606266'}"
             :data="tableData"
             style="width: 100%;height: 100%;min-height: 400px;"
             :default-sort = "{prop: 'date', order: 'descending'}"
             >
             <el-table-column
               prop="car_number"
               label="车牌号"
               >
             </el-table-column>
             <el-table-column
               label="认证状态"
               >
               label="当前关联微信昵称"
               >
               <template slot-scope="scope">
                <span v-if="scope.row.is_certification == 1">已认证</span>
                <span v-if="scope.row.is_certification == 2">未认证</span>
               </template>
             </el-table-column>
             <el-table-column
               prop="car_subdivision_type_text"
               label="车辆类型"
               >
             </el-table-column>
             <el-table-column
               label="当前关联微信昵称"
               >
               <template slot-scope="scope">
                 <div class="tabuserMess">
                  <div v-if="scope.row.head_img !== ''" class="tabuserMess-left">
                    <el-image
                        style="width: 100%; height: 100%;border-radius: 49px;"
                        :src="scope.row.head_img"
                        >
                      </el-image>
                  </div>
                  <div class="tabuserMess-right">{{scope.row.nikenamecar_user_name}}</div>
                 </div>
               </template>
             </el-table-column>
             <el-table-column
               prop="car_user_name"
               label="车主姓名"
               >
             </el-table-column>
             <el-table-column
               prop="car_user_phone"
               label="车辆关联手机号"
               >
             </el-table-column>
             <el-table-column
               label="操作"
               >
                <template slot-scope="scope">
                  <div class="tabopt">
                   <div @click="lookDetail(scope.row.car_id)">查看详情</div>
                   <div class="tabs"></div>
                   <div @click="updata(scope.row)">修改</div>
                  </div>
                </template>
             </el-table-column>
           </el-table>
        </div>
        <div class="pages">
           <el-pagination
                background
                @size-change="sizechange"
                @next-click="nextclick"
                @prev-click="prevclick"
                :current-page.sync = "currentPage"
                :page-sizes="[10, 20, 30]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
        </div>
      </div>
    </div>
    <br><br>
    <!-- 更改用户信息 -->
    <el-dialog title="车辆信息调整"
    :visible.sync="dialogUpdate"
    :close-on-click-modal="false"
    @close="close">
       <div class="center">
         <div class="box">
           <div class="box-item">
             <div class="box-item-left">车牌号:</div>
             <div class="box-item-right"><el-input v-model="fromcar_number" class="elinput" placeholder="请输入"></el-input></div>
           </div>
           <div class="box-item">
             <div class="box-item-left">手机号:</div>
             <div class="box-item-right"><el-input v-model="fromcar_user_phone" class="elinput" placeholder="请输入"></el-input></div>
           </div>
           <div class="box-item">
             <div class="box-item-left">车辆类型:</div>
             <div class="box-item-right">
              <el-select style="width: 80%;" v-model="fromcar_subdivision_type" placeholder="请选择">
                 <el-option
                   v-for="item in options1"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                 </el-option>
               </el-select>
             </div>
           </div>
         </div>
       </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdate = false">取 消</el-button>
        <el-button type="primary" v-loading="buttonLoad" @click="editSure">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 更改用户信息end -->

  </div>
</template>

<script>
  import { vipCarsList,childParkingList,vipCarsEdit } from '@/api/request'
  export default{
    data() {
      return {
        msg:['用户中心 /','用户车辆管理 /','车辆列表'],
        title:'车辆列表',
        button:['批量导出','+ 新建'],
        titPath:'vipCarsAdmin',
        dialogUpdate:false,
        parkingTab:['胜利南','胜利北','瑞家浆果','开关厂'],
        options:[],
        options1:[
          {
            label:'小型汽车',
            value:1
          },
          {
            label:'小型新能源汽车',
            value:2
          }
        ],
        car_number:'',
        phone:'',
        tabloading:false,
        buttonLoad:false,
        tableData:[],
        // 分页相关
        currentPage:1,
        pageSize:10,
        total:1,
        car_id:'',
        fromcar_number:'',
        fromcar_user_phone:'',
        fromcar_subdivision_type:''
      }
    },
    watch:{
      car_id:{
        handler(car_id){
          if(car_id !== ''){
            this.dialogUpdate = true
          }
        },
        deep: true,
        immediate: true,
      },
      currentPage:{
          handler(currentPage){
            this.getTabData(this.car_number,this.phone,this.currentPage,this.pageSize)
          },
          deep: true,
          immediate: true,
        },
    },
    methods:{
      goPages(index){
        switch(index){
          case 1:
          this.$router.push('/userCenter/VipCars/VipCarsdetail');
          break;
        }
      },
      // 获取停车场数据
      getParkList(){
        childParkingList()
          .then( res=> {
            if(res.data.code == 200){
              this.options = res.data.data
            }else{
              this.$message.warning(res.data.msg,3);
            }
          })
      },
      // 确定修改
      editSure(){
        if(this.fromcar_number == '' || this.fromcar_user_phone == '' || this.fromcar_subdivision_type == ''){
          this.$message.warning('请将表单填写完整!',3);
        }else{
          this.buttonLoad = true
          let params = {
            car_id:this.car_id,
            car_number:this.fromcar_number,
            car_user_phone:this.fromcar_user_phone,
            car_subdivision_type:this.fromcar_subdivision_type,
            token:sessionStorage.getItem('token')
          }
          vipCarsEdit(params)
            .then(res => {
              if(res.data.code == 200){
                this.$message.success(res.data.msg,3);
                this.reload()
                setTimeout(res => {
                  this.car_id = ''
                  this.fromcar_number = ''
                  this.fromcar_user_phone = ''
                  this.fromcar_subdivision_type = ''
                  this.buttonLoad = false
                  this.dialogUpdate = false
                },1000)
              }else{
                this.$message.warning(res.data.msg,3);
                this.buttonLoad = false
              }
            })
        }
      },
      close(){
        this.car_id = ''
        this.fromcar_number = ''
        this.fromcar_user_phone = ''
        this.fromcar_subdivision_type = ''
      },
      // 修改
      updata(item){
        this.car_id = item.car_id
        this.fromcar_number = item.car_number
        this.fromcar_user_phone = item.car_user_phone
        this.fromcar_subdivision_type = item.car_subdivision_type
      },
      // 重置
      reload(){
       this.car_number = ''
       this.phone = ''
       this.currentPage = 0
       this.currentPage = 1
       this.pageSize = 10
      },
      // 查询
      search(){
        this.currentPage = 0
        this.currentPage = 1
      },
      // 页数改变
      sizechange(val){
         this.pageSize = val
         this.currentPage = 0
         this.currentPage = 1
      },
      // 下一页
      nextclick(){
        this.currentPage ++
      },
      // 上一页
      prevclick(){
        this.currentPage --
      },
      //  车辆列表
      getTabData(car_number,phone,currentPage,pageSize){
        this.tabloading = true
        let tcar_number = car_number;
        let tphone = phone;
        let tcurrentPage = currentPage;
        let tpageSize = pageSize

        vipCarsList(tcar_number,tphone,tcurrentPage,tpageSize)
          .then(res => {
            if(res.data.code == 200){
              this.total = res.data.data.total
              this.tableData = res.data.data.data
              this.tabloading = false
            }else{
              this.$notify.error({
              	title: '错误',
              	message: res.data.msg,
              	duration: 0
              });
            }
          })
      },
      lookDetail(car_id){
        this.$router.push({
          name: 'vipCarsAdd',
          query: {
            car_id:car_id
          }
        })
      }
    },
    created() {
      this.getParkList()
    }
  }
</script>

<style scoped>
  .center{
    width: 90%;
    margin: 0 auto;
    background-color: #fff;
    margin-top: 2%;
    padding-top: 2%;
    padding-bottom: 2%;
  }
  .centerbody{
    width: 95%;
    margin: 0 auto;
  }
  .center-title{
    height: 100px;
    display: flex;
  }
  .center-title-left{
    width: 60%;
    display: flex;
  }
  .center-title-left-item{
    margin-left: 3.3%;
    display: flex;
  }
  .center-title-left-item-left{
    line-height: 40px;
    width: 40%;
  }
  .center-title-left-item-right{
    margin-left: 2%;
  }
  .center-title-right{
    width: 30%;
    margin-left: 10%;
    display: flex;
  }
  .center-title-right-item{
    background-color: rgb(24,144,255);
    width: 20%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: #fff;
    margin-left: 50%;
    border-radius: 8px;
  }
  .center-title-right-item:nth-child(2){
    color: #333;
     background-color: #FFFFFF;
     border: 1px solid #d6d6d6;
     margin-left: 5%;
  }
  .center-mess{
    width: 100%;
    height: 50px;
    border-radius: 4px;
    line-height: 50px;
    background-color: rgba(230, 247, 255, 1);
    border: 1px solid rgba(186, 231, 255, 1);
  }
  .center-tab{
    width: 100%;
    margin-top: 1%;
    padding-bottom: 2%;
  }
  .pages{
    margin-left:55%;
    margin-top: 1%;
  }
  .tabopt{
    display: flex;
    width: 100%;
    height: 100%;
    color: #1890FF;
  }
  .tabs{
    width: 1px;
    background-color: #1890FF;
    margin-left: 5%;
    margin-right: 5%;
  }
  .tabuserMess{
    display: flex;
  }
  .tabuserMess-left{
    height: 40px;
    width: 40px;
    border-radius: 49px;
    background-color: rgb(117,128,139);
  }
  .tabuserMess-right{
    line-height: 40px;
    margin-left: 5%;
  }
  .center{
    margin: 0 auto;
    background-color: #fff;
    margin-top: 2%;
    padding-bottom: 2%;
    padding-top: 1%;
    border-top:1px solid #d6d6d6;
  }
  .box{
    margin: 0 auto;
  }
  .box-item{
    height: 60px;
    line-height: 60px;
    display: flex;
    margin-top: 1%;
  }
  .box-item-left{
    width: 20%;
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
    width: 50%;
    background-color: rgb(250,250,250);
    padding-left: 5%;
    border-bottom: 1px solid #d6d6d6;
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
