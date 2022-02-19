function AuthMCL(email, pass) {
	return require("minecraft-launcher-core").Authenticator.getAuth(email, pass);
}

function AuthOff(user) {
	return require("minecraft-launcher-core").Authenticator.getAuth(user);
}

module.exports = { AuthOff, AuthMCL };
