<template>
	<mixed-input :label="label" :placeholder="placeholder" prepend="app"> </mixed-input>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MixedInput from '/@/components/form/mixedInput.vue';

export default defineComponent({
	name: 'input',
	components: { MixedInput },
	props: {
		label: String,
		placeholder: String,
	},
	setup(props, { emit }) {
		return {};
	},
});
</script>
<style lang="scss"></style>
