(function (register) {
	var data = require('../data'),
		hasher = require('./hasher');

	register.get = getRequest;
	register.post = postRequest;

	function getRequest(req, res) {
		res.render('auth/register');
	};

	function postRequest(req, res) {
		var salt = hasher.createSalt();

		var user = {
			name: req.body.name,
			email: req.body.email,
			username: req.body.username,
			password: hasher.computeHash(req.body.password, salt),
			salt: salt
		},

			response = {};

		isValidToSave(user, function (err, isValid, invalidMessage) {
			if (isValid) {
				data.users.save(user, function add(err) {
					if (err) {
						response.success = false;
						response.message = 'user could not be saved';
						console.log('error trying to save user: ', err);
					} else {
						response.success = true;
						response.message = 'congrats, user was saved correctly';
						response.token = hasher.createToken(user._id);
					}
					res.send(response);
				});
			} else {
				res.send({ success: false, message: invalidMessage });
			}
		});

	}
	//validates that the user can be saved
	function isValidToSave(toSaveUser, next) {
		var isValid = true,
			invalidMessage = 'User already exists';

		data.users.getByUsername(toSaveUser.username, function (err, user) {
			if (!err & !user) {
				next(null, isValid);
			} else {
				next(null, !isValid, invalidMessage);
			}
		});
	}

})(module.exports);