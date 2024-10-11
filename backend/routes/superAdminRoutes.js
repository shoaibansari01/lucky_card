// routes/superAdminRoutes.js
const express = require('express');
const { login,addToWallet, getAllAdmins } = require('../controllers/superAdminController');
const { authSuperAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.get('/all-admins', authSuperAdmin, getAllAdmins);
router.post('/add-to-wallet', authSuperAdmin, addToWallet);

module.exports = router;