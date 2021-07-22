<template>
	<div class="container">
		<Breadcrumb></Breadcrumb>
		<div>
			<div>
				<h3>选择鉴评方式</h3>
				<el-row type="flex">
					<el-radio-group v-model="serviceType" style="width: 100%;">
						<el-col :span="8">
							<el-radio :label="3">
								<span>远程鉴评</span>
								<p>远程鉴评无需留下实物邮票</p>
							</el-radio>
						</el-col>
						<el-col :span="8">
							<el-radio :label="6">
								<span>批量鉴评</span>
								<p>批量鉴评需留下实物邮票</p>
							</el-radio>
						</el-col>
						<el-col :span="8">
							<el-radio :label="9">
								<span>核验</span>
								<p>核验邮票信息</p>
							</el-radio>
						</el-col>
					</el-radio-group>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script>
	import Breadcrumb from '@/components/Breadcrumb';
	export default {
		name: '',
		components: {
			Breadcrumb
		},
		data() {
			return {
				serviceType: ''
			}
		},
		// 模板渲染前钩子函数
		created() {

		},
		// 模板渲染后钩子函数
		mounted() {

		},
		methods: {

		},
	}
</script>
<style lang="scss" scoped>
</style>
