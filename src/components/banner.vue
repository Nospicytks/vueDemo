<template>
	<div class="banner">
		<el-carousel :interval="5000" arrow="always" height="30vw">
		    <el-carousel-item v-for="(item,index) in imgArr" :key="index">
		      <h3><img :src="item.path" alt=""></h3>
		    </el-carousel-item>
		  </el-carousel>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				imgArr:[
					{
						path:'https://file.5rs.me/oss/uploadfe/jpg/361d3847313a91daa01d3443a939dbdd.jpg'
					},
					{
						path:'https://file.5rs.me/oss/uploadfe/jpg/59684a23081d4949ca6acffa6af499d2.jpg'
					}
				]
			}
		}
	}
</script>

<style scoped>
	.el-carousel__item h3 {
	    color: #475669;
	    font-size: 18px;
	    opacity: 0.75;
	    line-height: 30vw;
	    margin: 0;
	  }
	  .el-carousel__item:nth-child(2n) {
	    background-color: #99a9bf;
	  }
	  
	  .el-carousel__item:nth-child(2n+1) {
	    background-color: #d3dce6;
	  }
	.banner{
		width: 100%;
		height: 30vw;
		background-color: #2C3E50;
	}
	img{
		width: 100%;
		height: 100%;
	}
</style>
