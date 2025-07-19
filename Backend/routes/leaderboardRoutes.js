import express from 'express';
import User from '../models/User.js';
import e from 'express';


const router = express.Router();


router.get('/', async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  const leaderboard = users.map((user, index) => ({
    rank: index + 1,
    name: user.name,
    totalPoints: user.totalPoints
  }));
  res.json(leaderboard);
});

export default router;