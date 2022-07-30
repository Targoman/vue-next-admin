import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import pinia from '/@/stores/index';
import { storeToRefs } from 'pinia';
import { useKeepALiveNames } from '/@/stores/keepAliveNames';
import { useRoutesList } from '/@/stores/routesList';
import { useThemeConfig } from '/@/stores/themeConfig';
import { Session } from '/@/utils/storage';
import { staticRoutes } from '/@/router/route';
import { initFrontEndControlRoutes } from '/@/router/frontEnd';
import { initBackEndControlRoutes } from '/@/router/backEnd';
import storage, { StorageKey } from '../modules/storage';

const storesThemeConfig = useThemeConfig(pinia);
const { themeConfig } = storeToRefs(storesThemeConfig);
const { isRequestRoutes } = themeConfig.value;

export const router = createRouter({
	history: createWebHistory(),
	routes: staticRoutes,
});

export function formatFlatteningRoutes(arr: any) {
	if (arr.length <= 0) return false;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].children) {
			arr = arr.slice(0, i + 1).concat(arr[i].children, arr.slice(i + 1));
		}
	}
	return arr;
}

export function formatTwoStageRoutes(arr: any) {
	if (arr.length <= 0) return false;
	const newArr: any = [];
	const cacheList: Array<string> = [];
	arr.forEach((v: any) => {
		if (v.path === '/') {
			newArr.push({ component: v.component, name: v.name, path: v.path, redirect: v.redirect, meta: v.meta, children: [] });
		} else {
			if (v.path.indexOf('/:') > -1) {
				v.meta['isDynamic'] = true;
				v.meta['isDynamicPath'] = v.path;
			}
			newArr[0].children.push({ ...v });

			if (newArr[0].meta.isKeepAlive && v.meta.isKeepAlive) {
				cacheList.push(v.name);
				const stores = useKeepALiveNames(pinia);
				stores.setCacheKeepAlive(cacheList);
			}
		}
	});
	return newArr;
}

router.beforeEach(async (to, from, next) => {
	NProgress.configure({ showSpinner: false });
	NProgress.start();
	const token = Session.get('token');
	const jwt = storage.get(StorageKey.jwt);
	console.log(jwt);

	if (to.path === '/login' && !jwt) {
		console.log(1);
		next();
		NProgress.done();
	} else {
		if (!jwt) {
			console.log(2);
			router.push('login');

			Session.clear();
			NProgress.done();
		} else if (jwt && to.path === '/login') {
			console.log(3);
			next();

			NProgress.done();
		} else {
			console.log(4);

			const storesRoutesList = useRoutesList(pinia);
			const { routesList } = storeToRefs(storesRoutesList);
			if (routesList.value.length === 0) {
				if (isRequestRoutes) {
					console.log('10');

					await initBackEndControlRoutes();
					next({ ...to, replace: true });
				} else {
					console.log('11');

					await initFrontEndControlRoutes();
					next({ ...to, replace: true });
				}
			} else {
				console.log(5);

				next();
			}
		}
	}
});

router.afterEach(() => {
	console.log('after');

	NProgress.done();
});

export default router;
