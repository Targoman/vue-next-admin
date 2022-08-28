import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { UserInfosStates } from './interface';
import { Session } from '/@/utils/storage';

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfosStates => ({
		userInfos: {
			userName: '',
			photo: '',
			time: 0,
			roles: [],
			authBtnList: [],
		},
	}),
	actions: {
		async setUserInfos() {
			// 存储用户信息到浏览器缓存
			if (Session.get('userInfo')) {
				this.userInfos = Session.get('userInfo');
			} else {
				const userInfos: any = await this.getUserInfo();
				this.userInfos = userInfos;
			}
		},
		async getUserInfo() {
			return new Promise((resolve) => {
				setTimeout(() => {
					const userName = Cookies.get('userName');
					let defaultRoles: Array<string> = [];
					let defaultAuthBtnList: Array<string> = [];
					let adminRoles: Array<string> = ['admin'];
					let adminAuthBtnList: Array<string> = ['btn.add', 'btn.del', 'btn.edit', 'btn.link'];
					let testRoles: Array<string> = ['common'];
					let testAuthBtnList: Array<string> = ['btn.add', 'btn.link'];
					if (userName === 'admin') {
						defaultRoles = adminRoles;
						defaultAuthBtnList = adminAuthBtnList;
					} else {
						defaultRoles = testRoles;
						defaultAuthBtnList = testAuthBtnList;
					}
					const userInfos = {
						userName: userName,
						// photo:
						// 	userName === 'admin'
						// 		? 'https://img2.baidu.com/it/u=1978192862,2048448374&fm=253&fmt=auto&app=138&f=JPEG?w=504&h=500'
						// 		: 'https://img2.baidu.com/it/u=2370931438,70387529&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
						time: new Date().getTime(),
						roles: defaultRoles,
						authBtnList: defaultAuthBtnList,
					};
					resolve(userInfos);
				}, 100);
			});
		},
	},
});
