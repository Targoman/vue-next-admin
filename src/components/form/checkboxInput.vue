<template>
	<el-form-item :label="label" :prop="name">
		<el-checkbox-group @change="checkboxChange" v-model="selected">
			<el-checkbox v-for="value in options" :key="value" :label="value.label" :name="name" />
		</el-checkbox-group>
	</el-form-item>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
	name: 'checkboxInput',
	props: {
		options: Object,
		label: String,
		name: String,
		disabled: {
			type: String,
		},
	},
	setup(props, { emit }) {
		const options = ref(props.options);
		const selected = ref([]);

		const checkboxChange = (values: string[]) => {
			emit('checkboxChange', { name: props.name, values: values });
		};

		return { options, checkboxChange, selected };
	},
});
</script>

<style lang="scss" scoped></style>
