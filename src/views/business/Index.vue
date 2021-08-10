<template>
	<div class="container">
		<div class="header">
			<p>邮票名称：<span>J.119 戈壁绿洲</span></p>
		</div>
		<div class="floor">
			<h3>采集单信息</h3>
			<el-row>
				<el-col :span="12">
					<span class="order_info">采集ID：</span>
					<span>862378522264469504</span>
				</el-col>
				<el-col :span="12">
					<span class="order_info">采集点编号：</span>
					<span>829778347583078400</span>
				</el-col>
				<el-col :span="12">
					<span class="order_info">采集点名称：</span>
					<span>北京和平门第一采集点</span>
				</el-col>
				<el-col :span="12">
					<span class="order_info">采集设备编号：</span>
					<span>22224</span>
				</el-col>
				<el-col :span="12">
					<span class="order_info">代理商编号：</span>
					<span>809067215776120833</span>
				</el-col>
				<el-col :span="12">
					<span class="order_info">代理商名称：</span>
					<span>北京邮来邮网络科技有限公司</span>
				</el-col>
				<el-col :span="12">
					<span class="order_info">创建时间：</span>
					<span>2021.07.07 17:04:22</span>
				</el-col>
				<el-col :span="12">
					<span class="order_info">传输状态：</span>
					<span>已完成</span>
				</el-col>
				<el-col :span="12">
					<span>邮票信息 </span>
					<div style="margin-top: 10px;">
						<el-image v-for="item,index in samllImg" :key="index" :src="item" style="width:80px;height:80px;overflow: hidden;border-radius: 4px;margin: 0 10px 10px 0;"
						  fit="contain"></el-image>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="floor">
			<h3>鉴评单信息</h3>
			<el-row>
				<el-col>
					<span class="order_left">鉴评ID：</span>
					<span>862378522264469504</span>
				</el-col>
				<el-col>
					<span class="order_left">鉴评状态：</span>
					<span>已鉴评</span>
				</el-col>
				<el-col>
					<span class="order_left">鉴评结果：</span>
					<span>真票</span>
				</el-col>
				<el-col v-if="orderResultVo && orderResultVo.length">
					<div style="display: inline-block;">
					  <div class="jg_p" v-for="item2,index in orderResultVo" :key="index">
					    <div v-if="item2.name || item2.degree || item2.position">{{item2.mainFlaw}}（<span v-if="item2.name">名称：{{item2.name}}；</span><span v-if="item2.degree">程度：{{item2.degree}}；</span><span v-if="item2.position">位置：{{item2.position}}；</span>）</div>
					  </div>
					</div>
				</el-col>
				<el-col>
					<span class="order_left">品相评级：</span>
					<span>优品；品相得分：95</span>
				</el-col>
				<el-col>
					<img height="80" :src="barCodeSrc" alt="" />
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				samllImg:[
					'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcar0.autoimg.cn%2Fupload%2F2013%2F2%2F18%2Fu_20130218165304639264.jpg&refer=http%3A%2F%2Fcar0.autoimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630047673&t=360cbc971b870a2149cdbf6c1d509148',
					'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/adaf2edda3cc7cd970a17b3d3b01213fb90e9142.jpg'
				],
				barCodeSrc:'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/adaf2edda3cc7cd970a17b3d3b01213fb90e9142.jpg',
				orderResultVo:[]
			}
		},
		// 模板渲染前钩子函数
		created() {
		
		},
		// 模板渲染后钩子函数
		mounted() {
		
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.container{
	background: #ffffff;
	font-size: 14px;
	.header{
		margin-bottom: 20px;
		span{
			color: #1890FF;
		}
	}
	.floor{
		h3 {
			width: 100%;
			font-size: 14px;
			color: #333333;
			margin: 10px 0;
		}
		.order_info{
			display: inline-block;
			width: 100px;
			text-align: right;
			margin-bottom: 20px;
		}
		.order_left{
			display: inline-block;
			margin-bottom: 20px;
		}
	}
}
</style>
