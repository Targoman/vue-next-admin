import { describe, it, expect } from 'vitest';
import { getLocale } from '.';
import { ISO639 } from './ISO639';

// const two = 2;
// const truthy = () => true;

// describe('is truthy', () => {
// 	it('should return true', () => {
// 		expect(truthy()).toBeTruthy();
// 	});

// 	it('should be 2', () => {
// 		expect(two).toBe(2);
// 	});
// });
describe('i18n', () => {
	it('should return ISO639', () => {
		// it should be ISO639
		expect(Object.values(ISO639)).includes(getLocale());
	});

	it('should return "fa" or "en"', () => {
		// it should be changed after adding new languages
		expect(getLocale()).toMatch(ISO639.Persian || ISO639.English);
	});
});
