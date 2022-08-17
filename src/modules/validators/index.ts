import validator from 'validator';
import { makeTranslator } from '/@/i18n';
import t from './i18n.json';
const $t = makeTranslator(t);

function validateMobile(value: string) {
	//todo configFile or here?
	const supportedCountries = { fa: 'fa-IR' };
	return validator.isMobilePhone(value, Object.values(supportedCountries) as any);
}

export default {
	email: (value: string) => validator.isEmail(value),
	mobile: validateMobile,
	emailOrMobile: (value: string) => validator.isEmail(value) || validateMobile(value),

	notEmpty: (value: string) => (value.length > 0 ? null : $t('mustBeFilledUp')),
	iban(value: string) {
		if (validator.isIBAN(value)) {
			return null;
		} else return $t('mustBeValidIBAN');
	},
};
