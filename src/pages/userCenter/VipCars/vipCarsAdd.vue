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
        </div>
      </div>
      <!-- 头部按钮end -->
    <div class="jbxx">
       <div class="jbxx-left"></div>
       <div class="jbxx-right">
        <div class="jbxx-right-top">车牌号：{{params.car_number}}</div>
        <div class="jbxx-right-bottom">
          <div class="jbxx-right-bottom-item">
            <div class="item-font" >车主名：{{params.car_user_name? params.car_user_name:'未关联'}}</div>
            <div class="item-font">车辆类型：{{params.car_subdivision_type_text}}</div>
          </div>
          <div class="jbxx-right-bottom-item">
            <div class="item-font">车辆身份：{{params.is_card_text}}</div>
            <div class="item-font">备注：{{params.remark? params.remark:'暂无'}}</div>
          </div>
          <div class="jbxx-right-bottom-item">
            <div class="item-button" @click="dialogUpdate = true">添加包时卡</div>
          </div>
        </div>
       </div>
    </div>
    <div class="jbxxoth">
      <div class="jbxxoth-left"></div>
      <div class="jbxxoth-right-bottom-item">
        <div class="jbxxoth-right-bottom-item-title">包时卡信息</div>
        <div v-if="params.card_arr" class="jbxxoth-right-bottom-item-mess" v-for="(item,index) in params.card_arr">
          停车场：{{item.park_name}}
        </div>
      </div>
      <div class="jbxxoth-right-bottom-item">
        <div class="jbxxoth-right-bottom-item-title"></div>
        <div v-if="params.card_arr" class="jbxxoth-right-bottom-item-mess" v-for="(item,index) in params.card_arr">
          包时卡到期时间：{{item.expire_date}}
        </div>
      </div>
      <div class="jbxxoth-right-bottom-item">
        <div class="jbxxoth-right-bottom-item-title"></div>
        <div v-if="params.card_arr" class="jbxxoth-right-bottom-item-mess" v-for="(item,index) in params.card_arr">
          <a-popconfirm
              title="确定删除吗?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="deleteData(item.id)"
            >
            <el-button type="danger" size="mini" icon="el-icon-delete" circle></el-button>
         </a-popconfirm>
        </div>
      </div>
    </div>
    <!-- 用户信息 -->
    <div class="usercenter">
      <div class="usercenter-title">用户信息</div>
      <div class="usercenter-mess">
        <div class="usercenter-mess-left">
          <div class="usercenter-mess-left-item">用户姓名：{{params.name?params.name:'未填写'}}</div>
          <div class="usercenter-mess-left-item">联系电话: {{params.phone?params.phone:'未填写'}}</div>
          <div class="usercenter-mess-left-item">身份证号: {{params.id_card?params.id_card:'未填写'}}</div>
        </div>
        <div class="usercenter-mess-left" style="width: auto;margin-left: 12%;"><div class="usercenter-mess-left-item">行车证:</div></div>
        <div v-if="!params.drive_license">
          未上传
        </div>
        <div v-else class="usercenter-mess-left">
          <div class="usercenter-mess-left-child">
            <el-image class="el-image" @click="lookBig" :preview-src-list="srcList" :src="params.drive_license?params.drive_license:noImg" alt=""></el-image>
          </div>
          <div class="usercenter-mess-left-child">
            <el-image class="el-image" @click="lookBig" :preview-src-list="srcList" :src="params.drive_license?params.drive_license:noImg" alt=""></el-image>
          </div>
        </div>
      </div>
      <!-- 表格类别 -->
      <div class="utabtitle">
        <div class="utabtitle-left">
           <div :class="active === index?'active':''" @click="changeTitle(index)" v-for="(item,index) in tabTitle" :key="index" class="utabtitle-left-item">{{item}}</div>
        </div>
        <div class="utabtitle-right">
         <el-date-picker
               format="yyyy-MM-dd"
               value-format="yyyy-MM-dd"
               v-model="created_at"
               type="date"
               placeholder="请选择开始日期">
             </el-date-picker>
        </div>
      </div>
      <!-- 表格类别end -->
      <!-- 表格数据 -->
      <div class="utabdate">
        <el-table
        v-show="active === 0"
        :header-cell-style="{background:'rgb(250,250,250)',color:'#606266'}"
           :data="tableData1"
           style="width: 100%;height: 100%;"
           :default-sort = "{prop: 'date', order: 'descending'}"
           >
           <el-table-column
             prop="car_type_text"
             label="类型"
             >
           </el-table-column>
           <el-table-column
             prop="park_name"
             label="停车地址"
             >
           </el-table-column>
           <el-table-column
             prop="total_money"
             label="应付">
           </el-table-column>
           <el-table-column
             prop="final_money"
             label="实付"
             style="color: rgba(0, 0, 0, 0.427450980392157);"
             >
           </el-table-column>
           <el-table-column
             prop="order_sn"
             label="订单编号"
             style="color: rgba(0, 0, 0, 0.427450980392157);"
             >
           </el-table-column>
           <el-table-column
             prop="created_at"
             label="结算时间"
             style="color: rgba(0, 0, 0, 0.427450980392157);"
             >
           </el-table-column>
         </el-table>
         <el-table
         v-show="active === 1"
         :header-cell-style="{background:'rgb(250,250,250)',color:'#606266'}"
            :data="tableData2"
            style="width: 100%;height: 100%;"
            :default-sort = "{prop: 'date', order: 'descending'}"
            >
            <el-table-column
              prop="nikename"
              label="购买人（微信名）"
              >
            </el-table-column>
            <el-table-column
              prop="money"
              label="付费金额"
              >
            </el-table-column>
            <el-table-column
              prop="card_base_name"
              label="办理类型">
            </el-table-column>
            <el-table-column
              prop="card_num"
              label="数量"
              style="color: rgba(0, 0, 0, 0.427450980392157);"
              >
            </el-table-column>
            <el-table-column
              prop="park_name"
              label="购卡停车场"
              style="color: rgba(0, 0, 0, 0.427450980392157);"
              >
            </el-table-column>
            <el-table-column
              prop="created_at"
              label="付款时间"
              style="color: rgba(0, 0, 0, 0.427450980392157);"
              >
            </el-table-column>
          </el-table>
           <el-table
           v-show="active === 2"
           :header-cell-style="{background:'rgb(250,250,250)',color:'#606266'}"
              :data="tableData3"
              style="width: 100%;height: 100%;"
              :default-sort = "{prop: 'date', order: 'descending'}"
              >
              <el-table-column
                prop="nikename"
                label="操作人"
                >
              </el-table-column>
              <el-table-column
                label="信息变更前"
                >
                <template slot-scope="scope">
                  <span>{{ scope.row.change }}:{{ scope.row.original_msg }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="信息变更后"
              >
              <template slot-scope="scope">
                <span>{{ scope.row.change }}:{{ scope.row.after_msg }}</span>
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
            v-show="active === 3"
            :header-cell-style="{background:'rgb(250,250,250)',color:'#606266'}"
               :data="tableData4"
               style="width: 100%;height: 100%;"
               :default-sort = "{prop: 'date', order: 'descending'}"
               >
               <el-table-column
                 prop="tab1"
                 label="激活人"
                 >
               </el-table-column>
               <el-table-column
                 prop="tab2"
                 label="停车场"
                 >
               </el-table-column>
               <el-table-column
                 prop="tab3"
                 label="激活时间">
               </el-table-column>
                <el-table-column
                 prop="tab4"
                 label="包时卡到期时间">
               </el-table-column>
             </el-table>
             <el-table
             v-show="active === 4"
             :header-cell-style="{background:'rgb(250,250,250)',color:'#606266'}"
                :data="tableData4"
                style="width: 100%;height: 100%;"
                :default-sort = "{prop: 'date', order: 'descending'}"
                >
                <el-table-column
                  prop="tab1"
                  label="激活人"
                  >
                </el-table-column>
                <el-table-column
                  prop="tab2"
                  label="停车场"
                  >
                </el-table-column>
                <el-table-column
                  prop="tab3"
                  label="激活时间">
                </el-table-column>
                 <el-table-column
                  prop="tab4"
                  label="包时卡到期时间">
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
    <el-dialog title="车辆信息调整" :visible.sync="dialogUpdate"  :close-on-click-modal="false">
       <div class="center">
         <div class="box">
           <div class="box-item">
             <div class="box-item-left">包时卡类型:</div>
             <div class="box-item-right">
              <el-select style="width: 80%;" v-model="card_base_id" placeholder="请选择">
                 <el-option
                   v-for="item in options1"
                   :key="item.card_base_id"
                   :label="item.card_base_name"
                   :value="item.card_base_id">
                 </el-option>
               </el-select>
             </div>
           </div>
            <div class="box-item">
               <div class="box-item-left">可使用停车场:</div>
               <div class="box-item-right" style="display: flex;">
                <div class="box-item-right-item">停车场</div>
                <div class="box-item-right-item">数量（整数）</div>
                <div class="box-item-right-item">操作</div>
               </div>
            </div>
           <!-- 选择派送的优惠卷 -->
           <div v-for="(item,index) in parkingTab" :key="index" class="box-item" style="margin: 0 auto;">
             <div class="box-item-left"></div>
             <div class="box-item-right" style="display: flex;">
               <div style="background-color: #fff;" class="box-item-right-item">{{item.park_name}}</div>
               <div style="background-color: #fff;" class="box-item-right-item">
                 <el-input class="elinput" placeholder="请输入" v-model="item.num"></el-input>
               </div>
               <div style="background-color: #fff;" class="box-item-right-item">
                 <el-button type="danger" icon="el-icon-delete" circle @click="delPark(item)"></el-button>
               </div>
             </div>
           </div>
           <!-- 选择派送的优惠卷end -->
         </div>
       </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addNo">取 消</el-button>
        <el-button type="primary" @click="addSure" v-loading="buttonLoading">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 更改用户信息end -->
  </div>
</template>

<script>
  import { vipCarsAdd,vipCarsAddList,childCardList,childParking,vipCarsAddCard,vipCarsClearCard,getCardList } from '@/api/request'
  export default {
    data() {
      return {
        msg:['用户中心  /','认证车辆管理 /','车辆详情'],
        title:'车辆详情',
        button:[],
        titPath:'vipCarsAdd',
        noImg:require('@/assets/imgs/noImg.png'),
        tabTitle:['停车记录','包时卡购买记录','信息变更记录','包时卡激活记录','包时卡变更记录'],
        active:0,
        buttonLoading:false,
        dialogUpdate:false,
        parkUse:true,
        created_at:'',
        srcList:[''],
        tableData1:[],
        tableData2:[],
        tableData3:[],
        tableData4:[],
         diaSelectVal:'',
         diayxData:'',
         parkingTab:[],
         options1:[],
         options: [],
         params:{},
         // 分页相关
         currentPage:1,
         pageSize:10,
         total:1,
         card_base_id:'',
         park_id:[],
         tableIdArr:[],
         x :''
      }
    },
    watch:{
      card_base_id:{
        handler(card_base_id){
          if(card_base_id == ''){
            this.parkUse = true
            this.parkingTab = []
          }else{
            this.getParks()
          }
        },
        deep: true,
        immediate: true,
      },
      created_at:{
        handler(created_at){
            this.search()
        },
        deep: true
      },
      currentPage:{
          handler(currentPage){
            switch(this.active){
              case 0:
              this.getHistory('/Car/parkLog')
              break;
              case 1:
              this.getHistory('/Car/carCardLog')
              break;
              case 2:
              this.getHistory('/Car/carChangeLog')
              break;
              case 3:
              this.getHistory('/Car/carCardLog')
              break;
              case 4:
              this.getHistory('/Car/carCardLog')
              break;
            }
          },
          deep: true,
          immediate: true,
        },
      car_id:{
        handler(car_id){
          if(car_id){
            this.getMessages()
          }else{
            this.$message.warning('网络错误',3);
            setTimeout(res => {
              this.$router.go(-1)
            },1000)
          }
        },
        immediate:true,
        deep:true
      }
    },
    computed:{
      car_id(){
        return this.$route.query.car_id
      }
    },
    methods:{
      delPark(item){
        for(let i = 0;i<this.parkingTab.length;i++){
          if(this.parkingTab[i].park_id == item.park_id){
            this.parkingTab.splice(i,1)
          }
        }
      },
      // 取消
      addNo(){
        this.parkingTab = []
        this.tableIdArr = []
        this.park_id = []
        this.x = 0
        this.card_base_id = ''
        setTimeout(res=>{
          this.dialogUpdate = false
        },400)
      },
      // 查看大图
      lookBig(){
        for(let i = 0;i<1;i++){
        	this.srcList[i] = this.params.drive_license
        }
      },
      // 确认添加
      addSure(){
        this.buttonLoading = true
        if(this.card_base_id == '' || this.parkingTab.length == 0){
          this.$message.warning('无可用车场',3);
          this.buttonLoading = false
        }else{
           if(this.parkingTab.findIndex(target=>target.num == '')==-1){
             let arr = []
             for(let i = 0;i<this.parkingTab.length;i++){
               arr.push({
                 park_id:this.parkingTab[i].park_id,
                 num:this.parkingTab[i].num,
                 card_id:this.parkingTab[i].card_id
               })
             }
             let params = {
              car_id:this.car_id,
              card_base_id:this.card_base_id,
              card_car_arr:JSON.stringify(arr),
              token:sessionStorage.getItem('token')
             }
             vipCarsAddCard(params)
              .then(res => {
                if(res.data.code == 200){
                  this.$message.success(res.data.msg,3);
                  setTimeout(res=>{
                    this.getMessages()
                    this.buttonLoading = false
                    this.dialogUpdate = false
                  },600)
                }else{
                  this.$message.warning(res.data.msg,3);
                  this.buttonLoading = false
                }
              })
           }else{
             this.$message.warning('请将表单填写完整',3);
             this.buttonLoading = false
           }
        }
      },
      // 删除包时卡
      deleteData(id){
        let arr = []
        arr.push(id)
        vipCarsClearCard(JSON.stringify(arr))
          .then(res =>{
            if(res.data.code == 200){
              this.$message.success(res.data.msg,3);
              this.getMessages()
            }else{
              this.$message.warning(res.data.msg,3);
            }
          })
      },
      // 标题操作
      goPage(index){
        switch(index){
          case 1:
          this.$router.push('/userCenter/VipCars/vipCarsAdmin');
          break;
        }
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
        let channel;
         switch(this.active){
           case 0:
           channel = ''
           break;
           case 1:
           channel = 1
           break;
           case 2:
           channel = ''
           break;
           case 3:
           channel = 3
           break;
           case 4:
           channel = 2
           break;
         }
        vipCarsAddList(turl,this.car_id,this.created_at,channel,this.currentPage,this.pageSize)
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
      getParks(){
        this.parkingTab = []
        childParking()
          .then(res => {
            if(res.data.code == 200){
              let arr = []
              for(let i = 0;i<res.data.data.length;i++){
                arr.push(res.data.data[i].park_id)
              }
              getCardList(JSON.stringify(arr),this.card_base_id)
                .then(res =>{
                 for(let j = 0;j<res.data.data.length;j++){
                   this.parkingTab.push({
                     card_id:res.data.data[j].card_id,
                     park_id:res.data.data[j].park_id,
                     park_name:res.data.data[j].park_name,
                     num:''
                   })
                 }
                })
            }
          })
      },
      getMessages(){
        vipCarsAdd(this.$route.query.car_id)
          .then(res =>{
            if(res.data.code == 200){
              this.params = res.data.data
            }else{
              this.$message.warning(res.data.msg,3);
            }
          })
      },
      // 获取包时卡
      getCards(){
        childCardList()
          .then(res => {
            this.options1 = res.data.data
          })
      },
      getParkList(){
        childParking()
          .then(res => {
            this.options = res.data.data
          })
      },
      changeTitle(index){
        this.active = index
        this.search()
      }
    },
    created() {
      this.getCards()
      this.getParkList()
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
  .jbxxoth{
    width: 90%;
    background-color: #007BC6;
    display: flex;
    background-color: #fff;
    margin: 0 auto;
    padding-bottom: 3%;
  }
  .jbxx-left{
    width: 4%;
    height: 200px;
    padding-top: 2.5%;
  }
  .jbxxoth-left{
     width: 4%;
  }
  .jbxxoth-right-bottom-item{
    width: 15%;
  }
  .jbxxoth-right-bottom-item-title{
    font-weight: bold;
    font-size: 21px;
    height: 30px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .jbxxoth-right-bottom-item-mess{
    height: 30px;
    line-height: 30px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 5%;
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
  .jbxx-right-bottom-item:nth-child(3){
    margin-left: 30%;
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
    height: 40px;
    line-height: 40px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
     width: 30%;
     text-align: center;
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
  .el-image{
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
    margin-left:55%;
    margin-top: 2%;
  }
  /* 修改 */
  .dialogUpdate{
    height: 400px;
    border-bottom: 1px solid #d6d6d6;
    border-top: 1px solid  #d6d6d6;
    width: 100%;
    margin: 0 auto;
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
  .center{
    margin: 0 auto;
    background-color: #fff;
    margin-top: 2%;
    padding-bottom: 2%;
    padding-top: 1%;
    border-top:1px solid #d6d6d6;
  }
  .box{
    margin: 0 auto;
  }
  .box-item{
    height: 60px;
    line-height: 60px;
    display: flex;
    margin-top: 3%;
  }
  .box-item-left{
    width: 20%;
    text-align: right;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .box-item-right{
    width: 68%;
    margin-left: 2%;
  }
  .elinput{
    width: 50%;
  }
  .box-item-img{
    background-color: rgb(117,128,139);
    border-radius: 49px;
    height: 100%;
    width: 62px;
    margin-left: 2%;
  }
  .box-item-name{
    margin-left: 1%;
    height: 60px;
    line-height: 60px;
    text-align: right;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .box-item-right-item{
    width: 33.3%;
    background-color: rgb(250,250,250);
    padding-left: 5%;
    border-bottom: 1px solid #d6d6d6;
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
