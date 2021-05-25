<template>
  <div style="background-color: rgb(240,242,245);">
    <Naving />
    <!-- 头部按钮 -->
    <div class="title">
        <div class="title-font">
          <div class="title-font-left">
            <div class="title-font-left-top">
              <div :class="index === (msg.length-1)?'last':''" class="title-font-left-top-item" v-for="(item,index) in msg" :key="index" >
                {{item}}
              </div>
            </div>
            <div class="title-font-left-bottom">{{title}}</div>
          </div>
          <div class="title-font-right">
            <div :class="item === '取消'?'qx':''" @click="goPages(index)" v-for="(item,index) in button" :key="index" class="title-font-right-item">{{item}}</div>
          </div>
        </div>
      </div>
      <!-- 头部按钮end -->
    <!-- <Title :titPath='titPath' :msg='msg' :title='title' :button='button' /> -->
    <div class="center">
      <div class="centerbody">
        <div class="center-title">
          <div class="center-title-left">
            <div class="center-title-left-item">
              <div class="center-title-left-item-left">姓名:</div>
              <div class="center-title-left-item-right"><el-input v-model="name" placeholder="请输入"></el-input></div>
            </div>
            <div class="center-title-left-item">
              <div class="center-title-left-item-left">手机号:</div>
              <div class="center-title-left-item-right"><el-input v-model="phone" placeholder="请输入"></el-input></div>
            </div>
            <div class="center-title-left-item">
              <div class="center-title-left-item-left">职务:</div>
              <div class="center-title-left-item-right">
                <el-select v-model="group_id" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.title"
                      :value="item.id">
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
          v-loading='tabloading'
          :header-cell-style="{background:'rgb(250,250,250)',color:'#606266'}"
             :data="tableData"
             style="width: 100%;height: 100%;min-height: 400px;"
             :default-sort = "{prop: 'date', order: 'descending'}"
             >
             <el-table-column
               prop="nikename"
               label="姓名"
               >
             </el-table-column>
             <el-table-column
               prop="admin_name"
               label="手机号"
               >
             </el-table-column>
             <el-table-column
               prop="title"
               label="职务">
             </el-table-column>
             <el-table-column
               prop="created_at"
               label="创建时间"
               >
             </el-table-column>
             <el-table-column
               label="操作"
               >
                <template slot-scope="scope">
                  <div class="tabopt">
                   <div @click="update(scope.row)">修改</div>
                   <div class="tabs"></div>
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
  import { jcconfigOfficeList,jcconfigOfficeDelete,childJcconfigGroupList } from '@/api/request'
  export default{
    data() {
      return {
        tabloading:false,
        msg:['基础设置  /','职员管理    /','职员列表'],
        title:'职员列表',
        button:['批量导出','+ 新建'],
        titPath:'officeList',
        name:'',
        phone:'',
        group_id:'',
        options:[],
        tableData:[],
        // 分页相关
        currentPage:1,
        pageSize:10,
        total:1
      }
    },
    watch:{
      currentPage:{
          handler(currentPage){
          this.getTabData(this.group_id,this.name,this.phone,this.currentPage,this.pageSize)
          },
          deep: true,
          immediate: true,
        },
    },
    methods:{
      // 按钮操作
      goPages(index){
        switch (index){
          case 1:
          this.$router.push('/jcconfig/officeListUpdate');
          break;
        }
      },
      // 职务列表
      getOptions(){
        childJcconfigGroupList()
          .then(res => {
             if(res.data.code == 200){
                this.options = res.data.data
             }else{
               this.$message.warning(res.data.msg,3);
             }
          })
      },
      // 重置
      reload(){
        this.group_id = ''
        this.name = ''
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
      // 删除
      deleteData(id){
        let delId = id
        jcconfigOfficeDelete(delId)
          .then(res => {
             if(res.data.code == 200){
                this.$message.success('删除成功！',3);
                this.getTabData(this.group_id,this.name,this.phone,this.currentPage,this.pageSize)
             }else{
               this.$message.warning(res.data.msg,3);
               this.getTabData(this.group_id,this.name,this.phone,this.currentPage,this.pageSize)
             }
          })
      },
      // 修改
      update(data){

        this.$router.push({
          name: 'officeListUpdate',
          query: {
            id:data.id,
            admin_name:data.admin_name,
            nikename:data.nikename,
            group_id:data.group_id,
            park_ids:data.park_ids
          }
        });
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
      // 管理员列表
      getTabData(group_id,name,phone,currentPage,pageSize){
        this.tabloading = true
        let zygroup_id = group_id;
        let zyname = name;
        let zyphone = phone;
        let zycurrentPage = currentPage
        let zypageSize = pageSize

        jcconfigOfficeList(zygroup_id,zyname,zyphone,zycurrentPage,zypageSize)
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
      this.getOptions()
      this.getTabData(this.group_id,this.name,this.phone,this.currentPage,this.pageSize)
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
    padding-bottom: 2%;
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
