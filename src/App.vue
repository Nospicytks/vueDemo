<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  data(){
    return{
      name: 'App',
      screenWidth: document.body.clientWidth,
      // screenHeight:''
    }
  },
  watch:{
    screenWidth(val){
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if(!this.timer){
          // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
          this.screenWidth = val
          this.timer = true
          let that = this
          setTimeout(function(){
              that.timer = false
          },400)
      }
    }
  },
  methods:{
    getWindow(){
      window.onresize = () => {
        return (() => {
            window.screenWidth = document.body.clientWidth
            this.screenWidth = window.screenWidth
        })
       }
    },
    // 获取滚动条高度
    handleScroll () {
      // this.screenHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
      // this.$nextTick(() => {
      //   document.documentElement.scrollTop = this.screenHeight
      //   document.body.scrollTop = this.screenHeight
      // })
      this.$store.state.scroll.scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
      // this.$store.scroll.commit("setScrollHeight",document.documentElement.scrollTop || document.body.scrollTop || 0);
      // console.log(this.$store.state.scroll.scrollHeight)
    },
  },
  mounted() {
    // 按屏幕固定住body宽度
    document.body.style.width = document.body.clientWidth + "px";
    window.addEventListener('scroll', this.handleScroll)
    // this.getWindow()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body{
  width: 100%;
  margin: 0;
  padding: 0;
  background-color:rgb(240,242,245);
  /* background-color:rgb(2,3,68); */
}
html {
  width: 100%;
}
div{
  margin: 0;
  padding: 0;
}
/*  */
</style>
