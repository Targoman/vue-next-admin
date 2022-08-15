<template>
	<el-form-item :label="label">
		<el-input
			style="direction: ltr"
			:input-style="locale === 'fa' ? 'text-align: right; ' : 'text-align: left;'"
			:placeholder="placeholder"
			v-model="value"
			@keyup="onKeyUp"
		>
			<template v-if="append" #[slot1]>
				<el-button @click="onChange">{{ append }}</el-button>
			</template>
			<template v-if="prepend" #[slot2]>
				<el-button @click="onChange">{{ prepend }}</el-button>
			</template>
		</el-input>
	</el-form-item>
</template>

<script lang="ts">
import { computed, defineComponent, onUpdated, ref } from 'vue';
import { getLocale } from '/@/i18n';

export default defineComponent({
	name: 'input',
	props: {
		append: String,
		prepend: String,
		label: String,
		placeholder: String,
	},
	setup(_props, { emit }) {
		const slot1 = ref(getLocale() === 'fa' ? 'prepend' : 'append');
		const slot2 = ref(getLocale() === 'fa' ? 'append' : 'prepend');

		onUpdated(() => {
			if (getLocale() === 'fa') [slot1.value, slot2.value] = ['prepend', 'append'];
			else [slot1.value, slot2.value] = ['append', 'prepend'];
		});

		const value = ref('');
		const locale = computed(() => {
			return getLocale();
		});
		const onKeyUp = () => {
			emit('keyUp', value.value);
		};
		const onChange = () => {
			emit('change', value.value);
		};
		return { value, locale, slot1, slot2, onKeyUp, onChange };
	},
});
</script>
<style lang="scss"></style>
