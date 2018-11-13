//--------------------------------------
//* Stops Schema
//--------------------------------------

import mongoose, { Schema } from 'mongoose';

const stopsSchema = new Schema({
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