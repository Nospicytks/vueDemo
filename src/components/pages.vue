<template>
  <div class="pages">
     <el-pagination
          background
          @size-change="sizechange"
          @next-click="nextclick"
          @prev-click="prevclick"
          :current-page.sync = "currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
  </div>
</template>

<script>
  export default{
    props:{
      currentPage:{
        type:Number,
        required:false,
        default:1
      },
      pageSize:{
        type:Number,
        required:false,
        default:10
      },
      total:{
        type:Number,
        required:false,
        default:1
      }
    },
    data(){
      return{

      }
    },
    watch:{
      currentPage:{
          handler(currentPage){
            this.childMethod()
          },
          deep: true,
          immediate: true,
        },
    },
    methods:{
      childMethod() {
        this.$parent.getTabData();
      },
      // 页数改变
      sizechange(val){
        this.pageSize = val
        this.currentPage = 0
        this.currentPage = 1
      },
      // 下一页
      nextclick(){
        this.currentPage ++
      },
      // 上一页
      prevclick(){
        this.currentPage --
      }
    }
  }
</script>

<style scoped>
  .pages{
    margin-left:55%;
    margin-top: 1%;
  }
</style>
