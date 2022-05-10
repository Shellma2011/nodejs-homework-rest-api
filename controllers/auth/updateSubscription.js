const { User, schemas } = require("../../models/user");
const { isValidObjectId } = require("mongoose");
const { createError } = require("../../helpers");

const updateSubscription = async (req, res, next) => {
  const { subscription } = req.body;
  const { id } = req.params;
  const { error } = schemas.updateSubscription.validate({ subscription });
  if (error) {
    throw createError(400, error.message);
  }

  const isValid = isValidObjectId(id);
  if (!isValid) {
    throw createError(404);
  }

  const result = await User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true }
  );
  if (!result) {
    throw createError(404, "Not found");
  }

  res.status(200).json(result);
};

module.exports = updateSubscription;
