//--------------------------------------
//* Route Stops Schema
//--------------------------------------

import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema({
  driver: { type: Schema.Types.ObjectId, ref: 'users' },
});

export default mongoose.model('route', routeSchema);