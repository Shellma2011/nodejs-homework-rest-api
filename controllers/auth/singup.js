const { createError, sendEmail } = require("../../helpers");
const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const singup = async (req, res, next) => {
  const { email, password } = req.body;

  const result = await User.findOne({ email });
  if (result) {
    throw createError(409, "Email already exist ");
  }

  const verificationToken = uuidv4();

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Подтвердждение регистрации на сайте",
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}">Нажмите для подтверждения email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    user: {
      email,
      subscription: "starter",
    },
  });
};

module.exports = singup;
