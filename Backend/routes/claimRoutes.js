import express from 'express';
import User from '../models/User.js';
import ClaimHistory from '../models/ClaimHistory.js';

const router = express.Router();

// POST /api/claim - Claim random points
router.post('/', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const points = Math.floor(Math.random() * 10) + 1;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.totalPoints += points;
    await user.save();

    const history = new ClaimHistory({
      userId,
      userName: user.name, // Helpful for UI/debugging
      pointsAwarded: points,
      claimedAt: new Date(),
    });

    await history.save();

    res.json({
      pointsAwarded: points,
      updatedTotal: user.totalPoints,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/claim/:userId/history - Get claim history of a user
router.get('/:userId/history', async (req, res) => {
  try {
    const history = await ClaimHistory.find({ userId: req.params.userId })
      .sort({ claimedAt: -1 })
      .limit(100);

    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not fetch history' });
  }
});

export default router;
