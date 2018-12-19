//--------------------------------------
//* Route Stops Schema
//--------------------------------------

import mongoose, { Schema } from 'mongoose';

//--------------------------------------------------
//* Routes only have single driver
//--------------------------------------------------

const routeSchema = new Schema({
  name: String,
  driver: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

export default mongoose.model('route', routeSchema);