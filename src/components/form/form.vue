<script lang="ts">
import { defineComponent, ref, h, reactive } from 'vue';
import { FormItemProp, ElForm } from 'element-plus';
import twoStateInput from '/@/components/form/twoStateInput.vue';
import inputWithValidation from '/@/components/form/inputWithValidation.vue';
import mixedInput from '/@/components/form/mixedInput.vue';
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
		// const validate = (prop: FormItemProp, isValid: boolean, message: string) => {
		// 	if (isValid) emit('formChange', { prop, isValid });
		// };
		const model = reactive(props.model as any);

		const inputs = props.formObject.map((item: any) => {
			const properties = item.props;
			switch (item.type) {
				case 'inputWithValidation':
					return h(inputWithValidation, {
						prop: properties.prop,
						type: properties.type,
						onInputChange: (val: string) => {
							model[properties.prop] = val;
						},
					});
				case 'mixedInput':
					return;
				case 'twoStateInput':
					return;
			}

			return h(item.type, properties);
		});

		const vNode = h(
			ElForm,
			{
				model,
				statusIcon: true,
				onValidate: (prop: FormItemProp, isValid: boolean, message: string) => {
					console.log(prop, isValid, message, model[prop as string]);
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
