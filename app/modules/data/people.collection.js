(function (people) {
	var database = require('./database'),
		seedData = require('./seedData');
	
	//public functions
	people.get = getPeople;
	people.save = savePeople;
	people.seed = seedPeople;

	function savePeople() {

	}

	function getPeople(peopleId, next) {
		database.getDb(function (err, db) {
			if (err) {
				next(err);
			} else {
				db.people.findOne({ 'id': peopleId }, next);
			}
		});
	}

	function seedPeople(item, next) {
		next = next || function () { };

		database.getDb(function (err, db) {
			if (err) {
				console.log('Error getting the database: ' + err);
			} else {
				db.people.count(function (err, count) {
					if (count === 0) {
						seedData.initialData.people.forEach(function (item) {
							db.people.insert(item, function (err) {
								if (err) {
									console.log('Failed inserting people: ' + err);
								}
							});
						});
					} else {
						console.log('database seeded already with ' + count + ' records');
					}
				});
			}
		});
	}

})(module.exports);