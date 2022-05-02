const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp = /.+@.+\..+/;
const phoneRegexp = /^[0-9]{10}$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      match: phoneRegexp,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const contactAddJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().regex(emailRegexp).required(),
  phone: Joi.string().regex(phoneRegexp).required(),
  favorite: Joi.bool(),
});

const contactUpdateFavoriteJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const schemas = {
  add: contactAddJoiSchema,
  updateFavorite: contactUpdateFavoriteJoiSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
