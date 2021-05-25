<template>
  <div>
    <div class="body">
      <!-- 左侧 -->
      <div class="body-left">
        <div class="body-left-title">
          <div class="body-left-a"><i class="el-icon-chat-dot-round"></i>系统通知</div>
          <!-- <div class="body-left-b">查看全部》</div> -->
        </div>
        <div class="noQX" v-if="TZlistLook == false">
          <img src="../../assets/imgs/noQX.jpg" alt="">
        </div>
        <div v-if="TZlistLook == true" v-for="(item,index) in TZlist" class="body-left-list-item">
          <div  class="list-title">
            <span style="color: #1890FF;">{{item.title}}</span>
          </div>
          <div class="list-center">
            <span style="color: red;">{{item.is_read == 1 ?'已读' : '未读'}}</span>
          </div>
          <div class="list-center">
            <span>{{item.type == 1 ? '反馈停车场：'+item.park_name : '合作企业：'+item.company_name}}</span>
          </div>
          <div  class="list-title">
            <span>预警时间：{{item.created_at}}</span>
          </div>
          <div class="list-center">
            <span>处理地址（点击跳转）：</span><span @click="goPath(item.url)" style="color: #1890FF;cursor: pointer;">{{item.url}}</span>
          </div>
        </div>
      </div>
      <!-- 左侧end -->
      <!-- 中间 -->
      <div class="body-center">
        <div class="body-center-title">
            车流量统计
        </div>
        <div class="noQX" style="height: 100%;" v-if="tableDataLook == false">
          <img src="../../assets/imgs/noQX.jpg" alt="">
        </div>
        <div v-if="tableDataLook == true">
        <s-c :in_count="in_count" :out_count="out_count" :in_chat="in_chat" :out_chat="out_chat"></s-c>
        <div class="body-center-tab">
           <el-table
           v-loading="tabloading"
           :header-cell-style="{background:'rgb(250,250,250)',color:'#606266'}"
              :data="tableData"
              style="width: 100%"
              :default-sort = "{prop: 'date', order: 'descending'}"
              >
              <el-table-column
                type="index"
                label="排名"
                >
              </el-table-column>
              <el-table-column
                label="停车场"
                >
                <template slot-scope="scope">
                  <div style="color: #1890FF;">{{ scope.row.park_name }}</div>
                 </template>
              </el-table-column>
              <el-table-column
                prop="num"
                label="服务车辆">
              </el-table-column>
              <el-table-column
                label="周涨幅"
                sortable>
                <template slot-scope="scope">
                  <div v-if="scope.row.week >= scope.row.last_week" style="color: #1890FF;">+ {{scope.row.week - scope.row.last_week}}</div>
                  <div v-else style="color: #1890FF;">{{ scope.row.last_week - scope.row.week }}</div>
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
                :page-sizes="[6, 4, 2]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
        </div>
        </div>
      </div>
      <!-- 中间end -->
      <!-- 右侧 -->
      <div class="body-center-right">
        <div class="noQX"  v-if="yesTodayLook == false">
          <img src="../../assets/imgs/noQX.jpg" alt="">
        </div>
        <div v-if="yesTodayLook == true" class="body-center-right-item">
            <div class="body-center-right-item-title">昨日收入金额</div>
            <div class="body-center-right-item-number">
            <span>{{yesToday.yesterday_total?yesToday.yesterday_total:'0'}}</span>
            </div>
            <div class="body-center-right-item-db">
              <span>较前天</span>
              <i :class="{'el-icon-caret-top':yesToday.type == 1,'el-icon-caret-bottom':yesToday.type == 2,'el-icon-d-caret':yesToday.type == 3}" :style="{'color':yesToday.type == 1?'rgba(82, 196, 26, 0.647058823529412)':'red'}"></i>
              <span style="margin-left: 10%;">{{yesToday.num}}元</span>
            </div>
            <div class="body-center-right-item-info">
              <div class="body-center-right-item-info-item">
                <span>临时停车</span>
                <span v-if="yesToday.temporary">¥ {{yesToday.temporary}}</span>
                <span>{{yesToday.temporary_percentage}}</span>
              </div>
              <div class="body-center-right-item-info-item">
                <span>会员办卡</span>
                <span v-if="yesToday.member">¥ {{yesToday.member}}</span>
                <span>{{yesToday.member_percentage}}</span>
              </div>
            </div>
        </div>
        <div class="noQX"  v-if="newUserLook == false">
          <img src="../../assets/imgs/noQX.jpg" alt="">
        </div>
        <div v-if="newUserLook == true" class="body-center-right-item">
            <div class="body-center-right-item-title">今日新增用户<i class="el-icon-warning-outline" style="margin-left: 60%;"></i></div>
            <div class="body-center-right-item-number">{{newUser.today}}</div>
            <div style="width: 100%;height: 100px;margin-top: -5%;" id="main1" ></div>
            <div class="body-center-right-item-desc"><span>月新增用户</span><span>{{newUser.month}}</span></div>
        </div>
        <div class="noQX"  v-if="cardUserLook == false">
          <img src="../../assets/imgs/noQX.jpg" alt="">
        </div>
        <div v-if="cardUserLook == true" class="body-center-right-item">
            <div class="body-center-right-item-title">开卡用户数<i class="el-icon-warning-outline" style="margin-left: 65%;"></i></div>
            <div class="body-center-right-item-number">{{cardUser.user_count}}</div>
            <div style="width: 100%;height: 100px;margin-top: -5%;" id="main2" ></div>
            <div class="body-center-right-item-desc"><span>转换率</span><span>{{cardUser.percentage}}</span></div>
        </div>
      </div>
       <!-- 右侧end -->
    </div>
  </div>
</template>

<script>
  import { sysMsg,trafficStatistics,yesterdayIncome,newUser,cardUser } from '@/api/request'
  import * as echarts from 'echarts';
  export default {
    data() {
      return {
        in_count:0,
        out_count:0,
        Echarts:null,
        TZlist:[],
        tableData: [],
        tabloading:false,
        // 分页相关
        currentPage:1,
        pageSize:6,
        total:1,
        in_chat:[],
        out_chat:[],
        yesToday:{},
        newUser:{},
        cardUser:{},
		TZlistLook:true,
		tableDataLook:true,
		yesTodayLook:true,
		newUserLook:true,
		cardUserLook:true
      }
    },
    watch:{
      currentPage:{
          handler(currentPage){
             this.getCarTab(this.currentPage,this.pageSize)
          },
          deep: true,
          immediate: true,
        },
      yesToday:{
        handler(yesToday){
          if(JSON.stringify(yesToday) !== '{}'){

          }
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      // 跳转链接
      goPath(url){
        this.$router.push(url)
      },
      // 获取用户信息
      getSysMsg(){
        sysMsg()
          .then( res=> {
            if(res.data.code == 200){
              this.TZlist = res.data.data
            }else if(res.data.code == 402){
                this.TZlistLook = false
            }else{
             this.$message.warning(res.data.msg,3);
            }
          })
      },
      // 今日新增用户
      getNewUser(){
        newUser()
          .then(res => {
            if(res.data.code == 200){
              this.newUser = res.data.data
            }else if(res.data.code == 402){
                this.newUserLook = false
            }else{
              this.$notify.error({
              	title: '错误',
              	message: res.data.msg,
              	duration: 0
              });
            }
          })
      },
      getCardUser(){
        cardUser()
          .then(res => {
            if(res.data.code == 200){
              this.cardUser = res.data.data
            }else if(res.data.code == 402){
                this.cardUserLook = false
            }else{
              this.$notify.error({
              	title: '错误',
              	message: res.data.msg,
              	duration: 0
              });
            }
          })
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
      // 获取车流量排行
      getCarTab(currentPage,pageSize){
        let tcurrentPage = currentPage;
        let tpageSize = pageSize
        trafficStatistics(tcurrentPage,tpageSize)
          .then(res => {
            if(res.data.code == 200){
              this.total = res.data.data.list.total
              this.tableData = res.data.data.list.data
              this.in_chat = res.data.data.in_chat
              this.out_chat = res.data.data.out_chat
              this.in_count = res.data.data.in_count
              this.out_count = res.data.data.out_count
              this.tabloading = false
            }else if(res.data.code == 402){
                this.tableDataLook = false
            }else{
              this.$notify.error({
              	title: '错误',
              	message: res.data.msg,
              	duration: 0
              });
            }

          })
      },
      getYesToday(){
        yesterdayIncome()
          .then(res => {
            if(res.data.code == 200){
              this.yesToday = res.data.data
            }else if(res.data.code == 402){
                this.yesTodayLook = false
            }else{
              this.$notify.error({
              	title: '错误',
              	message: res.data.msg,
              	duration: 0
              });
            }
          })
      },
      initEcharts1 () {
      	// 新建一个promise对象
      	let newPromise = new Promise((resolve) => {
      		resolve()
      	})
      	//然后异步执行echarts的初始化函数
      	newPromise.then(() => {
          var chartDom = document.getElementById('main1');
          var myChart = echarts.init(chartDom);
          var option;
      		option = {
      		    color: ['rgb(152,96,228)'],
      		    title: {
      		        text: ''
      		    },
      		    tooltip: {
      		        trigger: 'axis',
      		        axisPointer: {
      		            type: 'cross',
      		            label: {
      		                backgroundColor: 'rgb(152,96,228)'
      		            }
      		        }
      		    },
      		    legend: {
      		        data: []
      		    },
      		    toolbox: {
      		        feature: {

      		        }
      		    },
      		    grid: {
      		        containLabel: false
      		    },
      		    xAxis: [
      		        {
      		            type: 'category',
      		            boundaryGap: false,
      		            data: ['', '', '', '', '', '', ''],
                      axisTick: {
                        show: false
                      }
      		        }
      		    ],
      		    yAxis: [
                  {
                       axisLabel : {
                        formatter: function(){
                          return "";
                         }
                      },
                      splitLine: {
                        lineStyle: {
                          // 使用深浅的间隔色
                          color: ["none"],
                        },
                      }
                  }
      		    ],
      		    series: [
      		        {
      		            name: '今日新增用户',
      		            type: 'line',
      		            stack: '总量',
      		            smooth: true,
      		            lineStyle: {
      		                width: 0
      		            },
      		            showSymbol: false,
      		            areaStyle: {
      		                opacity: 0.8,
      		                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      		                    offset: 0,
      		                    color: 'rgba(152, 96, 228)'
      		                }])
      		            },
      		            emphasis: {
      		                focus: 'series'
      		            },
      		            data: [140, 232, 101, 264, 90, 340, 250]
      		        }
      		    ]
      		};
            option && myChart.setOption(option);
      	})
      },
      initEcharts2 () {
      	// 新建一个promise对象
      	let newPromise = new Promise((resolve) => {
      		resolve()
      	})
      	//然后异步执行echarts的初始化函数
      	newPromise.then(() => {
          var chartDom = document.getElementById('main2');
          var myChart = echarts.init(chartDom);
          var option;
      		option = {
            color: ['rgb(60,162,255)'],
      		    xAxis: {
      		        type: 'category',
      		        data: []
      		    },
      		    yAxis: {
      		        type: 'value',
                  splitLine: {
                    lineStyle: {
                      // 使用深浅的间隔色
                      color: ["none"],
                    },
                  },
                  axisLabel : {
                    formatter: function(){
                      return "";
                     }
                  }
      		    },
      		    series: [{
      		        data: [120, 200, 150, 80, 70, 110, 130,120, 200, 150, 80, 70, 110, 130],
      		        type: 'bar',
                  lineStyle: {
                      width: 0
                  },
      		    }]
      		};
            option && myChart.setOption(option);
      	})
      }
    },
    mounted(){
      this.initEcharts1()
      this.initEcharts2()
    },
    created() {
      this.getSysMsg()
      this.getYesToday()
      this.getNewUser()
      this.getCardUser()
    }
  }

</script>

<style scoped>
  .body{
    margin-top: 1%;
    height: 700px;
    display: flex;
  }
  .body-left{
    width: 22%;
    background-color: #fff;
    height: 670px;
    opacity: 0;
    animation-name: example;
    animation-duration: 0.8s;
    animation-fill-mode:forwards;
    overflow-y:auto;
  }
  @keyframes example {
    0%   { opacity:0;}
    15%  { opacity:0.1}
    30%  { opacity:0.2;}
    45%  { opacity:0.3;}
    60%  { opacity:0.5;}
    75%  { opacity:0.6;}
    90%  { opacity:0.8;}
    100% { opacity:1;}
  }
  .body-left-title{
    display: flex;
    height: 45px;
    line-height: 45px;
  }
  .body-left-a{
    font-size: 16px;
    color: #989898;
    margin-left: 3%;
    width: 80%;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .body-left-b{
    font-size: 13px;
    width: 20%;
    color: #1890FF;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .body-left-list-item{
    background-color: rgb(230,247,255);
    width: 90%;
    margin: 0 auto;
    border-radius: 4px;
    margin-top: 3%;
    padding-left: 4%;
    padding-bottom: 5%;
    margin-bottom: 3%;
    padding-top: 3%;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .list-title{
    margin-top: 2%;
  }
  .list-center:nth-child(2){
    margin-top: 3%;
  }
  .body-center{
    width: 60%;
    margin-left: 1%;
    height: 670px;
    background-color: #fff;
  }
  .body-center-title{
    height: 80px;
    line-height: 80px;
    border-bottom: 1px solid #e6e6e6;
    font-size: 17px;
    padding-left: 3%;
  }

  .body-center-img-item:nth-child(2){
    margin-left: 10%;
  }
  .body-center-tab{
    width: 90%;
    margin: 0 auto;
  }
  .pages{
    margin-left: 25%;
    margin-top: 5%;
  }
  .body-center-right{
    width: 22%;
    height: ;
    margin-left: 1%;
    height: 670px;
  }
  .body-center-right-item:nth-child(1){
     margin-top: 1%;
  }
  .body-center-right-item{
    height: 210px;
    margin-top: 4.5%;
    background-color: #fff;
    padding-top: 7%;
  }
  .body-center-right-item-title{
    font-size: 14.5px;
    color: rgba(0, 0, 0, 0.427450980392157);
    margin-left: 6%;
  }
  .body-center-right-item-number{
      margin-left: 6%;
      font-size: 18px;
      font-weight: bold;
      margin-top: 1%;
  }
  .body-center-right-item-db{
      font-size: 14px;
      color: rgba(0, 0, 0, 0.427450980392157);
      height: 50px;
      width: 88%;
      line-height: 50px;
      margin: 0 auto;
      border-bottom: 1px solid #d6d6d6;
      white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;
  }
  .body-center-right-item-info{
    height: 100px;
    width: 88%;
    margin: 0 auto;
    border-bottom: 1px solid #d6d6d6;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 15px;
    margin-top: 3%;
  }
  .body-center-right-item-info-item{
    height: 30px;
    line-height: 30px;
  }
  .body-center-right-item-info-item span:nth-child(2){
    margin-left: 5%;
  }
  .body-center-right-item-info-item span:nth-child(3){
    margin-left: 10%;
  }
  .body-center-right-item-desc{
    width: 80%;
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #d6d6d6;
  }
  .body-center-right-item-desc span:nth-child(2){
    margin-left: 10%;
  }
  .noQX{
    width: 100%;
    height: 40%;
  }
  .noQX img{
    width: 100%;
    height: 100%;
  }
</style>
