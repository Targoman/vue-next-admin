<template>
	<mixed-input
		:prop="prop"
		:type="type"
		:required="required"
		:label="label"
		:placeholder="placeholder"
		:disabled="disableStatus"
		@mixedInputClick="onTwoStateConfirm"
	>
		<template #prefix><SvgIcon :name="icon" /></template>
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
		const disableStatus = ref(true);
		const onTwoStateConfirm = (value: string) => {
			disableStatus.value = !disableStatus.value;
			onChangeIcon();
			emit('twoStateConfirm', value);
		};
		const onChangeIcon = () => {
			if (icon.value === 'ele-Edit') icon.value = 'ele-CircleCheckFilled';
			else {
				icon.value = 'ele-Edit';
			}
		};
		return { icon, disableStatus, onTwoStateConfirm };
	},
});
</script>
<style lang="scss"></style>
