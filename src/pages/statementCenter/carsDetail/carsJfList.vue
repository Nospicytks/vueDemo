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
        <div class="titinput-item-left">车牌号:</div>
        <div class="titinput-item-right">
          <el-input placeholder="请输入搜索车牌号" v-model="car_number"></el-input>
        </div>
      </div>
      <div class="titinput-item"></div>
      <div class="titinput-item">
        <div class="titinput-item-select" @click="search">查 询</div>
        <div class="titinput-item-cz" @click="reload">重 置</div>
      </div>

    </div>
    <div style="background-color: #fff;width: 90%;margin: 0 auto;">
      <div class="center-mess-box">
        <div class="center-mess">
          <i class="el-icon-warning" style="color: #0E77D1;margin-left: 1%;"></i>
          <span style="margin-left: 1%;">符合当前查询条件数据总计:</span>
          <span style="margin-left: 0.5%;font-weight: bold;">{{total}}</span>
          <span>条</span>
        </div>
      </div>
    </div>
    <div class="center-box">
       <el-table
       v-loading="tabloading"
       :header-cell-style="{background:'rgb(250,250,250)',color:'#606266'}"
          :data="tableData"
          style="width: 95%;margin: 0 auto;min-height: 400px;"
          :default-sort = "{prop: 'date', order: 'descending'}"
          >
          <el-table-column
            prop="car_number"
            label="车牌号"
            >
          </el-table-column>
          <el-table-column
            prop="user_phone"
            label="所属人"
            >
          </el-table-column>
          <el-table-column
            prop="park_name"
            label="停车场"
           >
          </el-table-column>
          <el-table-column
            prop="total_money"
            label="应收"
           >
          </el-table-column>
          <el-table-column
            prop="final_money"
            label="实收"
           >
          </el-table-column>
          <el-table-column
            prop="total_discount_money"
            label="实际抵扣金额"
           >
          </el-table-column>
          <el-table-column
            prop="total_time"
            label="停车时长"
           >
          </el-table-column>
          <el-table-column
            prop="car_type_text"
            label="车辆类型"
           >
          </el-table-column>
          <el-table-column
            prop="order_text"
            label="放行类型"
           >
          </el-table-column>
          <el-table-column
            prop="order_sn"
            label="订单编号"
           >
          </el-table-column>
          <el-table-column
            label="操作"
            >
             <template slot-scope="scope">
               <div class="tabopt">
                  <div @click="lookDetail(scope.row.order_id)">查看明细</div>
               </div>
             </template>
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
    <!-- 查看明细 -->
    <el-dialog title="车次详情" @close="close" :visible.sync="dialogDetail"  :close-on-click-modal="false">
      <div class="diabox">
         <div class="diabox-title">
          <div class="diabox-title-item">车牌号码: {{params.car_number}}</div>
          <div class="diabox-title-item">{{params.car_type_text}}</div>
          <div class="diabox-title-item">
            {{car_subdivision_type_text}}
          </div>
          <div class="diabox-title-item">停车时长: <span style="color: red;">{{params.total_time}}</span></div>
          <div class="diabox-title-item">应收金额: {{params.total_money}}</div>
         </div>
          <div>抵用优惠券:</div>
          <div class="yhlist">
            <div class="yhlist-item" v-for="(item,index) in yhlist" :key="index">
              <span>【 {{item.title}} 】</span><span style="margin-left: 2%;">数量:{{item.num}}</span> <span style="margin-left: 2%;">优惠券编号：{{item.bh}}</span>
            </div>
             <div class="yhlist-item" >
               <span>抵扣金额：{{params.deduction_money}}</span>
               <span style="margin-left: 10%;">实付金额：{{params.final_money}}</span>
             </div>
          </div>
         <div class="diabox-center">
          <div class="diabox-center-item">
            <div class="diabox-center-item-top">
              <div class="diabox-center-item-top-left">
                <div class="diabox-center-item-top-item"><span>进场地点:</span><span>{{params.in_camera_title}}</span></div>
                <div class="diabox-center-item-top-item"><span>进场时间:</span><span>{{params.in_time}}</span></div>
                <div class="diabox-center-item-top-item"><span>放行类型:</span><span>{{params.in_type_text}}</span></div>
              </div>
              <div class="diabox-center-item-top-right">
                <div class="diabox-center-item-top-right-r">进</div>
              </div>
            </div>
            <div class="diabox-center-item-img">
              <img :src="params.in_pic" alt="">
            </div>
          </div>

          <div class="diabox-center-item">
            <div class="diabox-center-item-top">
              <div class="diabox-center-item-top-left">
                <div class="diabox-center-item-top-item"><span>出场地点:</span><span>{{params.out_camera_title}}</span></div>
                <div class="diabox-center-item-top-item"><span>出场时间:</span><span>{{params.out_time}}</span></div>
                <div class="diabox-center-item-top-item"><span>放行类型:</span><span>{{params.out_type_text}}</span></div>
              </div>
              <div class="diabox-center-item-top-right">
                <div class="diabox-center-item-top-right-r" style=" background-color: rgb(255,237,237);color:#CD5C5C;border: 1px solid #CD5C5C;">出</div>
              </div>
            </div>
            <div class="diabox-center-item-img">
               <img :src="params.out_pic" alt="">
            </div>
          </div>
         </div>
      </div>
      <div slot="footer" class="dialog-footer">
       <!-- <el-button @click="dialogDetail = false">取 消</el-button>
        <el-button type="primary" >确 定</el-button> -->
      </div>
    </el-dialog>
    <!-- 查看明细end -->
  </div>
</template>

<script>
  import { carsJfList,childParking,carsJfListDetail } from '@/api/request'
  export default{
    data() {
      return {
        msg:['报表中心 /','收费报表 /','车次计费明细'],
        title:'车次计费明细',
        button:['下载当前报表'],
        titPath:'carsJfList',
        options:[],
        park_id:'',
        car_number:'',
        start_date:'',
        end_date:'',
        dialogDetail:false,
        tabloading:false,
        tableData:[],
        yhlist:[],
        // 分页相关
        currentPage:1,
        pageSize:10,
        total:1,
        params:{},
        car_subdivision_type_text:''
      }
    },
    watch:{
      params:{
        handler(params){
          if(JSON.stringify(params) == '{}'){
            return false
          }else{
            console.log(params)
            this.dialogDetail = true
          }
        },
        deep: true,
        immediate: true,
      },
      currentPage:{
          handler(currentPage){
             this.getTabData(this.start_date,this.end_date,this.park_id,this.car_number,this.currentPage,this.pageSize)
          },
          deep: true,
          immediate: true,
        },
    },
    methods:{
      // 关闭详情
      close(){
        this.params = {}
      },
      // 重置
      reload(){
       this.start_date = ''
       this.end_date = ''
       this.park_id = ''
       this.car_number = ''
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
      //  车次计费明细列表
      getTabData(start_date,end_date,park_id,car_number,currentPage,pageSize){
        this.tabloading = true
        let tstart_date = start_date;
        let tend_date = end_date;
        let tpark_id = park_id;
        let tcar_number = car_number;
        let tcurrentPage = currentPage;
        let tpageSize = pageSize
        let torder_sn;
        if(this.$route.query.order_sn == undefined){
          torder_sn = ''
        }else{
          torder_sn = this.$route.query.order_sn
        }
        carsJfList(torder_sn,tstart_date,tend_date,tpark_id,tcar_number,tcurrentPage,tpageSize)
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
      },
      lookDetail(order_id){
        let torder_id = order_id
        carsJfListDetail(torder_id)
          .then(res => {
            if(res.data.code == 200){
              this.params = res.data.data
              this.car_subdivision_type_text = res.data.data.car_subdivision_type.car_subdivision_type_text
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
    width: 25%;
    display: flex;
    margin-left: 2%;
  }
  .titinput-item-left{
   width: 20%;
    margin-left: 1%;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
  }
  .titinput-item-right{
    margin-left: auto;
    margin-left: 5%;
    display: flex;
    width: 70%;
  }
  .titinput-item:nth-child(5){
      margin-left: 20%;
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
    width: 100%;
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
  .tabTmp{
    height: 150px;
    background-color: rgb(249,249,249);
    display: flex;
  }
  .tabTmp-item{
    width: 25%;
    margin-left: 3%;
  }
  .tabTmp-item-child{
    height: 75px;
    line-height: 75px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .tabopt{
    display: flex;
    width: 100%;
    height: 100%;
    color: #1890FF;
  }
  .diabox{
    width: 100%;
  }
  .diabox-title{
    display: flex;
    height: 70px;
    line-height: 70px;
  }
  .diabox-title-item{
    width: 25%;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .yhlist{
    margin-top: 1%;
  }
  .yhlist-item{
    height: 40px;
    line-height: 40px;
  }
  .diabox-center{
    display: flex;
    padding-bottom: 2%;
  }
  .diabox-center-item{
    width: 45%;
    height: 500px;
    border: 1px solid #d6d6d6;
    border-radius: 4px;
  }
  .diabox-center-item:nth-child(2){
    margin-left: 5%;
  }
  .diabox-center-item-top{
    height: 210px;
    display: flex;
  }
  .diabox-center-item-top-item{
    height: 70px;
    line-height: 70px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .diabox-center-item-top-left{
    margin-left: 5%;
    width: 60%;
  }
  .diabox-center-item-top-right{
     width: 35%;
  }
  .diabox-center-item-top-right-r{
    width: 40px;
    height: 40px;
    border-radius: 49px;
    background-color: rgb(230,252,245);
    color: #00FA9A;
    text-align: center;
    border: 1px solid #00FA9A;
    line-height: 40px;
    margin-top: 10%;
    margin-left: 50%;
  }
  .diabox-center-item-img{
    width: 95%;
    margin: 0 auto;
    background-color: rgb(117,128,139);
    border-radius: 4px;
    height: 200px;
    margin-top: 15%;
  }

  .diabox-center-item-img img{
    width: 100%;
    height: 100%;
  }
</style>
