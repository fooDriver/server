//--------------------------------------
//* Route Stops Schema
//--------------------------------------

import mongoose from 'mongoose';

//--------------------------------------------------
//* Routes only have single driver
//--------------------------------------------------

const routeSchema = new mongoose.Schema({
  driver: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    autopopulate: true,
  },
});

routeSchema.plugin(require('mongoose-autopopulate'));

export default mongoose.model('route', routeSchema);