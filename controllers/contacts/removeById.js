const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");
const { isValidObjectId } = require("mongoose");

const removeById = async (req, res, next) => {
  const { id } = req.params;
  const isValid = isValidObjectId(id);
  if (!isValid) {
    throw createError(404);
  }

  const result = await Contact.findByIdAndRemove(id);

  if (!result) {
    throw createError(404, "Not found");
  }

  res.json({ message: "Contact deleted" });
};

module.exports = removeById;
