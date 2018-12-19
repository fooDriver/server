//--------------------------------------
//* Request and Donation Schema
//--------------------------------------

import mongoose, { Schema } from 'mongoose';

const requestDonationSchema = new Schema({
  address: String,
  food: String,
  reqOrDon: String, 
});

export default mongoose.model('requestDonation', requestDonationSchema);