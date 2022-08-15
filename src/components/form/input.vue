<template>
	<el-form-item :label="label">
		<el-input
			style="direction: ltr"
			:input-style="locale === 'fa' ? 'text-align: right; ' : 'text-align: left;'"
			v-model="value"
			:placeholder="placeholder"
		>
			<template v-if="append" #[slot1]> {{ append }} </template>
			<template v-if="prepend" #[slot2]> {{ prepend }} </template>
			<!-- <template #append> <slot :name="locale === 'fa' ? 'append' : 'prepend'"> </slot> </template> -->
		</el-input>
	</el-form-item>
</template>

<script lang="ts">
import { computed, defineComponent, onUpdated, ref, watch } from 'vue';
import { getLocale } from '/@/i18n';

export default defineComponent({
	name: 'input',
	props: {
		append: String,
		prepend: String,
		label: String,
		placeholder: String,
	},
	setup(props) {
		const slot1 = ref('append');
		const slot2 = ref('prepend');
		onUpdated(() => {
			[slot1.value, slot2.value] = [slot2.value, slot1.value];
		});
		const value = ref('');
		watch(value, () => {
			console.log(value.value);
		});
		const locale = computed(() => {
			return getLocale();
		});
		return { value, locale, slot1, slot2 };
	},
});
</script>
<style lang="scss"></style>
