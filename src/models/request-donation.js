//--------------------------------------
//* Request and Donation Schema
//--------------------------------------

import mongoose, { Schema } from 'mongoose';

const requestDonationSchema = new Schema({
  driver: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    autopopulate: true,
  },
  address: String,
  food: String,
  reqOrDon: String, 
});

requestDonationSchema.plugin(require('mongoose-autopopulate'));

export default mongoose.model('requestDonation', requestDonationSchema);