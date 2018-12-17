//--------------------------------------
//* Stops Schema
//--------------------------------------

import mongoose, { Schema } from 'mongoose';
require('mongoose-schema-jsonschema')(mongoose);

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

let jsonSchema = stopsSchema.jsonSchema();
console.dir(jsonSchema, {depth: null});

stopsSchema.plugin(require('mongoose-autopopulate'));

export default mongoose.model('stop', stopsSchema);