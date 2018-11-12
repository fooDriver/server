//--------------------------------------
//* Route Stops Schema
//--------------------------------------

import mongoose from 'mongoose';

const stopsSchema = new mongoose.Schema({
  location: { type: String, required: true, unique: true },
});

export default mongoose.model('stop', stopsSchema);