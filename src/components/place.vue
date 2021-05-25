<template>
	<div class="place">
			<div class="place-font-item" v-for="(item,index) in msg" :key="index" @click="goOther(index)">
					{{item}}
			</div>
	</div>
</template>

<script>
	export default{
		props:['msg','path'],
		data() {
			return {
				
			}
		},
		methods:{
			goOther(index){
				if(index === 1){
					this.$router.push(this.path[0])
				}else if(index === 2){
					this.$router.push(this.path[1])
				}else if(index === 3){
					this.$router.push(this.path[2])
				}else if(index === 4){
					this.$router.push(this.path[3])
				}else if(index === 5){
					this.$router.push(this.path[4])
				}
			}
		}
	
	}
</script>

<style scoped>
	.place{
		width: 80%;
		margin: 0 auto;
		height: 5vw;
		display: flex;
		line-height: 3vw;
	}
	.place-font-item{
		text-align: center;
		margin-left: 1%;
		color: #999;
		cursor: pointer;
	}
	.place-font-item:nth-child(1){
		text-align: center;
		margin-left: 1%;
		color: #333;
	}
</style>
