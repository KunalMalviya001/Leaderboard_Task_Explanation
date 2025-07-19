import mongoose from 'mongoose';

const claimHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  pointsAwarded: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ClaimHistory = mongoose.model('ClaimHistory', claimHistorySchema);

export default ClaimHistory;
