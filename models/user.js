const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = Schema(
  {
    email: {
      type: String,
      required: true,
      unquire: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const signupJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
});

const updateSubscriptionJoiSchema = Joi.object({
  subscription: Joi.string().required(),
});

const verifyJoiSchema = Joi.object({
  email: Joi.string().required(),
});

const schemas = {
  signup: signupJoiSchema,
  login: signupJoiSchema,
  updateSubscription: updateSubscriptionJoiSchema,
  verifyEmail: verifyJoiSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
