<template>
	<div :class="$store.state.scroll.scrollHeight <= '100'?'lookTitle':''" class="head">
    <div class="head-left">
      <span @click="goHome">大然泊车</span>
    </div>
		<div id="nav" class="nav">
      <div @mouseenter="getChild(item.id)" class="nav-item" v-for="(item,index) in NavList">{{item.title}}</div>
		</div>
    <!-- 子菜单 -->
     <el-collapse-transition>
    <div @mouseleave="active = false" v-show="active" class="navchild">
      <div class="navchild-body">
        <div class="navchild-body-item" v-for="(item,index) in sub" :key="index">
          <div class="navchild-body-item-title">{{item.title}}</div>
          <div
          :class="$route.path === item2.jump?'select':''"
           v-for="(item2,index2) in item.sub" :key="index2"
          @click="$router.push(item2.jump)"
          class="navchild-body-item-child">
          {{item2.title}}
          </div>
        </div>
      </div>
    </div>
    </el-collapse-transition>
    <!-- 子菜单end -->
    <a-dropdown>
      <div class="head-right" >
        <div class="head-img">
          <el-image
             style="width: 100%; height: 100%;border-radius: 49px;"
             :src="headImg"
                >
          </el-image>
        </div>
        <div class="head-mess">
          {{userInfo.nikename}}
        </div>
      </div>
      <a-menu slot="overlay">
        <a-menu-item @click="logout">
         退出登录
        </a-menu-item>
      </a-menu>
    </a-dropdown>
	</div>
</template>

<script>
  import { mapMutations } from "vuex"

	export default{
		data () {
		  return {
        active:false,
        childIndex:-1,
        navList:['车场事务管理','报表中心','用户中心','活动设置','基础设置'],
        headImg:require('@/assets/imgs/head.jpg'),
        sub:[]
		  }
		},
    watch:{
      userInfo:{
         handler(userInfo){
           if(JSON.stringify(userInfo) == '{}'){
              this.getUserInfo()
           }
         },
         deep: true,
         immediate: true,
       },
     token:{
         handler(token){
           // console.log(token)
         },
         deep: true,
         immediate: true,
       },
     NavList:{
         handler(NavList){
           if(NavList.length == 0){
             this.MenuList()
           }
         },
         deep: true,
         immediate: true,
       }
    },
    computed:{
      NavList(){
         return this.$store.state.navget.navList
      },
      userInfo(){
        return this.$store.state.user.userInfo
      },
      token(){
        return sessionStorage.getItem('token');
      },
    },
		methods:{
      ...mapMutations([
      	'getUserInfo'
      ]),
      // 获取菜单
       ...mapMutations([
        'MenuList'
       ]),
			handleSelect(key, keyPath) {
			  console.log(key, keyPath);
			},
      goHome(){
        this.$router.push('/home')
      },
      getChild(id){

        this.show = true
        let tid = id
         for(let i = 0;i<this.NavList.length;i++){
           if(this.NavList[i].id == tid){
             this.sub = this.NavList[i].sub
           }
         }
         if(this.sub.length !== 0){
            this.active = true
         }
      },
      // 退出登录
      logout(){
        sessionStorage.removeItem('token')
        this.$router.push('/')
         this.$store.state.navget.navList = []
      }
		}
	}
</script>

<style scoped>
	.head{
		height: 60px;
		/* background: linear-gradient(0deg, #007ac5 0%, #00acd2 100%); */
    background-color: rgb(0,21,41);
    display: flex;
	}

  .head-left{
    width: 15%;
    line-height:60px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
  }
  .head-right{
    width: 300px;
    margin-left: 10%;
    line-height: 60px;
    display: flex;
    opacity: 0;
    animation-name: headright;
    animation-duration: 1s;
    animation-fill-mode:forwards;
  }
  @keyframes headright {
    0%   { opacity:0;}
    15%  { opacity:0.1}
    30%  { opacity:0.2;}
    45%  { opacity:0.3;}
    60%  { opacity:0.5;}
    75%  { opacity:0.6;}
    90%  { opacity:0.8;}
    100% { opacity:1;}
  }
  .lookTitle{
    animation-name: lookTitle;
    animation-duration: 0.3s;
    animation-fill-mode:forwards;
  }
  @keyframes lookTitle {
    0%   { margin-top:-60px;}
    15%  { margin-top:-51.6px}
    30%  { margin-top:-43px;}
    45%  { margin-top:-34.4px;}
    60%  { margin-top:-25.8px;}
    75%  { margin-top:-17.2px;}
    90%  { margin-top:-8.6px;}
    100% { margin-top:0px;}
  }
  .head-img{
    width: 47px;
    height: 47px;
    margin-top: 2%;
    border-radius: 49px;
    background-color: rgb(117,128,139);
  }
  .head-mess{
     width: 80%;
     margin-left: 5%;
     line-height: 60px;
     font-size: 15px;
     color:rgba(255, 255, 255, 0.447058823529412);
  }
	.nav{
		width: 60%;
		display: flex;
    position: relative;
	}
  .navchild{
    background-color: rgb(11,24,34);
    width: 100%;
    position: absolute;
    top: 60px;
    left: 0;
    z-index: 999;
  }
  .nav-item{
    width: 20%;
    text-align: center;
    line-height: 61px;
    color: rgba(255, 255, 255, 0.647058823529412);
    cursor: pointer;
  }
	.nav-item:hover{
		color: #fff;
	}
	.router-link-active {
		color: #fff;
	  text-decoration: none;
	}
	#nav /deep/ .el-submenu__title{
		color:rgba(255, 255, 255, 0.447058823529412);
		text-align: center;
		font-size:16px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
	}
	#nav /deep/ .el-submenu__title:hover{
		color: #FFF;
		background-color:rgba(255, 255, 255, 0.447058823529412);
	}
	#nav /deep/ .el-menu{
		width: 100%;

	}
	#nav /deep/ .el-submenu{
		width: 20%;

	}
	#nav /deep/  .el-menu .el-menu--popup .el-menu--popup-bottom-start{

	}
/* 	#nav /deep/ .el-menu-item{
		font-size: 16px;
		width: 12.5%;
		color: #fff;
	} */
/* 	#nav /deep/ .el-menu-item:hover{
		color: #fff;
		background-color: rgb(0,178,210);
	} */
.navchild-body{
  width: 60%;
  margin: 0 auto;
  height:100%;
  display: flex;
}
.navchild-body-item{
  width: 20%;
  /* background-color: #007DC5; */
  height: 100%;
}
.navchild-body-item-title{
  height: 50px;
  line-height: 50px;
  color: rgba(255, 255, 255, 0.647058823529412);
  font-size: 16px;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}
.navchild-body-item-child{
  background-color: rgb(25,38,47);
  height: 40px;
  line-height: 40px;
  margin-bottom: 5%;
  border-radius: 4px;
  padding-left: 10%;
  width: 80%;
  color: rgba(255, 255, 255, 0.647058823529412);
  cursor: pointer;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}
.navchild-body-item-child:hover{
  background-color: rgb(24,144,255);
}
.select{
  background-color: rgb(24,144,255);
}
</style>
