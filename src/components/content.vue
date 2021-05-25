<template>
	<div class="content">
	<div class="content-font">
		{{msg}}
	</div>
	</div>
</template>

<script>
	export default{
		props:{
			msg:{
				type:String,
				default:''
			}
		}
	}
</script>

<style scoped>
	.content{
		width: 80%;
		background-color: #fff;
		margin: 0 auto;
	}
	.content-font{
		padding-top: 1vw;
		padding-bottom: 6vw;
		width: 90%;
		margin: 0 auto;
	}
</style>
