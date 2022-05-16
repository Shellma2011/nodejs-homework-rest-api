const express = require("express");

const ctrl = require("../../controllers/auth");
const { ctrlWrapper } = require("../../helpers");
const { schemas } = require("../../models/user");
const { auth, validation, upload } = require("../../middlewares");

const router = express.Router();

router.post("/signup", validation(schemas.signup), ctrlWrapper(ctrl.singup));

router.post("/login", validation(schemas.login), ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrl.getCurrent);

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.patch(
  "/:id/subscription",
  auth,
  validation(schemas.updateSubscription),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.uploadAvatar)
);

module.exports = router;
