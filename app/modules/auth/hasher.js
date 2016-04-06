(function (hasher) {
	var crypto = require('crypto'),
		jwt = require('jwt-simple');
	
	//publics functions
	hasher.createSalt = createSalt;
	hasher.computeHash = computeHash;
	hasher.createToken = createToken;
	hasher.decodePayload = decodePayload;

	function createSalt() {
		var len = 8;
		return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').substring(0, len);
	}

	function computeHash(source, salt) {
		var hmac = crypto.createHmac('sha1', salt),
			hash = hmac.update(source);

		return hash.digest('hex');
	}

	function createToken(userid) {
		var payload = {
			sub: userid
		};
		return jwt.encode(payload, '#C0ff33');
	}

	function decodePayload(token) {
		return jwt.decode(token, '#C0ff33');
	}

})(module.exports);