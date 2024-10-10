import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/database.js';
import cardRoutes from './routes/cardRoutes.js';
// import superAdminRoutes from './routes/superAdminRoutes.js';
// import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();

// Connect to the database
connectDB();

app.use(express.json());

// // Define routes
// app.use("/api/super-admin", superAdminRoutes);
// app.use("/api/admin", adminRoutes);
app.use('/api/cards', cardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
