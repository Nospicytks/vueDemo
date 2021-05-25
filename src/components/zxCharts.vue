<template>
  <div>
    <div class="allBox">
        <div class="chartsBox" >
          <div style="width: 90%;height: 450px;margin: 0 auto;" id="main1" ></div>
        </div>
        <div class="chartsBox" >
          <div style="width: 90%;height: 450px;margin: 0 auto;" id="main2" ></div>
        </div>
    </div>
  </div>
</template>

<script>
  import * as echarts from 'echarts';
  export default{
    data() {
      return {

      }
    },
    props:{
      chartsList1:{
        type:Object,
        required:false
      },
      chartsList2:{
        type:Object,
        required:false
      },
      tableData:{
        type:Array,
        required:false
      }
    },
    watch:{
      tableData:{
        handler(tableData){
          // if(tableData.length !== 0){}
            this.getCharts1()
            this.getCharts2()
        },
        deep:true,
        immediate:true
      }
    },
    methods:{
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
          let temporary = []
          let member = []
          let total_money = []
          for(let i = 0;i<this.$props.tableData.length;i++){
             temporary[i] = this.$props.tableData[i].temporary
             member[i] = this.$props.tableData[i].member
             total_money[i] = this.$props.tableData[i].total_money
          }
          console.log(temporary)
          console.log(member)
          console.log(total_money)
        	option = {
        	    title: {
        	        text: this.$props.chartsList1.chartsListTitle
        	    },
              color: ['rgb(32,148,255)','rgb(47,194,91)','rgb(255,65,65)'],
        	    tooltip: {
        	        trigger: 'axis',
        	    },
        	    legend: {
        	        data: []
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
        	        data: [],
                  axisPointer: {
                    type: 'shadow'
                  }
        	    },
        	    yAxis: {
        	        type: 'value',
                  axisLabel: {
                    formatter: '{value} 元'
                  }
        	    },
        	    series: [
        	        {
        	            name: '临停',
                      // bar
        	            type: 'line',
        	            data: temporary
        	        },
        	        {
        	            name: '会员',
                      // bar
        	            type: 'line',
        	            data: member
        	        },
        	        {
        	            name: '日合计',
        	            type: 'line',
        	            data: total_money
        	        }
        	    ]
        	};
          for(let i = 0;i<this.$props.chartsList1.legend.length;i++){
            option.series[i].name = this.$props.chartsList1.legend[i]
          }
          for(let i = 0;i<this.$props.tableData.length;i++){
             option.xAxis.data[i] = this.$props.tableData[i].date
          }
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
          let in_car = []
          let out_car = []
          let release_car = []
          for(let i = 0;i<this.$props.tableData.length;i++){
             in_car[i] = this.$props.tableData[i].in_car
             out_car[i] = this.$props.tableData[i].out_car
             release_car[i] = this.$props.tableData[i].release_car
          }
        	option = {
        	    title: {
        	        text: this.$props.chartsList2.chartsListTitle
        	    },
              color: ['rgb(32,148,255)','rgb(47,194,91)','rgb(255,65,65)'],
        	    tooltip: {
        	        trigger: 'axis'
        	    },
        	    legend: {
        	        data: []
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
        	        data: [],
        	    },
        	    yAxis: {
        	        type: 'value',
                  axisLabel: {
                    formatter: '{value} 辆'
                  }
        	    },
        	    series: [
        	        {
        	            name: '',
        	            type: 'line',
        	            data: in_car
        	        },
        	        {
        	            name: '',
        	            type: 'line',
        	            data: out_car
        	        },
        	        {
        	            name: '',
        	            type: 'line',
        	            data: release_car
        	        }
        	    ]
        	};
          for(let i = 0;i<this.$props.chartsList2.legend.length;i++){
            option.series[i].name = this.$props.chartsList2.legend[i]
          }
          for(let i = 0;i<this.$props.tableData.length;i++){
             option.xAxis.data[i] = this.$props.tableData[i].date
          }
            option && myChart.setOption(option);
        })
      }
    }
  }
</script>

<style scoped>
  .allBox{
    width: 90%;
    background-color: #fff;
    margin: 0 auto;
    padding-top: 3%;
    padding-bottom: 5%;
  }
  .chartsBox{
    height: 450px;
  }
  .chartsBox:nth-child(2){
    margin-top: 3%;
  }

</style>
