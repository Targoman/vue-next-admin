<template>
	<mixed-input
		:prop="prop"
		:type="type"
		:required="required"
		:label="label"
		:placeholder="placeholder"
		:prependIcon="icon"
		:disabled="disabled"
		@mixedInputChange="onChangeIcon"
	>
	</mixed-input>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MixedInput from '/@/components/form/mixedInput.vue';

export default defineComponent({
	name: 'twoStateInput',
	components: { MixedInput },
	props: {
		label: String,
		placeholder: String,
		prop: String,
		type: String,
		required: Boolean,
	},
	setup(props, { emit }) {
		const icon = ref('ele-Edit');
		const disabled = ref(true);
		const onChangeIcon = (value: string) => {
			disabled.value = !disabled.value;
			if (icon.value === 'ele-Edit') icon.value = 'ele-CircleCheckFilled';
			else {
				icon.value = 'ele-Edit';
			}
			emit('twoStateConfirm', value);
		};
		return { icon, disabled, onChangeIcon };
	},
});
</script>
<style lang="scss"></style>
