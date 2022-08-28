<template>
	<div>
		<el-alert title="تغییر نقش کاربر" type="warning" :closable="false"></el-alert>
		<el-alert
			:title="`当前用户页面权限：[${userInfos.roles}]，当前用户按钮权限：[${userInfos.authBtnList}]`"
			type="success"
			:closable="false"
			class="mt15"
		></el-alert>
		<el-card shadow="hover" header="切换用户演示，前端控制不同用户显示不同页面、按钮权限" class="mt15">
			<el-radio-group v-model="userAuth" size="default" @change="onRadioChange">
				<el-radio-button label="admin"></el-radio-button>
				<el-radio-button label="common"></el-radio-button>
			</el-radio-group>
		</el-card>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, defineComponent } from 'vue';
import Cookies from 'js-cookie';
import { storeToRefs } from 'pinia';
import { useUserInfo } from '/@/stores/userInfo';
import { frontEndsResetRoute, setAddRoute, setFilterMenuAndCacheTagsViewRoutes } from '/@/router/frontEnd';

export default defineComponent({
	name: 'limitsFrontEndPage',
	setup() {
		const storesUserInfo = useUserInfo();
		const { userInfos } = storeToRefs(storesUserInfo);
		const state = reactive({
			val: '',
			userAuth: '',
		});
		const initUserAuth = () => {
			state.userAuth = (<any>userInfos).value.roles[0];
		};
		const onRadioChange = async () => {
			frontEndsResetRoute();
			Cookies.set('userName', state.userAuth);
			await storesUserInfo.setUserInfos();
			await setAddRoute();
			setFilterMenuAndCacheTagsViewRoutes();
		};
		onMounted(() => {
			initUserAuth();
		});
		return {
			userInfos,
			onRadioChange,
			...toRefs(state),
		};
	},
});
</script>
