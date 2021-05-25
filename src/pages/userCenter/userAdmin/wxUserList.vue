<template>
 <div>
    <Naving />
    <Title :titPath='titPath' :msg='msg' :title='title' :button='button' />
    <div class="center">
      <div class="centerbody">
        <div class="center-title">
          <div class="center-title-left">
            <div class="center-title-left-item">
              <div class="center-title-left-item-left">微信昵称:</div>
              <div class="center-title-left-item-right"><el-input v-model="nikename" placeholder="请输入"></el-input></div>
            </div>
            <div class="center-title-left-item">
              <div class="center-title-left-item-left">手机号:</div>
              <div class="center-title-left-item-right"><el-input v-model="phone" placeholder="请输入"></el-input></div>
            </div>
            <div class="center-title-left-item">
              <div class="center-title-left-item-left">用户身份:</div>
              <div class="center-title-left-item-right">
                <el-select v-model="is_member" placeholder="会员/会员(已过期)/非会员">
                    <el-option
                      v-for="item in options"
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
            <div class="center-title-right-item" @click="search">重置</div>
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
          :header-cell-style="{background:'rgb(250,250,250)',color:'#606266'}"
             :data="tableData"
             style="width: 100%;height: 100%;"
             :default-sort = "{prop: 'date', order: 'descending'}"
             >
             <el-table-column
               label="昵称"
               >
               <template slot-scope="scope">
                 <div style="display: flex;">
                  <div class="tabImg">
                    <el-image
                        style="width: 100%; height: 100%;border-radius: 49px;"
                        :src="scope.row.head_img"
                        >
                      </el-image>
                  </div>
                  <div class="tabUserName">{{scope.row.nikename}}</div>
                 </div>
               </template>
             </el-table-column>
             <el-table-column
               prop="phone"
               label="手机号"
               >
             </el-table-column>
             <el-table-column
               prop="account"
               label="余额"
               >
             </el-table-column>
             <el-table-column
               prop="is_member_text"
               label="是否为会员">
             </el-table-column>
             <el-table-column
               prop="member_start_time"
               label="首次会员激活时间">
             </el-table-column>
             <el-table-column
               label="操作"
               >
                <template slot-scope="scope">
                  <div class="tabopt">
                   <div @click="goDetail(scope.row.user_id)">查看详情</div>
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
   import { wxUserList } from '@/api/request'
   export default{
     data() {
       return {
         msg:['用户中心  /','用户管理 /','微信用户列表'],
         title:'微信用户列表',
         button:['批量导出'],
         titPath:'wxUserList',
         options:[
           {
             label:'会员',
             value:'1'
           },
           {
             label:'非会员',
             value:'2'
           },
           {
             label:'过期会员',
             value:'3'
           }
         ],
         nikename:'',
         phone:'',
         is_member:'',
         tableData:[],
         tabloading:false,
         // 分页相关
         currentPage:1,
         pageSize:10,
         total:1
       }
     },
     watch:{
       currentPage:{
           handler(currentPage){
             this.getTabData(this.nikename,this.phone,this.is_member,this.currentPage,this.pageSize)
           },
           deep: true,
           immediate: true,
         },
     },
     methods:{
       // 查看详情
       goDetail(id){
         this.$router.push({
           name: 'wxUserDetail',
           query: {
            user_id:id,
           }
         });
       },
       // 重置
       reload(){
        this.nikename = ''
        this.phone = ''
        this.is_member = ''
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
       //  微信用户列表
       getTabData(nikename,phone,is_member,currentPage,pageSize){
         this.tabloading = true
         let tnikename = nikename;
         let tphone = phone;
         let tis_member = is_member;
         let tcurrentPage = currentPage;
         let tpageSize = pageSize

         wxUserList(tnikename,tphone,tis_member,tcurrentPage,tpageSize)
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
       }
     },
     created() {
       this.getTabData(this.nikename,this.phone,this.is_member,this.currentPage,this.pageSize)
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
    width: 30%;
    display: flex;
  }
  .center-title-left-item-left{
    line-height: 40px;
    width: 25%;
    height: 40px;
    text-align: right;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .center-title-left-item-right{
    margin-left: 1%;
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
</style>
