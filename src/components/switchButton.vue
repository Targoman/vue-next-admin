<template>
	<div>
		<el-switch v-model="value" :size="size" @change="change" :class="locale === 'fa' ? 'switch' : ''"></el-switch>
	</div>
</template>

<script>
import { getLocale } from '/@/i18n';
import { ref, defineComponent, computed } from 'vue';
export default defineComponent({
	props: {
		initialValue: {
			type: Boolean,
		},
        size: {
			type: String,
		},
	},
	setup(props, { emit }) {
		const locale = computed(() => {
			return getLocale();
		});
		const value = ref(props.initialValue);
		const change = () => {
			emit('change',value.value);
		};

		return {
			value,
			locale,
            change
		};
	},
});
</script>

<style scoped>
.switch {
	transform: scaleX(-1);
}
</style>
