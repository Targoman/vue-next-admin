<template>
	<el-form @validate="validate" :model="model" size="default" status-icon label-width="40px"><slot /></el-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FormItemProp } from 'element-plus';

export default defineComponent({
	name: 'form',
	components: {},
	props: {
		model: Object,
	},
	setup(_props, { emit }) {
		const validate = (prop: FormItemProp, isValid: boolean, message: string) => {
			console.log('val', prop, isValid, message);
		};
		return { validate };
	},
});
</script>
<style lang="scss" scoped></style>
