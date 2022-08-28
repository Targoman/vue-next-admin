<template>
	<el-form-item :label="label">
		<el-select v-model="selectedValue" :placeholder="placeholder">
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
		options: String,
	},
	setup(props, { emit }) {
		const selectedValue = ref();
		watch(selectedValue, () => {
			emit('selected', selectedValue.value);
		});
		return { selectedValue };
	},
});
</script>
<style lang="scss"></style>
