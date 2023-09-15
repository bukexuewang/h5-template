<script setup lang="ts">
import { fetchImageUrl } from '@/api/app'

const imageList = ref([] as any)

const timer = ref(null as any)

const getUrl = () => {
	fetchImageUrl({
		format: 'json'
	}).then((res: any) => {
		imageList.value.push(res?.imgurl)
	})
}

onMounted(() => {
	timer.value = setInterval(() => {
		if (imageList.value.length > 10) clearInterval(timer.value)
		getUrl()
	}, 2000)
})
</script>

<template>
	<div class="wrap">
		<van-cell-group inset>
			<van-cell
				v-for="(item, index) in 10"
				:key="index"
				:title="index.toString()"
				value="描述文字"
			></van-cell>
		</van-cell-group>

		<div class="mt-12px">这是数据</div>

		<img
			v-for="item in imageList"
			:key="item"
			v-lazy="item"
			:src="item"
			alt=""
			class="w-100%"
		/>

		<nut-image
			v-for="(item, index) in imageList"
			:key="index"
			width="345"
			height="200"
		></nut-image>
	</div>
</template>

<style lang="scss" scoped>
.wrap {
	width: 100%;
	height: 100vh;
	padding: 15px 0;
}
</style>
