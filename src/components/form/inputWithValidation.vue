<template>
	<el-form-item :label="label" :prop="prop" :rules="rule()">
		<el-input v-model="value" :type="type"> </el-input>
	</el-form-item>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { makeTranslator } from '/@/i18n';
import validators from '/@/modules/validators';
import translations from './i18n.json';

export default defineComponent({
	name: 'inputWithValidation',
	props: {
		type: {
			type: String,
			default: 'text',
		},
		prop: String,
		customValidation: Object,
	},
	setup(props, { emit }) {
		const value = ref('');
		watch(value, (newValue) => {
			emit('change1', newValue);
		});

		const tl = makeTranslator(translations);

		const rule = () => {
			if (props.customValidation) return props.customValidation;
			else {
				switch (props.type) {
					case 'emailOrMobile':
						return validators.emailOrMobile;
					case 'mobile':
						return validators.mobile;
					case 'email':
						return validators.email;
					case 'text':
						return [{ required: true, message: tl('mustBeFilledUp'), trigger: 'change' }];
					case 'iban':
						return validators.iban;
					default:
						return [{ required: true, message: tl('mustBeFilledUp'), trigger: 'change' }];
				}
			}
		};
		return { value, rule };
	},
});
</script>
<style lang="scss"></style>
