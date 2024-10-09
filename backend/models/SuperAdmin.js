// models/SuperAdmin.js
const mongoose = require('mongoose');

const SuperAdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('SuperAdmin', SuperAdminSchema);