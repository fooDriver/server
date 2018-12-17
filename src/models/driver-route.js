//--------------------------------------
//* Route Stops Schema
//--------------------------------------

import mongoose, { Schema } from 'mongoose';
require('mongoose-schema-jsonschema')(mongoose);

//--------------------------------------------------
//* Routes only have single driver
//--------------------------------------------------

const routeSchema = new Schema({
  name: String,
  driver: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    autopopulate: true,
  },
});

let jsonSchema = routeSchema.jsonSchema();
console.dir(jsonSchema, {depth: null});

routeSchema.plugin(require('mongoose-autopopulate'));

export default mongoose.model('route', routeSchema);