<template>
  <div>
    <Naving />
    <Title :titPath='titPath' :msg='msg' :title='title' :button='button' />
    <div class="titinput">
      <div class="titinput-item">
        <div class="titinput-item-left">时间段:</div>
        <div class="titinput-item-right">
         <el-date-picker
             format="yyyy-MM-dd"
             value-format="yyyy-MM-dd"
               v-model="start_date"
               type="date"
               placeholder="请选择起始时间">
             </el-date-picker>
        </div>
      </div>
      <div class="titinput-item" style="margin-left:3.5%;">
        <div>~</div>
        <div>
          <el-date-picker
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
                v-model="end_date"
                type="date"
                placeholder="请选择结束时间">
              </el-date-picker>
        </div>
      </div>
      <div class="titinput-item">
        <div class="titinput-item-left">停车场:</div>
        <div class="titinput-item-right">
        <el-select v-model="park_id" placeholder="选择停车场">
            <el-option
              v-for="item in options"
              :key="item.park_id"
              :label="item.park_name"
              :value="item.park_id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="titinput-item">
        <div class="titinput-item-left">车牌号:</div>
        <div class="titinput-item-right">
          <el-input placeholder="请输入" v-model="car_number"></el-input>
        </div>
      </div>
      <div class="titinput-item">
        <div class="titinput-item-left">订单号:</div>
        <div class="titinput-item-right">
          <el-input style="width: 100%;" v-model="order_sn" placeholder="请输入"></el-input>
        </div>
      </div>
      <div class="titinput-item">
        <div class="titinput-item-select" @click="search">查 询</div>
        <div class="titinput-item-cz" @click="reload">重 置</div>
      </div>
    </div>
    <div style="background-color: #fff;width: 90%;margin: 0 auto;">
      <div class="center-mess-box">
        <div class="center-mess">
          <i class="el-icon-warning" style="color: #0E77D1;margin-left: 1%;"></i>
          <span style="margin-left: 1%;">符合当前查询条件数据总计:</span>
          <span style="margin-left: 0.5%;font-weight: bold;">{{total}}</span>
          <span>条</span>
        </div>
      </div>
    </div>

    <div class="center-box">
        <el-table
        v-loading="tabloading"
           :data="tableData"
          style="width: 95%;margin: 0 auto;min-height: 400px;">
           <el-table-column type="expand">
             <template slot-scope="props">
               <div class="tabTmp">
                <div class="tabTmp-item">
                  <div class="tabTmp-item-child">支付时间{{props.row.updated_at}}</div>
                  <div class="tabTmp-item-child">购卡数量：{{props.row.card_num}}</div>
                </div>
                <div class="tabTmp-item">
                  <div class="tabTmp-item-child">车辆归属：{{props.row.car_user_phone}}</div>
                  <div class="tabTmp-item-child">交易后包时卡到期时间：{{props.row.after_time}}</div>
                </div>
               </div>
             </template>
           </el-table-column>
           <el-table-column
             label="车牌号"
             prop="car_number">
           </el-table-column>
           <el-table-column
             label="消费人（手机号）"
             prop="pay_user_phone">
           </el-table-column>
           <el-table-column
             label="停车场"
             prop="park_name">
           </el-table-column>
           <el-table-column
             label="付费"
             prop="cost">
           </el-table-column>
           <el-table-column
             label="付费类型"
             prop="card_base_name">
           </el-table-column>
           <el-table-column
             label="订单编号"
             prop="order_sn">
           </el-table-column>
         </el-table>
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
</template>

<script>
  import { bkList,childParking } from '@/api/request'
  export default{
    data() {
      return {
        msg:['报表中心 /','收费报表 /','办卡收费明细'],
        title:'办卡收费明细',
        button:['下载当前报表'],
        titPath:'bkList',
        options:[],
        tabloading:false,
        tableData:[],
        start_date:'',
        end_date:'',
        park_id:'',
        car_number:'',
        order_sn:'',
        // 分页相关
        currentPage:1,
        pageSize:10,
        total:1
      }
    },
    watch:{
      currentPage:{
          handler(currentPage){
             this.getTabData(this.start_date,this.end_date,this.park_id,this.car_number,this.order_sn,this.currentPage,this.pageSize)
          },
          deep: true,
          immediate: true,
        },
    },
    methods:{
      // 重置
      reload(){
       this.start_date = ''
       this.end_date = ''
       this.park_id = ''
       this.car_number = ''
       this.order_sn = ''
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
      //   办卡收费明细明细列表
      getTabData(start_date,end_date,park_id,car_number,order_sn,currentPage,pageSize){
        this.tabloading = true
        let tstart_date = start_date;
        let tend_date = end_date;
        let tpark_id = park_id;
        let tcar_number = car_number;
        let torder_sn = order_sn;
        let tcurrentPage = currentPage;
        let tpageSize = pageSize

        bkList(tstart_date,tend_date,tpark_id,tcar_number,torder_sn,tcurrentPage,tpageSize)
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
      // 获取停车场数据
      getParkList(){
        childParking()
          .then( res=> {
            if(res.data.code == 200){
              this.options = res.data.data
            }else{
              this.$message.warning(res.data.msg,3);
            }
          })
      },
    },
    created() {
      this.getParkList()
    }
  }
</script>

<style scoped>
  .titinput{
    width: 90%;
    margin: 0 auto;
    margin-top: 1%;
    background-color: #fff;
    height: 80px;
    display: flex;
    line-height: 80px;
  }
  .titinput-item{
    width: 25%;
    display: flex;
    margin-left: 1%;
  }
  .titinput-item-left{
    width: 40%;
    text-align: right;
    margin-left: 1%;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .titinput-item-right{
    width: 69%;
  }
  .titinput-item:nth-child(6){
      margin-left: 20%;
  }
  .titinput-item-select{
    height: 40px;
    line-height: 40px;
    width: 30%;
    background-color: rgb(24,144,255);
    color: #fff;
    text-align: center;
    border: 1px solid #d6d6d6;
    border-radius: 4px;
    margin-top: 6%;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .titinput-item-cz{
    height: 40px;
    line-height: 40px;
    width: 30%;
    background-color: #fff;
    text-align: center;
    border: 1px solid #d6d6d6;
     border-radius: 4px;
     margin-top: 6%;
     margin-left: 5%;
     white-space: normal;
     overflow: hidden;
     text-overflow: ellipsis;
  }
  .center-mess-box{
    width: 100%;
    margin: 0 auto;
    background-color: #fff;
  }

  .center-mess{
    width: 95%;
    margin: 0 auto;
    height: 50px;
    border-radius: 4px;
    line-height: 50px;
    background-color: rgba(230, 247, 255, 1);
    border: 1px solid rgba(186, 231, 255, 1);
  }
  .center-box{
     width: 90%;
     margin: 0 auto;
     background-color: #fff;
     padding-top: 2%;
     padding-bottom: 5%;
  }
  .pages{
    margin-left:45%;
    margin-top: 3%;
  }
  .tabTmp{
    height: 150px;
    background-color: rgb(249,249,249);
    display: flex;
  }
  .tabTmp-item{
    width: 25%;
    margin-left: 3%;
  }
  .tabTmp-item-child{
    height: 75px;
    line-height: 75px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
