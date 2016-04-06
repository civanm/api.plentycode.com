(function (data) {
	var emailsCollection = require('./emails.collection'),
		peopleCollection = require('./people.collection'),
		usersCollection = require('./users.collection'),
		domainsCollection = require('./domains.collection');

	//data collections
	data.emails = emailsCollection;
	data.people = peopleCollection;
	data.users = usersCollection;
	data.domains = domainsCollection;

})(module.exports);