/**
 * 
 * @param {*} context 
 */
async function logInAsAdminUser(context) {
  context.proxy.user = process.env.ADMIN_USER;
}

module.exports = { 
  logInAsAdminUser
};
