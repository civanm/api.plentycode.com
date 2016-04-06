var templates = require('./templates'),
	server = require('./server');

describe('email module', function () {

	beforeEach(function () {

	});

	it('works', function () {
		expect(true).toBeTruthy();
	});

	it('should have an getContactRequest function', function () {
		expect(templates.getContactRequest).toBeDefined();
	});

	it('should return a string with the template', function (){

	});
});
