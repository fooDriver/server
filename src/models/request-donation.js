//--------------------------------------
//* Request and Donation Schema
//--------------------------------------

import mongoose, { Schema } from 'mongoose';

const requestDonationSchema = new Schema({
  driver: String,
  address: String,
  food: String,
  reqOrDon: { type: String, required: true, default: 'other', enum: ['request', 'donation', 'other'] },
});

export default mongoose.model('requestDonation', requestDonationSchema);