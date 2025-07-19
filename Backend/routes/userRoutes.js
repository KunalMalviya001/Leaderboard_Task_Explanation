import express from 'express';
import User from '../models/User.js';
import e from 'express';

const router = express.Router();


router.get('/', async (req, res) => {
  const users = await User.find().sort({ createdAt: 1 });
  res.json(users);
});

router.post('/', async (req, res) => {
  const newUser = new User({ name: req.body.name });
  await newUser.save();
  res.json(newUser);
});

export default router;
