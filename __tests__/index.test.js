import { myFunction } from '../app/myModule';

test('hello world!', () => {
	expect(myFunction()).toBe('Hello, World!');
});