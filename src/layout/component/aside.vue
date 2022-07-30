<template>
	<div class="h100" v-show="!isTagsViewCurrenFull">
		<el-aside class="layout-aside" :class="setCollapseStyle">
			<Logo v-if="setShowLogo" />
			<el-scrollbar class="flex-auto" ref="layoutAsideScrollbarRef" @mouseenter="onAsideEnterLeave(true)" @mouseleave="onAsideEnterLeave(false)">
				<Vertical :menuList="menuList" />
			</el-scrollbar>
		</el-aside>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, computed, watch, getCurrentInstance, onBeforeMount, defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import pinia from '/@/stores/index';
import { useRoutesList } from '/@/stores/routesList';
import { useThemeConfig } from '/@/stores/themeConfig';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';
import Logo from '/@/layout/logo/index.vue';
import Vertical from '/@/layout/navMenu/vertical.vue';

export default defineComponent({
	name: 'layoutAside',
	components: { Logo, Vertical },
	setup() {
		const { proxy } = <any>getCurrentInstance();
		const stores = useRoutesList();
		const storesThemeConfig = useThemeConfig();
		const storesTagsViewRoutes = useTagsViewRoutes();
		const { routesList } = storeToRefs(stores);
		const { themeConfig } = storeToRefs(storesThemeConfig);
		const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);
		const state = reactive({
			menuList: [],
			clientWidth: 0,
		});
		const setCollapseStyle = computed(() => {
			const { layout, isCollapse, menuBar } = themeConfig.value;
			const asideBrTheme = ['#FFFFFF', '#FFF', '#fff', '#ffffff'];
			const asideBrColor = asideBrTheme.includes(menuBar) ? 'layout-el-aside-br-color' : '';
			if (state.clientWidth <= 1000) {
				if (isCollapse) {
					document.body.setAttribute('class', 'el-popup-parent--hidden');
					const asideEle = document.querySelector('.layout-container') as HTMLElement;
					const modeDivs = document.createElement('div');
					modeDivs.setAttribute('class', 'layout-aside-mobile-mode');
					asideEle.appendChild(modeDivs);
					modeDivs.addEventListener('click', closeLayoutAsideMobileMode);
					return [asideBrColor, 'layout-aside-mobile', 'layout-aside-mobile-open'];
				} else {
					closeLayoutAsideMobileMode();
					return [asideBrColor, 'layout-aside-mobile', 'layout-aside-mobile-close'];
				}
			} else {
				if (layout === 'columns') {
					if (isCollapse) return [asideBrColor, 'layout-aside-pc-1'];
					else return [asideBrColor, 'layout-aside-pc-220'];
				} else {
					if (isCollapse) return [asideBrColor, 'layout-aside-pc-64'];
					else return [asideBrColor, 'layout-aside-pc-220'];
				}
			}
		});
		const closeLayoutAsideMobileMode = () => {
			const el = document.querySelector('.layout-aside-mobile-mode');
			el?.setAttribute('style', 'animation: error-img-two 0.3s');
			setTimeout(() => {
				el?.parentNode?.removeChild(el);
			}, 300);
			const clientWidth = document.body.clientWidth;
			if (clientWidth < 1000) themeConfig.value.isCollapse = false;
			document.body.setAttribute('class', '');
		};
		// logo
		const setShowLogo = computed(() => {
			let { layout, isShowLogo } = themeConfig.value;
			return (isShowLogo && layout === 'defaults') || (isShowLogo && layout === 'columns');
		});
		const setFilterRoutes = () => {
			if (themeConfig.value.layout === 'columns') return false;

			(state.menuList as any) = filterRoutesFun(routesList.value);
		};
		const filterRoutesFun = (arr: Array<string>) => {
			return arr
				.filter((item: any) => !item.meta.isHide)
				.map((item: any) => {
					item = Object.assign({}, item);
					if (item.children) item.children = filterRoutesFun(item.children);
					return item;
				});
		};
		const initMenuFixed = (clientWidth: number) => {
			state.clientWidth = clientWidth;
		};
		const onAsideEnterLeave = (bool: Boolean) => {
			let { layout } = themeConfig.value;
			if (layout !== 'columns') return false;
			if (!bool) proxy.mittBus.emit('restoreDefault');
			stores.setColumnsMenuHover(bool);
		};
		watch(themeConfig.value, (val) => {
			if (val.isShowLogoChange !== val.isShowLogo) {
				if (!proxy.$refs.layoutAsideScrollbarRef) return false;
				proxy.$refs.layoutAsideScrollbarRef.update();
			}
		});
		watch(
			pinia.state,
			(val) => {
				let { layout, isClassicSplitMenu } = val.themeConfig.themeConfig;
				if (layout === 'classic' && isClassicSplitMenu) return false;
				setFilterRoutes();
			},
			{
				deep: true,
			}
		);
		onBeforeMount(() => {
			initMenuFixed(document.body.clientWidth);
			setFilterRoutes();

			proxy.mittBus.on('setSendColumnsChildren', (res: any) => {
				state.menuList = res.children;
			});
			proxy.mittBus.on('setSendClassicChildren', (res: any) => {
				let { layout, isClassicSplitMenu } = themeConfig.value;
				if (layout === 'classic' && isClassicSplitMenu) {
					state.menuList = [];
					state.menuList = res.children;
				}
			});
			proxy.mittBus.on('getBreadcrumbIndexSetFilterRoutes', () => {
				setFilterRoutes();
			});
			proxy.mittBus.on('layoutMobileResize', (res: any) => {
				initMenuFixed(res.clientWidth);
				closeLayoutAsideMobileMode();
			});
		});
		return {
			setCollapseStyle,
			setShowLogo,
			isTagsViewCurrenFull,
			onAsideEnterLeave,
			...toRefs(state),
		};
	},
});
</script>
