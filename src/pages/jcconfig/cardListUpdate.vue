<template>
  <div style="background-color: rgb(240,242,245);">
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
           <div :class="item === '取消'?'qx':''" @click="goPages(index)" v-for="(item,index) in button" :key="index" class="title-font-right-item">{{item}}</div>
         </div>
       </div>
     </div>
     <!-- 头部按钮end -->
    <div class="center">
      <div class="box">
        <div class="box-item">
          <div class="box-item-font">*名称:</div>
          <div class="box-item-button"><el-input v-model="card_base_name" placeholder="给目标起个名字"></el-input></div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*同时购多张卡:</div>
          <div class="box-item-button">
            <el-checkbox  v-model="is_buy_more">支持</el-checkbox>
          </div>
        </div>
        <div class="box-item">
          <div class="box-item-font">可使用停车场（多选）:</div>
          <div class="box-item-button">

              <el-select
              style="width: 100%;"
              v-model="park_id"
              multiple
              @change="selectChange(park_id)"
              placeholder="请选择">
                 <el-option
                   v-for="item in card_arr"
                   :key="item.park_id"
                   :label="item.park_name"
                   :value="item.park_id"
                   >
                 </el-option>
               </el-select>
          </div>
          <div>
            <el-button type="primary" style="margin-left: 20%;" @click="selectAll">全部</el-button>
          </div>
        </div>
        <div class="box-item" style="width: 150%;margin-left: -17%;">
          <div class="box-item-font">各停车场收费标准及有效时间:</div>
          <div class="box-item-button" >
            <div class="box-item-right-item">停车场</div>
            <div class="box-item-right-item">购卡费用</div>
            <div class="box-item-right-item">有效期时长（整数）</div>
            <div class="box-item-right-item">有效期时长单位</div>
          </div>
        </div>
        <!-- 表格 -->
        <div v-for="(item,index) in tableData" :key="index" class="box-item" style="width: 150%;margin-left: -17%;margin-top: 0;">
          <div class="box-item-font"></div>
          <div class="box-item-button" >
            <div class="box-item-right-item" style="border:none;background-color:#fff;padding-top:1%;padding-bottom:1%;">{{item.park_name}}</div>
            <div class="box-item-right-item" style="border:none;background-color:#fff;padding-top:1%;padding-bottom:1%;">
              <el-input style="width: 100%;" v-model="item.cost" class="elinput" placeholder="输入购卡费用"></el-input>
            </div>
            <div class="box-item-right-item" style="border:none;background-color:#fff;padding-top:1%;padding-bottom:1%;">
              <el-input style="width: 100%;" v-model="item.effective_time" class="elinput" placeholder="请输入时长"></el-input>
            </div>
            <div class="box-item-right-item" style="border:none;background-color:#fff;padding-top:1%;padding-bottom:1%;">
              <el-select v-model="item.effective_unit" placeholder="请选择">
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
        <!-- 表格 -->
      </div>
      <div class="box">
        <div class="box-item">
          <div class="box-item-font">*购卡后会员到期时间:</div>
          <div class="box-item-button">
              <div style="width: 30%;"><el-input :disabled="is_synchronize" v-model="memberNum" placeholder="输入数字"></el-input></div>
              <div>个</div>
              <div style="margin-left: 3%;width: 30%;">
                <el-select v-model="member_unit" :disabled="is_synchronize"  placeholder="请选择">
                    <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </div>
              <div style="width: 20%;margin-left: 20%;">
                <el-checkbox v-model="is_synchronize">与包时卡同步</el-checkbox>
              </div>
          </div>
        </div>
      </div>
    </div>
    <br><br>
  </div>
</template>

<script>
  import { cardListDetail,childParking,cardListUpdate } from '@/api/request'
  export default{
    data() {
      return {
        msg:['用户中心 /','会员规则管理 /','添加包时卡'],
        title:'添加包时卡（修改包时卡规则）',
        button:['提交','取消'],
        titPath:'cardListUpdate',
        options:[],
        options2:[
          {
            value:1,
            label:'日'
          },
          {
            value:2,
            label:'月'
          },
          {
            value:3,
            label:'年'
          }
        ],
        tableData:[],
        is_edit:'',
        card_base_name:'',
        member_unit:'',
        is_buy_more:false,
        memberNum:'',
        member_time:'',
        arr:[],
        card_arr:[],
        park_id:[],
        park_name:[],
        card_All:[],
        is_synchronize:false,
        tableIdArr:[]
      }
    },
    watch:{
      is_synchronize:{
        handler(is_synchronize){
          if(is_synchronize == true){
            this.memberNum = ''
            this.member_unit = ''
          }
        },
        deep:true,
        immediate:true
      }
    },
    methods:{
      // 全部
      selectAll(){
        let arr = []
        for(let i = 0;i<this.card_arr.length;i++){
          arr.push(this.card_arr[i].park_id)
        }
        this.park_id = arr
        this.selectChange(arr)
      },
      selectChange(parkId){
        console.log(parkId)
        if (this.tableIdArr.length > parkId.length){
          for(var index in this.tableIdArr){
            for (var x in this.card_arr){
              if (this.tableIdArr[index] == this.card_arr[x].park_id && parkId.indexOf(this.tableIdArr[index]) == -1){
                this.tableData.splice(index,1)
                this.tableIdArr.splice(index,1)
              }
            }
          }
        }else{
          for(var index in parkId){
            for (var x in this.card_arr){
              if (parkId[index] == this.card_arr[x].park_id && this.tableIdArr.indexOf(parkId[index]) == -1){
                this.tableData.push({
                  park_id:this.card_arr[x].park_id,
                  park_name:this.card_arr[x].park_name,
                  cost:'',
                  effective_time:'',
                  effective_unit:'',
                })
                this.tableIdArr.push(parkId[index])
              }
            }
          }
        }
      },
      // 标题操作
      goPage(index){
        switch(index){
          case 1:
          this.$router.push('/jcconfig/cardList');
        }
      },
      // 按钮操作
      goPages(index){
        switch (index){
          case 0:
          this.editData()
          break;
          case 1:
          this.$router.push('/jcconfig/cardList');
          break;
        }
      },

      // 看是新增还是修改
      lookStatus(){
        if(this.$route.query.id == undefined){
          this.card_base_name = ''
          this.memberNum = ''
          this.member_time = ''
          this.is_buy_more = false
          this.park_id = []
          this.park_name = []
          this.is_synchronize = false
          // 新增
          this.is_edit = 0
          this.getParkList()
        }else{
          this.is_edit = 1
          this.getMessDetail()
        }
      },
      // 获取停车场列表
      getParkList(){
        childParking()
        .then(res => {
           if(res.data.code == 200){
             this.card_arr =  res.data.data
           }else{
             this.$message.warning(res.data.msg,3);
           }
        })
      },
      // 修改
      editData(){
      let card_base_id;
      switch(this.is_edit){
        case 0:
        card_base_id = ''
        break;
        case 1:
        card_base_id = this.$route.query.id
        break;
      }
      let is_buy_more;
      switch(this.is_buy_more){
        case true:
        is_buy_more = 1
        break;
        case false:
        is_buy_more = 2
        break;
      }
      let arr = []
      for(let i = 0;i<this.tableData.length;i++){
        arr.push({
          park_id:this.tableData[i].park_id,
          cost:this.tableData[i].cost,
          effective_time:this.tableData[i].effective_time,
          effective_unit :this.tableData[i].effective_unit
        })
      }
      let is_synchronize;
      switch(this.is_synchronize){
        case true:
        is_synchronize = 1
        break;
        case false:
        is_synchronize = 2
        break;
      }
      let params = {
        card_base_id:card_base_id,
        card_base_name:this.card_base_name,
        is_buy_more:is_buy_more,
        card_arr:JSON.stringify(arr),
        member_time:this.memberNum,
        member_unit:this.member_unit,
        is_synchronize:is_synchronize,
        is_edit:this.is_edit,
        token:sessionStorage.getItem('token')
      }
        cardListUpdate(params)
          .then(res => {
            if(res.data.code == 200){
                this.$message.success(res.data.msg,3);
                setTimeout(res=>{
                  this.$router.push('/jcconfig/cardList');
                },1000)
            }else{
              this.$message.warning(res.data.msg,3);
            }
          })
      },
      // 获取修改页详情信息
      async getMessDetail(){

        await this.getParkList()

          cardListDetail(this.$route.query.id)
          .then(res => {
             if(res.data.code == 200){
               this.card_base_name = res.data.data.card_base_name
               this.member_unit = res.data.data.member_unit
               // 购买多张
               if(res.data.data.is_buy_more == 1){
                 this.is_buy_more = true
               }else{
                 this.is_buy_more = false
               }
               // 与包时卡同步
               if(res.data.data.is_synchronize == 1){
                 this.is_synchronize = true
               }else{
                 this.is_synchronize = false
               }
                this.member_time = res.data.data.member_time
                this.tableData = res.data.data.card_arr
                this.tableIdArr = []
                for(var index in this.tableData){
                  this.tableIdArr.push(this.tableData[index].park_id)
                }

             let arr = [];
             for(let i = 0;i<res.data.data.card_arr.length;i++){
                arr[i] = res.data.data.card_arr[i].park_id
             }
             this.park_id = arr

             }else{
               this.$message.warning(res.data.msg,3);
             }
          })
      }
    },
    created() {
      this.lookStatus()
    }
  }
</script>

<style scoped>
  .center{
    width: 80%;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 2%;
  }
  .box{
    width: 60%;
    margin-left:5%;
    padding-top: 2%;
    padding-bottom: 5%;
  }
  .box-item{
    display: flex;
    line-height: 40px;
    margin-top: 5%;
  }
  .box-item-font{
    text-align: right;
    width: 34%;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .box-item-button{
     width: 55%;
     margin-left: 1%;
     display: flex;
  }
  .box-item-right-item{
    width: 25%;
    background-color: rgb(250,250,250);
    padding-left: 5%;
    border-bottom: 1px solid #d6d6d6;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
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
