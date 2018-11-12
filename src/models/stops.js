//--------------------------------------
//* Stops Schema
//--------------------------------------

import mongoose from 'mongoose';

const stopsSchema = new mongoose.Schema({
  route: { type: Schema.Types.ObjectId, ref: 'route' },
});

export default mongoose.model('stop', stopsSchema);