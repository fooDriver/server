//--------------------------------------
//* Stops Schema
//--------------------------------------

import mongoose from 'mongoose';

const stopsSchema = new mongoose.Schema({
  location: { type: String, required: true, unique: true },
  route: { type: Schema.Types.ObjectId, ref: 'route' },
});

export default mongoose.model('stop', stopsSchema);