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
          <div :class="item === '返回'?'qx':''" @click="goPages(index)" v-for="(item,index) in button" :key="index" class="title-font-right-item">{{item}}</div>
        </div>
      </div>
    </div>
    <!-- 头部按钮end -->
    <div class="center">
      <div class="center-title">停车场硬件配置</div>
      <div class="center-list" v-for="(item,index) in tabData" :key="index">
        <div class="center-list-item">
          <div>设备位置</div>
          <div>
            <el-select class="elinput" disabled v-model="item.park_id" placeholder="请选择该设备所在位置">
              <el-option v-for="item2 in options" :key="item2.park_id" :label="item2.park_name" :value="item2.park_id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="center-list-item">
          <div>设备类型</div>
          <div>
            <el-select class="elinput" disabled v-model="item.type" placeholder="请选择该设备所在位置">
              <el-option v-for="item3 in options2" :key="item3.value" :label="item3.label" :value="item3.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="center-list-item">
          <div>设备编号</div>
          <div>
            <el-input class="elinput" disabled v-model="item.sn" placeholder="请输入"></el-input>
          </div>
        </div>
        <div class="center-list-item">
          <div>设备名称</div>
          <div>
            <el-input class="elinput" disabled v-model="item.title" placeholder="请输入"></el-input>
          </div>
        </div>
        <!-- <div class="center-list-item">
          <div>所属出入口</div>
          <div>
            <el-input class="elinput" disabled v-model="item.gate_name" placeholder="请选择所属出入口"></el-input>
          </div>
        </div> -->
        <div class="center-list-item">
          <div>所属出入口</div>
          <div>
            <el-input style="width: 50%;" disabled v-model="item.gate_name" placeholder="请选择所属出入口"></el-input>
            <el-button style="margin-left: 4%;" v-loading="buttonLoad" @click="edit(item)" type="primary" icon="el-icon-edit"
              circle></el-button>
            <a-popconfirm title="确定删除吗?" ok-text="确定" cancel-text="取消" @confirm="remove(item)">
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </a-popconfirm>
            <el-button v-if="item.type === 2" v-loading="buttonLoad" @click="generateCode(item)" type="success" icon="el-icon-check"
              circle></el-button>
          </div>
        </div>
      </div>
      <div class="add" @click="handlerAdd">
        + 添加
      </div>
    </div>
    <!-- 模态框 -->
    <el-dialog :close-on-click-modal="false" title="操作" :visible.sync="dialogVisible" width="50%" @close="close">
      <div class="model">
        <div class="model-item">
          <div>设备位置</div>
          <div>
            <el-select class="model-int" disabled v-model="opark_id" placeholder="请选择该设备所在位置">
              <el-option v-for="item in options" :key="item.park_id" :label="item.park_name" :value="item.park_id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="model-item">
          <div>设备类型</div>
          <div>
            <el-select class="elinput input" v-model="type" placeholder="请选择该设备所在位置">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="model-item">
          <div>设备编号</div>
          <div>
            <el-input class="model-int" v-model="sn" placeholder="请输入"></el-input>
          </div>
        </div>
        <div class="model-item">
          <div>所属出入口</div>
          <div>
            <el-select class="elinput input" v-model="gate_name" placeholder="请选择所属出入口">
              <el-option v-for="item in gateOptions" :key="item.type" :label="item.type_text" :value="item.type">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="model-item">
          <div>设备描述</div>
          <div>
            <el-input class="model-int" v-model="desc" placeholder="请输入"></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button v-loading="buttonLoad" type="primary" @click="addData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    cameraList,
    childParkingList,
    cameraListEdit,
    cameraListDel,
    jcconfigGateList
  } from '@/api/request'
  export default {
    data() {
      return {
        msg: ['基础设置/', '停车场管理 /', '停车场硬件配置'],
        title: '停车场硬件配置',
        button: ['返回'],
        titPath: 'camera',
        dialogVisible: false,
        tabData: [],
        options: [],
        options2: [{
            label: '入口设备',
            value: 1
          },
          {
            label: '出口设备',
            value: 2
          }
        ],
        gateOptions: [],
        buttonLoad: false,
        camera_id: '',
        opark_id: this.$route.query.park_id,
        type: '',
        sn: '',
        gate_name: '',
        desc: ''
      }
    },
    watch: {
      camera_id: {
        handler(camera_id) {
          if (camera_id !== '') {
            this.dialogVisible = true
          }
        },
        deep: true,
        immediate: true
      },
      park_id: {
        handler(park_id) {
          if (park_id) {
            this.getListInfo()
          } else {
            this.$message.warning('网络错误,请刷新后重试!', 3);
          }
        },
        deep: true,
        immediate: true
      }
    },
    computed: {
      park_id() {
        return this.$route.query.park_id
      }
    },
    methods: {
      // 标题操作
      goPage(index) {
        switch (index) {
          case 1:
            this.$router.push('/jcconfig/parkingList');
            break;
        }
      },
      // 按钮操作
      goPages(index) {
        switch (index) {
          case 0:
            this.$router.go(-1)
            break;
        }
      },
      // 获取停车场数据
      getParkList() {
        childParkingList()
          .then(res => {
            if (res.data.code == 200) {
              this.options = res.data.data
            } else {
              this.$message.warning(res.data.msg, 3);
            }
          })
      },
      // 获取硬件列表
      async getListInfo() {
        await this.getParkList()
        cameraList(this.$route.query.park_id)
          .then(res => {
            if (res.data.code == 200) {
              this.tabData = res.data.data
            } else {
              this.$message.warning(res.data.msg, 3);
            }
          })
      },
      // 取消
      close() {
        this.camera_id = ''
        this.opark_id = this.$route.query.park_id
        this.type = ''
        this.sn = ''
        this.desc = ''
        this.gate_name = ''
        this.camera_id = ''
        this.dialogVisible = false
      },
      // 添加
      handlerAdd() {
        this.handlerGateList(this.park_id)
         this.dialogVisible = true
      },

      // 修改
      edit(item) {
        this.camera_id = item.camera_id
        this.opark_id = item.park_id
        this.type = item.type
        this.sn = item.sn
        this.gate_name = item.gate_name
        this.desc = item.title
        this.jcconfigGateList(item.park_id)
      },

      // 获取所属出入口list
      handlerGateList(id) {
        jcconfigGateList(id)
          .then(res => {
            if (res.data.code == 200) {
              this.gateOptions = res.data.data.data
            }
          })
      },

      // 生成
      generateCode(item) {

      },
      // 操作
      addData() {
        if (this.opark_id == '' || this.type == '' || this.sn == '' || this.desc == '' || this.gate_name == '') {
          this.$message.warning('请将表单填写完整!', 3);
        } else {
          let params;
          if (this.camera_id !== '') {
            // 修改
            params = {
              camera_id: this.camera_id,
              park_id: this.opark_id,
              title: this.desc,
              type: this.type,
              sn: this.sn,
              gate_name: this.gate_name,
              token: sessionStorage.getItem('token')
            }
          } else {
            // 新增
            params = {
              park_id: this.opark_id,
              title: this.desc,
              type: this.type,
              sn: this.sn,
              gate_name: this.gate_name,
              token: sessionStorage.getItem('token')
            }
          }
          this.buttonLoad = true
          cameraListEdit(params)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg, 3);
                this.opark_id = this.$route.query.park_id
                this.desc = ''
                this.type = ''
                this.sn = ''
                this.gate_name = ''
                this.camera_id = ''
                setTimeout(res => {
                  this.getListInfo()
                  this.buttonLoad = false
                  this.dialogVisible = false
                }, 1000)
              } else {
                this.$message.warning(res.data.msg, 3);
              }
            })
        }
      },
      remove(item) {
        cameraListDel(item.camera_id)
          .then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg, 3);
              this.getListInfo()
            } else {
              this.$message.warning(res.data.msg, 3);
            }
          })
      }
    }
  }
</script>

<style scoped>
  .center {
    width: 95%;
    margin: 0 auto;
    background-color: #fff;
    margin-top: 2%;
    padding-bottom: 2%;
  }

  .center-title {
    height: 70px;
    line-height: 70px;
    border-bottom: 1px solid #d6d6d6;
    padding-left: 5%;
    font-weight: bold;
    font-size: 20px;
  }

  .elinput {
    width: 90%;
  }

  .center-list {
    width: 95%;
    margin: 0 auto;
    margin-top: 2%;
    display: flex;
    justify-content: space-between;
  }

  .center-list-item {
    width: 25%;
  }

  .center-list-item div:nth-child(1) {
    height: 50px;
    line-height: 50px;
  }

  .add {
    width: 95%;
    margin: 0 auto;
    margin-top: 3%;
    height: 50px;
    line-height: 50px;
    border: 1px dashed #d6d6d6;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
  }

  .model {
    width: 70%;
    margin: 0 auto;
  }

  .model-item {
    display: flex;
    margin-top: 3%;
    height: 60px;
    line-height: 60px;
  }

  .model-item>div {
    width: 12%;
  }

  .model-item div:nth-child(2) {
    margin-left: 3%;
    width: 70%;
  }

  .model-item .input {
    width: 100%;
  }

  .model-int {
    width: 100%;
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
    margin-left: 50%;
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
