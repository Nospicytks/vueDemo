<template>
  <div>
     <div class="body">
        <div class="body-title">
          <div class="body-title-icon">
            <i @click="sub" class="el-icon-arrow-left"></i>
          </div>
          <div class="body-title-center">
            <div @click="activeList(index)" :class="[active === index?'active':'',$store.state.scroll.scrollHeight >= '800'?'body-title-center-item_animal':'']" v-for="(item,index) in chartsList" :key="index" class="body-title-center-item">
              <div class="body-title-center-item-title">{{item.title}}</div>
              <div class="body-title-center-item-center">
                <div class="body-title-center-item-center-left">
                  <div class="body-title-center-item-center-left-top">{{item.desc}}</div>
                  <div class="body-title-center-item-center-left-bottom">{{item.price}}</div>
                </div>
                <div class="body-title-center-item-center-right">
                  <a-progress strokeColor="" :strokeColor="active === index?'rgb(0,150,250)':'rgb(153,213,253)'"  :showInfo="false" type="circle" :percent="30" :width="80" />
                </div>
              </div>
            </div>
          </div>
          <div class="body-title-icon">
            <i @click="add" class="el-icon-arrow-right"></i>
          </div>
        </div>
        <!-- 统计图 -->
        <div class="body-charts">
          <div id="thirdmain" style="height: 400px;width: 99%;"></div>
        </div>
        <!-- 统计图end -->
     </div>
     <br><br>
  </div>
</template>

<script>
  import * as echarts from 'echarts';
  export default{
    data() {
      return {
        active:0,
        chartsList:[
          {
            title:'胜利南（收入比例）',
            desc:'（临停：付费）',
            price:'8218',
            num:''
          },
          {
            title:'胜利南（收入比例）',
            desc:'（临停：付费）',
            price:'8218',
            num:''
          },
          {
            title:'胜利南（收入比例）',
            desc:'（临停：付费）',
            price:'8218',
            num:''
          },
          {
            title:'胜利南（收入比例）',
            desc:'（临停：付费）',
            price:'8218',
            num:''
          },
          {
            title:'胜利南（收入比例）',
            desc:'（临停：付费）',
            price:'8218',
            num:''
          }
        ]
      }
    },
    watch:{
      scrollHeight:{
          handler(scrollHeight){
            if(scrollHeight >= '1200'){
              this.getCharts()
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
      activeList(index){
        this.active = index
      },
      sub(){
        if(this.active !== 0){
          this.active --
        }else{
          return false
        }
      },
      add(){
        if(this.active !== 4){
          this.active ++
        }else{
          return false
        }
      },
      getCharts(){
        let newPromise = new Promise((resolve) => {
        	resolve()
        })
        //然后异步执行echarts的初始化函数
        newPromise.then(() => {
          var chartDom = document.getElementById('thirdmain');
          var myChart = echarts.init(chartDom);
          var option;

        	option = {
        	    title: {
        	        text: '图标标题'
        	    },
              color: ['rgb(255,53,53)','rgb(60,198,106)','rgb(31,174,255)'],
        	    tooltip: {
        	        trigger: 'axis'
        	    },
        	    legend: {
        	        data: ['一', '二', '三']
        	    },
        	    grid: {
        	        left: '3%',
        	        right: '4%',
        	        bottom: '3%',
        	        containLabel: true
        	    },
        	    toolbox: {
        	        feature: {

        	        }
        	    },
        	    xAxis: {
        	        type: 'category',
        	        boundaryGap: false,
        	        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        	    },
        	    yAxis: {
        	        type: 'value'
        	    },
        	    series: [
        	        {
        	            name: '一',
        	            type: 'line',
        	            data: [20, 50, 35, 60, 50, 40, 65,50, 35, 60]
        	        },
        	        {
        	            name: '二',
        	            type: 'line',
        	            data: [20, 50, 30, 20, 55, 40, 15,20, 45, 30]
        	        },
        	        {
        	            name: '三',
        	            type: 'line',
        	            data: [15, 45, 15, 25, 15, 20, 75,60, 40, 25]
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
    height: 700px;
    background-color: #fff;
    margin-top: 1.5%;
    width: 100%;
  }
  .body-title{
    width: 100%;
    height: 110px;
    display: flex;
  }
  .body-title-icon{
    width: 2%;
    line-height: 110px;
    text-align: center;
  }
  .body-title-center{
    width: 96%;
    border-left:1px solid #e6e6e6;
    border-right:1px solid #e6e6e6;
    display: flex;
  }
  .body-title-center-item{
    width: 20%;
    cursor: pointer;
    display: none;
  }
  .body-title-center-item_animal{
    display: block;
    animation-name: titleAnimal;
    animation-duration: 0.2s;
    margin-top: 0;
  }
  @keyframes titleAnimal {
    0%   { margin-top:3.5%;}
    15%  { margin-top:3%;}
    30%  { margin-top:2.5%;}
    45%  { margin-top:2%;}
    60%  { margin-top:1.5%;}
    75%  { margin-top:1%;}
    90%  { margin-top:0.5%;}
    100% { margin-top:0%;}
  }
  .body-title-center-item-title{
    font-size: 16px;
    margin-left: 10%;
    margin-top: 5%;
  }
  .body-title-center-item-center{
    width: 80%;
    margin: 0 auto;
    height: 5vw;
    display: flex;
  }
  .body-title-center-item-center-left{
    width: 40%;
  }
  .body-title-center-item-center-left-top{
    color: rgba(0, 0, 0, 0.427450980392157);
    font-size: 13.5px;
    margin-top: 5%;
  }
  .body-title-center-item-center-left-bottom{
    font-size: 18px;
     margin-top: 5%;
  }
  .active{
    border-top: 2px solid rgba(16, 142, 233, 1);
  }
  .body-charts{
    margin-top: 3%;
    padding-left: 1%;
  }
  .body-title-center-item-center-right{
    width: 60%;
  }
  i{
    cursor: pointer;
  }
</style>
