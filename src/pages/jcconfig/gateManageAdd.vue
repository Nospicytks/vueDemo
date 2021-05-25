<template>
  <div>
    <Naving />
    <!-- 头部按钮 -->
    <div class="title">
      <div class="title-font">
        <div class="title-font-left">
          <div class="title-font-left-top">
            <div :class="index === (msg.length-1)?'last':''" @click="goPage(index)" class="title-font-left-top-item"
              v-for="(item,index) in msg" :key="index">
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
          <el-form-item label="*出入口名称:">
            <el-input class="elinput" placeholder="给目标起个名字" v-model="gateTitle"></el-input>
          </el-form-item>

          <el-form-item label="*类型:">
            <el-select @change="selectChange(type)" v-model="type" class="elinput" placeholder="请选择">
              <el-option v-for="item in typeList" :key="item.type" :label="item.title" :value="item.type">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    jcconfigAddGatePage
  } from '@/api/request'
  export default {
    data() {
      return {
        msg: ['基础设置  /', '车场管理 /', '添加车场出入口'],
        title: '添加车场出入口',
        button: ['提 交', '取消'],
        titPath: 'gateManageAdd',
        pageLoading: false,
        center: {
          lng: 0,
          lat: 0,
          showFlag: true
        },
        zoom: 15,
        park_id: '',
        gateTitle: '',
        type: '',
        typeList: [{
          title: '入口',
          type: 1,
        }, {
          title: '出口',
          type: 2,
        }],

      }
    },
    watch: {},
    methods: {
      // 类型下拉框
      selectChange() {

      },
      // 标题操作
      goPage(index) {
        switch (index) {
          case 1:
            // this.$router.push('/jcconfig/parkingList');
            this.$router.push({
              name: 'parkingList',
              query: {
                park_id: this.park_id
              }
            });
            break;
        }
      },
      // 按钮操作
      goPages(index) {
        switch (index) {
          case 0:
            this.editData()
            break;
          case 1:
            this.$router.push({
              name: 'gateManage',
              query: {
                park_id: this.park_id
              }
            });
            // this.$router.push('/jcconfig/gateManage');
            break;
        }
      },
      // 新增 修改
      editData() {
        if (this.gateTitle == '') {
          this.$message.warning('出入口名称不能为空!', 3);
          return false
        } else if (this.type == '') {
          this.$message.warning('类型不能为空!', 3);
          return false
        } else {
          let params = {
            park_id: this.park_id,
            title: this.gateTitle,
            type: this.type,
            gate_id: this.gate_id,
            token: sessionStorage.getItem('token')
          }
          jcconfigAddGatePage(params)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg, 3);
                setTimeout(res => {
                  this.$router.push({
                    name: 'gateManage',
                    query: {
                      park_id: this.park_id
                    }
                  });
                }, 1000)
              } else {
                this.$message.warning(res.data.msg, 3);
              }
            })
        }
      },
      // 获取修改页的回显信息
      getMessages() {
        this.pageLoading = true
        // jcconfigParkingListEditPage(this.$route.query.park_id)
        //   .then(res => {
        //     if (res.data.code == 200) {
        this.pageLoading = false
        //     } else {
        //       this.$message.warning(res.data.msg, 3);
        //     }
        //   })
      },

      // 查看修改还是新增
      lookIsEdit() {
        if (this.$route.query.park_id) {
          this.getMessages()
        } else {
          this.refresh()
        }
      },
      // 清空
      refresh() {
        this.gateTitle = ''
        this.type = ''
      },
    },
    mounted() {
      if (this.$route.query.data) {
        let data = this.$route.query.data
        this.gateTitle = data.title
        this.type = data.type
        this.park_id = data.park_id
        this.gate_id = data.gate_id
      } else {
        this.park_id = this.$route.query.park_id || ''
      }
      // this.lookIsEdit()
    }
  }
</script>

<style scoped>
  .center {
    width: 90%;
    margin: 0 auto;
    background-color: #fff;
    margin-top: 2%;
    padding-bottom: 2%;
    padding-top: 1%;
  }

  .box {
    width: 60%;
    margin: 0 auto;
  }

  .box-item {
    height: 60px;
    line-height: 60px;
    margin-top: 3%;
  }

  .box-item-left {
    width: 19%;
    text-align: right;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .box-item-right {
    margin-left: 1%;
  }

  .elinput {
    width: 50%;
  }

  .box-item-img {
    background-color: rgb(117, 128, 139);
    border-radius: 49px;
    height: 100%;
    width: 62px;
    margin-left: 2%;
  }

  .box-item-name {
    margin-left: 1%;
    height: 60px;
    line-height: 60px;
    text-align: right;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .box-item-right-item {
    width: 25%;
    background-color: rgb(250, 250, 250);
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

  /deep/ .anchorBL {
    display: none;
  }

  .diaselect {
    display: flex;
    margin-top: 2%;
  }

  .u-search {
    display: none;
  }

  /* 头部按钮 */
  .title {
    width: 100%;
    height: 90px;
    border-bottom: 1px solid #d6d6d6;
    background-color: #fff;
  }

  .title-font {
    height: 90px;
    width: 95%;
    margin: 0 auto;
    display: flex;
  }

  .title-font-left {
    width: 60%;
  }

  .title-font-left-top {
    font-size: 15px;
    color: rgba(0, 0, 0, 0.447058823529412);
    margin-top: 1%;
    display: flex;
  }

  .title-font-left-top-item:nth-child(1) {
    margin-left: 0%;
  }

  .title-font-left-top-item {
    margin-left: 1%;
  }

  .title-font-left-bottom {
    font-size: 20px;
    margin-top: 1%;
    font-weight: bold;
  }

  .last {
    color: #333333;
  }

  .title-font-right {
    width: 40%;
    display: flex;
    text-overflow: ellipsis;
  }

  .title-font-right-item:nth-child(1) {
    /* margin-left: 40%; */
  }

  .title-font-right-item {
    padding-left: 3%;
    padding-right: 3%;
    height: 35px;
    line-height: 35px;
    background-color: rgb(24, 144, 255);
    border-radius: 4px;
    text-align: center;
    margin-top: 3.5%;
    margin-left: 3%;
    color: #fff;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .qx {
    border: 1px solid #d6d6d6;
    color: #333333;
    background-color: #fff;
  }

  /* 头部按钮end */
</style>
