<template>
  <div>
    <div class="allBox">
      <div class="chartsBox">
        <div class="allBox-left">
          <div class="allBox-left-item" v-for="(item,index) in cardCount" :key="index">
            <div class="circle-title">{{item.card_name}}：{{item.card_count}}</div>
            <el-progress
            type="circle"
            :color="chartsList[index].color"
            :percentage="Number(item.percentage.substring(0,item.percentage.length-1))">
            </el-progress>
          </div>
        </div>
        <div class="allBox-right">
          <div class="allBox-right-charts">
            <div class="allBox-right-charts-mess">
              <div>总价值</div>
              <div>¥ {{totalMoney}}</div>
            </div>
            <div id="main1" style="height: 250px;width: 250px;margin-top: -15%;"></div>
            <div style="color: rgba(0, 0, 0, 0.427450980392157);" class="nopre">统计须知：未激活不参与总价值估算。</div>
          </div>
          <div class="allBox-right-info">
            <div class="allBox-right-info-item" v-for="(item,index) in chartsList" :key="index">
              <div class="allBox-right-info-itema" :style="{'background-color':item.color}"></div>
              <div class="allBox-right-info-itemb">{{item.channel_name}}</div>
              <div class="allBox-right-info-itemc">{{item.percentage}}</div>
              <div class="allBox-right-info-itemd">{{item.money}}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import { cardChat } from '@/api/request'
  import * as echarts from 'echarts';
  export default{
    props:["chartsList1","chartsList2"],
    data() {
      return {
        totalMoney:'',
        chartsList:[],
        cardCount:[],
        color:['rgb(59,161,255)','rgb(105,211,137)','rgb(252,218,86)','rgb(59,161,255)','rgb(105,211,137)','rgb(252,218,86)']
      }
    },
    watch:{
      chartsList:{
        handler(chartsList){
          if(chartsList.length !== 0){
            this.getCharts1()
          }
        },
        deep:true,
        immediate:true
      }
    },
    methods:{
      // 获取数据
      getChartInfo(){
        cardChat()
          .then(res => {
            if(res.data.code == 200){
              this.totalMoney = res.data.data.totalMoney
              this.chartsList = res.data.data.moneyCount
              this.cardCount = res.data.data.cardCount
            }else{
              this.$notify.error({
              	title: '错误',
              	message: res.data.msg,
              	duration: 0
              });
            }
          })
      },
      getCharts1(){
        // 新建一个promise对象
        let newPromise = new Promise((resolve) => {
        	resolve()
        })
        //然后异步执行echarts的初始化函数
        newPromise.then(() => {
          var chartDom = document.getElementById('main1');
          var myChart = echarts.init(chartDom);
          var option;
          let color = []
          let data = []
          for(let i = 0;i<this.chartsList.length;i++){
            color[i] = this.chartsList[i].color
            data.push({
              value:this.chartsList[i].money,
              name:this.chartsList[i].channel_name
            })
          }
        	option = {
        	    tooltip: {
        	        trigger: 'item'
        	    },
              color: color,
        	    series: [
        	        {
        	            type: 'pie',
        	            radius: ['40%', '70%'],
                       center: ['50%', '50%'],
        	            avoidLabelOverlap: true,
        	            label: {
        	                show: false,
        	                position: 'center'
        	            },
        	            emphasis: {
        	                label: {
        	                    show: false,
        	                    fontSize: '14',
        	                    fontWeight: 'bold',
        	                }
        	            },
        	            labelLine: {
        	                show: false
        	            },
        	            data: data,
        	        }
        	    ]
        	};
            option && myChart.setOption(option);
        })
      },
      getCharts2(){
        // 新建一个promise对象
        let newPromise = new Promise((resolve) => {
        	resolve()
        })
        //然后异步执行echarts的初始化函数
        newPromise.then(() => {
          var chartDom = document.getElementById('main2');
          var myChart = echarts.init(chartDom);
          var option;
          option && myChart.setOption(option);
        })
      }
    },
    created() {
      this.getChartInfo()
    },
    mounted() {
      this.getCharts1()
    }
  }
</script>

<style scoped>
  .allBox{
    width: 90%;
    background-color: #fff;
    margin: 0 auto;
    padding-top: 1%;
    padding-bottom: 5%;
    display: flex;
  }
  .chartsBox{
     width: 95%;
     margin: 0 auto;
     display: flex;
  }
  .chartsBox:nth-child(2){
    margin-top: 3%;
  }
  .allBox-left{
    width: 40%;
    height: 100px;
    display: flex;
  }
  .allBox-left-item{
    width: 30%;
    height: 200px;
    margin-left: 3%;
  }
  .circle-title{
    margin-left: 15%;
    color: rgba(0, 0, 0, 0.427450980392157);
    margin-bottom: 1%;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .allBox-right{
    width: 45%;
    margin-left: 15%;
    height: 200px;
    display: flex;
  }
  .allBox-right-charts{
    width: 300px;
    position: relative;
  }
  .allBox-right-charts-mess{
    position: absolute;
    left: 34%;
    top: 25%;
  }
  .allBox-right-charts-mess div:nth-child(1){
    font-size: 14px;
    height: 28px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(0, 0, 0, 0.427450980392157);
  }
  .allBox-right-charts-mess div:nth-child(2){
    font-size: 16px;
    font-weight: bold;
    height: 28px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    color:#333;
    margin-left: -15%;
  }
  .allBox-right-info{
    width: 50%;
  }
  .allBox-right-info-item{
    height: 28px;
    line-height: 28px;
    margin-top: 6px;
    display: flex;
  }
  .nopre{
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 30px;
  }
  .allBox-right-info-itema{
    width: 8px;
    height: 8px;
    border-radius: 49px;
    margin-top: 4%;
  }
  .allBox-right-info-itemb{
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 3%;
    border-right: 1px solid rgba(233, 233, 233, 1);
    padding-right: 5%;
    width: 30%;
  }
  .allBox-right-info-itemc{
    margin-left: 3%;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(0, 0, 0, 0.427450980392157);
    width: 30%;
  }
  .allBox-right-info-itemd{
    margin-left: 20%;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    width: 30%;
  }
</style>
