import { describe, it, expect } from 'vitest';
const two = 2;
const truthy = () => true;
describe('is truthy', () => {
	it('should return true', () => {
		expect(truthy).toBeTruthy();
	});

	it('should be 2', () => {
		expect(two).toBe(2);
	});
});
