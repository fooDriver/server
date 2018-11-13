//--------------------------------------
//* Stops Schema
//--------------------------------------

import mongoose from 'mongoose';

const stopsSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    unique: true,
  },
  route: {
    type: Schema.Types.ObjectId,
    ref: 'route',
    autopopulate: true,
  },
});

stopsSchema.plugin(require('mongoose-autopopulate'));

export default mongoose.model('stop', stopsSchema);