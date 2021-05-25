<template>
  <div class="foot">
	<div class="foot-top">
		<div class="foot-top-item">
			<div style="width: 70%;float: right;">
				<div class="title">友情链接</div>
				<div class="link" style="width: 90%;">
					<div class="link-item">
						<a href="http://www.gapp.gov.cn/" target="_blank">国家新闻出版署</a>
					</div>
					<div class="link-item">
						<a href="http://www.pac.org.cn/" target="_blank">中国出版协会</a>
					</div>
					<div class="link-item">
						<a href="http://www.cpa-online.org.cn/" target="_blank">中国期刊协会</a>
					</div>
					<div class="link-item">
						<a href="http://www.crs1992.com/" target="_blank">中国编辑学会</a>
					</div>
				</div>
			</div>			
			
		</div>
		<div class="foot-top-item">
			<div>
				<div class="title">其他链接</div>
				<div class="link" style="width: 100%;">
					<div class="link-item">
						<a href="https://rays.5rs.me/" target="_blank">RAYS官网</a>
					</div>
					<div class="link-item">
						<a href="http://www.whut.edu.cn/" target="_blank">武汉理工大学</a>
					</div>
					<div class="link-item">
						<a href="http://www.600757.com.cn/" target="_blank">长江出版传媒</a>
					</div>
					<div class="link-item">
						<a href="http://www.dcrays.cn/" target="_blank">实验室成果转化基地（数传集团）</a>
					</div>
					<div class="link-item">
						<a href="http://www.osid.org.cn" target="_blank">OSID官网</a>
					</div>
				</div>
			</div>		
		</div>
	</div>
	<div class="foot-bottom">
		<p class="company-address">
			<span class="address">
				联系地址:
			</span>
			湖北省武汉市洪山区珞狮路122号武汉理工大学西园图书馆5楼
			 <span class="address2">
				北京市海淀区北三环中路44号海淀文教产业园（北京分部）
			 </span>
		</p>
		<p>
			<span class="phone">
				联系电话：
			</span>
			 027-87510059 / 13469980720 郭老师
			<span class="mail">
				邮箱：
			</span>
			 lib@pilwh.org.cn
		</p>
	</div>
  </div>
</template>

<script>
	export default{
		data(){
			return{

			}
		}
	}
</script>

<style scoped>
  .foot{
    width: 100%;
    height: 20vw;
	bottom: 0;
	padding-top: 7%;
  }
  .foot-top{
	  color:#fff;
	  display: flex;
	  width: 100%;
	  height: 12.5vw;
	  background: linear-gradient(0deg, #007ac5 0%, #00acd2 100%);
  }
  .foot-top-item:nth-child(1){
	  width: 40%;
	  height: 10.5vw;
  }
	.link{
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
	}
  .link-item{
	  width: 42%;
	  margin-bottom: 4%;
  }
  .link-item:nth-child(1){
	  border-right: 1px solid #fff;
  }
  .link-item:nth-child(3){
  	  border-right: 1px solid #fff;
  }
  .foot-bottom{
  	  width: 100%;
  	  height: 7.5vw;
  	  background-color: #333333;
  	  font-size: 16px;
  	  color: #ccc;
  	  padding: 21px 0;
  	  text-align: center;
	}
  .company-address{
	  margin-bottom: 12px;
  }
  .address{
	  font-weight: bold;
	  color: #fff;
  }
  .address2{
	  margin-left: 58px;
  }
  .phone{
	  font-weight: bold;
	  color: #fff;
  }
  .mail{
	  margin-left: 40px;
  }
  .title{
	  margin-bottom: 29px;
	  margin-top:5%
  }
</style>
