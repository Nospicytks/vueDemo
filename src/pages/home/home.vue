<template>
  <div>
     <!-- 菜单 -->
    <Naving />
    <div class="body">
      <!-- 头部 -->
      <div class="title">
        <div class="title-a">
          <div style="margin-top: 40%;">首页</div>
          <div class="title-a-img">
            <el-image
                style="width: 100%; height: 100%;"
                :src="headImg"
                >
              </el-image>
          </div>
        </div>
        <div class="title-b">
          <div class="title-b-top">
            早安，{{userInfo.nikename}}，祝你开心每一天!
          </div>
          <div class="title-b-bottom">
            职位：{{userInfo.title}}
          </div>
        </div>
      </div>
      <!-- 头部end -->
      <v-fm />
      <!-- <v-sm /> -->
      <!-- <v-tm /> -->
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex"
export default {
  data () {
    return {
      headImg:require('@/assets/imgs/head.jpg')
    }
  },
  computed:{
    userInfo(){
      return this.$store.state.user.userInfo
    }
  },
  methods:{
    
  },
  created() {
    
  }
}
</script>
<style scoped>
  .body{
    width: 96%;
    margin: 0 auto;
  }
  .title{
    height: 200px;
    margin-top: 1.5%;
    border: 1px solid rgba(233, 233, 233, 1);
    background-color: rgba(255, 255, 255, 1);
    display: flex;
  }
  .title-a{
    width: 3.5%;
    margin-left: 2%;
  }
  .title-a-img{
    width: 70px;
    height: 70px;
    border-radius: 49px;
    margin-top: 30%;
    animation-name: example;
    animation-duration: 0.3s;
  }
  @keyframes example {
    0%   { margin-top:-8%;}
    15%  { margin-top:-4}
    30%  { margin-top:0%;}
    45%  { margin-top:4%;}
    60%  { margin-top:8%;}
    75%  { margin-top:12%;}
    90%  { margin-top:16%;}
    100% { margin-top:20%;}
  }
  .title-b{
    margin-left: 2%;
    margin-top: 4%;
  }
  .title-b-top{
    font-size: 18px;
  }
  .title-b-bottom{
    margin-top: 10%;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.427450980392157);
  }
</style>
