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
              <span>~</span>
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
        <div class="titinput-item-select" @click="search">查 询</div>
        <div class="titinput-item-cz" @click="reload">重 置</div>
      </div>
    </div>
    <zx-c :chartsList1="chartsList1" :tableData="tableData" :chartsList2="chartsList2"></zx-c>
    <div class="center-mess-box">
      <div class="center-mess">
        <i class="el-icon-warning" style="color: #0E77D1;margin-left: 1%;"></i>
        <span style="margin-left: 1%;">符合当前查询条件数据总计:</span>
        <span style="margin-left: 0.5%;font-weight: bold;">{{total}}</span>
        <span>条</span>
      </div>
    </div>
    <div class="center-box">
      <el-table
        v-loading="tabloading"
        :header-cell-style="{textAlign: 'center',color:'#333'}"
          :data="tableData"
          border
          style="width: 80%;margin: 0 auto;">
          <el-table-column
            prop="park_name"
            label="所属停车场"
            width="">
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="日期"
            width="">
          </el-table-column>
            <el-table-column label="统计收入">
              <el-table-column
                prop="temporary"
                label="临停缴费"
                width="">
              </el-table-column>
              <el-table-column
                prop="member"
                label="会员缴费"
                width="">
              </el-table-column>
              <el-table-column
                prop="total_money"
                label="日合计"
                width="">
              </el-table-column>
            </el-table-column>
          </el-table-column>
          </el-table-column>
            <el-table-column label="车流统计">
              <el-table-column
                prop="in_car"
                label="入车"
                width="">
              </el-table-column>
              <el-table-column
                prop="out_car"
                label="出车"
                width="">
              </el-table-column>
              <el-table-column
                prop="release_car"
                label="抬杆放行"
                width="">
              </el-table-column>
            </el-table-column>
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
  import { childParkingList,getDay } from '@/api/request'
  export default{
    data() {
      return {
        msg:['报表中心 /','汇总报表 /','车场经营日报'],
        title:'车场经营日报',
        button:['下载当前报表'],
        titPath:'parkingsDay',
        chartsList1:{
          type:'1',
          chartsListTitle:'收入统计',
          legend:["临停","会员","日合计"]
        },
        chartsList2:{
          type:'2',
          chartsListTitle:'车流统计',
          legend:["入车","出车","抬杆方行"]
        },
        options:[],
        tableData:[],
        tabloading:false,
        start_date:'',
        end_date:'',
        park_id:'all',
        // 分页相关
        currentPage:1,
        pageSize:10,
        total:1,
      }
    },
    watch:{
      currentPage:{
          handler(currentPage){
             this.dataInfo(this.start_date,this.end_date,this.park_id,this.currentPage,this.pageSize)
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
       this.park_id = 'all'
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
      // 获取数据
     dataInfo(start_date,end_date,park_id,currentPage,pageSize){
       this.tableData = []
       this.tabloading = true
       // 获取时间
       if(start_date == '' && end_date == ''){
         var nowdate = new Date();
         // 前一周
         var oneweekdate = new Date(nowdate-7*24*3600*1000);
         var y = oneweekdate.getFullYear();
         var m = oneweekdate.getMonth()+1;
         m = m < 10 ? "0" + m : m;
         var d = oneweekdate.getDate();
         d = d < 10 ? "0" + d : d;
         var formatwdate = y+'-'+m+'-'+d;
         this.start_date = formatwdate
         start_date = formatwdate
         // 昨天
         var yesterday = new Date(nowdate-1*24*3600*1000);
         var y1 = yesterday.getFullYear();
         var m1 = yesterday.getMonth()+1;
         m1 = m1 < 10 ? "0" + m1 : m1;
         var d1 = yesterday.getDate();
         d1 = d1 < 10 ? "0" + d : d1;
         var onedate = y1+'-'+m1+'-'+d1;
         this.end_date = onedate
         end_date = onedate
       }
        let tstart_date = start_date;
        let tend_date = end_date;
        let tpark_id = park_id;
        let tcurrentPage = currentPage;
        let tpageSize = pageSize
        getDay(tstart_date,tend_date,tpark_id,tcurrentPage,tpageSize)
          .then(res => {
            if(res.data.code == 200){
              this.total = res.data.data.length
              this.tableData = res.data.data
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
        childParkingList()
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
    width: 30%;
    display: flex;
    margin-left: 5%;
  }
  .titinput-item-left{
     margin-right: auto;
  }
  .titinput-item-right{
    margin-left: auto;
    display: flex;
    width: 79%;
  }
  .titinput-item:nth-child(3){
      margin-left: 25%;
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
  }
  .center-mess-box{
    width: 90%;
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
</style>
