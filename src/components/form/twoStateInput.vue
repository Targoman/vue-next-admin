<template>
	<mixed-input
		:prop="prop"
		:type="type"
		:required="required"
		:label="label"
		:placeholder="placeholder"
		:disabled="disableStatus"
		@mixedInputChange="onChangeIcon"
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
		const onChangeIcon = (value: string) => {
			disableStatus.value = !disableStatus.value;
			if (icon.value === 'ele-Edit') icon.value = 'ele-CircleCheckFilled';
			else {
				icon.value = 'ele-Edit';
			}
			emit('twoStateConfirm', value);
		};
		return { icon, disableStatus, onChangeIcon };
	},
});
</script>
<style lang="scss"></style>
