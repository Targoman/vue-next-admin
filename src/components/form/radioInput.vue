<template>
	<el-form-item :label="lable" @change="radioInput">
		<el-radio-group v-model="selectedRadio">
			<el-radio v-for="item in resource" :key="item" :label="item.label" />
		</el-radio-group>
	</el-form-item>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
	name: 'radioInput',
	props: {
		resource: Object,
		label: String,
		disabled: {
			type: String,
		},
	},
	setup(props, { emit }) {
		const resource = ref(props.resource);
		const selectedRadio = ref([]);

		const radioInput = (value: string) => {
			emit('radioInput', value);
		};

		return { resource, radioInput, selectedRadio };
	},
});
</script>