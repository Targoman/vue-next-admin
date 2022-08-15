<template>
	<div class="editor-container">
		<div ref="editorToolbar"></div>
		<div ref="editorContent" :style="{ height }"></div>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, watch, defineComponent } from 'vue';
import { createEditor, createToolbar, IEditorConfig, IToolbarConfig, IDomEditor } from '@wangeditor/editor';
import '@wangeditor/editor/dist/css/style.css';
import { toolbarKeys } from './toolbar';

interface WangeditorState {
	editorToolbar: HTMLDivElement | null;
	editorContent: HTMLDivElement | null;
	editor: any;
}

export default defineComponent({
	name: 'wngEditor',
	props: {
		id: {
			type: String,
			default: () => 'wangeditor',
		},
		isDisable: {
			type: Boolean,
			default: () => false,
		},
		placeholder: {
			type: String,
			default: () => '请输入内容',
		},
		modelValue: String,
		mode: {
			type: String,
			default: () => 'default',
		},
		height: {
			type: String,
			default: () => '310px',
		},
	},
	setup(props, { emit }) {
		const state = reactive<WangeditorState>({
			editorToolbar: null,
			editor: null,
			editorContent: null,
		});
		const wangeditorConfig = () => {
			const editorConfig: Partial<IEditorConfig> = { MENU_CONF: {} };
			props.isDisable ? (editorConfig.readOnly = true) : (editorConfig.readOnly = false);
			editorConfig.placeholder = props.placeholder;
			editorConfig.onChange = (editor: IDomEditor) => {
				emit('update:modelValue', editor.getHtml());
			};
			(<any>editorConfig).MENU_CONF['uploadImage'] = {
				base64LimitSize: 10 * 1024 * 1024,
			};
			return editorConfig;
		};
		//
		const toolbarConfig = () => {
			const toolbarConfig: Partial<IToolbarConfig> = {};
			toolbarConfig.toolbarKeys = toolbarKeys;
			return toolbarConfig;
		};
		const initWangeditor = () => {
			state.editor = createEditor({
				html: props.modelValue,
				selector: state.editorContent!,
				config: wangeditorConfig(),
				mode: props.mode,
			});
			createToolbar({
				editor: state.editor,
				selector: state.editorToolbar!,
				mode: props.mode,
				config: toolbarConfig(),
			});
		};
		onMounted(() => {
			initWangeditor();
		});
		watch(
			() => props.modelValue,
			(value) => {
				state.editor.clear();
				state.editor.dangerouslyInsertHtml(value);
			}
		);
		return {
			...toRefs(state),
		};
	},
});
</script>
