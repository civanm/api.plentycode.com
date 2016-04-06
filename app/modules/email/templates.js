/* global __dirname */
(function (templates) {
	var fs = require('fs'),
		ejs = require('ejs'),
		_templateViews = 'app/views/email/';

	templates.getContactRequest = function getContactRequest(emailDAta) {
		var compiled = ejs.compile(fs.readFileSync(_templateViews + 'contact-request-template.ejs', 'utf8'));
		var html = compiled(emailDAta);
		return html;
	};

})(module.exports);