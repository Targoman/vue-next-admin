<template>
	<el-form-item :label="label">
		<el-checkbox-group @change="checkboxChange" v-model="options.props">
			<el-checkbox v-for="value in options" :key="value" :label="value.label" :name="value.name"/>
		</el-checkbox-group>
	</el-form-item>
</template>

<script lang="ts">
import { defineComponent,ref} from 'vue';

export default defineComponent({
	name: 'checkboxInput',
	props: {
        options:Object,
		label: String,
		name: String,
		disabled: {
			type: String,
		},
	},
	setup(props, { emit }) {
		const options = ref(
			props.options
		);
        console.log(options.value);
        
		const checkboxChange = (value: string) => {
			emit('checkboxChange',value);
		
		};

		return { options, checkboxChange };
	},
});
</script>

<style lang="scss" scoped></style>
