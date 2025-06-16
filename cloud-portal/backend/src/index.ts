// server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectCloudRoutes from '../Routes/connectCloud'; // adjust path as needed

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Middleware
app.use(cors()); // Allow requests from your frontend
app.use(express.json()); // Parse JSON bodies

// ✅ API Routes under /api
app.use('/api', connectCloudRoutes);

// ✅ Root route (optional)
app.get('/', (_req, res) => {
  res.send('API is running!');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
