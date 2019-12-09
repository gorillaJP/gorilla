/**
* to check if the service is up
* @route GET /health
* @group Health Check
* @returns {object} 200 - An array of user info
*/

/**
* @typedef User
* @property {string} username.required - eg: user1
* @property {string} password.required - Some description for point - eg: password1
*/


/**
* @route POST /api/login
* @param {User.model} username.body.required - username
* @returns {object} 200 - user details and JWT token
* @group Auth1
*/


/**
* @route GET /api/seeker/{id}
* @param {string} id.path
* @returns {object} 200 -
* @group Seeker
*/
