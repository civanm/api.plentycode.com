(function (people) {
	var data = require('../data'),
		auth = require('../auth');

	people.init = function init(app) {

		app.get('/people', function (req, res) {
			//request people from the data base
			data.people.getAll(function (err, peopleResult) {
				if (err) {
					res.send(400, err);
				} else {
					res.set('Content-Type', 'application/json');
					res.send(peopleResult);
				}
			});
		});

		app.get('/people/:id',
			auth.isAllowedDomain,
			function (req, res) {
				var id = parseInt(req.params.id);

				//request people from the data base
				data.people.get(id, function (err, peopleResult) {
					if (err) {
						res.send(400, err);
					} else {
						res.set('Content-Type', 'application/json');
						res.send(peopleResult);
					}
				});
			});
	};
})(module.exports);
