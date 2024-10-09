// routes/superAdminRoutes.js
const express = require('express');
const { login } = require('../controllers/superAdminController');

const router = express.Router();

router.post('/login', login);

module.exports = router;