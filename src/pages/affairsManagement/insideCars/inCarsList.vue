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
              <div class="center-title-left-item-left">车牌号码:</div>
              <div class="center-title-left-item-right"><el-input v-model="car_number" placeholder="请输入"></el-input></div>
            </div>
            <div class="center-title-left-item">
              <div class="center-title-left-item-left">车主姓名:</div>
              <div class="center-title-left-item-right"><el-input v-model="car_user_name" placeholder="请输入"></el-input></div>
            </div>
            <div class="center-title-left-item">
              <div class="center-title-left-item-left">手机号码:</div>
              <div class="center-title-left-item-right"><el-input v-model="car_user_phone" placeholder="请输入"></el-input></div>
            </div>
            <div class="center-title-left-item">
              <div class="center-title-left-item-left">状态:</div>
              <div class="center-title-left-item-right">
                <el-select v-model="internal_status" placeholder="请选择">
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
            </div>
            <!-- <div class="center-title-left-item">
              <div class="center-title-left-item-left">停车场:</div>
              <div class="center-title-left-item-right">
                <el-select v-model="park_ids" placeholder="请选择">
                    <el-option
                      v-for="item in options2"
                      :key="item.park_id"
                      :label="item.park_name"
                      :value="item.park_id">
                    </el-option>
                  </el-select>
                </div>
            </div> -->
            <div class="center-title-left-item">
              <div class="center-title-left-item-left">类型:</div>
              <div class="center-title-left-item-right">
                <el-select v-model="internal_type" placeholder="请选择">
                    <el-option
                      v-for="item in options3"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
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
               prop="car_user_name"
               label="车主名"
               >
             </el-table-column>
             <el-table-column
               prop="car_user_phone"
               label="手机号"
               >

             </el-table-column>
             <el-table-column
               prop="internal_type_text"
               label="类型"
              >
             </el-table-column>
             <el-table-column
               label="车牌">
               <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">
                    <el-tag v-for="(item,index) in scope.row.car_number_arr" :key="index" size="medium" >
                       {{item}}
                    </el-tag>
                  </div>
                </template>
             </el-table-column>
             <el-table-column
               label="本规则使用中的停车场">
               <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">
                    <el-tag v-for="(item,index) in scope.row.park_name" :key="index" size="medium" >
                       {{item}}
                    </el-tag>
                  </div>
                </template>
             </el-table-column>
             <el-table-column
               label="状态"
              >
              <template slot-scope="scope">
                <div>
                 <span v-if="scope.row.internal_status == '1'">使用中</span>
                 <span v-if="scope.row.internal_status == '2'">已暂停</span>
                 <span v-if="scope.row.internal_status == '3'">已过期</span>
                </div>
              </template>
             </el-table-column>
             <el-table-column
               label="到期时间"
              >
              <template slot-scope="scope">
                <div>
                 <span v-if="scope.row.internal_effective_end_date == '0000-00-00'">长期</span>
                 <span v-else>{{ scope.row.internal_effective_end_date }}</span>
                </div>
              </template>
             </el-table-column>
             <el-table-column
               prop="parkingOpt"
               label="操作"
               >
                <template slot-scope="scope">
                  <div class="tabopt">
                    <a-popconfirm
                        title="确定修改吗?"
                        ok-text="确定"
                        cancel-text="取消"
                        @confirm="changeStatus(scope.row.internal_id)"
                      >
                    <div>
                      {{ scope.row.internal_status == '1' ? '停用' : '启用'}}
                    </div>
                    </a-popconfirm>
                    <div class="tabs"></div>
                   <div @click="update(scope.row)">修改</div>
                   <div class="tabs"></div>
                   <a-popconfirm
                       title="确定删除吗?"
                       ok-text="确定"
                       cancel-text="取消"
                       @confirm="deleteData(scope.row.internal_id)"
                     >
                   <div>删除</div>
                   </a-popconfirm>
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
  </div>
</template>

<script>
  import { inCarsList,childParking,internalDelete,InternalEditStatus } from '@/api/request'
  export default{
    data() {
      return {
        msg:['车场事务管理  /','内部车管理 /','内部车列表'],
        title:'内部车列表',
        button:['批量导入内部车','下载模板','批量导出','+ 新建'],
        titPath:'inCarsList',
        options1:[
          {
            label:'已开启',
            value:'1'
          },
          {
            label:'未开启',
            value:'2'
          },
          {
            label:'已过期',
            value:'3'
          }
        ],
        options2:[],
        options3:[
          {
            label:'员工',
            value:'1'
          },
          {
            label:'合作伙伴',
            value:'2'
          },
          {
            label:'访客',
            value:'3'
          }
        ],
        car_number:'',
        car_user_name:'',
        car_user_phone:'',
        internal_status:'',
        park_ids:'',
        internal_type:'',
        tabloading:false,
        tableData:[],
        // 分页相关
        currentPage:1,
        pageSize:10,
        total:1
      }
    },
    watch:{
      currentPage:{
          handler(currentPage){
             this.getTabData(this.car_number,this.car_user_name,this.car_user_phone,this.internal_status,this.park_ids,this.internal_type,this.currentPage,this.pageSize)
          },
          deep: true,
          immediate: true,
        },
    },
    methods:{
      changeStatus(id){
        InternalEditStatus(id)
          .then(res =>{
            if(res.data.code == 200){
              this.getTabData(this.car_number,this.car_user_name,this.car_user_phone,this.internal_status,this.park_ids,this.internal_type,this.currentPage,this.pageSize)
            }else{
              this.$message.warning(res.data.msg,3);
            }
          })
      },
      deleteData(id){
        internalDelete(id)
          .then(res =>{
            if(res.data.code == 200){
              this.getTabData(this.car_number,this.car_user_name,this.car_user_phone,this.internal_status,this.park_ids,this.internal_type,this.currentPage,this.pageSize)
            }else{
              this.$message.warning(res.data.msg,3);
            }
          })
      },
      // 按钮操作
      goPages(index){
        switch (index){
          case 3:
          this.$router.push('/affairsManagement/insideCars/inCarsAdd')
          break;
        }
      },
      // 前往修改页
      update(data){
        this.$router.push({
          name: 'inCarsAdd',
          query: {
           internal_id:data.internal_id,
           car_user_name:data.car_user_name,
           car_user_phone:data.car_user_phone,
           internal_type:String(data.internal_type),
           internal_effective_end_date:data.internal_effective_end_date,
           internal_effective_start_date:data.internal_effective_start_date,
           internal_is_long:data.internal_is_long,
           car_number_arr:data.car_number_arr,
           park_ids:JSON.stringify(data.park_ids),
           internal_status:String(data.internal_status)
          }
        });
      },
      // 获取停车场数据
      getParkList(){
        childParking()
          .then( res=> {
            if(res.data.code == 200){
              this.options2 = res.data.data
            }else{
              this.$message.warning(res.data.msg,3);
            }
          })
      },
      // 重置
      reload(){
       this.car_number = ''
       this.car_user_name = ''
       this.car_user_phone = ''
       this.internal_status = ''
       this.park_ids = ''
       this.internal_type = ''
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
      //  内部车列表
      getTabData(car_number,car_user_name,car_user_phone,internal_status,park_ids,internal_type,currentPage,pageSize){
        this.tabloading = true
        let tcar_number = car_number;
        let tcar_user_name = car_user_name;
        let tcar_user_phone = car_user_phone;
        let tinternal_status = internal_status;
        let tpark_ids = park_ids;
        let tinternal_type = internal_type;
        let tcurrentPage = currentPage;
        let tpageSize = pageSize

        inCarsList(tcar_number,tcar_user_name,tcar_user_phone,tinternal_status,tpark_ids,tinternal_type,tcurrentPage,tpageSize)
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
    flex-wrap: wrap;
  }
  .center-title-left-item{
    width: 30%;
    margin-left: 3%;
    margin-top: 3%;
    display: flex;
  }
  .center-title-left-item-left{
    line-height: 40px;
    height: 40px;
    width: 40%;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
  }
  .center-title-left-item-right{
    margin-left: 2%;
  }
  .center-title-right{
    width: 30%;
    margin-left: 10%;
    display: flex;
    margin-top: 4%;
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
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
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
    margin-top: 5%;
  }
  .center-tab{
    width: 100%;
    margin-top: 1%;
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
  .name-wrapper{
    display: flex;
    flex-wrap: wrap;
  }
  /deep/ .el-tag{
    margin-left: 5%;
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
