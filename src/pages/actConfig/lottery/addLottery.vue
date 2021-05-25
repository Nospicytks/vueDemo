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
    <div class="center" v-loading="pageLoading">
      <!-- 上部设置 -->
      <div class="box">
        <div class="box-item">
          <div class="box-item-font">*活动名称:</div>
          <div class="box-item-button"><el-input v-model="name" placeholder="给抽奖活动起个名"></el-input></div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*活动时间:</div>
          <div class="box-item-button"  style="display: flex;">
            <div>
              <el-date-picker
                    v-model="start_date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
            </div>
            <div style="margin-left: 1%;margin-right: 1%;">至</div>
            <div>
              <el-date-picker
                    v-model="end_date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
            </div>
          </div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*活动类型:</div>
          <div style="margin-left: 1%;">
            <el-radio v-model="type" :label="1">无限制</el-radio>
            <el-radio v-model="type" :label="2">抽奖消耗积分</el-radio>
          </div>
          <div style="margin-left: 1%;">
             <el-input placeholder="请输入消耗积分数值" v-model="points" :disabled="type == 1"></el-input>
          </div>
        </div>
        <div class="box-item">
          <div class="box-item-font">*参与次数限制（单选）:</div>
          <div style="margin-left: 1%;">
            <el-radio v-model="participate_type" :label="1">一天X次</el-radio>
          </div>
          <div style="margin-left: 5%;white-space: normal;overflow: hidden;text-overflow: ellipsis;">每人每天抽</div>
          <div style="margin-left: 1%;"><el-input :disabled="participate_type == 2" v-model="participate_numa" placeholder="请输入次数"></el-input></div>
        </div>
        <div class="box-item">
          <div class="box-item-font"></div>
          <div style="margin-left: 1%;">
            <el-radio v-model="participate_type" :label="2">一人X次</el-radio>
          </div>
          <div style="margin-left: 5%;white-space: normal;overflow: hidden;text-overflow: ellipsis;">每人总共抽</div>
          <div style="margin-left: 1%;"><el-input :disabled="participate_type == 1" v-model="participate_numb" placeholder="请输入次数"></el-input></div>
        </div>
        <div class="box-item">
          <div class="box-item-font">参与送积分:</div>
          <div style="margin-left: 3%;white-space: normal;overflow: hidden;text-overflow: ellipsis;">抽奖赠送积分</div>
          <div style="margin-left: 1%;"><el-input v-model="send_points" placeholder="请输入赠送积分数"></el-input></div>
          <div style="margin-left: 3%;white-space: normal;overflow: hidden;text-overflow: ellipsis;"><el-checkbox v-model="is_send_points">只给没中奖的人</el-checkbox></div>
        </div>
        <div class="box-item">
          <div class="box-item-font">中奖名单公布:</div>
          <div class="box-item-button"><el-checkbox v-model="is_announce">不公布</el-checkbox></div>
        </div>
        <div class="box-item">
          <div class="box-item-font">抽奖规则:</div>
          <div class="box-item-button">
            <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" ></quill-editor>
          </div>
        </div>
      </div>
       <!-- 上部设置end -->
       <!-- 未中奖设置 -->
       <div class="box">
          <div>未中奖设置:</div>
          <div class="box-item">
            <div class="box-item-font">*未中奖名称:</div>
            <div class="box-item-button"><el-input v-model="no_draw_name" placeholder="谢谢参与"></el-input></div>
          </div>
          <div class="box-item">
            <div class="box-item-font">*提示语:</div>
            <div class="box-item-button"><el-input v-model="no_draw" placeholder="很遗憾没中奖"></el-input></div>
          </div>
          <div class="box-item">
            <div class="box-item-font">上传图片:</div>
            <div class="box-item-button" style="width: 20%;">
              <uploadImg :pic="no_draw_pic" @filename="imageUrl($event)"></uploadImg>
            </div>
            <div style="color: rgba(0, 0, 0, 0.247058823529412);white-space: normal;overflow: hidden;text-overflow: ellipsis;">
              建议尺寸96X96像素，支持JPG、PNG、JEPG格式
            </div>
          </div>
       </div>
       <!-- 未中奖设置end -->
       <!-- 奖品设置 -->
       <div class="box">
           <div>奖品设置:&nbsp;&nbsp;&nbsp;&nbsp;<el-button type="primary" :disabled="is_edit == 1" @click="addArr">添加</el-button></div>
            <div class="box-fa" v-for="(item,index) in prize_arr">
             <a-popconfirm
                 title="确定删除吗?"
                 ok-text="确定"
                 cancel-text="取消"
                 @confirm="remove(item)"
               >
               <el-button :disabled="is_edit == 1" type="danger" icon="el-icon-delete" circle></el-button>
             </a-popconfirm>
             <div class="box-item">
               <div class="box-item-font">*奖品名称:</div>
               <div class="box-item-button"><el-input :disabled="is_edit == 1" type="text" v-model="item.name" placeholder="最多6个字"  maxlength="6" show-word-limit></el-input></div>
             </div>
             <div class="box-item">
               <div class="box-item-font">奖品:</div>
               <div style="margin-left: 1%;">
                 <el-radio v-model="item.type" :disabled="is_edit == 1" :label="1">优惠券</el-radio>
               </div>
               <div style="margin-left: 1%;">
                 <el-select v-model="item.coupon_id" :disabled="item.type !== 1 || is_edit == 1" placeholder="请选择">
                     <el-option
                       v-for="item2 in couponList"
                       :key="item2.coupon_id"
                       :label="item2.coupon_name"
                       :value="item2.coupon_id">
                     </el-option>
                   </el-select>
               </div>
             </div>
             <div class="box-item">
               <div class="box-item-font"></div>
               <div style="margin-left: 1%;">
                 <el-radio v-model="item.type" :label="2">积分</el-radio>
               </div>
               <div style="margin-left: 1%;"><el-input :disabled="item.type !== 2 || is_edit == 1" v-model="item.points" placeholder="请输入积分数值"></el-input></div>
             </div>
             <div class="box-item">
               <div class="box-item-font"></div>
               <div style="margin-left: 1%;">
                 <el-radio v-model="item.type" :disabled="is_edit == 1" :label="3">包时卡</el-radio>
               </div>
               <div style="margin-left: 1%;">
                 <el-select v-model="item.card_base_id" :disabled="item.type !== 3 || is_edit == 1" placeholder="请选择">
                     <el-option
                       v-for="item3 in cardList"
                       :key="item3.card_base_id"
                       :label="item3.card_base_name"
                       :value="item3.card_base_id">
                     </el-option>
                   </el-select>
               </div>
             </div>
             <div class="box-item">
               <div class="box-item-font"></div>
               <div style="margin-left: 1%;">*包时卡激活有效时间：</div>
               <div style="margin-left: 1%;">
                 <el-input :disabled="is_edit == 1 || item.type !== 3" type="text" v-model="item.card_activation_time" placeholder="输入数字"></el-input>
               </div>
               <div style="margin-left: 1%;">
                 天
               </div>
             </div>
             <div class="box-item">
               <div class="box-item-font">上传图片:</div>
               <div class="box-item-button" style="width: 20%;">
                 <uploadImg :disabled="is_edit == 1" :pic="item.pic" @filename="imageUrlArr($event,index)"></uploadImg>
               </div>
               <div style="color: rgba(0, 0, 0, 0.247058823529412);white-space: normal;overflow: hidden;text-overflow: ellipsis;">
                 建议尺寸96X96像素，支持JPG、PNG、JEPG格式
               </div>
             </div>
             <div class="box-item" style="margin-top: 15%;">
               <div class="box-item-font">数量（份）:</div>
               <div class="box-item-button"><el-input v-model="item.num" placeholder="输入奖品数量"></el-input></div>
             </div>
             <div class="box-item">
               <div class="box-item-font">中奖概率（%）:</div>
               <div class="box-item-button"><el-input v-model="item.probability" placeholder="输入中奖概率"></el-input></div>
             </div>
          </div>
        </div>
       <!-- 奖品设置end -->
    </div>
    <br><br>
  </div>
</template>

<script>
  import uploadImg from '../../../components/uploadImg.vue'
  import { childCouponList,childCardList,addLotteryInfo,addLotteryEdit } from '@/api/request'
  export default{
    components: {
      uploadImg
    },
    data() {
      return {
        msg:['活动设置  /','抽奖活动 /','添加抽奖活动'],
        title:'添加抽奖活动',
        button:['提交','取消'],
        titPath:'addLottery',
        editorOption: {
           placeholder: '编辑文章内容',
           modules:{
             toolbar:[
               [],
               [],
               [{'color':[]}]
             ]
           }
        },
        pageLoading:false,
        // 优惠卷列表
        cardList:[],
        couponList:[],
        is_edit:0,
        // 页面参数
        name:'',
        start_date:'',
        end_date:'',
        type:1,
        points:'',
        participate_type:1,
        participate_numa:'',
        participate_numb:'',
        is_send_points:false,
        send_points:'',
        is_announce:false,
        content:'',
        no_draw_name:'',
        no_draw:'',
        no_draw_pic:'',
        no_draw_piclook:'',
        // 奖品列表
        prize_arr:[
          {
            name:'',
            type:1,
            coupon_id:'',
            points:'',
            card_base_id:'',
            card_activation_time:'',
            pic:'',
            piclook:'',
            num:'',
            probability:''
          }
        ]
      }
    },
    watch:{
      lottery_id:{
        handler(lottery_id){
          this.lookStatus()
        },
        deep:true,
        immediate:true
      }
    },
    computed:{
      lottery_id(){
        return this.$route.query.lottery_id
      }
    },
    methods:{
      // 标题操作
      goPage(index){
        switch(index){
          case 1:
          this.$router.push('/actConfig/lottery/lotteryList');
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
          this.$router.push('/actConfig/lottery/lotteryList');
          break;
        }
      },
      imageUrl(val){
        this.no_draw_pic = val.imageUrl
        this.no_draw_piclook = val.filename
      },
      imageUrlArr(val,index){
        this.prize_arr[index].pic = val.imageUrl
        this.prize_arr[index].piclook = val.filename
      },
      // 提交修改
      changeData(){
        let lottery_id;
        switch(this.is_edit){
          case 0:
          lottery_id = ''
          break;
          case 1:
          lottery_id = this.$route.query.lottery_id
          break;
        }
        let is_send_points;
        switch(this.is_send_points){
          case true:
          is_send_points = 1
          break;
          case false:
          is_send_points = 2
          break;
        }
        let is_announce;
        switch(this.is_announce){
          case true:
          is_announce = 2
          break;
          case false:
          is_announce = 1
          break;
        }
        let params;

        let prize_edit_arr = []
        for(let i = 0;i<this.prize_arr.length;i++){
          prize_edit_arr.push({
            lottery_prize_id:this.prize_arr[i].lottery_prize_id,
            num:this.prize_arr[i].num,
            probability:this.prize_arr[i].probability
          })
        }
        let participate_num;
        if(this.participate_numa !== ''){
          participate_num = this.participate_numa
        }else if(this.participate_numb !== ''){
          participate_num = this.participate_numb
        }
        let params1 = {
          lottery_id:lottery_id,
          name:this.name,
          start_date:this.start_date,
          end_date:this.end_date,
          type:this.type,
          points:this.points,
          participate_type:this.participate_type,
          participate_num:participate_num,
          is_send_points:is_send_points,
          send_points:this.send_points,
          is_announce:is_announce,
          content:this.content,
          no_draw_name:this.no_draw_name,
          no_draw:this.no_draw,
          no_draw_pic:this.no_draw_pic,
          prize_edit_arr:JSON.stringify(prize_edit_arr),
          token:sessionStorage.getItem('token')
        }
        let prize_arr = []
        for(let i = 0;i<this.prize_arr.length;i++){
          prize_arr.push({
           name:this.prize_arr[i].name,
           type:this.prize_arr[i].type,
           coupon_id:this.prize_arr[i].coupon_id,
           points:this.prize_arr[i].points,
           card_base_id:this.prize_arr[i].card_base_id,
           card_activation_time:this.prize_arr[i].card_activation_time,
           pic:this.prize_arr[i].pic,
           num:this.prize_arr[i].num,
           probability:this.prize_arr[i].probability
          })
        }
        let params2 = {
          name:this.name,
          start_date:this.start_date,
          end_date:this.end_date,
          type:this.type,
          points:this.points,
          participate_type:this.participate_type,
          participate_num:participate_num,
          is_send_points:is_send_points,
          send_points:this.send_points,
          is_announce:is_announce,
          content:this.content,
          no_draw_name:this.no_draw_name,
          no_draw:this.no_draw,
          no_draw_pic:this.no_draw_pic,
          prize_arr:JSON.stringify(prize_arr),
          token:sessionStorage.getItem('token')
        }
        if(this.is_edit == 1){
          params = params1
        }else{
          params = params2
        }
        addLotteryEdit(params)
          .then(res => {
            if(res.data.code == 200){
              this.$message.success(res.data.msg,3);
              setTimeout(res => {
                this.$router.push('/actConfig/lottery/lotteryList');
              },1000)
            }else{
              this.$message.warning(res.data.msg,3);
            }
          })
      },
      // 看是新增还是修改
      lookStatus(){
        this.pageLoading = true
          if(this.$route.query.lottery_id == undefined){
            this.name = ''
            this.start_date = ''
            this.end_date = ''
            this.type = 1
            this.points = ''
            this.participate_type = 1
            this.participate_numa = ''
            this.participate_numb = ''
            this.is_send_points = false
            this.send_points = ''
            this.is_announce = false
            this.content = ''
            this.no_draw_name = ''
            this.no_draw = ''
            this.no_draw_pic = ''
            this.prize_arr = [
              {
                name:'',
                type:1,
                coupon_id:'',
                points:'',
                card_base_id:'',
                card_activation_time:'',
                pic:'',
                num:'',
                probability:''
              }
            ]
            // 新增
            this.is_edit = 0
            this.pageLoading = false
          }else{
            this.getInfo()
            // 修改
            this.is_edit = 1
          }
      },
      // 数组添加
      addArr(){
        this.prize_arr.push({
         name:'',
         type:'1',
         coupon_id:'',
         points:'',
         card_base_id:'',
         card_activation_time:'',
         pic:'',
         piclook:'',
         num:'',
         probability:''
        });
      },
      // 数组移除
      remove(item){
        var index = this.prize_arr.indexOf(item)
        if(this.prize_arr.length == 1){
          this.$message.warning('不能在减了!',3);
          return false
        }else{
          if (index !== -1) {
            this.prize_arr.splice(index, 1)
          }
        }
      },
      // 获取优惠卷列表
      getCoupList(){
        childCouponList()
          .then(res => {
            if(res.data.code == 200){
              this.couponList = res.data.data
            }else{
              this.$message.warning(res.data.msg,3);
            }
          })
      },
      // 获取配置页数据
      getInfo(){
        addLotteryInfo(this.$route.query.lottery_id)
          .then(res => {
            if(res.data.code == 200){
              this.name = res.data.data.name
              this.start_date = res.data.data.start_date
              this.end_date = res.data.data.end_date
              this.type = res.data.data.type
              this.points = res.data.data.points
              this.participate_type = res.data.data.participate_type
              if(res.data.data.participate_type == 1){
                this.participate_numa = res.data.data.participate_num
              }else{
                this.participate_numa = res.data.data.participate_num
              }
              if(res.data.data.is_send_points == 1){
                this.is_send_points = true
              }else{
                this.is_send_points = false
              }
              this.send_points = res.data.data.send_points
              if(res.data.data.is_announce == 1){
                this.is_announce = false
              }else{
                this.is_announce = true
              }
              this.content = res.data.data.content
              this.no_draw_name = res.data.data.no_draw_name
              this.no_draw = res.data.data.no_draw
              this.no_draw_pic = res.data.data.no_draw_pic
              this.prize_arr = res.data.data.prize_arr

              this.pageLoading = false
            }else{
              this.$message.warning(res.data.msg,3);
            }
          })
      },
      // 获取包时卡列表
      getCarList(){
        childCardList()
          .then(res => {
            if(res.data.code == 200){
              this.cardList = res.data.data
            }else{
              this.$message.warning(res.data.msg,3);
            }
          })
      }
    },
    created() {
      this.getCoupList()
      this.getCarList()
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
    width: 50%;
    margin: 0 auto;
    padding-top: 2%;
    padding-bottom: 5%;
  }
  .box-item{
    display: flex;
    height: 40px;
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
     width: 65%;
     margin-left: 1%;
  }

  /deep/ .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }
  /deep/ .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  /deep/ .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
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
  .box-fa{
    margin-top: 5%;
    border-bottom: 1px solid #d6d6d6;
    padding-bottom: 5%;
  }
   /* 头部按钮end */
</style>
