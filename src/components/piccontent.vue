<template>
	<div class="content">
		<div @click="goDetail(type)" class="content-item" v-for="(item,index) in msg" :key="index">
			<div class="itempic">
				<!-- <img :src="item.imgPath" alt=""> -->
				 <el-image
				      style="width: 100%; height: 100%"
				      :src="item.imgPath"
				      lazy></el-image>
			</div>
			<div class="itemtitle">
				{{item.title}}
			</div>
			<div class="itemdate">
                {{item.date}}
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:['msg','type'],
		data (){
			return {
				
			}
		},
		methods:{
			goDetail(type){
				if(type === '0'){
					this.$router.push('/news/detail')
				}else if(type === '1'){
					this.$router.push('/news/bookdetail')
				}
			}
		},
		mounted() {
			
		}
	}
</script>

<style scoped>
	.content{
		width: 80%;
		margin: 0 auto;
		display: flex;
		flex-wrap:wrap;
	}
	.content-item{
		cursor: pointer;
		width: 30%;
		height: 20vw;
		margin-left: 3%;
		margin-top: 3%;
		border: 1px solid #e6e6e6;
	}
	.content-item:hover{
		border:1px solid #27a7b4;
		box-shadow: 1px 1px #27a7b4;
	}
	.itempic{
		width: 100%;
		height: 15vw;
	}
	.itemtitle{
		width: 100%;
		height: 3vw;
		color: #333;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		font-size: 18px;
		line-height: 1.4vw;
		padding-left: 3px;
		padding-right: 3px;
	}
	.itemdate{
		width: 100%;
		height: 2vw;
		padding-left: 10px;
		padding-bottom: 10px;
		color: #777777;
	}
</style>
