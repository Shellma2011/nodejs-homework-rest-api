const express = require("express");

// const { contacts: ctrl } = require("../../controllers");
const ctrl = require("../../controllers/contacts");
const { auth, validation, validateId } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));
router.get("/:id", auth, validateId, ctrlWrapper(ctrl.getById));
router.post("/", auth, ctrlWrapper(ctrl.add));
router.put(
  "/:id",
  auth,
  validateId,
  validation(schemas.add),
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:id/favorite",
  auth,
  validateId,
  validation(schemas.updateFavorite),
  ctrlWrapper(ctrl.updateFavorite)
);
router.delete("/:id", auth, validateId, ctrlWrapper(ctrl.removeById));

module.exports = router;
