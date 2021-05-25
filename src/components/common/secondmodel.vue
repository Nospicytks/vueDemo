<template>
  <div>
    <div class="body">
      <div class="body-title">
        <div class="body-date-list" :class="$store.state.scroll.scrollHeight >= '450'?'lookright':''">
          <div @click="activeDate(index)" :class="active === index?'active':''" v-for="(item,index) in dateList" :key="index" class="body-date-list-item">
            {{item}}
          </div>
        </div>
        <div class="body-center">
          <div class="body-center-left">
            <div style="height: 350px;width: 100%;" id="secmain"></div>
          </div>
          <div :class="$store.state.scroll.scrollHeight >= '500'?'lookright':''" class="body-center-right">
            <div class="body-center-right-title">各停车场开卡排名</div>
            <div class="body-center-right-list">
              <div  v-for="(item,index) in rankList" :key="index" class="body-center-right-list-item">
                <div :class="index <= 2?'body-center-right-list-item-rank-best':''" class="body-center-right-list-item-rank">{{item.rank}}</div>
                <div class="body-center-right-list-item-title">{{item.title}}</div>
                <div class="body-center-right-list-item-num">{{item.num}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as echarts from 'echarts';
  export default{
    data() {
      return {
        active:-1,
        dateList:['今日','本周','本月','全年'],
        rankList:[
          {
            rank:'1',
            title:'胜利南',
            num:'323,234'
          },
          {
            rank:'2',
            title:'胜利北',
            num:'323,234'
          },
          {
            rank:'3',
            title:'高压开关厂',
            num:'323,234'
          },
          {
            rank:'4',
            title:'胜利东',
            num:'323,234'
          },
          {
            rank:'5',
            title:'胜利西',
            num:'323,234'
          },
          {
            rank:'6',
            title:'胜利中',
            num:'323,234'
          },
          {
            rank:'7',
            title:'远东国际停车场',
            num:'323,234'
          }
        ]
      }
    },
    watch:{
      scrollHeight:{
          handler(scrollHeight){
            if(scrollHeight >= '500'){
              this.initEcharts()
            }
          },
          deep: true,
          immediate: true,
        }
    },
    computed:{
      scrollHeight(){
        return this.$store.state.scroll.scrollHeight;
      }
    },
    methods:{
      activeDate(index){
        this.active = index
      },
      initEcharts () {
      	// 新建一个promise对象
      	let newPromise = new Promise((resolve) => {
      		resolve()
      	})
      	//然后异步执行echarts的初始化函数
      	newPromise.then(() => {
          var chartDom = document.getElementById('secmain');
          var myChart = echarts.init(chartDom);
          var option;

          option = {
              title:
              {
                  text: '销售额趋势',
                  subtext: ''
              },
              color: ['rgb(59,161,255)','rgb(102,204,255)'],
              tooltip: {
                  trigger: 'axis'
              },
              legend: {
                  data: ['购卡用户数', '储值用户数']
              },
              toolbox: {
                  show: false,
              },
              calculable: true,
              xAxis: [
                  {
                      type: 'category',
                      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                  }
              ],
              yAxis: [
                  {
                      type: 'value'
                  }
              ],
              series: [
                  {
                      name: '购卡用户数',
                      type: 'bar',
                      data: [2, 4, 7, 23, 25, 76, 135, 162, 32, 20, 6, 3],
                      markPoint: {
                          data: [

                          ]
                      },
                      markLine: {
                          data: [

                          ]
                      },
                  },
                  {
                      name: '储值用户数',
                      type: 'bar',
                      data: [2, 5, 9, 26, 28, 70, 175, 182, 48, 18, 6, 2],
                      markPoint: {
                          data: [

                          ]
                      },
                      markLine: {
                          data: [

                          ]
                      }
                  }
              ]
          };
            option && myChart.setOption(option);
      	})
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .body{
    height: 450px;
    background-color: #fff;
    margin-top: 1%;
  }
  .body-title{
    width: 95%;
    height: 80px;
    border-bottom: 1px solid #e6e6e6;
    line-height: 80px;
  }
  .body-date-list{
    width: 15%;
    height: 70px;
    margin-left: 85%;
    display: flex;
    font-size: 14px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    opacity: 0;
  }
  .body-date-list-item{
    width: 25%;
    text-align: center;
    cursor: pointer;
  }
  .active{
    color: rgba(24, 144, 255, 1);
  }
  .body-center{
    margin-top: 1%;
    display: flex;
  }
  .body-center-left{
    width: 65%;
    padding-left: 2%;
  }
  .body-center-right{
    width: 25%;
    margin-left: 10%;
    opacity:0
  }
  .lookright{
    animation-name: example;
    animation-duration: 1s;
    animation-fill-mode:forwards;
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
  .body-center-right-title{
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    font-size: 16px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .body-center-right-list{
    height:16vw;
  }
  .body-center-right-list-item{
    display: flex;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    margin-top: 0.7%;

  }
  .body-center-right-list-item-rank{
    background-color: rgb(240,242,245);
    width: 6%;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 49px;
    margin-top: 1.8%;
  }
  .body-center-right-list-item-rank-best{
    background-color: rgb(49,70,89);
    color: #fff;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .body-center-right-list-item-title{
    margin-left: 5%;
    width: 74%;
    white-space: nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .body-center-right-list-item-num{
    width: 15%;
    white-space: nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
</style>
