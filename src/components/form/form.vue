<template>
	<el-form @validate="validate" :model="modelV" size="default" status-icon label-width="40px"
		><slot :info="validationInformations"
	/></el-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { FormItemProp } from 'element-plus';

export default defineComponent({
	name: 'form',
	components: {},
	props: {
		model: Object,
	},
	setup(props, { emit }) {
		const modelV = ref(props.model);
		const validationInformations = ref();
		const validate = (prop: FormItemProp, isValid: boolean, message: string) => {
			validationInformations.value = { prop, isValid, message };
			console.log('val', validationInformations.value);
			if (isValid) emit('formChange', { prop, isValid });
		};
		return { validate, modelV, validationInformations };
	},
});
</script>
<style lang="scss" scoped></style>
