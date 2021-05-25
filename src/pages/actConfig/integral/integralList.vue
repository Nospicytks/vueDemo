<template>
 <div>
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
              <div class="center-title-left-item-left">时间段:</div>
              <div class="center-title-left-item-right">
                <el-date-picker
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                      v-model="start_date"
                      type="date"
                      placeholder="请选择起始时间">
                    </el-date-picker>
              </div>
            </div>
            <div class="center-title-left-item">
              <div class="center-title-left-item-left">~</div>
              <div class="center-title-left-item-right">
                <el-date-picker
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                      v-model="end_date"
                      type="date"
                      placeholder="请选择结束时间">
                    </el-date-picker>
              </div>
            </div>
            <div class="center-title-left-item">
              <div class="center-title-left-item-left">兑换物:</div>
              <div class="center-title-left-item-right"><el-input v-model="exchange_name" placeholder="兑换物品名称"></el-input></div>
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
               prop="exchange_name"
               label="兑换活动名"
               >
             </el-table-column>
             <el-table-column
               prop="exchange_description"
               label="描述"
               >
             </el-table-column>
             <el-table-column
               prop="exchange_unit_points"
               label="兑换积分">
             </el-table-column>
             <el-table-column
               prop="exchange_max_num"
               label="总兑换数">
             </el-table-column>
             <el-table-column
               prop="exchange_once_num"
               label="兑换物单次可兑换的数量">
             </el-table-column>
             <el-table-column
               prop="exchange_start_date"
               label="兑换开始时间">
             </el-table-column>
             <el-table-column
               prop="exchange_end_date"
               label="兑换结束时间">
             </el-table-column>
             <el-table-column
               label="状态  "
               >
               <template slot-scope="scope">
                 <span v-if="scope.row.status == 1" style="color: #1890FF;">{{ scope.row.status_text }}</span>
                 <span v-if="scope.row.status == 2" style="color: red;">{{ scope.row.status_text }}</span>
               </template>
             </el-table-column>
             <el-table-column
               label="操作"
               >
                <template slot-scope="scope">
                  <div class="tabopt">
                      <!-- style="color: red;" -->
                      <a-popconfirm
                          :title="`确定${scope.row.status == 1 ? '下架' : '上架'}吗?`"
                          ok-text="确定"
                          cancel-text="取消"
                          @confirm="changeStatus(scope.row.exchange_id)"
                        >
                        <div  v-text="scope.row.status == 1?'下架':'上架'"
                        :style="{'color':scope.row.status == 1?'red':''}">
                        </div>
                      </a-popconfirm>
                   <div class="tabs"></div>
                   <div @click="update(scope.row)">修改</div>
                   <div class="tabs"></div>
                   <a-popconfirm
                       title="确定删除吗?"
                       ok-text="确定"
                       cancel-text="取消"
                       @confirm="deleteData(scope.row.exchange_id)"
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
  import { integralList,integralDelete,integralStatus } from '@/api/request'
  export default{
    data() {
      return {
        msg:['活动设置  /','积分管理 /','积分兑换列表'],
        title:'积分兑换列表',
        button:['添加积分兑换项'],
        titPath:'integralList',
        tableData:[],
        start_date:'',
        end_date:'',
        exchange_name:'',
        // 分页相关
        tabloading:false,
        currentPage:1,
        pageSize:10,
        total:1
      }
    },
    watch:{
      currentPage:{
          handler(currentPage){
            this.getTabData(this.start_date,this.end_date,this.exchange_name,this.currentPage,this.pageSize)
          },
          deep: true,
          immediate: true,
        },
    },
    methods:{
      // 按钮操作
      goPages(index){
        switch (index){
          case 0:
          this.$router.push('/actConfig/integral/integralAdd')
          break;
        }
      },
      // 前往修改页
      update(data){
        this.$router.push({
          name: 'integralAdd',
          query: {
           exchange_id:data.exchange_id,
           coupon_id:JSON.stringify(data.coupon_id),
           status:data.status,
           exchange_name:data.exchange_name,
           stock:data.stock,
           exchange_max_num:data.exchange_max_num,
           exchange_once_num:data.exchange_once_num,
           exchange_unit_points:data.exchange_unit_points,
           exchange_description:data.exchange_description,
           exchange_start_date:data.exchange_start_date,
           exchange_end_date:data.exchange_end_date
          }
        });
      },
      // 删除
      deleteData(exchange_id){
        let delId = exchange_id
        integralDelete(delId)
          .then(res => {
             if(res.data.code == 200){
                this.$message.success('删除成功！',3);
                this.getTabData(this.start_date,this.end_date,this.exchange_name,this.currentPage,this.pageSize)
             }else{
               this.$message.warning(res.data.msg,3);
               this.getTabData(this.start_date,this.end_date,this.exchange_name,this.currentPage,this.pageSize)
             }
          })
      },
      // 更改上下架状态
      changeStatus(exchange_id){
         let editId = exchange_id
        integralStatus(editId)
          .then(res => {
            if(res.data.code == 200){
               this.$message.success('更改成功!',3);
               this.getTabData(this.start_date,this.end_date,this.exchange_name,this.currentPage,this.pageSize)
            }else{
              this.$message.warning(res.data.msg,3);
              this.getTabData(this.start_date,this.end_date,this.exchange_name,this.currentPage,this.pageSize)
            }
          })
      },
      // 重置
      reload(){
        this.start_date = ''
        this.end_date = ''
        this.exchange_name = ''
        this.currentPage = 0
        this.currentPage = 1
        this.pageSize = 10
      },
      // 查询
      search(){
        if((this.start_date !== '' && (this.end_date == '' || this.end_date == null)) || (this.end_date !== '' && (this.start_date == '' || this.start_date == null))){
          this.$message.warning('请选择完整时间段',3);
          return false
        }else{
          this.currentPage = 0
          this.currentPage = 1
        }
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
      // 积分兑换列表
      getTabData(start_date,end_date,exchange_name,currentPage,pageSize){
        this.tabloading = true

        let tstart_date = start_date;
        let tend_date = end_date;
        let texchange_name = exchange_name;
        let tcurrentPage = currentPage;
        let tpageSize = pageSize

        integralList(tstart_date,tend_date,texchange_name,tcurrentPage,tpageSize)
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
      goDetail(){
        this.$router.push('/actConfig/lottery/winningRecord')
      }
    },
    created() {
      this.getTabData(this.start_date,this.end_date,this.exchange_name,this.currentPage,this.pageSize)
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
  .center-title-left-item:nth-child(2){
   margin-left: 0;
  }
  .center-title-left-item-left{
    line-height: 40px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: auto;
  }
  .center-title-left-item-right{
    margin-left: 2%;
    margin-left: auto;
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
