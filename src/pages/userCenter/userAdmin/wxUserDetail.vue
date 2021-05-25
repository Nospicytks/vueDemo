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
            <div :class="item === '取消'?'qx':''" v-for="(item,index) in button" :key="index" class="title-font-right-item">{{item}}</div>
          </div>
        </div>
      </div>
      <!-- 头部按钮end -->
    <div class="jbxx" v-loading="pageLoading">
       <div class="jbxx-left">
         <div class="jbxx-left-img">
           <el-image
               style="width: 100%; height: 100%;border-radius: 49px;"
               :src="userInfo.head_img"
               >
             </el-image>
         </div>
       </div>
       <div class="jbxx-right">
        <div class="jbxx-right-top">手机号：{{userInfo.phone}}</div>
        <div class="jbxx-right-bottom">
          <div class="jbxx-right-bottom-item">
            <div class="item-font">用户昵称：{{userInfo.nikename}}</div>
            <div class="item-font">首次会员注册时间：{{userInfo.member_start_time}}</div>
          </div>
          <div class="jbxx-right-bottom-item">
            <div class="item-font">会员类型：
              <span v-if="userInfo.is_member == '1'">会员</span>
              <span v-if="userInfo.is_member == '2'">非会员</span>
              <span v-if="userInfo.is_member == '3'">过期会员</span>
            </div>
            <div class="item-font">消费金额：{{userInfo.cost_money}}</div>
          </div>
          <div class="jbxx-right-bottom-item">
            <div class="item-font">会员到期时间: {{userInfo.member_end_time}}</div>
            <div class="item-font">余额：{{userInfo.account}}</div>
          </div>
          <div class="jbxx-right-bottom-item">
            <div class="item-button" @click="dialogUpdate = true">更改用户信息</div>
            <div class="item-button" @click="dialogTk = true">退款操作</div>
          </div>
        </div>
       </div>
    </div>
    <!-- 用户信息 -->
    <div class="usercenter">
      <div class="usercenter-title">用户信息</div>
      <div class="usercenter-mess">
        <div class="usercenter-mess-left">
          <div class="usercenter-mess-left-item">用户姓名：
            <span v-if="!userInfo.name">未认证</span>
            <span v-else>{{userInfo.name}}</span>
          </div>
          <div class="usercenter-mess-left-item">联系电话:
            <span v-if="!userInfo.phone">未认证</span>
            <span v-else>{{userInfo.phone}}</span>
          </div>
          <div class="usercenter-mess-left-item">身份证号:
            <span v-if="!userInfo.id_card">未认证</span>
            <span v-else>{{userInfo.id_card}}</span>
          </div>
        </div>
        <div class="usercenter-mess-left" style="width: auto;margin-left: 12%;"><div class="usercenter-mess-left-item">身份证:</div></div>
        <div class="usercenter-mess-left">
          <div class="usercenter-mess-left-child"><img :src="userInfo.card_positive_pic" alt=""></div>
          <div class="usercenter-mess-left-child"><img :src="userInfo.card_back_pic" alt=""></div>
        </div>
      </div>
      <!-- 表格类别 -->
      <div class="utabtitle">
        <div class="utabtitle-left">
           <div :class="active === index?'active':''" @click="changeTitle(index)" v-for="(item,index) in tabTitle" :key="index" class="utabtitle-left-item">{{item}}</div>
        </div>
        <div class="utabtitle-right">
          <el-date-picker
          @change="search"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
                v-model="created_at"
                type="date"
                placeholder="搜索操作时间">
              </el-date-picker>
        </div>
      </div>
      <!-- 表格类别end -->
      <!-- 表格数据 -->
      <div class="utabdate">
        <el-table
        v-loading="tabloading"
        v-show="active === 0"
        :header-cell-style="{background:'rgb(250,250,250)',color:'#606266'}"
           :data="tableData1"
           style="width: 100%;height: 100%;"
           :default-sort = "{prop: 'date', order: 'descending'}"
           >
           <el-table-column
             prop="pay_type"
             label="操作类型"
             >
           </el-table-column>
           <el-table-column
             prop="park.car_number"
             label="办理车辆"
             >
           </el-table-column>
           <el-table-column
             prop="park.order_name"
             label="类型">
           </el-table-column>
           <el-table-column
             prop="park.is_overtime"
             label="数量"
             style="color: rgba(0, 0, 0, 0.427450980392157);"
             >
           </el-table-column>
           <el-table-column
             prop="park.final_money"
             label="金额"
             style="color: rgba(0, 0, 0, 0.427450980392157);"
             >
           </el-table-column>
           <el-table-column
             prop="park.created_at"
             label="操作时间"
             style="color: rgba(0, 0, 0, 0.427450980392157);"
             >
           </el-table-column>
         </el-table>
         <el-table
         v-loading="tabloading"
         v-show="active === 1"
         :header-cell-style="{background:'rgb(250,250,250)',color:'#606266'}"
            :data="tableData2"
            style="width: 100%;height: 100%;"
            :default-sort = "{prop: 'date', order: 'descending'}"
            >
            <el-table-column
              prop="nikename"
              label="操作人"
              >
            </el-table-column>
            <el-table-column
              prop="money"
              label="金额"
              >
            </el-table-column>
            <el-table-column
              prop="remark"
              label="事由备注">
            </el-table-column>
            <el-table-column
              prop="created_at"
              label="操作时间"
              style="color: rgba(0, 0, 0, 0.427450980392157);"
              >
            </el-table-column>
          </el-table>
          <el-table
          v-loading="tabloading"
          v-show="active === 2"
          :header-cell-style="{background:'rgb(250,250,250)',color:'#606266'}"
             :data="tableData3"
             style="width: 100%;height: 100%;"
             :default-sort = "{prop: 'date', order: 'descending'}"
             >
             <el-table-column
               label="操作人"
               >
             </el-table-column>
             <el-table-column
               label="信息变更前"
               >
               <template slot-scope="scope">
                 <div>
                  <span>{{ scope.row.change }}</span>
                  <span>{{ scope.row.original_msg }}</span>
                 </div>
               </template>
             </el-table-column>
             <el-table-column
               label="信息变更后">
               <template slot-scope="scope">
                 <div>
                  <span>{{ scope.row.change }}</span>
                  <span>{{ scope.row.after_msg }}</span>
                 </div>
               </template>
             </el-table-column>
             <el-table-column
               prop="created_at"
               label="操作时间"
               style="color: rgba(0, 0, 0, 0.427450980392157);"
               >
             </el-table-column>
           </el-table>
           <el-table
           v-loading="tabloading"
           v-show="active === 3"
           :header-cell-style="{background:'rgb(250,250,250)',color:'#606266'}"
              :data="tableData4"
              style="width: 100%;height: 100%;"
              :default-sort = "{prop: 'date', order: 'descending'}"
              >
              <el-table-column
                prop="reward_type"
                label="操作类型"
                >
              </el-table-column>
              <el-table-column
                prop="points_num"
                label="变动积分数值"
                >
              </el-table-column>
              <el-table-column
                prop="after_points"
                label="最后积分">
              </el-table-column>
              <el-table-column
                prop="created_at"
                label="操作时间"
                style="color: rgba(0, 0, 0, 0.427450980392157);"
                >
              </el-table-column>
            </el-table>
            <el-table
            v-loading="tabloading"
            v-show="active === 4"
            :header-cell-style="{background:'rgb(250,250,250)',color:'#606266'}"
               :data="tableData5"
               style="width: 100%;height: 100%;"
               :default-sort = "{prop: 'date', order: 'descending'}"
               >
               <el-table-column
                 prop="tab1"
                 label="类型"
                 >
               </el-table-column>
               <el-table-column
                 prop="tab2"
                 label="奖品明细"
                 >
               </el-table-column>
               <el-table-column
                 prop="tab3"
                 label="中奖时间">
               </el-table-column>
             </el-table>
             <el-table
             v-loading="tabloading"
             v-show="active === 5"
             :header-cell-style="{background:'rgb(250,250,250)',color:'#606266'}"
                :data="tableData6"
                style="width: 100%;height: 100%;"
                :default-sort = "{prop: 'date', order: 'descending'}"
                >
                <el-table-column
                  prop="channel_text"
                  label="操作类型"
                  >
                </el-table-column>
                <el-table-column
                  prop="money"
                  label="操作金额"
                  >
                </el-table-column>
                <el-table-column
                  prop="after_money"
                  label="操作后余额">
                </el-table-column>
                <el-table-column
                  prop="created_at"
                  label="操作时间">
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
      <!-- 表格数据end -->
    </div>
    <!-- 用户信息end -->
    <!-- 更改用户信息 -->
    <el-dialog title="会员信息调整" :visible.sync="dialogUpdate"  :close-on-click-modal="false">
    	<div class="dialogUpdate">
        <div class="dialogUpdate-item">
          <div class="dialogUpdate-item-left">用户姓名（请勿随意修改）：</div>
          <div class="dialogUpdate-item-right"><el-input v-model="userInfo.name" placeholder="请输入内容"></el-input></div>
        </div>
        <div class="dialogUpdate-item">
          <div class="dialogUpdate-item-left">会员类型：</div>
          <div class="dialogUpdate-item-right">
            <el-select style="width: 100%;" v-model="userInfo.is_member" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </div>
        </div>
        <transition name="el-zoom-in-top">
          <div class="dialogUpdate-item" v-show="userInfo.is_member == 1">
            <div class="dialogUpdate-item-left">会员有效期：</div>
            <div class="dialogUpdate-item-right" style="display: flex;">
             <div>
               <el-date-picker
               format="yyyy-MM-dd"
               value-format="yyyy-MM-dd"
                     v-model="userInfo.member_start_time"
                     type="date"
                     placeholder="请选择开始日期">
                   </el-date-picker>
             </div>
             <div style="margin-left: 1%;margin-right: 1%;">至</div>
             <div>
               <el-date-picker
               format="yyyy-MM-dd"
               value-format="yyyy-MM-dd"
                     v-model="userInfo.member_end_time"
                     type="date"
                     placeholder="请选择结束日期">
                   </el-date-picker>
             </div>
            </div>
          </div>
         </transition>
        <div class="dialogUpdate-item">
          <div class="dialogUpdate-item-left">用户电话：</div>
          <div class="dialogUpdate-item-right"><el-input v-model="userInfo.phone" placeholder="请输入内容"></el-input></div>
        </div>
        <div class="dialogUpdate-item">
          <div class="dialogUpdate-item-left">身份证号：</div>
          <div class="dialogUpdate-item-right"><el-input v-model="userInfo.id_card" placeholder="请输入内容"></el-input></div>
        </div>
        <div class="dialogUpdate-item">
          <div class="dialogUpdate-item-left">余额：</div>
          <div class="dialogUpdate-item-right"><el-input v-model="userInfo.account" placeholder="请输入内容"></el-input></div>
        </div>
    	</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="getUserDetail">重 置</el-button>
        <el-button type="primary" @click="changeSure">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 更改用户信息end -->
    <!-- 退款操作 -->
    <el-dialog title="会员退款" :visible.sync="dialogTk"  :close-on-click-modal="false">
    	<div class="dialogUpdate">
        <div class="dialogUpdate-item">
          <div class="dialogUpdate-item-left">退款用户：</div>
          <div class="dialogUpdate-item-right">
            <span v-if="!userInfo.name">未认证</span>
            <span v-else>{{userInfo.name}}</span>
          </div>
        </div>
        <div class="dialogUpdate-item">
          <div class="dialogUpdate-item-left">微信昵称：</div>
          <div class="dialogUpdate-item-right">
            <span>{{userInfo.nikename}}</span>
          </div>
        </div>
        <div class="dialogUpdate-item">
          <div class="dialogUpdate-item-left">手机号：</div>
          <div class="dialogUpdate-item-right">{{userInfo.phone}}</div>
        </div>
        <div class="dialogUpdate-item">
          <div class="dialogUpdate-item-left"><sup style="color: red;">*</sup>退款金额：</div>
          <div class="dialogUpdate-item-right"><el-input v-model="money" placeholder="请输入内容"></el-input></div>
        </div>
        <div class="dialogUpdate-item">
          <div class="dialogUpdate-item-left">备注：</div>
          <div class="dialogUpdate-item-right">
            <el-input type="textarea" v-model="remark" placeholder="请输入内容"></el-input>
          </div>
        </div>
    	</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="refresh">重 置</el-button>
        <el-button type="primary" @click="returnSure">退 款</el-button>
      </div>
    </el-dialog>
    <!-- 退款操作end -->
  </div>
</template>

<script>
  import { wxUserDetail,wxUserHistoryList,wxUserEdit,wxUserReturn } from '@/api/request'
  export default {
    data() {
      return {
        msg:['用户中心  /','用户管理 /','用户详情'],
        title:'用户详情',
        button:[],
        titPath:'wxUserDetail',
        noImg:require('@/assets/imgs/noImg.png'),
        tabTitle:['消费记录','退款记录','信息更改记录','积分记录','中奖记录','余额记录'],
        active:0,
        dialogUpdate:false,
        dialogTk:false,
        tabloading:false,
        pageLoading:false,
        tableData1:[],
        tableData2:[],
        tableData3:[],
        tableData4:[],
        tableData5:[],
        tableData6:[],
        created_at:'',
        options:[
          {
            label:'会员',
            value:1
          },
          {
            label:'非会员',
            value:2
          },
          {
            label:'过期会员',
            value:3
          }
        ],
        userInfo:{
          phone:'',
          nikename:'',
          head_img:'',
          is_member:'',
          member_start_time:'',
          member_end_time:'',
          name:'',
          id_card:'',
          card_positive_pic:'',
          card_back_pic:'',
          account:'',
          cost_money:'',
          account:''
        },
        remark:'',
        money:'',
        // 分页相关
        currentPage:1,
        pageSize:10,
        total:1
      }
    },
    watch:{
      userInfo:{
        handler(userInfo){
          if(userInfo.is_member !== 1){
            userInfo.member_start_time = ''
            userInfo.member_end_time = ''
          }
        },
        deep: true,
        immediate: true
      },
      currentPage:{
          handler(currentPage){
            switch(this.active){
              case 0:
              this.getHistory('/User/consumptionLog')
              break;
              case 1:
              this.getHistory('/User/refundLog')
              break;
              case 2:
              this.getHistory('/User/userChangeLog')
              break;
              case 3:
              this.getHistory('/User/userPointsLog')
              break;
              case 4:
              this.getHistory('/User/userLotteryLog')
              break;
              case 5:
              this.getHistory('/User/userAccountLog')
              break;
            }
          },
          deep: true,
          immediate: true,
        },
      user_id:{
        handler(user_id){
          if(user_id !== '' && user_id !== null && typeof(user_id) !== "undefined"){
            this.getUserDetail()
          }else{
            this.$message.warning('错误,请刷新重试!',3);
            setTimeout(res=>{
              this.$router.go(-1)
            },1000)
          }
        },
        deep:true,
        immediate:true
      }
    },
    computed:{
      user_id(){
        return this.$route.query.user_id;
      }
    },
    methods:{
      // 标题操作
      goPage(index){
        switch(index){
          case 1:
          this.$router.push('/userCenter/userAdmin/wxUserList');
          break;
        }
      },
      // 退款
      returnSure(){
        if(this.money == ''){
          this.$message.warning('请填写退款金额!',3);
        }else{
          wxUserReturn(this.user_id,this.money,this.remark)
            .then(res => {
              if(res.data.code == 200){
                this.$message.success(res.data.msg,3);
                this.getUserDetail()
                this.search()
                setTimeout(res => {
                  this.dialogTk = false;
                },1000)
              }else{
                this.$message.warning(res.data.msg,3);
              }
            })
        }
      },
      // 重置
      refresh(){
        this.remark = ''
        this.money = ''
      },
      // 修改信息
      changeSure(){
        if(this.userInfo.name == '' || this.userInfo.is_member == '' || this.userInfo.phone == '' || this.userInfo.id_card == ''){
          this.$message.warning('请将表单填写完整',3);
        }else{
          if(this.userInfo.is_member == 1 && (this.userInfo.member_start_time == '' || this.userInfo.member_start_time == null || this.userInfo.member_end_time == '' || this.userInfo.member_end_time == null)){
            this.$message.warning('请完善会员有效区!',3);
          }else{
            let params = {
              user_id:this.user_id,
              name:this.userInfo.name,
              is_member:this.userInfo.is_member,
              member_start_time:this.userInfo.member_start_time,
              member_end_time:this.userInfo.member_end_time,
              phone:this.userInfo.phone,
              id_card:this.userInfo.id_card,
              account:this.userInfo.account,
              token:sessionStorage.getItem('token')
            }
            wxUserEdit(params)
              .then(res => {
                if(res.data.code == 200){
                  this.$message.success(res.data.msg,3);
                  this.getUserDetail()
                  this.search()
                  setTimeout(res => {
                    this.dialogUpdate = false;
                  },1000)
                }else{
                  this.$message.warning(res.data.msg,3);
                }
              })
          }
        }
      },
      // 获取用户详情信息
      getUserDetail(){
        this.pageLoading = true
        wxUserDetail(this.user_id)
          .then(res => {
            if(res.data.code == 200){
              this.userInfo = res.data.data
              this.pageLoading = false
            }else{
              this.$message.warning(res.data.msg,3);
            }
          })
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
      // 获取日志列表
      getHistory(url){
        this.tabloading = true
        let turl = url
        wxUserHistoryList(turl,this.user_id,this.created_at,this.currentPage,this.pageSize)
          .then(res => {
            if(res.data.code == 200){
              this.total = res.data.data.total
              switch(this.active){
                case 0:
                this.tableData1 = res.data.data.data
                break;
                case 1:
                this.tableData2 = res.data.data.data
                break;
                case 2:
                this.tableData3 = res.data.data.data
                break;
                case 3:
                this.tableData4 = res.data.data.data
                break;
                case 4:
                this.tableData5 = res.data.data.data
                break;
                case 5:
                this.tableData6 = res.data.data.data
                break;
              }
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
      changeTitle(index){
        this.active = index
        this.search()
      }
    }
  }
</script>

<style scoped>
  .jbxx{
    width: 90%;
    height: 200px;
    margin: 0 auto;
    margin-top: 1%;
    display: flex;
    background-color: #fff;
  }
  .jbxx-left{
    width: 7%;
    height: 200px;
    padding-top: 2.5%;
  }
  .jbxx-left-img{
    width: 70px;
    height: 70px;
    border-radius: 49px;
    margin: 0 auto;
    background-color: rgb(117,128,139);
  }
  .jbxx-right{
    width: 93%;
    height: 200px;
  }
  .jbxx-right-top{
    margin-top: 4%;
    font-weight: bold;
    font-size: 21px;
  }
  .jbxx-right-bottom{
    height: 100px;
    display: flex;
  }
  .jbxx-right-bottom-item{
    width: 25%;
    margin-top: 0.5%;
  }
  .jbxx-right-bottom-item:nth-child(4){
    display: flex;
  }
  .item-font{
    height: 40px;
    line-height: 40px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 15px;
  }
  .item-button{
    background-color: rgb(24,144,255);
    color: #fff;
    border-radius: 4px;
    padding-left: 3%;
    padding-right: 3%;
    height: 40px;
    line-height: 40px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-button:nth-child(2){
    margin-left: 10%;
  }
  /* 用户信息 */
  .usercenter{
    width: 85%;
    margin: 0 auto;
    background-color: #fff;
    margin-top: 1%;
  }
  .usercenter-title{
    height: 60px;
    line-height: 60px;
    font-weight: bold;
    font-size: 17.5px;
    padding-left: 3%;
    border-bottom: 1px solid rgba(233, 233, 233, 1);
  }
  .usercenter-mess{
      height: 135px;
      margin-top: 2%;
      display: flex;
  }
  .usercenter-mess-left{
    width: 25%;
  }
  .usercenter-mess-left:nth-child(1){
    margin-left: 3%;
  }
  .usercenter-mess-left:nth-child(3){
    margin-left: 2%;
    width: 40%;
    display: flex;
  }
  .usercenter-mess-left-item{
    height: 45px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .usercenter-mess-left-child{
    width: 35%;
    height: 135px;
    background-color: rgb(204,204,204);
  }
  .usercenter-mess-left-child img{
    width: 100%;
    height: 100%;
  }
  .usercenter-mess-left-child:nth-child(2){
    margin-left: 10%;
  }
  .utabtitle{
    margin-top: 2%;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid rgba(233, 233, 233, 1);
    display: flex;
  }
  .utabtitle-left{
    width: 65%;
    display: flex;
  }
  .utabtitle-left-item{
    text-align: center;
    width: 20%;
  }
  .active{
    border-bottom: 2px solid rgba(24, 144, 255, 1);
    color: rgba(24, 144, 255, 1);
  }
  .utabtitle-right{
    width: 15%;
    margin-left: 15%;
  }
  .utabdate{
    width: 95%;
    padding-bottom: 3%;
    margin: 0 auto;
    margin-top: 2%;
  }
  .pages{
    margin-left:50%;
    margin-top: 2%;
  }
  /* 修改 */
  .dialogUpdate{
    border-bottom: 1px solid #d6d6d6;
    border-top: 1px solid  #d6d6d6;
    width: 100%;
    margin: 0 auto;
    padding-bottom: 5%;
  }
  .dialogUpdate-item{
    height: 40px;
    line-height: 40px;
    display: flex;
    margin-top: 3%;
  }
  .dialogUpdate-item-left{
    width: 25%;
    height: 40px;
    text-align: right;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .dialogUpdate-item-right{
    width: 50%;
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
