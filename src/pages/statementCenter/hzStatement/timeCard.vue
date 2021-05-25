<template>
  <div>
    <Naving />
    <Title :titPath='titPath' :msg='msg' :title='title' :button='button' />
    <r-c style="margin-top: 1%;"></r-c>
    <div class="titinput">
      <div class="titinput-item">
        <div class="titinput-item-left">获卡人电话:</div>
        <div class="titinput-item-right">
          <el-input placeholder="请输入电话号码" v-model="phone"></el-input>
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
        <div class="titinput-item-left">获卡方式:</div>
        <div class="titinput-item-right">
        <el-select v-model="channel" placeholder="中奖/购卡">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="titinput-item">
        <div class="titinput-item-left">激活过期时间:</div>
        <div class="titinput-item-right">
         <el-date-picker
             format="yyyy-MM-dd"
             value-format="yyyy-MM-dd"
               v-model="start_date"
               type="date"
               placeholder="选择日期">
             </el-date-picker>
             <span>~</span>
             <el-date-picker
                 format="yyyy-MM-dd"
                 value-format="yyyy-MM-dd"
                   v-model="end_date"
                   type="date"
                   placeholder="选择日期">
                 </el-date-picker>
        </div>
      </div>
      <div class="titinput-item">
        <div class="titinput-item-select" @click="search">查 询</div>
        <div class="titinput-item-cz" @click="reload">重 置</div>
      </div>
    </div>
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
        :header-cell-style="{background:'rgb(250,250,250)',color:'#606266'}"
           :data="tableData"
           style="width: 95%;;margin: 0 auto;"
           :default-sort = "{prop: 'date', order: 'descending'}"
           >
           <el-table-column label="获卡方式">
             <template slot-scope="scope">
               <div>
                 <span v-if="scope.row.channel == 1">用户购买</span>
                 <span v-if="scope.row.channel == 2">系统发放</span>
                 <span v-if="scope.row.channel == 3">抽奖所得</span>
                 <span v-if="scope.row.channel == 4">他人购买</span>
                 <span v-if="scope.row.channel == 5">其他</span>
                 <span v-if="scope.row.channel == 6">抽奖未激活</span>
               </div>
             </template>
           </el-table-column>
           <el-table-column
             prop="phone"
             label="获卡人"
             >
           </el-table-column>
           <el-table-column
             prop="card_base_name"
             label="类型">
           </el-table-column>
           <el-table-column
             prop="card_num"
             label="数量"
             >
           </el-table-column>

           <el-table-column
             prop="lottery_user_id"
             label="激活状态"
             >
           </el-table-column>
           <el-table-column
             prop="tab6"
             label="激活过期时间"
             >
           </el-table-column>
           <el-table-column
             prop="car_number"
             label="绑定车辆"
             >
           </el-table-column>
           <el-table-column
             prop="park_name"
             label="关联停车场"
             >
           </el-table-column>
           <el-table-column
             prop="after_time"
             label="包时卡过期时间"
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
  import { childParking,cardStatisticsList } from '@/api/request'
  export default{
    data() {
      return {
        currentPage:1,
        msg:['报表中心 /','汇总报表 /','包时卡统计报表'],
        title:'包时卡统计报表',
        button:['下载当前报表'],
        titPath:'timeCard',
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
        options2:[
          {
            value:1,
            label:'用户购买'
          },
          {
            value:2,
            label:'系统发放'
          },
          {
            value:3,
            label:'抽奖所得'
          },
          {
            value:4,
            label:'他人购买'
          },
          {
            value:5,
            label:'其他'
          },
          {
            value:6,
            label:'抽奖未激活'
          }
        ],
        phone:'',
        park_id:'',
        channel:'',
        start_date:'',
        end_date:'',
        tabloading:false,
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
             this.dataInfo(this.phone,this.park_id,this.channel,this.start_date,this.end_date,this.currentPage,this.pageSize)
          },
          deep: true,
          immediate: true,
        },
    },
    methods:{
      // 重置
       reload(){
        this.phone = ''
        this.park_id = ''
        this.channel = ''
        this.start_date = ''
        this.end_date = ''
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
      dataInfo(phone,park_id,channel,start_date,end_date,currentPage,pageSize){
         this.tabloading = true
         let tphone = phone;
         let tpark_id = park_id;
         let tchannel = channel;
         let tstart_date = start_date;
         let tend_date = end_date;
         let tcurrentPage = currentPage;
         let tpageSize = pageSize
         cardStatisticsList(tphone,tpark_id,tchannel,tstart_date,tend_date,tcurrentPage,tpageSize)
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
    margin-left: 3%;
  }
  .titinput-item-left{
    margin-right: auto;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .titinput-item-right{
    margin-left: auto;
    display: flex;
    width: 65%;
  }
  .titinput-item:nth-child(5){
      margin-left: 5%;
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
