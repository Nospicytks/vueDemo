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
            <div :class="item === '取消'?'qx':''" @click="goPages(index)" v-for="(item,index) in button" :key="index" class="title-font-right-item">{{item}}</div>
          </div>
        </div>
      </div>
      <!-- 头部按钮end -->
    <div class="center">
      <div class="box">
        <el-form  ref="ruleForm" label-width="200px" class="demo-ruleForm">
          <el-form-item  label="*企业名:">
           <el-input class="elinput" v-model="company_name" placeholder="给目标起个名字"></el-input>
          </el-form-item>
          <el-form-item  label="*单一停车场免费上限数:">
           <el-input class="elinput" v-model="free_max" placeholder="输入数量"></el-input>
          </el-form-item>
          <el-form-item  label="*合作停车场（多选）">
           <el-select v-model="park_ids" multiple class="elinput" placeholder="请选择">
               <el-option
                 v-for="item in parkList"
                 :key="item.park_id"
                 :label="item.park_name"
                 :value="item.park_id">
               </el-option>
             </el-select>
             <el-button type="primary" style="margin-left: 5%;" @click="selectAll">全部</el-button>
          </el-form-item>
          <el-form-item  label="*合作有效期:">
            <div class="box-item-button" style="display: flex;">
              <div>
                <el-date-picker
                      :disabled="is_long"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      v-model="start_date"
                      type="date"
                      placeholder="请选择开始日期">
                    </el-date-picker>
              </div>
              <div style="margin-left: 1%;margin-right: 1%;">至</div>
              <div>
                <el-date-picker
                      :disabled="is_long"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      v-model="end_date"
                      type="date"
                      placeholder="请选择结束日期">
                    </el-date-picker>
              </div>
              <div style="margin-left: 3%;"><el-checkbox v-model="is_long">长期</el-checkbox></div>
            </div>
          </el-form-item>
          <el-form-item  label="合作状态:">
           <el-radio v-model="is_cooperation" label="1">合作</el-radio>
           <el-radio v-model="is_cooperation" label="2">暂停合作</el-radio>
          </el-form-item>
          <el-form-item  label="合作到期提醒:">
            <el-checkbox v-model="is_remind">开启</el-checkbox>
          </el-form-item>

          <el-form-item
          label="*提醒时间:"
            v-if="is_remind"
            v-for="(item,index) in remind_arr"
            :key="index"
          >
          <!-- :prop="'domains.' + index + '.val'" -->
          <div style="display: flex;">
            <span style="margin-left: 1%;">到期前</span>
            <el-input style="width: 20%;margin-left: 1%;" v-model="item.val" placeholder="输入天数"></el-input>
            <span style="margin-left: 1%;">天提醒管理员</span>
            <el-button style="margin-left: 5%;border:none;" class="el-icon-remove-outline" @click.prevent="removeDomain(item)"></el-button>
          </div>
          </el-form-item>
          <el-form-item v-if="is_remind">
            <div @click="addDomain" style="height: 35px;line-height: 35px;text-align: center;width: 60%;border: 1px dashed #d6d6d6;">
              +  添加
            </div>
          </el-form-item>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { childParking,partnerEdit } from '@/api/request'
  export default {
    data(){
      return {
        msg:['车厂事务管理  /','合作泊车管理 /','添加合作泊车企业'],
        title:'添加合作泊车企业',
        button:['提 交','取消'],
        titPath:'partnerAdd',
        parkList: [],
        company_name:'',
        free_max:'',
        remind_arr:[],
        park_ids:[],
        start_date:'',
        end_date:'',
        is_cooperation:'1',
        is_remind:false,
        is_long:true
      }
    },
    watch:{
      is_long:{
        handler(is_long){
          if(is_long == true){
            this.start_date = ''
            this.end_date = ''
          }
        },
        deep: true,
        immediate: true
      },
      is_remind:{
        handler(is_remind){
          if(is_remind == false){
            this.remind_arr = [{val:''}]
          }else{
            if(this.$route.query.remind_arr == []){
              this.remind_arr = [{val:''}]
            }
          }
        }
      },
      deep: true,
      immediate: true,
    },
    methods:{
      // 全部
      selectAll(){
        let arr = []
        for(let i = 0;i<this.parkList.length;i++){
          arr.push(this.parkList[i].park_id)
        }
        this.park_ids = arr
      },
      // 标题操作
      goPage(index){
        switch(index){
          case 1:
          this.$router.push('/affairsManagement/cooperation/partnerList');
          break;
        }
      },
      // 按钮操作
      goPages(index){
        switch (index){
          case 0:
          this.changeData()
          break;
          case 1:
          this.$router.push('/affairsManagement/cooperation/partnerList');
          break;
        }
      },
      // 修改/增加
      changeData(){
        if(this.company_name == '' || this.free_max == '' || this.park_ids == ''){
          this.$message.warning('请将表单填写完整',3);
        }else{
          if(this.is_long == false && (this.start_date == '' || this.start_date == null || this.end_date == '' || this.end_date == null)){
            this.$message.warning('请完善合作有效期时间段!',3);
          }else{
            if(this.remind_arr.findIndex(target=>target.val == '')==-1){
              let company_id;
              switch(this.is_edit){
                case 0:
                company_id = ''
                break;
                case 1:
                company_id = this.$route.query.company_id
                break;
              }
              let is_remind;
              switch(this.is_remind){
                case true:
                is_remind = '1'
                break;
                case false:
                is_remind = '2'
                break;
              }
              let is_long;
              switch(this.is_long){
                case true:
                is_long = '1'
                break;
                case false:
                is_long = '2'
                break;
              }
              let remind_arr = []
              let params = {}
              if(typeof(this.remind_arr[0]) == "undefined"){
                 params = {
                   company_id:company_id,
                   company_name:this.company_name,
                   free_max:this.free_max,
                   park_ids:JSON.stringify(this.park_ids),
                   is_long:is_long,
                   start_date:this.start_date,
                   end_date:this.end_date,
                   is_cooperation:this.is_cooperation,
                   is_remind:is_remind,
                   token:sessionStorage.getItem('token')
                 }
              }else if(this.remind_arr[0].val == ''){
                params = {
                  company_id:company_id,
                  company_name:this.company_name,
                  free_max:this.free_max,
                  park_ids:JSON.stringify(this.park_ids),
                  is_long:is_long,
                  start_date:this.start_date,
                  end_date:this.end_date,
                  is_cooperation:this.is_cooperation,
                  is_remind:is_remind,
                  token:sessionStorage.getItem('token')
                }
              }else{
                for(let i = 0;i<this.remind_arr.length;i++){
                  remind_arr.push(this.remind_arr[i].val)
                }
                params = {
                  company_id:company_id,
                  company_name:this.company_name,
                  free_max:this.free_max,
                  park_ids:JSON.stringify(this.park_ids),
                  is_long:is_long,
                  start_date:this.start_date,
                  end_date:this.end_date,
                  is_cooperation:this.is_cooperation,
                  is_remind:is_remind,
                  remind_arr:JSON.stringify(remind_arr),
                  token:sessionStorage.getItem('token')
                }
              }
              partnerEdit(params)
                .then( res=> {
                  if(res.data.code == 200){
                     this.$message.success(res.data.msg,3);
                       setTimeout(res=>{
                         this.$router.push('/affairsManagement/cooperation/partnerList');
                       },1000)
                  }else{
                    this.$message.warning(res.data.msg,3);
                  }
                })
            }else{
              this.$message.warning('请将提醒时间填写完整!',3);
              return false
            }
          }
        }
      },
      // 看是新增还是修改
      lookStatus(){
          if(this.$route.query.company_id == undefined){
            this.company_name = ''
            this.free_max = ''
            this.remind_arr = [{val:''}],
            this.park_ids = []
            this.start_date = ''
            this.end_date = ''
            this.is_cooperation = '1'
            this.is_remind = false
            this.is_long = true
            // 新增
            this.is_edit = 0
          }else{
           this.company_name = this.$route.query.company_name
           this.free_max = this.$route.query.free_max
           this.remind_arr = []
           for(let i = 0;i<this.$route.query.remind_arr.length;i++){
              this.remind_arr.push({val:this.$route.query.remind_arr[i]})
           }
           this.park_ids = JSON.parse(this.$route.query.park_ids)
           if(this.$route.query.start_date == '0000-00-00'){
             this.start_date = ''
             this.end_date = ''
           }else{
             this.start_date = this.$route.query.start_date
             this.end_date = this.$route.query.end_date
           }
           this.is_cooperation = this.$route.query.is_cooperation
           if(this.$route.query.is_remind == '1'){
             this.is_remind =true
           }else{
             this.is_remind =false
           }
           if(this.$route.query.is_long == '1'){
             this.is_long =true
           }else{
             this.is_long =false
           }
           // 修改
           this.is_edit = 1
          }
        },
      // 获取停车场数据
      getParkList(){
        childParking()
          .then( res=> {
            if(res.data.code == 200){
              this.parkList = res.data.data
            }else{
              this.$message.warning(res.data.msg,3);
            }
          })
      },
      removeDomain(item) {
        var index = this.remind_arr.indexOf(item)
        if (index !== -1) {
          this.remind_arr.splice(index, 1)
        }
      },
      addDomain() {
        this.remind_arr.push({
          val: ''
        });
      }
    },
    created() {
      this.getParkList()
      this.lookStatus()
    }
  }
</script>

<style scoped>
  .center{
    width: 90%;
    margin: 0 auto;
    background-color: #fff;
    margin-top: 2%;
    padding-bottom: 2%;
    padding-top: 1%;
  }
  .box{
    width: 50%;
    margin: 0 auto;
  }
  .box-item{
    height: 60px;
    line-height: 60px;
    display: flex;
    margin-top: 3%;
  }
  .box-item-left{
    width: 30%;
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
    width: 50%;
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
