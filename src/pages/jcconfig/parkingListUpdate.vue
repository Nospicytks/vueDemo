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
    <div class="center" v-loading="pageLoading">
      <div class="box">
        <el-form ref="ruleForm" label-width="200px" class="demo-ruleForm">
          <el-form-item  label="*车场名称:">
            <el-input class="elinput" placeholder="给目标起个名字" v-model="park_name"></el-input>
          </el-form-item>
          <el-form-item  label="*设置网点地址:">
            <span style="color: rgba(0, 0, 255, 0.847058823529412);cursor: pointer;" @click="dialogVisible = true">设置</span>
          </el-form-item>
          <el-form-item  label="*车位数:">
            <el-input style="width: 15%;" placeholder="请输入" v-model="park_num"></el-input>
          </el-form-item>
          <el-form-item  label="*收费标准（元/小时）:">
            <el-input style="width: 15%;" placeholder="请输入" v-model="charges"></el-input>
          </el-form-item>
          <el-form-item  label="联系电话:">
            <el-input style="width: 15%;" placeholder="请输入" v-model="park_phone"></el-input>
          </el-form-item>
          <el-form-item  label="所在商圈:">
            <el-input style="width: 15%;" placeholder="请输入" v-model="address">
            </el-input>
          </el-form-item>
          <el-form-item label="营业时间:">
            <el-time-picker
                format='HH:mm'
                value-format="HH:mm"
                  style="width: 15%;"
                v-model="business_hours_start"
                placeholder="开始时间">
              </el-time-picker>
            <span>~</span>
            <el-time-picker
            format='HH:mm'
            value-format="HH:mm"
                style="width: 15%;"
                v-model="business_hours_end"
                placeholder="开始时间">
              </el-time-picker>
          </el-form-item>
          <el-form-item  label="免费时间（min）:">
            <el-input style="width: 15%;" placeholder="请输入" v-model="free_time">
            </el-input>
          </el-form-item>
          <el-form-item  label="结账后有效离场时间（min）:">
            <el-input style="width: 15%;" placeholder="请输入" v-model="departure_time"></el-input>
          </el-form-item>
          <el-form-item  label="可使用包时卡（多选）:">
           <el-select
          @change="selectChange(card_base_id)"
           v-model="card_base_id"
           multiple class="elinput"
           placeholder="请选择">
               <el-option
                 v-for="item in card_arr"
                 :key="item.card_base_id"
                 :label="item.card_base_name"
                 :value="item.card_base_id"
                 :disabled="item.disabled"
                 >
               </el-option>
             </el-select>
          </el-form-item>
          <el-form-item  label="*优惠券发放数量:">
            <div class="box-item-right" style="display: flex;">
              <div class="box-item-right-item">包时卡</div>
              <div class="box-item-right-item">购卡费用</div>
              <div class="box-item-right-item">有效期时长（整数）</div>
              <div class="box-item-right-item">有效期时长单位</div>
            </div>
            <!-- 选择派送的优惠卷 -->
            <div v-for="(item,index) in tableData" :key="index" class="box-item" style="margin: 0 auto;">
              <div class="box-item-right" style="display: flex;">
                <div style="background-color: #fff;" class="box-item-right-item">{{item.card_base_name}}</div>
                <div style="background-color: #fff;" class="box-item-right-item">
                  <el-input  style="width: 100%;" v-model="item.cost" class="elinput" placeholder="输入购卡费用"></el-input>
                </div>
                <div style="background-color: #fff;" class="box-item-right-item">
                  <el-input style="width: 100%;" v-model="item.effective_time" class="elinput" placeholder="请输入时长"></el-input>
                </div>
                <div style="background-color: #fff;" class="box-item-right-item">
                  <el-select v-model="item.effective_unit" class="elinput" placeholder="请选择">
                      <el-option
                        v-for="item in options3"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                        >
                      </el-option>
                    </el-select>
                </div>
              </div>
            </div>
            <!-- 选择派送的优惠卷end -->
          </el-form-item>
          <el-form-item  label="上传相册:">
            <div style="display: flex;">
              <uploadImgList :pic="picture" @picArr="picArr" @fileList="fileList" @fileAdd="fileAdd"></uploadImgList>
            </div>
          </el-form-item>
          <el-form-item  label="车场状态:">
           <el-radio v-model="status" :label="1">启用</el-radio>
           <el-radio v-model="status" :label="2">不启用</el-radio>
          </el-form-item>
        </el-form>
      </div>
    </div>
 <!-- 更改用户信息 -->
    <el-dialog title="设置网点地址" :visible.sync="dialogVisible"  :close-on-click-modal="false">
    	<div>
        <div class="diatit" style="display: flex;">
          <el-select  style="width: 20%;" v-model="provinceId" @change="dgetCity(provinceId)" placeholder="请选择省">
              <el-option
                v-for="item in province"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select  style="width: 20%;margin-left: 5%;" @change="dgetDistinct(cityId)" v-model="cityId" placeholder="请选择省市">
                <el-option
                  v-for="item in city"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select  style="width: 20%;margin-left: 5%;" v-model="distinctId" placeholder="请选择省区">
                  <el-option
                    v-for="item in distinct"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
        </div>
        <div class="diaselect">
          <el-input style="width: 25%;" v-model="detail_address" placeholder="请输入街道"></el-input>
          <el-button style="width: 10%;margin-left: 3%;" type="primary" @click="handleSearch">搜索</el-button>
        </div>
        <baidu-map class="bm-view" :center="{lng: center.lng, lat: center.lat}" :zoom="zoom">
           <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
           <bm-marker :position="{lng: center.lng, lat: center.lat}"  :dragging="true"  animation="BMAP_ANIMATION_BOUNCE">
             <bm-info-window :position="{lng: center.lng, lat: center.lat}"  @close="infoWindowClose()" @open="infoWindowOpen()">
           </bm-info-window></bm-marker>
           <bm-local-search :keyword="keyword" :auto-viewport="true" class="u-search"></bm-local-search>
        </baidu-map>
    	</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="mapSureQx">取 消</el-button>
        <el-button type="primary" @click="mapSure">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 更改用户信息end -->
  </div>
</template>

<script>
  import { childCardList,jcconfigParkingListEditPage,getProvince,getCity,getDistinct,posListUpdate } from '@/api/request'
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import uploadImg from '../../components/uploadImg.vue'
  import uploadImgList from '../../components/uploadImgList.vue'
  export default {
    components: {
        BaiduMap,
        uploadImg,
        uploadImgList
      },
    data(){
      return {
        msg:['基础设置  /','车场管理 /','添加车场'],
        title:'添加车场',
        button:['提 交','取消'],
        titPath:'parkingListUpdate',
        dialogVisible:false,
        pageLoading:false,
        pic1:'',
        pic2:'',
        pic3:'',
        pic4:'',
        picList:[],
        picture:[],
        fileListArr:[],
        value1:'',
        value2:'',
        options: [],
        options2: [],
        options3:[
          {
            label:'日',
            value:1
          },
          {
            label:'月',
            value:2
          },
          {
            label:'年',
            value:3
          }
        ],
        tableData:[],
        status:1,
        center: {lng: 0, lat: 0, showFlag: true},
        zoom: 15,
        park_name:'',
        park_num:'',
        charges:'',
        park_phone:'',
        address:'',
        business_hours_start:'',
        business_hours_end:'',
        free_time:'',
        departure_time:'',
        card_base_id:[],
        card_arr:[],
        tableIdArr:[],
        province:[],
        provinceId:'',
        city:[],
        cityId:'',
        distinct:[],
        distinctId:'',
        province_id:'',
        city_id:'',
        distinct_id:'',
        detail_address:'',
        keyword:''
      }
    },
    watch:{
      cityId:{
        handler(cityId){
          if(cityId !== ''){
            this.dgetCity(this.provinceId)
          }
        },
        deep:true,
        immediate:true
      },
      distinctId:{
        handler(distinctId){
          if(distinctId !== ''){
            this.dgetDistinct(this.cityId)
          }
        },
        deep:true,
        immediate:true
      }
    },
    methods:{
      // 搜索
      handleSearch(){
        if(this.provinceId == '' || this.cityId == '' || this.distinctId == ''){
          this.$message.warning('请选择省市区!',3);
        }else{
          let pId;
          let cId;
          let dId;
          for(let i = 0;i<this.province.length;i++){
            if(this.province[i].id == this.provinceId){
              pId = this.province[i].name
            }
          }
          for(let i = 0;i<this.city.length;i++){
            if(this.city[i].id == this.cityId){
              cId = this.city[i].name
            }
          }
          for(let i = 0;i<this.distinct.length;i++){
            if(this.distinct[i].id == this.distinctId){
              dId = this.distinct[i].name
            }
          }
          this.keyword = pId + cId + dId + this.detail_address
          const geoCoder = new BMap.Geocoder()
           /* 获取位置对应的坐标 */
           geoCoder.getPoint(this.keyword, point => {
             this.center.lat = point.lat
             this.center.lng = point.lng
           })
        }
      },
      mapSureQx(){
        this.province_id = ''
        this.city_id = ''
        this.distinct_id = ''
        this.detail_address = ''
        this.keyword = ''
        this.center.lat = 0
        this.center.lng = 0
        this.dialogVisible = false
      },
      mapSure(){
        if(this.provinceId == '' || this.cityId == '' || this.distinctId == ''){
          this.$message.warning('请选择省市区!',3);
          return false
        }else if(this.detail_address == ''){
          this.$message.warning('请输入街道!',3);
          return false
        }else if(this.center.lat == 0 && this.center.lng == 0){
          this.$message.warning('请先点击搜索!',3);
          return false
        }else{
          this.province_id = this.provinceId
          this.city_id = this.cityId
          this.distinct_id = this.distinctId
          this.dialogVisible = false
        }
      },
      selectChange(parkId){
        console.log(this.tableIdArr)
        console.log(parkId)
        if (this.tableIdArr.length > parkId.length){
          for(var index in this.tableIdArr){
            for (var x in this.card_arr){
              if (this.tableIdArr[index] == this.card_arr[x].card_base_id && parkId.indexOf(this.tableIdArr[index]) == -1){
                this.tableData.splice(index,1)
                this.tableIdArr.splice(index,1)
              }
            }
          }
        }else{
          for(var index in parkId){
            for (var x in this.card_arr){
              if (parkId[index] == this.card_arr[x].card_base_id && this.tableIdArr.indexOf(parkId[index]) == -1){
                this.tableData.push({
                  card_base_name:this.card_arr[x].card_base_name,
                  card_base_id:this.card_arr[x].card_base_id,
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
          this.$router.push('/jcconfig/parkingList');
          break;
        }
      },
      // 按钮操作
      goPages(index){
        switch(index){
          case 0:
          this.editData()
          break;
          case 1:
          this.$router.push('/jcconfig/parkingList');
          break;
        }
      },
      // 修改
      editData(){
        if(this.park_name == ''){
          this.$message.warning('车场名称不能为空!',3);
          return false
        }else if(this.provinceId == '' || this.cityId == '' || this.distinctid == ''){
          this.$message.warning('请先设置网点地址!',3);
          return false
        }else if(this.detail_address == ''){
          this.$message.warning('街道不能为空!',3);
          return false
        }else if(this.park_num == ''){
          this.$message.warning('车位数不能为空!',3);
          return false
        }else if(this.charges == ''){
          this.$message.warning('收费标准不能为空!',3);
          return false
        }else if(this.park_phone == ''){
          this.$message.warning('联系电话不能为空!',3);
          return false
        }else if(this.business_district == ''){
          this.$message.warning('所在商圈不能为空!',3);
          return false
        }else if(this.business_hours_start == '' || this.business_hours_start == null || this.business_hours_end == '' || this.business_hours_end == null){
          this.$message.warning('营业时间不能为空!',3);
          return false
        }else if(this.free_time == ''){
          this.$message.warning('免费时间不能为空!',3);
          return false
        }else if(this.departure_time == ''){
          this.$message.warning('结账后有效离场时间不能为空!',3);
          return false
        }else{
          if(this.tableData.findIndex(target=>target.cost == '' || target.effective_time =='' || target.effective_unit == '')==-1){
            let park_id;
            let is_edit;
            if(this.$route.query.park_id){
              park_id = this.$route.query.park_id
              is_edit = 1
            }else{
              park_id = ''
              is_edit = 0
            }
            let arr = []
            for(let i = 0;i<this.tableData.length;i++){
              arr.push({
                card_base_id:this.tableData[i].card_base_id,
                cost:this.tableData[i].cost,
                effective_time:this.tableData[i].effective_time,
                effective_unit :this.tableData[i].effective_unit
              })
            }

            let params = {
              park_id:park_id,
              park_name:this.park_name,
              province_id:this.provinceId,
              city_id:this.cityId,
              distinct_id:this.distinctId,
              detail_address:this.detail_address,
              latitude:this.center.lat,
              longitude:this.center.lng,
              park_num:this.park_num,
              charges:this.charges,
              park_phone:this.park_phone,
              business_district:this.address,
              business_hours_start:this.business_hours_start,
              business_hours_end:this.business_hours_end,
              departure_time:this.departure_time,
              is_edit:is_edit,
              free_time:this.free_time,
              card_arr:JSON.stringify(arr),
              pic_arr:JSON.stringify(this.picList),
              status:this.status,
              token:sessionStorage.getItem('token')
            }
            posListUpdate(params)
            .then(res => {
              if(res.data.code == 200){
                  this.$message.success(res.data.msg,3);
                  setTimeout(res=>{
                    this.$router.push('/jcconfig/parkingList');
                  },1000)
              }else{
                this.$message.warning(res.data.msg,3);
              }
            })
          }else{
            this.$message.warning('请将表单填写完整',3);
          }
        }
      },
      // 获取修改页的回显信息
      async getMessages(){
        await this.getCardList()
        this.pageLoading = true
        jcconfigParkingListEditPage(this.$route.query.park_id)
          .then(res => {
             if(res.data.code == 200){
                this.center.lng = res.data.data.longitude
                this.center.lat = res.data.data.latitude
                this.park_name = res.data.data.park_name
                this.park_num = res.data.data.park_num
                this.charges = res.data.data.charges
                this.park_phone = res.data.data.park_phone
                this.detail_address = res.data.data.detail_address
                this.address = res.data.data.business_district
                this.business_hours_start = res.data.data.business_hours_start
                this.business_hours_end = res.data.data.business_hours_end
                this.departure_time = res.data.data.departure_time
                this.status = res.data.data.status
                this.free_time = res.data.data.free_time
                this.provinceId = res.data.data.province_id
                this.cityId = res.data.data.city_id
                this.distinctId = res.data.data.distinct_id
                this.picture = res.data.data.pic_arr
                console.log(this.picture)

                this.keyword = res.data.data.detail_address
                this.tableData = res.data.data.card_arr

                this.tableIdArr = []
                for(var index in this.tableData){
                  this.tableIdArr.push(this.tableData[index].card_base_id)
                }

                let arr = [];
                for(let i = 0;i<res.data.data.card_arr.length;i++){
                   arr[i] = res.data.data.card_arr[i].card_base_id
                }
                this.card_base_id = arr

                this.pageLoading = false
             }else{
               this.$message.warning(res.data.msg,3);
             }
          })
      },
      // 清空
      refresh(){
        this.getCardList()
        this.park_name = ''
        this.park_num = ''
        this.charges = ''
        this.park_phone = ''
        this.address = ''
        this.business_hours = ''
        this.departure_time = ''
        this.card_arr = []
      },
      // 查看修改还是新增
      lookIsEdit(){
        if(this.$route.query.park_id){
          this.getMessages()
        }else{
          this.refresh()
        }
      },
      // 获取包时卡
      getCardList(){
        childCardList()
          .then(res => {
            if(res.data.code == 200){
              this.card_arr = res.data.data
            }else{
              this.$message.warning(res.data.msg,3);
            }
          })
      },
      infoWindowClose (marker) {
        this.center.showFlag = false
      },
      infoWindowOpen (marker) {
        this.center.showFlag = true
      },
      dgetProvince(){
        getProvince()
          .then(res => {
            this.province = res.data.data
          })
      },
      dgetCity(provinceId){
        let val = provinceId
        getCity(val)
          .then(res => {
            this.city = res.data.data
          })
      },
      dgetDistinct(cityId){
        let val = cityId
        getDistinct(val)
        .then(res => {
          this.distinct = res.data.data
        })
      },
      // 获取上传后的图片路径
      fileList(val){
        this.fileListArr = val
      },
      fileAdd(val){
        this.fileListArr = val
      },
      picArr(val){
        this.picList = val
      }
    },
    created() {
     this.lookIsEdit()
     this.dgetProvince()
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
    width: 60%;
    margin: 0 auto;
  }
  .box-item{
    height: 60px;
    line-height: 60px;
    margin-top: 3%;
  }
  .box-item-left{
    width: 19%;
    text-align: right;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .box-item-right{
    margin-left: 1%;
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
    width: 25%;
    background-color: rgb(250,250,250);
    padding-left: 5%;
    border-bottom: 1px solid #d6d6d6;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bm-view {
    width: 100%;
    height: 300px;
    margin-top: 2%;
  }
  /deep/ .anchorBL{
      display:none;
  }
  .diaselect{
    display: flex;
    margin-top: 2%;
  }
  .u-search{
    display:none;
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
