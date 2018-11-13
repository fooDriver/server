//--------------------------------------
//* Route Stops Schema
//--------------------------------------

import mongoose, { Schema } from 'mongoose';

//--------------------------------------------------
//* Routes only have single driver
//--------------------------------------------------

const routeSchema = new Schema({
  name: String,
});

routeSchema.plugin(require('mongoose-autopopulate'));

export default mongoose.model('route', routeSchema);