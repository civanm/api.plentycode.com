(function (seedData) {
	var faker = require("faker"),
		_ = require("lodash");

	seedData.initialData = {
		people: _.times(10, function (n) {
			return {
				id: n,
				name: faker.name.findName(),
				email: faker.internet.email()
			};
		})
	};
})(module.exports);