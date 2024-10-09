// controllers/superAdminController.js
const SuperAdmin = require('../models/SuperAdmin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const superAdmin = await SuperAdmin.findOne({ username });
    
    if (!superAdmin || !(await bcrypt.compare(password, superAdmin.password))) {
      return res.status(401).send({ error: 'Invalid login credentials' });
    }
    
    const token = jwt.sign({ _id: superAdmin._id }, process.env.JWT_SECRET);
    res.send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
};