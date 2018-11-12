//--------------------------------------
//* Request and Donation Schema
//--------------------------------------

import mongoose from 'mongoose';

const requestDonationSchema = new mongoose.Schema({
  driver: String,
  address: String,
  food: String,
  reqOrDon: { type: String, required: true, default: 'other', enum: ['request', 'donation', 'other'] },
});

export default mongoose.model('requestDonation', requestDonationSchema);