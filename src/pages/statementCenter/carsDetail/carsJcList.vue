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
            prop="park_name"
            label="停车场"
            >
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="进/出时间"
           >
          </el-table-column>
          <el-table-column
            prop="type_text"
            label="进/出地点"
           >
          </el-table-column>
          <el-table-column
            prop="car_type"
            label="车辆类型"
           >
          </el-table-column>
          <el-table-column
            prop="type"
            label="放行类型"
           >
          </el-table-column>
          <el-table-column
            label="操作"
            >
             <template slot-scope="scope">
               <div class="tabopt">
                  <div @click="lookDetail(scope.row.id)">查看明细</div>
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
    <el-dialog title="车辆通行记录查询" @close="close" :visible.sync="dialogDetail"  :close-on-click-modal="false">
      <div class="diabox">
        <div class="diabox-left">
          <img :src="baseUrl+params.pic" alt="">
        </div>
        <div class="diabox-right">
          <div class="diabox-right-item">
            <div>车场名称：</div>
            <div>{{params.park_name || '无'}}</div>
          </div>
          <div class="diabox-right-item">
            <div>车牌号：</div>
            <div>{{params.car_number || '无'}}</div>
          </div>
          <div class="diabox-right-item">
            <div>{{ params.type == 1 ? '入场' : '出场'}}口:：</div>
            <div>{{params.camera_title || '无'}}</div>
          </div>
          <div class="diabox-right-item">
            <div>{{ params.type == 1 ? '进场' : '出场'}}时间：</div>
            <div>{{params.time || '无'}}</div>
          </div>
          <div class="diabox-right-item">
            <div>放行方式：</div>
            <div>{{params.type_text || '无'}}</div>
          </div>
          <div class="diabox-right-item">
            <div>车牌类型：</div>
            <div>{{params.car_type_text || '无'}}</div>
          </div>
          <div class="diabox-right-item">
            <div>车牌类型：</div>
            <div>{{car_subdivision_type_text || '无'}}</div>
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
  import { carsJcList,childParking,carsJcListDetail } from '@/api/request'
  export default{
    data() {
      return {
		baseUrl:'http://daranzhibojiekou.daranjituan.com/',
        msg:['报表中心 /','收费报表 /','车辆进出明细'],
        title:'车辆进出明细',
        button:['下载当前报表'],
        titPath:'carsJcList',
        options:[],
        park_id:'',
        car_number:'',
        start_date:'',
        end_date:'',
        dialogDetail:false,
        tabloading:false,
        tableData:[],
        // 分页
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
        }
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
      //  车辆进出明细列表
      getTabData(start_date,end_date,park_id,car_number,currentPage,pageSize){
        this.tabloading = true
        let tstart_date = start_date;
        let tend_date = end_date;
        let tpark_id = park_id;
        let tcar_number = car_number;
        let tcurrentPage = currentPage;
        let tpageSize = pageSize

        carsJcList(tstart_date,tend_date,tpark_id,tcar_number,tcurrentPage,tpageSize)
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
      lookDetail(id){
        let tid = id
        carsJcListDetail(tid)
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
    margin-left: 1%;
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
    display: flex;
    height: 400px;
  }
  .diabox-left{
    background-color: rgb(117,128,139);
    width: 65%;
    border-radius: 4px;
  }
  .diabox-left img{
    width: 100%;
    height: 100%;
  }
  .diabox-right{
    width: 35%;
  }
  .diabox-right-item{
    display: flex;
    height: 57px;
    line-height: 57px;
    margin-left: 5%;
    font-size: 16px;
    color: #333;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .diabox-right-item div:nth-child(1){
    margin-right: auto;
  }
  .diabox-right-item div:nth-child(2){
    margin-left: auto;
    text-align: right;
  }
  >>> .el-dialog .el-dialog__title {
    font-weight: bold;
    font-size: 20px;
  }
</style>
