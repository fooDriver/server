//--------------------------------------
//* Request and Donation Schema
//--------------------------------------

import mongoose, { Schema } from 'mongoose';
require('mongoose-schema-jsonschema')(mongoose);

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

let jsonSchema = requestDonationSchema.jsonSchema();
console.dir(jsonSchema, {depth: null});

requestDonationSchema.plugin(require('mongoose-autopopulate'));

export default mongoose.model('requestDonation', requestDonationSchema);