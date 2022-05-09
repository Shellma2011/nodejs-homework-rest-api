const express = require("express");

const ctrl = require("../../controllers/auth");
// const { auth: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { schemas } = require("../../models/user");

const { auth, validation } = require("../../middlewares");

const router = express.Router();

router.post("/signup", validation(schemas.signup), ctrlWrapper(ctrl.singup));

router.post("/login", validation(schemas.login), ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrl.getCurrent);

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
