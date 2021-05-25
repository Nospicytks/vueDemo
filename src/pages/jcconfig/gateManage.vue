<template>
  <div style="background-color: rgb(240,242,245);">
    <Naving />
    <!-- 头部按钮 -->
    <div class="title">
      <div class="title-font">
        <div class="title-font-left">
          <div class="title-font-left-top">
            <div :class="index === (msg.length-1)?'last':''" class="title-font-left-top-item" v-for="(item,index) in msg"
              :key="index">
              {{item}}
            </div>
          </div>
          <div class="title-font-left-bottom">{{title}}</div>
        </div>
        <div class="title-font-right">
          <div :class="item === '取消'?'qx':''" @click="goPages(index, park_id)" v-for="(item,index) in button" :key="index"
            class="title-font-right-item">{{item}}</div>
        </div>
      </div>
    </div>
    <!-- 头部按钮end -->
    <div class="center">
      <div class="centerbody">
        <div class="center-mess">
          <i class="el-icon-warning" style="color: #0E77D1;margin-left: 1%;"></i>
          <span style="margin-left: 1%;">符合当前查询条件数据总计:</span>
          <span style="margin-left: 0.5%;font-weight: bold;">{{total}}</span>
          <span>条</span>
        </div>
        <div class="center-tab">
          <el-table :header-cell-style="{background:'rgb(250,250,250)',color:'#606266'}" :data="tableData" style="width: 100%;height: 100%;min-height: 400px;"
            :default-sort="{prop: 'date', order: 'descending'}">
            <el-table-column prop="park_name" label="停车场名称">
            </el-table-column>
            <el-table-column prop="title" label="出入口名称">
            </el-table-column>
            <el-table-column label="类型">
              <template slot-scope="scope">
                <span style="color: #1890FF;">{{scope.row.type_text}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="parkingOpt" label="操作" width="370">
              <template slot-scope="scope">
                <div class="tabopt">
                  <!-- <div @click="gateClick(scope.row.park_id)">出入口管理</div>
                    <div class="tabs"></div> -->

                  
                  
                  <div @click="update(scope.row)">修改</div>
                  <div class="tabs"></div>
                  <a-popconfirm title="确定删除吗?" ok-text="确定" cancel-text="取消" @confirm="deleteData(scope.row.gate_id)">
                    <div>删除</div>
                  </a-popconfirm>
                  <div v-if="scope.row.type === 2" class="tabs"></div>
                  <div v-if="scope.row.type === 2 && scope.row.qr" @click="qrCodeClick(scope.row.gate_id, scope.row.qr)">
                    <a target="_self" :href="downHttp">下载二维码</a>
                  </div>
                  <div v-if="scope.row.type === 2 && !scope.row.qr" @click="qrCodeClick(scope.row.gate_id, scope.row.qr)">生成二维码</div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pages">
          <el-pagination background @size-change="sizechange" @next-click="nextclick" @prev-click="prevclick"
            :current-page.sync="currentPage" :page-sizes="[10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <br><br>
  </div>
</template>

<script>
  import {
    jcconfigGateList,
    jcconfigGatetDelete,
    jcconfigGateGetQrc
  } from '@/api/request'
  import QRCode from 'qrcodejs2'
  // import vueQr from 'vue-qr'

  export default {
    data() {
      return {
        msg: ['基础设置  /', '停车场管理  /', '出入口管理'],
        title: '出入口管理',
        button: ['+ 新建'],
        titPath: 'parkingList',
        options: [{
            value: '1',
            label: '启用'
          },
          {
            value: '2',
            label: '不启用'
          }
        ],
        qrcode: '',
        tableData: [],
        park_id: '',
        park_name: '',
        status: '',
        tabloading: false,
        // 分页相关
        currentPage: 1,
        pageSize: 10,
        total: 1,
        downHttp: ''
      }
    },
    // watch: {
    //   currentPage: {
    //     handler(currentPage) {
    //       console.log(this.park_id, this.currentPage, this.pageSize, '121212')
    //       this.getTabData(this.park_id, this.currentPage, this.pageSize)
    //     },
    //     deep: true,
    //     immediate: true,
    //   },
    // },
    methods: {
      // 按钮操作
      goPages(index, id) {
        this.$router.push({
          name: 'gateManageAdd',
          query: {
            park_id: id
          }
        });
      },
      // 修改
      update(data) {
        this.$router.push({
          name: 'gateManageAdd',
          query: {
            data: data
          }
        });
      },
      // 生成   下载二维码
      qrCodeClick(id, code) {
        //type   1=>创建二维码 2=>下载二维码
        let type
        if (code) {
          type = 2
          this.downHttp = 'https://daranzhibojiekou.daranjituan.com/admin/Park/getQrc?type=2&gate_id=' + id + '&token=' + sessionStorage.getItem('token')
        } else {
          type = 1
          jcconfigGateGetQrc({
              gate_id: id,
              type: type
            })
            .then(res => {
              this.getTabData(this.park_id, this.currentPage, this.pageSize)
            })
        }

      },

      // 出入口管理
      gateClick(id) {
        this.$router.push({
          name: 'gateManage',
          query: {
            park_id: id
          }
        })
      },
      // 删除
      deleteData(id) {
        let delId = id
        jcconfigGatetDelete(delId)
          .then(res => {
            if (res.data.code == 200) {
              this.$message.success('删除成功！', 3);
              this.getTabData(this.park_id, this.currentPage, this.pageSize)
            } else {
              this.$message.warning(res.data.msg, 3);
              this.getTabData(this.park_id, this.currentPage, this.pageSize)
            }
          })
      },
      // 页数改变
      sizechange(val) {
        this.pageSize = val
        this.getTabData()
      },
      // 下一页
      nextclick() {
        this.currentPage++
        this.getTabData()
      },
      // 上一页
      prevclick() {
        this.getTabData()
        this.currentPage--
      },
      // 表格中的职务列表
      getTabData(park_id, currentPage, pageSize) {
        this.tabloading = true
        let tpark_id = park_id
        let tcurrentPage = currentPage
        let tpageSize = pageSize
        jcconfigGateList(tpark_id, tcurrentPage, tpageSize)
          .then(res => {
            if (res.data.code == 200) {
              this.total = res.data.data.total
              this.tableData = res.data.data.data
              this.tabloading = false
            } else {
              this.$notify.error({
                title: '错误',
                message: res.data.msg,
                duration: 0
              });
            }
          })
      }
    },
    mounted() {
      this.park_id = this.$route.query.park_id
      this.getTabData(this.park_id, this.currentPage, this.pageSize)
    }

  }
</script>

<style scoped>
  .center {
    width: 90%;
    margin: 0 auto;
    background-color: #fff;
    margin-top: 2%;
    padding-top: 2%;
    padding-bottom: 2%;
  }

  .centerbody {
    width: 95%;
    margin: 0 auto;
  }

  .center-title {
    height: 100px;
    display: flex;
  }

  .center-title-left {
    width: 60%;
    display: flex;

  }

  .center-title-left-item {
    margin-left: 3.3%;
    display: flex;
  }

  .center-title-left-item-left {
    line-height: 40px;
    width: 30%;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .center-title-left-item-right {
    margin-left: 2%;
  }

  .center-title-right {
    width: 30%;
    margin-left: 10%;
    display: flex;
  }

  .center-title-right-item {
    background-color: rgb(24, 144, 255);
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

  .center-title-right-item:nth-child(2) {
    color: #333;
    background-color: #FFFFFF;
    border: 1px solid #d6d6d6;
    margin-left: 5%;
  }

  .center-mess {
    width: 100%;
    height: 50px;
    border-radius: 4px;
    line-height: 50px;
    background-color: rgba(230, 247, 255, 1);
    border: 1px solid rgba(186, 231, 255, 1);
  }

  .center-tab {
    width: 100%;
    margin-top: 1%;
  }

  .pages {
    margin-left: 55%;
    margin-top: 1%;
  }

  .tabopt {
    display: flex;
    width: 100%;
    height: 100%;
    color: #1890FF;
  }

  .tabs {
    width: 1px;
    background-color: #1890FF;
    margin-left: 5%;
    margin-right: 5%;
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

  .code img {
    width: 50px;
    height: 50px;
  }

  /* 头部按钮end */
</style>
