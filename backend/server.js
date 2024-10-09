// server.js
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const superAdminRoutes = require("./routes/superAdminRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/super-admin", superAdminRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
