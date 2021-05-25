<template>
  <div>
    <div class="box">
       <div class="box-item"><div style="height: 200px;width: 100%;" id="mainleft"></div></div>
       <div class="box-item"><div style="height: 200px;width: 100%;" id="mainright"></div></div>
    </div>
  </div>
</template>

<script>
  import * as echarts from 'echarts';
  export default{
    props:{
      in_chat:{
        type:Array,
        required:false
      },
      out_chat:{
        type:Array,
        required:false
      },
      in_count:{
        type:Number,
        required:false
      },
      out_count:{
        type:Number,
        required:false
      }
    },
    watch:{
      in_chat:{
        handler(in_chat){
          if(in_chat.length !== 0 && this.$props.out_chat.length !== 0){
            this.initEchartsLeft()
            this.initEchartsRight()
          }
        },
        deep:true,
        immediate:true
      }
    },
    data() {
      return {

      }
    },
    methods:{
    initEchartsLeft () {
    	// 新建一个promise对象
    	let newPromise = new Promise((resolve) => {
    		resolve()
    	})
    	//然后异步执行echarts的初始化函数
    	newPromise.then(() => {
        var chartDom = document.getElementById('mainleft');
        var myChart = echarts.init(chartDom);
        let in_count = this.in_count
        var option;
    		option = {
    		    color: ['rgb(204,234,254)'],
    		    title: {
              text: '进车统计（24H）',
              subtext: in_count+'（辆）',
    		      left: 'center'
    		    },
    		    tooltip: {
    		        trigger: 'axis',
    		        axisPointer: {
    		            type: 'cross',
    		            label: {
    		                backgroundColor: 'rgb(204,234,254)'
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
    		            data: [],
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
    		            name: '进车量',
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
    		                    color: 'rgba(204,234,254)'
    		                }])
    		            },
    		            emphasis: {
    		                focus: 'series'
    		            },
    		            data:this.$props.in_chat
    		        }
    		    ]
    		};
          for(let i = 0;i<this.$props.in_chat.length;i++){
            option.xAxis[0].data.push('')
          }
          option && myChart.setOption(option);
    	})
    },
    initEchartsRight () {
    	// 新建一个promise对象
    	let newPromise = new Promise((resolve) => {
    		resolve()
    	})
    	//然后异步执行echarts的初始化函数
    	newPromise.then(() => {
        var chartDom = document.getElementById('mainright');
        var myChart = echarts.init(chartDom);
        let out_count = this.out_count
        var option;
    		option = {
    		    color: ['rgb(223,264,228)'],
    		    title: {
              text: '出车统计（24H）',
              subtext: out_count+'（辆）',
    		      left: 'center'
    		    },
    		    tooltip: {
    		        trigger: 'axis',
    		        axisPointer: {
    		            type: 'cross',
    		            label: {
    		                backgroundColor: 'rgb(223,264,228)'
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
    		            data: [],
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
    		            name: '出车量',
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
    		                    color: 'rgb(223,264,228)'
    		                }])
    		            },
    		            emphasis: {
    		                focus: 'series'
    		            },
    		            data:this.$props.out_chat
    		        }
    		    ]
    		};
          for(let i = 0;i<this.$props.out_chat.length;i++){
            option.xAxis[0].data.push('')
          }
          option && myChart.setOption(option);
    	})
    }
    },
    created() {

    }
  }
</script>

<style scoped>
  .box{
    display: flex;
    height: 200px;
  }
  .box-item{
    width: 45%;
    height: 200px;
  }
</style>
