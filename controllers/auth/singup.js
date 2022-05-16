const { createError } = require("../../helpers");
const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const singup = async (req, res, next) => {
  const { email, password } = req.body;

  const result = await User.findOne({ email });
  if (result) {
    throw createError(409, "Email already exist ");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  await User.create({ email, password: hashPassword, avatarURL });
  res.status(201).json({
    user: {
      email,
      subscription: "starter",
    },
  });
};

module.exports = singup;
