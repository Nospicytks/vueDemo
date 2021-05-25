<template>
 <div style="background-color: rgb(240,242,245);">
    <Naving />
    <Title :titPath='titPath' :msg='msg' :title='title' :button='button' />
    <div class="center">
      <div class="centerbody">
        <div class="center-title">
          <div class="center-title-left">
            <div class="center-title-left-item">
              <div class="center-title-left-item-left">优惠券名:</div>
              <div class="center-title-left-item-right">
                <el-select style="width: 80%;" v-model="coupon_arr" multiple placeholder="请选择">
                   <el-option
                     v-for="item in options"
                     :key="item.coupon_id"
                     :label="item.coupon_name"
                     :value="item.coupon_id">
                   </el-option>
                 </el-select>
              </div>
            </div>
            <div class="center-title-left-item">
              <div class="center-title-left-item-left">状态:</div>
              <div class="center-title-left-item-right">
                <el-select v-model="status" placeholder="请选择">
                    <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
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
             style="width: 100%;height: 100%;min-height: 400px;"
             :default-sort = "{prop: 'date', order: 'descending'}"
             >
             <el-table-column
               prop="nikename"
               label="创建人"
               >
             </el-table-column>
             <el-table-column
               label="活动时间"
               >
               <template slot-scope="scope">
                 <span>{{ scope.row.deliver_start_date }}</span>
                 <span>~</span>
                 <span>{{ scope.row.deliver_end_date }}</span>
               </template>

             </el-table-column>
             <el-table-column
               prop="deliver_type_text"
               label="派券事件">
             </el-table-column>
             <el-table-column
               label="活动状态"
               >
               <template slot-scope="scope">
                 <span v-if="scope.row.status_text == '进行中'" style="color: #1890FF;">{{ scope.row.status_text }}</span>
                 <span v-if="scope.row.status_text == '已结束'" style="color: red;">{{ scope.row.status_text }}</span>
                 <span v-if="scope.row.status_text == '已暂停'" style="color: #008000">{{ scope.row.status_text }}</span>
               </template>
             </el-table-column>
             <el-table-column
               prop="parkingOpt"
               label="操作"
               >
                <template slot-scope="scope">
                  <div class="tabopt">
                   <div @click="lookHistory(scope.row.id)">查看数据</div>
                   <div class="tabs"></div>
                   <a-popconfirm
                       title="确定暂停吗?"
                       ok-text="确定"
                       cancel-text="取消"
                       @confirm="statusChange(scope.row.id)"
                     >
                     <div v-if="scope.row.status_text !== '已结束' && scope.row.status_text !== '已暂停'">暂停</div>
                   </a-popconfirm>
                   <a-popconfirm
                       title="确定开启吗?"
                       ok-text="确定"
                       cancel-text="取消"
                       @confirm="statusChange(scope.row.id)"
                     >
                     <div v-if="scope.row.status_text !== '已结束' && scope.row.status_text !== '进行中'">开启</div>
                   </a-popconfirm>
                   <div v-if="scope.row.status_text !== '已结束'" class="tabs"></div>
                   <div v-if="scope.row.status_text !== '已结束'" @click="update(scope.row)">修改</div>
                   <div v-if="scope.row.status_text !== '已结束'" class="tabs"></div>
                   <a-popconfirm
                       title="确定删除吗?"
                       ok-text="确定"
                       cancel-text="取消"
                       @confirm="deleteData(scope.row.id)"
                     >
                     <div>删除</div>
                   </a-popconfirm>
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
  </div>
</template>

<script>
  import { automaticPjList,childCouponList,automaticPjStatus,automaticPjDelete } from '@/api/request'
  export default{
    data() {
      return {
        msg:['活动设置  /','派券设置 /','自动派卷任务列表'],
        title:'自动派卷任务列表',
        button:['批量导出','+ 新建'],
        titPath:'automaticPjList',
        tableData:[],
        options:[],
        options2:[
          {
            label:'进行中',
            value:'1'
          },
          {
            label:'已结束',
            value:'3'
          },
          {
            label:'已暂停',
            value:'2'
          }
        ],
        coupon_arr:[],
        status:'',
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
            this.getTabData(this.coupon_arr,this.status,this.currentPage,this.pageSize)
          },
          deep: true,
          immediate: true,
        },
    },
    methods:{
      lookHistory(id){
        this.$router.push({
          name:'automaticPjHistory',
          query:{
            id:id
          }
        })
      },
      // 修改
      update(data){
        this.$router.push({
          name: 'automaticPjDo',
          query: {
            id:data.id,
            deliver_type:JSON.stringify(data.deliver_type),
            coupon_arr:JSON.stringify(data.coupon_arr),
            deliver_start_date:data.deliver_start_date,
            deliver_end_date:data.deliver_end_date,
            is_long:data.is_long,
            pic:data.pic,
            status:data.status
          }
        });
      },
      // 删除数据
      deleteData(id){
        let delId = id
        automaticPjDelete(delId)
          .then(res => {
            if(res.data.code == 200){
             this.getTabData(this.coupon_arr,this.status,this.currentPage,this.pageSize)
            }else{
              this.$notify.error({
              	title: '错误',
              	message: res.data.msg,
              	duration: 0
              });
            }
          })
      },
      // 更改状态
      statusChange(id){
        let changeId = id
        automaticPjStatus(changeId)
          .then(res => {
            if(res.data.code == 200){
             this.getTabData(this.coupon_arr,this.status,this.currentPage,this.pageSize)
            }else{
              this.$notify.error({
              	title: '错误',
              	message: res.data.msg,
              	duration: 0
              });
            }
          })
      },
      // 重置
      reload(){
        this.coupon_arr = ''
        this.status = ''
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
      // 自动派卷任务列表
      getTabData(coupon_arr,status,currentPage,pageSize){
        this.tabloading = true

        let tcoupon_arr = coupon_arr;
        let tstatus = status;
        let tcurrentPage = currentPage;
        let tpageSize = pageSize

        automaticPjList(tcoupon_arr,tstatus,tcurrentPage,tpageSize)
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
      // 获取优惠卷列表
      getCoupons(){
        childCouponList()
          .then(res => {
            if(res.data.code == 200){
              this.options = res.data.data
            }else{
              this.$notify.error({
              	title: '错误',
              	message: res.data.msg,
              	duration: 0
              });
            }
          })
      }
    },
    created() {
      this.getCoupons()
      this.getTabData(this.coupon_arr,this.status,this.currentPage,this.pageSize)
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
  .center-title-left-item-left{
    line-height: 40px;
    width: 30%;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .center-title-left-item-right{
    margin-left: 2%;
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
</style>
