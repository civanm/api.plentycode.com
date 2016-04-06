(function (login) {
	var passport = require('passport'),
		LocalStrategy = require('passport-local').Strategy,
		data = require('../data'),
		hasher = require('./hasher');

	login.init = init;
	login.getRequest = getRequest;
	login.postRequest = postRequest;
	login.ensureAuthenticated = ensureAuthenticated;


	function init(app) {
		//setup passport authentication
		
		app.use(passport.initialize());

		var loginStrategy = new LocalStrategy({}, userVerify);

		passport.serializeUser(function (user, next) {
			console.log('serialize: ', user)
			next(null, user.username);
		});

		passport.deserializeUser(function (key, next) {
			console.log('deserialize: ', key);
			data.users.getByUsername(key, function (err, user) {

				if (err || !user) {
					next(null, false, { message: 'failed to retrieve user' });
				} else {
					next(null, user);
				}
			});
		});

		passport.use(loginStrategy);
	}

	function getRequest(req, res) {
		res.render("auth/login");
	}

	function postRequest(req, res, next) {


		passport.authenticate('local', function (err, user, message) {
			if (err) return next(err);

			var response = {
				logged: false,
				message: message
			};

			if (!user) {
				return res.status(401).json(response);
			}
			//logs user in
			req.login(user, function (err) {
				if (err) return next(err);
				
				response.logged = true;
				response.token = hasher.createToken(user._id);

				res.json(response);
			});
		})(req, res, next);
	}

	function userVerify(username, password, next) {
		data.users.getByUsername(username, function (err, user) {
			if (!err && user) {
				var testHash = hasher.computeHash(password, user.salt);
				if (testHash === user.password) {
					next(null, user);
					return;
				}
			}
			next(null, false, 'Invalid Credentials');
		});
	}

	function ensureAuthenticated(req, res, next) {
		if (!req.headers.authorization) {
			return res.status(401).send({ message: 'Not authorized' });
		}
		var token = req.headers.authorization,
			payload = hasher.decodePayload(token);

		if (!payload.sub) {
			return res.status(401).send({ message: 'Not authorized' });
		} else {
			next();
		}
	};
})(module.exports);