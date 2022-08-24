<script lang="ts">
import { defineComponent, ref, h, reactive, mergeProps, getCurrentInstance, computed } from 'vue';
import { FormItemProp, ElForm } from 'element-plus';
import twoStateInput from '/@/components/form/twoStateInput.vue';
import inputWithValidation from '/@/components/form/inputWithValidation.vue';
import mixedInput from '/@/components/form/mixedInput.vue';
import { provide } from 'vue';

export default defineComponent({
	name: 'form',
	components: {},
	props: {
		model: {
			type: Object,
			required: true,
		},
		formObject: {
			type: Array,
			required: true,
		},
	},
	setup(props, { emit }) {
		const twoStateInputValidation = ref(false);
		// using provide because props is not reactive using render function
		provide(
			'username',
			computed(() => twoStateInputValidation.value)
		);
		const model = reactive(props.model as any);
		const inputs = props.formObject.map((item: any) => {
			const properties = item.props;

			switch (item.type) {
				case 'inputWithValidation':
					return h(inputWithValidation, {
						...properties,
						onInputChange: (val: string) => {
							model[properties.prop] = val;
						},
					});
				case 'mixedInput':
					// merge props using spread operator (...)
					return h(mixedInput, {
						...properties,
						onMixedInputChange: (val: string) => {
							model[properties.prop] = val;
						},
					});

				case 'twoStateInput':
					// merge props using mergeProps
					const merged = mergeProps(properties, {
						isValid: twoStateInputValidation.value,
						onMixedInputChange: (val: string) => {
							model[properties.prop] = val;
						},
						onTwoStateConfirm: (val: string) => {},
					});

					return h(twoStateInput, merged);
			}

			return h(item.type, properties);
		});
		const vNode = h(
			ElForm,
			{
				model,
				statusIcon: true,
				onValidate: (prop: any, isValid: boolean, message: string) => {
					twoStateInputValidation.value = isValid;

					if (isValid) {
						emit('formChange', model);
					}
				},
			},
			inputs
			// [
			// h(inputWithValidation, {
			// 	prop: 'name',
			// 	type: 'emailOrMobile',
			// 	onInputChange: (val: string) => {
			// 		model.name = val;
			// 	},
			// })
			// 	h(mixedInput, {
			// 		prop: 'email',
			// 		type: 'email',
			// 		placeholder: 's',
			// 		label: 'mixed',
			// 		onMixedInputChange: (val: string) => {
			// 			model.email = val;
			// 		},
			// 	}),
			// 	h(twoStateInput, {
			// 		prop: 'name',
			// 		type: 'mobile',
			// 		placeholder: 's',
			// 		label: 'twoStateInput',
			// 		onTwoStateChange: (val: string) => {
			// 			model.name = val;
			// 		},
			// 	}),
			// ]
		);
		return () => vNode;
	},
});
</script>
<style lang="scss" scoped></style>
