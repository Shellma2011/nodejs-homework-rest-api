const singup = require("./singup");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription");
const uploadAvatar = require("./uploadAvatar");
const verifyEmail = require("./verifyEmail");
const verificationTokenEmail = require("./verificationTokenEmail");

module.exports = {
  singup,
  login,
  getCurrent,
  logout,
  updateSubscription,
  uploadAvatar,
  verifyEmail,
  verificationTokenEmail,
};
