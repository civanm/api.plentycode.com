(function (users) {
	var database = require('./database');

	//public members
	users.save = saveUser;
	users.getByUsername = getByUsername;

	//privates members
	function getByUsername(username, next) {
		database.getDb(function (err, db) {
			if (err) {
				next(err);
			} else {
				db.users.findOne({ username: username }, next);
			}
		});
	}

	function saveUser(user, next) {
		next = next || function () { };

		database.getDb(function (err, db) {
			if (err) {
				next(err);
			} else {
				db.users.insert(user, function (err) {
					if (err) {
						console.log('error: ', err);
						next(err);
					} else {
						console.log('Saved new user');
						next(null, user);
					}
				});
			}
		});
	}
})(module.exports);