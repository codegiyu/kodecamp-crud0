const express = require("express");
const router = express.Router();
const { login, register } = require("../../controllers/auth");
const { validateRequest } = require("../../middlewares");

router.post("/register", validateRequest("v1/auth/register"), register);
router.post("/login", validateRequest("v1/auth/login"), login);

module.exports = router;