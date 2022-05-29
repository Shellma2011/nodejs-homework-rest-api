const { schemas, User } = require("../../models/user");
const { createError, sendMail } = require("../../helpers");

const verifyEmail = async (req, res, next) => {
  const { error } = schemas.verifyEmail.validate(req.body);
  if (error) {
    throw createError(400);
  }
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401);
  }

  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "Подтвердждение регистрации на сайте",
    html: `<a target=a"_blank" href="localhost:3000/api/auth/verify/${user.verificationToken}">Нажмите для подтверждения email</a>`,
  };
  await sendMail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = verifyEmail;
