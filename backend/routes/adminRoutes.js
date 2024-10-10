// routes/adminRoutes.js
const express = require("express");
const {
  create,
  login,
  verifyOTP,
  forgotPassword,
  resetPassword,
} = require("../controllers/adminController");
const { authSuperAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/create", authSuperAdmin, create);
router.post("/login", login);
router.post("/verify-otp", verifyOTP);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
