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
        <div class="titinput-item">
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
      </div>
      <div class="titinput-item" style="margin-left:10%;">
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
          <el-input placeholder="请输入搜索车牌号" v-model="car_number"></el-input>
        </div>
      </div>
      <div class="titinput-item">
        <div class="titinput-item-left">订单号:</div>
        <div class="titinput-item-right">
          <el-input style="width: 100%;" placeholder="请输入搜索订单号" v-model="order_sn"></el-input>
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
          <span style="margin-left: 1%;">符合当前查询条件数据合计:{{total}}条</span>
          <span style="margin-left: 4%;">应收：{{total_money}}元</span>
          <span style="margin-left: 4%;">实收：{{final_money}}元</span>
          <span style="margin-left: 4%;">抵扣金额：{{discount_money}}元</span>
          <span style="margin-left: 4%;">抵扣时间：{{discount_hour}}小时</span>
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
                  <div class="tabTmp-item-child">进车时间：{{ props.row.in_time }}</div>
                  <div class="tabTmp-item-child">支付时间：{{ props.row.settlement_time }}</div>
                </div>
                <div class="tabTmp-item">
                  <div class="tabTmp-item-child">出车时间：{{ props.row.out_time }}</div>
                  <div class="tabTmp-item-child">支付方式：{{ props.row.settlement_type_text }}</div>
                </div>
                <div class="tabTmp-item">
                  <div class="tabTmp-item-child">停车时长：{{ props.row.total_time }}</div>
                  <div class="tabTmp-item-child">
                    支付账号：{{ props.row.user_phone }}
                  </div>
                </div>
               </div>
             </template>
           </el-table-column>
           <el-table-column
             label="车牌号"
             prop="car_number">
           </el-table-column>
           <el-table-column
             label="停车场"
             prop="park_name">
           </el-table-column>
           <el-table-column
             label="实收"
             prop="final_money">
           </el-table-column>
           <el-table-column
             label="应收"
             prop="total_money">
           </el-table-column>
           <el-table-column
             label="抵扣金额"
             prop="discount_money">
           </el-table-column>
           <el-table-column
             label="抵扣时间"
             prop="discount_hour">
           </el-table-column>
           <el-table-column
             label="总抵扣额价值"
             prop="total_discount_money">
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
  import { ltList,childParking } from '@/api/request'
  export default{
    data() {
      return {
        msg:['报表中心 /','收费报表 /','临停收费明细'],
        title:'临停收费明细',
        button:['下载当前报表'],
        titPath:'ltList',
        options:[],
        park_id:'',
        car_number:'',
        order_sn:'',
        start_date:'',
        end_date:'',
        total_money:'',
        final_money:'',
        discount_money:'',
        discount_hour: '',
        total_hour:'',
        tableData:[],
        tabloading:false,
        // 分页相关
        currentPage:1,
        pageSize:10,
        total:1
      }
    },
    watch:{
      currentPage:{
          handler(currentPage){
            console.log(this.pageSize)
            this.getTabData(this.start_date,this.end_date,this.park_id,this.car_number,this.order_sn,this.currentPage,this.pageSize)
          },
          deep: true,
          immediate: true,
        },
    },
    methods:{
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
      //  临停收费明细列表
      getTabData(start_date,end_date,park_id,car_number,order_sn,currentPage,pageSize){
        this.tabloading = true
        let tstart_date = start_date;
        let tend_date = end_date;
        let tpark_id = park_id;
        let tcar_number = car_number;
        let torder_sn = order_sn;
        let tcurrentPage = currentPage;
        let tpageSize = pageSize

        ltList(tstart_date,tend_date,tpark_id,tcar_number,torder_sn,tcurrentPage,tpageSize)
          .then(res => {
            if(res.data.code == 200){
              let data = res.data.data
              this.total = data.total
              this.total_money = data.total_money
              this.final_money = data.final_money
              this.discount_money = data.discount_money
              this.total_hour = data.total_hour
              this.tableData = data.data
              this.discount_hour = data.discount_hour
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
      // lookDetail(){
      //   this.$router.push('/userCenter/VipCars/vipCarsAdd')
      // },
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
    display: flex;
    margin-left: 1%;
    width: 20%;
  }
  .titinput-item-left{
   margin-right: auto;
    text-align: right;
    margin-left: 1%;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .titinput-item-right{
    margin-left: auto;
    margin-left: 2%;
  }
  .titinput-item:nth-child(5){
      margin-left: 15%;
  }
  .titinput-item-select{
    height: 40px;
    line-height: 40px;
    background-color: rgb(24,144,255);
    color: #fff;
    text-align: center;
    border: 1px solid #d6d6d6;
    border-radius: 4px;
    margin-top: 6%;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 5%;
    padding-right: 5%;
  }
  .titinput-item-cz{
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    text-align: center;
    border: 1px solid #d6d6d6;
     border-radius: 4px;
     margin-top: 6%;
     margin-left: 5%;
     white-space: normal;
     overflow: hidden;
     text-overflow: ellipsis;
     padding-left: 5%;
     padding-right: 5%;
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
