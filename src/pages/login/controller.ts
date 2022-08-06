import router from '/@/router';
import jwt from '/@/modules/jwt';
import sessionInfo from '/@/api/modules/sessionInfo';
import { apiPaths } from '/@/api/apiPaths';
import ApiClient from '/@/api/modules/api';
import md5 from 'md5';
import randomSalt from '/@/api/modules/salt';
import { ExAPIAccessDenied, ExAPIBadRequest, ExAPIUnauthorized, ExAPIPreconditionRequired, ExAPINetwork } from '/@/api/exceptions/APIExceptions';
import { Session } from '/@/utils/storage';
import Cookies from 'js-cookie';
import { makeTranslator } from '/@/i18n';
import t from './i18n.json';

export const $t = makeTranslator(t);
// setInterval(() => {
// 	console.log($t('signInText'));
// }, 1000);

export async function submit(emailOrMobile: string, password: string) {
	// if (this.emailOrMobile && this.password) {
	const salt = randomSalt();
	try {
		await ApiClient.get(
			apiPaths.logIn,
			{
				auth: false,
				throw404: false,
				throw401: true,
			},
			{
				emailOrMobile: emailOrMobile,
				pass: md5(salt + md5(password)),
				rememberMe: true,
				sessionInfo: sessionInfo,
				salt,
			}
		).then((response: any) => {
			jwt.set(response.data.result);
			Session.set('token', Math.random().toString(36).substr(0));
			Cookies.set('userName', emailOrMobile);
			router.push('home');
		});
	} catch (error) {
		alert('wrongPass');
		if (error instanceof ExAPIUnauthorized || error instanceof ExAPIBadRequest || error instanceof ExAPIAccessDenied) {
		} else if (error instanceof ExAPIPreconditionRequired) {
			// this.requiredConfirmCode()
		} else if (error instanceof ExAPINetwork) {
			// AuthErrorModule.setErrorText($t('networkError'))
		} else {
			// AuthErrorModule.setErrorText(error)
		}
	} finally {
	}
	// } else {
	// }
}
// previous api
// export function useLoginApi() {
// 	return {
// 		signIn: (params: object) => {
// 			return request({
// 				url: '/user/signIn',
// 				method: 'post',
// 				data: params
// 			})
// 		},
// 		signOut: (params: object) => {
// 			return request({
// 				url: '/user/signOut',
// 				method: 'post',
// 				data: params
// 			})
// 		}
// 	}
// }
