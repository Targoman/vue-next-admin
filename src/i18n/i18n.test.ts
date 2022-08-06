import { describe, it, expect } from 'vitest';
import { getLocale, makeTranslator } from '.';
import { ISO639 } from './ISO639';

describe('makeTranslator', () => {
	it('should return function', () => {
		// it should return function
		expect(makeTranslator()).toBeTypeOf('function');
	});

	it('should return string', () => {
		// result should be type of string
		const t = makeTranslator();
		expect(t('dashboard')).toBeTypeOf('string');
	});
});

describe('getLocale', () => {
	it('should return ISO639', () => {
		// it should be ISO639
		expect(Object.values(ISO639)).includes(getLocale());
	});

	it('should return "fa" or "en"', () => {
		// it should be changed after adding new languages
		expect(getLocale()).toMatch(ISO639.Persian || ISO639.English);
	});
});
