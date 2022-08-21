import { createI18n } from 'vue-i18n';
import { toRef, unref } from 'vue';
import pinia from '/@/stores/index';
import { ISO639 } from './ISO639';
import { storeToRefs, defineStore } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import faLocale from 'element-plus/lib/locale/lang/fa';
import enLocale from 'element-plus/lib/locale/lang/en';
import translations from './translations';

export const i18nStore = defineStore('i18n', {
	state: () => ({
		isRTL: isRTLLang() as boolean,
	}),
	actions: {
		rtlManager() {
			this.isRTL = isRTLLang();
		},
	},
});

const messages = {
	[faLocale.name]: {
		...translations.fa,
	},
	[enLocale.name]: {
		...translations.en,
	},
};

const stores = useThemeConfig(pinia);
const { themeConfig } = storeToRefs(stores);
export const getLocale = () => {
	return themeConfig.value.globalI18n;
};

export const i18n = createI18n({
	silentTranslationWarn: true,
	missingWarn: false,
	silentFallbackWarn: true,
	fallbackWarn: false,
	locale: getLocale(),
	fallbackLocale: enLocale.name,
	messages,
});

export function makeTranslator(translations?: any) {
	const i18n = createI18n({
		silentTranslationWarn: true,
		missingWarn: false,
		silentFallbackWarn: true,
		fallbackWarn: false,
		locale: getLocale(),
		fallbackLocale: enLocale.name,
		messages: translations ? translations : messages,
	});
	for (const key in translations) {
		i18n.global.setLocaleMessage(key, translations[key as keyof typeof translations]);
	}
	return (key: any, values?: any) => i18n.global.t(key, getLocale(), values);
}

export const rtlLanguages: Array<ISO639> = [ISO639.Persian, ISO639.Arabic, ISO639.Hebrew];
export function isRTLLang(): boolean {
	for (const rtlLang in rtlLanguages) {
		if (rtlLanguages[rtlLang] == getLocale()) return true;
	}
	return false;
}
