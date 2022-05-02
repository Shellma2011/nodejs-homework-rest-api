const { Contact } = require("../../models/contact");
const { isValidObjectId } = require("mongoose");

const { createError } = require("../../helpers");

const getById = async (req, res, next) => {
  const { id } = req.params;
  const isValid = isValidObjectId(id);
  if (!isValid) {
    throw createError(404);
  }

  const result = await Contact.findById(id, "-createdAt -updatedAt");
  if (!result) {
    throw createError(404, "Not found");
  }
  res.json(result);
};

module.exports = getById;
