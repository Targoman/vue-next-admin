<template>
	<el-form-item :label="label">
		<el-select v-model="selectedValue" :placeholder="placeholder" allow-create filterable>
			<el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value" />
		</el-select>
	</el-form-item>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
	name: 'selectInput',
	props: {
		label: String,
		placeholder: String,
		prop: String,
		options: String,
	},
	setup(props, { emit }) {
		const selectedValue = ref();

		watch(selectedValue, () => {
			emit('selected', { name: props.prop, value: selectedValue.value });
		});
		return { selectedValue };
	},
});
</script>
<style lang="scss"></style>
