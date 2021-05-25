<template>
 <div>
    <Naving />
    <Title :titPath='titPath' :msg='msg' :title='title' :button='button' />
    <div class="center">
      <div class="centerbody">
        <div class="center-title">
          <div class="center-title-left">
            <div class="center-title-left-item">
              <div class="center-title-left-item-left">时间段:</div>
              <div class="center-title-left-item-right" style="display: flex;">
                    <div>
                      <el-date-picker
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                            v-model="start_date"
                            type="date"
                            placeholder="请选择起始时间">
                          </el-date-picker>
                    </div>
                    <div style="margin-left: 1%;">
                      <el-date-picker
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                            v-model="end_date"
                            type="date"
                            placeholder="请选择结束时间">
                          </el-date-picker>
                    </div>

              </div>
            </div>
            <div class="center-title-left-item">
              <div class="center-title-left-item-left">手机号:</div>
              <div class="center-title-left-item-right">
                <el-input v-model="phone" placeholder="请输入手机号"></el-input>
              </div>
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
          <span style="margin-left: 0.5%;font-weight: bold;">{{total}}</span>
          <span>条</span>
        </div>
        <div class="center-tab">
          <el-table
          v-loading="tabloading"
          :header-cell-style="{background:'rgb(250,250,250)',color:'#606266'}"
             :data="tableData"
             style="width: 100%;height: 100%;"
             :default-sort = "{prop: 'date', order: 'descending'}"
             >
             <el-table-column
               prop="user.phone"
               label="兑换人手机号"
               >
             </el-table-column>
             <el-table-column
               prop="points_type_text"
               label="积分变动类型"
               >
             </el-table-column>
             <el-table-column
               prop="points_num"
               label="增减数额">
               <template slot-scope="scope">
                 <div>
                  {{scope.row.points_type == 1?'+':'-'}}
                  {{scope.row.points_num}}
                 </div>
               </template>
             </el-table-column>
             <el-table-column
               prop="after_points"
               label="变动后积分">
             </el-table-column>
             <el-table-column
               prop="created_at"
               label="操作时间">
             </el-table-column>
             <el-table-column
               label="操作"
               >
                <template slot-scope="scope">
                  <div class="tabopt">
                   <div @click="lookDetail(scope.row)">查看明细</div>
                  </div>
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
             :page-sizes="[10, 20, 30]"
             :page-size="pageSize"
             layout="total, sizes, prev, pager, next, jumper"
             :total="total">
           </el-pagination>
        </div>
      </div>
    </div>
    <br><br>
    <!-- 查看明细 -->
    <el-dialog title="详情" :visible.sync="dialogDetail" @close="close" :close-on-click-modal="false">
      <div class="diabox">
        <div class="diabox-item">用户手机号：{{user_phone}}</div>
        <div class="diabox-item">变动事由：{{params.reward_type}}</div>
        <div class="diabox-item">变动后积分余额：{{params.after_points}}</div>
        <div class="diabox-item">操作时间：{{params.created_at}}</div>
        <div class="diabox-item" v-if="params.reward_type == '兑换优惠券'" >
          兑换物：{{params.exchange_name}}
        </div>
        <div class="diabox-item" v-if="params.reward_type == '签到奖励' || params.reward_type == '其他类型'">
          变动积分：{{params.points_num}}
        </div>
        <div class="diabox-item" v-if="params.reward_type == '个人认证'">
          用户姓名：{{params.user.id_card}}
        </div>
        <div class="diabox-item" v-if="params.reward_type == '个人认证'">
          身份证号：{{params.user.name}}
        </div>
        <div class="diabox-item" v-if="params.reward_type == '车辆认证'">
          车牌号：{{params.car_number}}
        </div>
        <div class="diabox-item" v-if="params.reward_type == '购卡奖励'">
          购卡类型：{{params.card.card_base_name}}
        </div>
        <div class="diabox-item" v-if="params.reward_type == '购卡奖励'">
          购卡花费：{{params.card.money}}
        </div>
        <div class="diabox-item" v-if="params.reward_type == '购卡奖励'">
          包时卡到期时间：{{params.card.after_time}}
        </div>
        <div class="diabox-item" v-if="params.reward_type == '充值'">
          充值金额：{{params.account.money}}
        </div>
        <div class="diabox-item" v-if="params.reward_type == '充值'">
          储值后余额：{{params.account.after_money}}
        </div>
      </div>
    </el-dialog>
    <!-- 查看明细end -->
  </div>
</template>

<script>
  import { indegralHistoryList } from '@/api/request'
  export default{
    data() {
      return {
        msg:['用户中心  /','积分管理 /','积分记录'],
        title:'积分记录',
        button:[],
        titPath:'wxUserList',
        dialogDetail:false,
        start_date:'',
        end_date:'',
        phone:'',
        user_phone:'',
        tabloading:false,
        tableData:[],
        // 分页
        currentPage:1,
        pageSize:10,
        total:1,
        params:{}
      }
    },
    watch:{
      params:{
        handler(params){
          if(JSON.stringify(params) == '{}'){
            return false
          }else{
            this.user_phone = params.user.phone
            this.dialogDetail = true
          }
        },
        deep: true,
        immediate: true,
      },
      currentPage:{
          handler(currentPage){
             this.getTabData(this.start_date,this.end_date,this.phone,this.currentPage,this.pageSize)
          },
          deep: true,
          immediate: true,
        }
    },
    methods:{
      // 关闭详情
      close(){
        this.user_phone = ''
        this.params = {}
      },
      // 重置
      reload(){
       this.start_date = ''
       this.end_date = ''
       this.phone = ''
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
      // 积分记录列表
      getTabData(start_date,end_date,phone,currentPage,pageSize){
        this.tabloading = true
        let tstart_date = start_date;
        let tend_date = end_date;
        let tphone = phone;
        let tcurrentPage = currentPage;
        let tpageSize = pageSize

        indegralHistoryList(tstart_date,tend_date,tphone,tcurrentPage,tpageSize)
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
      lookDetail(data){
        this.params = data
      }
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
    width: 80%;
    display: flex;

  }
  .center-title-left-item{
    width: 35%;
    display: flex;
  }
  .center-title-left-item:nth-child(2){
    margin-left: 10%;
  }
  .center-title-left-item-left{
    line-height: 40px;
    height: 40px;
    text-align: right;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 20%;
  }
  .center-title-left-item-right{
    margin-left: auto;
    width: 70%;
  }
  .center-title-right{
    width: 20%;
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
  .tabImg{
    width: 50px;
    height: 50px;
    border-radius: 49px;
    background-color: rgb(117,128,139);
  }
  .tabUserName{
    height: 50px;
    line-height: 50px;
    margin-left: 1%;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .diabox{
    width: 100%;
    border-top: 1px solid #d6d6d6;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
  }
  .diabox-item{
    width: 50%;
    text-align: left;
    padding-left: 10%;
    height: 60px;
    line-height: 60px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
