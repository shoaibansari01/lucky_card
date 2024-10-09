// routes/adminRoutes.js
const express = require('express');
const { create, login } = require('../controllers/adminController');
const { authSuperAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/create', authSuperAdmin, create);
router.post('/login', login);

module.exports = router;