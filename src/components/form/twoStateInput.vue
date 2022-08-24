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
import { computed, defineComponent, inject, ref, toRef, toRefs, watch } from 'vue';
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
		isValid: Boolean,
	},
	setup(props, { emit }) {
		const isValid = inject('username') as { value: boolean };
		watch(isValid, () => {
			isValid.value;
		});
		const icon = ref('ele-Edit');
		const disableStatus = ref(true);
		const onTwoStateConfirm = (value: string) => {
			if (icon.value === 'ele-Edit') {
				icon.value = 'ele-CircleCheckFilled';
				disableStatus.value = false;
			} else if (isValid.value) {
				icon.value = 'ele-Edit';
				disableStatus.value = true;
				emit('twoStateConfirm', value);
			}
		};
		const onChangeIcon = () => {
			if (icon.value === 'ele-Edit') icon.value = 'ele-CircleCheckFilled';
			else if (isValid.value) {
				icon.value = 'ele-Edit';
			}
		};
		return { icon, disableStatus, onTwoStateConfirm };
	},
});
</script>
<style lang="scss"></style>
