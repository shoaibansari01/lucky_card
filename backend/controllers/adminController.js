// controllers/adminController.js
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

exports.create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    
    if (existingAdmin) {
      return res.status(400).send({ error: 'Email already in use' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 8);
    const adminId = uuidv4();
    const admin = new Admin({ name, email, password: hashedPassword, adminId });
    await admin.save();
    
    res.status(201).send({ admin: { name, email, adminId } });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).send({ error: 'Invalid login credentials' });
    }
    
    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);
    res.send({ token, adminId: admin.adminId });
  } catch (error) {
    res.status(400).send(error);
  }
};