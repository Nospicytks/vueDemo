<template>
 <div>
    <Naving />
    <!-- 头部按钮 -->
    <div class="title">
        <div class="title-font">
          <div class="title-font-left">
            <div class="title-font-left-top">
              <div :class="index === (msg.length-1)?'last':''" @click="goPage(index)" class="title-font-left-top-item" v-for="(item,index) in msg" :key="index" >
                {{item}}
              </div>
            </div>
            <div class="title-font-left-bottom">{{title}}</div>
          </div>
          <div class="title-font-right">
            <div :class="item === '取消'?'qx':''"  v-for="(item,index) in button" :key="index" class="title-font-right-item">{{item}}</div>
          </div>
        </div>
      </div>
      <!-- 头部按钮end -->
    <div class="center">
      <div class="centerbody">
        <div class="center-title">
          <div class="center-title-left">
            <div class="center-title-left-item">
              <div class="center-title-left-item-left">时间段:</div>
              <div class="center-title-left-item-right">
                <el-date-picker
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                      v-model="start_date"
                      type="date"
                      placeholder="请选择起始时间">
                    </el-date-picker>
              </div>
            </div>
            <div class="center-title-left-item">
              <div class="center-title-left-item-left">~</div>
              <div class="center-title-left-item-right">
                <el-date-picker
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                      v-model="end_date"
                      type="date"
                      placeholder="请选择结束时间">
                    </el-date-picker>
              </div>
            </div>
            <div class="center-title-left-item">
              <div class="center-title-left-item-left">手机号:</div>
              <div class="center-title-left-item-right"><el-input v-model="phone" placeholder="请输入手机号"></el-input></div>
            </div>
          </div>
          <div class="center-title-right">
            <div class="center-title-right-item" @click="search">查询</div>
            <div class="center-title-right-item" @click="reload">重置</div>
          </div>
        </div>
        <div class="center-mess">
          <i class="el-icon-warning" style="color: #0E77D1;margin-left: 1%;"></i>
          <span style="margin-left: 1%;">符合当前查询条件数据总计:</span>
          <span style="margin-left: 0.5%;font-weight: bold;">36.4</span>
          <span>万</span>
        </div>
        <div class="center-tab">
          <el-table
          v-loading="tabloading"
          :header-cell-style="{background:'rgb(250,250,250)',color:'#606266'}"
             :data="tableData"
             style="width: 100%;height: 100%;min-height: 400px;min-height: 400px;"
             :default-sort = "{prop: 'date', order: 'descending'}"
             >
             <el-table-column
               prop="phone"
               label="参与人手机号"
               >
             </el-table-column>
             <el-table-column
               prop="name"
               label="奖品"
               >
             </el-table-column>
             <el-table-column
               prop="use_points"
               label="消耗积分">
             </el-table-column>
             <el-table-column
               prop="earn_points"
               label="奖励积分">
             </el-table-column>
             <el-table-column
               prop="created_at"
               label="操作时间">
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
                :page-sizes="[10, 20, 30]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
        </div>
      </div>
    </div>
    <br><br>
  </div>
</template>

<script>
  import { winningRecordList } from '@/api/request'
  export default{
    data() {
      return {
        msg:['活动设置  /','抽奖活动 /','中奖记录'],
        title:'中奖记录',
        button:[],
        titPath:'winningRecord',
        currentPage:1,
        couponName:'',
        couponStatus:'',
        options:[],
        tableData:[],
        start_date:'',
        end_date:'',
        phone:'',
        // 分页相关
        tabloading:false,
        currentPage:1,
        pageSize:10,
        total:1
      }
    },
    watch:{
      currentPage:{
          handler(currentPage){
            this.getTabData(this.$route.query.lottery_id,this.phone,this.start_date,this.end_date,this.currentPage,this.pageSize)
          },
          deep: true,
          immediate: true,
        },
    },
    methods:{
      // 标题操作
      goPage(index){
        switch (index){
          case 1:
          this.$router.push('/actConfig/lottery/lotteryList');
          break;
        }
      },
      // 重置
      reload(){
        this.phone = ''
        this.start_date = ''
        this.end_date = ''
        this.currentPage = 0
        this.currentPage = 1
        this.pageSize = 10
      },
      // 查询
      search(){
        if((this.start_date !== '' && (this.end_date == '' || this.end_date == null)) || (this.end_date !== '' && (this.start_date == '' || this.start_date == null))){
          this.$message.warning('请选择完整时间段',3);
          return false
        }else{
          console.log(this.start_date)
          console.log(this.end_date)
          this.currentPage = 0
          this.currentPage = 1
        }
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
      // 中奖纪录
      getTabData(lottery_id,phone,start_date,end_date,currentPage,pageSize){
        this.tabloading = true

        let tlottery_id = lottery_id;
        let tphone = phone;
        let tstart_date = start_date;
        let tend_date = end_date;
        let tcurrentPage = currentPage;
        let tpageSize = pageSize

        winningRecordList(tlottery_id,tphone,tstart_date,tend_date,tcurrentPage,tpageSize)
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
    },
    created() {
       this.getTabData(this.$route.query.lottery_id,this.phone,this.start_date,this.end_date,this.currentPage,this.pageSize)
    }
  }
</script>

<style scoped>
  .center{
    width: 90%;
    margin: 0 auto;
    background-color: #fff;
    margin-top: 2%;
    padding-top: 2%;
    padding-bottom: 2%;
  }
  .centerbody{
    width: 95%;
    margin: 0 auto;
  }
  .center-title{
    height: 100px;
    display: flex;
  }
  .center-title-left{
    width: 60%;
    display: flex;

  }
  .center-title-left-item{
    margin-left: 3.3%;
    display: flex;
  }
  .center-title-left-item:nth-child(2){
   margin-left: 0;
  }
  .center-title-left-item-left{
    line-height: 40px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: auto;
  }
  .center-title-left-item-right{
    margin-left: 2%;
    margin-left: auto;
  }
  .center-title-right{
    width: 30%;
    margin-left: 10%;
    display: flex;
  }
  .center-title-right-item{
    background-color: rgb(24,144,255);
    width: 20%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: #fff;
    margin-left: 50%;
    border-radius: 8px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .center-title-right-item:nth-child(2){
    color: #333;
     background-color: #FFFFFF;
     border: 1px solid #d6d6d6;
     margin-left: 5%;
  }
  .center-mess{
    width: 100%;
    height: 50px;
    border-radius: 4px;
    line-height: 50px;
    background-color: rgba(230, 247, 255, 1);
    border: 1px solid rgba(186, 231, 255, 1);
  }
  .center-tab{
    width: 100%;
    margin-top: 1%;
  }
  .pages{
    margin-left:55%;
    margin-top: 1%;
  }
  .tabopt{
    display: flex;
    width: 100%;
    height: 100%;
    color: #1890FF;
  }
  .tabs{
    width: 1px;
    background-color: #1890FF;
    margin-left: 5%;
    margin-right: 5%;
  }
  /* 头部按钮 */
  .title{
  		width: 100%;
  		height: 90px;
  		border-bottom: 1px solid #d6d6d6;
  		background-color: #fff;
  	}
  	.title-font{
  		height: 90px;
  		width: 95%;
  		margin: 0 auto;
      display: flex;
  	}
    .title-font-left{
      width: 60%;
    }
    .title-font-left-top{
      font-size: 15px;
      color: rgba(0, 0, 0, 0.447058823529412);
      margin-top: 1%;
      display: flex;
    }
    .title-font-left-top-item:nth-child(1){
      margin-left: 0%;
    }
    .title-font-left-top-item{
      margin-left: 1%;
    }
    .title-font-left-bottom{
      font-size: 20px;
      margin-top: 1%;
      font-weight: bold;
    }
    .last{
      color: #333333;
    }
    .title-font-right{
      width: 40%;
      display: flex;
      text-overflow: ellipsis;
    }
    .title-font-right-item:nth-child(1){
      /* margin-left: 40%; */
    }
    .title-font-right-item{
      padding-left: 3%;
      padding-right: 3%;
      height: 35px;
      line-height: 35px;
      background-color: rgb(24,144,255);
      border-radius: 4px;
      text-align: center;
      margin-top: 3.5%;
      margin-left: 3%;
      color: #fff;
      white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  .qx{
    border: 1px solid #d6d6d6;
    color: #333333;
    background-color: #fff;
  }
   /* 头部按钮end */
</style>
