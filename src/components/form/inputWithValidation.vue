<template>
	<el-form-item :size="size" :required="required" :label="label" :prop="prop" :rules="rule()">
		<el-input
			clearable
			:style="elInputStyle"
			:input-style="inputStyle"
			:placeholder="placeholder"
			:disabled="disabled"
			v-model="value"
			:type="type"
		>
			<template v-if="$slots.prefix" #prefix> <slot name="prefix"></slot></template>
			<template v-if="$slots.suffix" #suffix> <slot name="suffix"></slot></template>
		</el-input>
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
		elInputStyle: String,
		inputStyle: String,
		placeholder: String,
		disabled: Boolean,
		label: String,
		size: {
			type: String,
			default: 'default',
		},
		prepend: Boolean,
		append: Boolean,
		required: Boolean,
	},
	setup(props, { emit }) {
		const value = ref('');
		watch(value, (newValue) => {
			if (typeof newValue === 'string') emit('inputChange', newValue);
		});

		const tl = makeTranslator(translations);
		const validateMobile = (rule: any, value: any, callback: any) => {
			if (!validators.mobile(value) && value !== '') {
				callback(new Error(tl('wrongPhoneNumber')));
			} else {
				callback();
			}
		};
		const validateEmail = (rule: any, value: any, callback: any) => {
			if (!validators.email(value) && value !== '') {
				callback(new Error(tl('wrongEmail')));
			} else {
				callback();
			}
		};
		const validateEmailOrMobile = (rule: any, value: any, callback: any) => {
			if (!validators.emailOrMobile(value) && value !== '') {
				callback(new Error(tl('wrongEmailOrPhoneNumber')));
			} else {
				callback();
			}
		};
		const rule = () => {
			if (props.customValidation) return props.customValidation;
			else {
				switch (props.type) {
					case 'emailOrMobile':
						return [{ validator: validateEmailOrMobile, trigger: 'change' }];
					case 'mobile':
						return [{ validator: validateMobile, trigger: 'change' }];
					case 'email':
						return [{ validator: validateEmail, trigger: 'change' }];
					case 'text':
						return; //[
					// { required: true, message: tl('mustBeFilledUp'), trigger: 'change' },
					// { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'change' },
					// ];
					case 'iban':
						return validators.iban;
					default:
						return; // [{ required: true, message: tl('mustBeFilledUp'), trigger: 'change' }];
				}
			}
		};
		return { value, rule };
	},
});
</script>
<style lang="scss"></style>
