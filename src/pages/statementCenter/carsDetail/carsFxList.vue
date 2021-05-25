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
      <div class="titinput-item"></div>
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
       :header-cell-style="{background:'rgb(250,250,250)',color:'#606266'}"
          :data="tableData"
          v-loading="tabloading"
          style="width: 95%;margin: 0 auto;min-height: 400px;"
          :default-sort = "{prop: 'date', order: 'descending'}"
          >
          <el-table-column
            prop="nikename"
            label="操作人"
            >
          </el-table-column>
          <el-table-column
            prop="settlement_time"
            label="放行时间"
            >
          </el-table-column>
          <el-table-column
            prop="car_number"
            label="车牌号"
           >
          </el-table-column>
          <el-table-column
            prop="car_user_name"
            label="车主信息"
           >
          </el-table-column>
          <el-table-column
            prop="park_name"
            label="停车场"
           >
          </el-table-column>
          <el-table-column
            prop="in_time"
            label="入场时间"
           >
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
  import { childParking,carsFxList } from '@/api/request'
  export default{
    data() {
      return {
        msg:['报表中心 /','收费报表 /','在场车辆明细'],
        title:'在场车辆明细',
        button:['下载当前报表'],
        titPath:'carsZcList',
        tabloading:false,
        park_id:'',
        car_number:'',
        start_date:'',
        end_date:'',
        options:[],
        tableData:[],
        // 分页相关
        currentPage:1,
        pageSize:10,
        total:1,

      }
    },
    watch:{
      currentPage:{
          handler(currentPage){
             this.getTabData(this.start_date,this.end_date,this.park_id,this.car_number,this.currentPage,this.pageSize)
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
      getTabData(start_date,end_date,park_id,car_number,currentPage,pageSize){
        this.tabloading = true
        let tstart_date = start_date;
        let tend_date = end_date;
        let tpark_id = park_id;
        let tcar_number = car_number;
        let tcurrentPage = currentPage;
        let tpageSize = pageSize

        carsFxList(tstart_date,tend_date,tpark_id,tcar_number,tcurrentPage,tpageSize)
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
