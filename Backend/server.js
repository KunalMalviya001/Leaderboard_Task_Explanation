import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import claimRoutes from './routes/claimRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';

// Import ClaimHistory model for /api/history route
import ClaimHistory from './models/ClaimHistory.js'; // Adjust path accordingly

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/claim', claimRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

app.get('/api/history', async (req, res) => {
  try {
    const history = await ClaimHistory.find()
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
