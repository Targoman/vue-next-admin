<template>
	<el-form-item :label="label">
		<el-input
			style="direction: ltr"
			:input-style="{
				backgroundColor: disabled ? ' #a9a9a930' : '',
				textAlign: locale === 'fa' ? 'right' : 'left',
			}"
			:placeholder="placeholder"
			v-model="value"
			:readonly="disabled"
			@keyup="onKeyUp"
		>
			<template v-if="append || appendIcon" #[slot1]>
				<el-button class="px3" @click="onMixedInputChange">{{ append }} <SvgIcon v-if="appendIcon" :name="appendIcon" /></el-button>
			</template>
			<template v-if="prepend || prependIcon" #[slot2]>
				<el-button class="px3" @click="onMixedInputChange">{{ prepend }} <SvgIcon v-if="prependIcon" :name="prependIcon" /></el-button>
			</template>
		</el-input>
	</el-form-item>
</template>

<script lang="ts">
import { computed, defineComponent, onUpdated, ref } from 'vue';
import { getLocale } from '/@/i18n';
import inputWithValidation from '/@/components/form/inputWithValidation.vue';

export default defineComponent({
	name: 'inputWithValidation',
	components: {
		inputWithValidation,
	},
	props: {
		append: String,
		prepend: String,
		appendIcon: String,
		prependIcon: String,
		disabled: Boolean,
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
		const onMixedInputChange = () => {
			emit('mixedInputChange', value.value);
		};
		return { value, locale, slot1, slot2, onKeyUp, onMixedInputChange };
	},
});
</script>
<style lang="scss"></style>
