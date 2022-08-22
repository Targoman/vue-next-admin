<template>
	<el-row>
		<input-with-validation
			:type="type"
			:required="required"
			:label="label"
			:placeholder="placeholder"
			:disabled="disabled"
			:prop="prop"
			@inputChange="onMixedInputChange"
		>
			<template v-if="$slots.prefix" #prefix
				><el-button
					@click="onMixedInputClick"
					:style="isRTLLang() ? 'border-left: 1px solid #bfbfbf' : 'border-right: 1px solid #bfbfbf'"
					class="m0 button button-inactive"
				>
					<slot name="prefix" /></el-button
			></template>
			<template v-if="$slots.suffix" #suffix
				><el-button :style="isRTLLang() ? 'border-left: 1px solid #bfbfbf' : 'border-right: 1px solid #bfbfbf'" class="m0 button button-inactive">
					<slot name="suffix" /> </el-button
			></template>
		</input-with-validation>
	</el-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import inputWithValidation from '/@/components/form/inputWithValidation.vue';
import { isRTLLang } from '/@/i18n';

export default defineComponent({
	name: 'mixedInput',
	components: {
		inputWithValidation,
	},
	props: {
		label: String,
		placeholder: String,
		prop: String,
		disabled: Boolean,
		type: String,
		required: Boolean,
	},
	setup(_props, { emit }) {
		const value = ref('');
		const onKeyUp = () => {
			emit('keyUp', value.value);
		};
		const onMixedInputClick = () => {
			emit('mixedInputClick', value.value);
		};
		const onMixedInputChange = (val: string) => {
			value.value = val;
			emit('mixedInputChange', value.value);
		};
		return { value, onKeyUp, onMixedInputChange, onMixedInputClick, isRTLLang, alert };
	},
});
</script>
<style lang="scss" scoped>
.button {
	border-radius: 0;
	border: 0;
	&-inactive {
		background-color: buttonface;
	}
}
</style>
