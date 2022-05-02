const { Contact, schemas } = require("../../models/contact");
const { createError } = require("../../helpers");
const { isValidObjectId } = require("mongoose");

const updateById = async (req, res, next) => {
  const { error } = schemas.add.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }

  const { id } = req.params;
  const isValid = isValidObjectId(id);
  if (!isValid) {
    throw createError(404);
  }

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw createError(404, "Not found");
  }

  res.status(200).json(result);
};

module.exports = updateById;