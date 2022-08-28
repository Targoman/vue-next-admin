<script lang="ts">
import { defineComponent, ref, h, reactive, mergeProps, computed, provide, watch } from 'vue';
import { FormItemProp, ElForm } from 'element-plus';
import twoStateInput from '/@/components/form/twoStateInput.vue';
import inputWithValidation from '/@/components/form/inputWithValidation.vue';
import mixedInput from '/@/components/form/mixedInput.vue';
import select from './select.vue';
import checkboxInput from '/@/components/form/checkboxInput.vue';

export default defineComponent({
	name: 'form',
	components: {},
	props: {
		test: String,
		model: {
			type: Object,
			required: true,
		},
		formObject: {
			type: Array,
			required: true,
		},
	},
	setup(props, { emit, slots }) {
		// setInterval(() => {
		// 	console.log(props.label);
		// }, 1000);

		const twoStateInputValidation = ref(false);

		// using provide because props is not reactive using render function
		provide(
			'username',
			computed(() => twoStateInputValidation.value)
		);
		const model = reactive(props.model as any);
		const inputs = () =>
			props.formObject.map((item: any) => {
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
					case 'select':
						return h(select, {
							...properties,
							onSelected: (object: { name: string; value: string }) => {
								model[object.name] = object.value;
								emit('formChange', model);
							},
						});
					case 'checkboxInput':
						return h(checkboxInput, {
							...properties,
							onCheckboxChange: (object: { name: string; values: string[] }) => {
								model[object.name] = object.values;
								emit('formChange', model);
							},
						});
				}
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
			// slots.prepend ? h('div', slots.prepend()) : null,
			inputs()
			// slots.append ? h('div', slots.append()) : null
		);

		const object = computed(() => props.formObject);
		watch(object, () => {
			vNode.children = inputs();
		});
		return () => vNode;
	},
});
</script>

<style lang="scss" scoped></style>
