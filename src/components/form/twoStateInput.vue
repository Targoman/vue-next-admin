<template>
	<mixed-input :label="label" :placeholder="placeholder" :prependIcon="icon" :disabled="disabled" @mixedInputChange="onChangeIcon"> </mixed-input>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MixedInput from '/@/components/form/mixedInput.vue';

export default defineComponent({
	name: 'input',
	components: { MixedInput },
	props: {
		label: String,
		placeholder: String,
	},
	setup(props, { emit }) {
		const icon = ref('ele-Edit');
		const disabled = ref(true);
		const onChangeIcon = () => {
			disabled.value = !disabled.value;
			if (icon.value === 'ele-Edit') icon.value = 'ele-CircleCheckFilled';
			else icon.value = 'ele-Edit';
		};
		return { icon, disabled, onChangeIcon };
	},
});
</script>
<style lang="scss"></style>
