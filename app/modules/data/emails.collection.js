(function (emailsDb) {
	var database = require('./database');

	//public methods 
	emailsDb.save = saveEmail;

	function saveEmail(email, next) {
		next = next || function () { };

		database.getDb(function (err, db) {
			if (err) {
				next(err);
			} else {
				db.emails.insert(email, function (err) {
					if (err) {
						console.log('error: ', err);
						next(err);
					} else {
						console.log('Saved Email', email.to);
						next(null, email);
					}
				});
			}
		});
	}

})(module.exports);