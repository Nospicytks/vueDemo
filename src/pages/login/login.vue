<template>
  <div class="body">
    <div class="center">
      <div class="title">
        <div @click="change(index)" :class="active === index?'active':''" v-for="(item,index) in titleList" :key="index" class="title-item">
          {{item}}
        </div>
      </div>
      <div v-show="active === 0" class="inputs">
        <el-input
            height="10vw"
            placeholder="账户"
            prefix-icon="el-icon-user"
            v-model="name">
          </el-input>
          <br /><br /><br />
          <el-input
              @keyup.enter.native="loginHome"
              show-password
              height="10vw"
              placeholder="密码"
              prefix-icon="el-icon-lock"
              v-model="password">
          </el-input>
      </div>
      <div v-show="active === 1" class="inputs">
          <el-input
            height="10vw"
            placeholder="手机号"
            prefix-icon="el-icon-mobile-phone"
            v-model="phone">
          </el-input>
          <br /><br /><br />
          <div class="yzm">
            <div class="yzm-left">
              <el-input
                height="10vw"
                placeholder="验证码"
                prefix-icon="el-icon-message"
                v-model="yzm">
              </el-input>
            </div>
             <br /><br /><br />
            <div class="yzm-right">
              <el-button style="width: 100%;">获取验证码</el-button>
            </div>
          </div>
      </div>
      <div v-loading="loading"   id="login" @click="loginHome" class="login">
        登录
      </div>
    </div>
  </div>
</template>

<script>
  import { login } from '@/api/request'
  export default {
    data(){
      return {
        loading:false,
        titleList:['帐户密码登录','手机号登录'],
        active:0,
        name:'',
        password:'',
        phone:'',
        yzm:''
      }
    },
    methods:{
      change(index){
        this.active = index
        this.$refs.changeTit.setAttribute("class","login");
        document.getElementById('login').setAttribute("class","login");
      },
     loginHome(){
       if(this.name == '' || this.password == ''){
          this.$notify({
            title: '警告',
            message: '请输入账户和密码',
            type: 'warning'
           });
       }else{
         this.loading = true
         login(this.name,this.password)
          .then(res => {
            if(res.data.code == 200){
            this.saveStorage(this.name,this.password);
            sessionStorage.setItem('token',res.data.data.token)
              this.$notify({
                 title: '成功',
                 message: res.data.msg,
                 type: 'success'
              });
              this.loading = false
              this.$router.push('/home')
            }else{
              this.$notify.error({
              	title: '错误',
              	message: res.data.msg,
              	duration: 0
              });
              this.loading = false
            }
          })
          .catch(err => {
          	this.$notify.error({
          		title: '错误',
          		message: '请检查网络',
          		duration: 0
          	});
            this.loading = false
          })
       }
     },
     saveStorage(name,password){
        localStorage.setItem('name',name)
        localStorage.setItem('password',password)
     },
     getStorage(){
       let name = localStorage.getItem('name')
       let password = localStorage.getItem('password')
       if(name !== null){
         this.name = name
       }
       if(password !== null){
         this.password = password
       }
     },
    },
    created() {
      this.getStorage()
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .body{
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(../../assets/imgs/loginbg.jpg) no-repeat;
    background-size: cover;
  }
  .center{
    width: 30%;
    margin: 0 auto;
    margin-top: 10%;
  }
  .title{
    width: 70%;
    margin: 0 auto;
    height: 45px;
    line-height: 45px;
    color: rgba(0, 0, 0, 0.647058823529412);
    display: flex;
    font-size: 16px;
  }
  .title-item{
    width: 50%;
    text-align: center;
    cursor: pointer;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .active{
    border-bottom: 1px solid rgba(24, 144, 255, 1);
    color: rgba(24, 144, 255, 1);
  }
  .inputs{
    width: 80%;
    margin: 0 auto;
    margin-top: 5%;
  }
  .login{
    width:80%;
    margin: 0 auto;
    text-align: center;
    height: 50px;
    line-height: 50px;
    background-color: rgba(24, 144, 255, 1);
    border-radius: 8px;
    margin-top:10%;
    color: #fff;
    font-size: 18px;
    letter-spacing: 5px;
    animation-name: example;
    animation-duration: 0.1s;
  }
  @keyframes example {
    0%   { margin-top:-11%;}
    15%  { margin-top:-8}
    30%  { margin-top:-5%;}
    45%  { margin-top:-2%;}
    60%  { margin-top:1%;}
    75%  { margin-top:4%;}
    90%  { margin-top:7%;}
    100% { margin-top:10%;}
  }
  .yzm{
    height: 50px;
    display: flex;
  }
  .yzm-left{
     width: 65%;
  }
  .yzm-right{
    width: 30%;
    margin-left: 5%;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
