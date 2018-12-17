//--------------------------------------
//* Pantry Schema
//--------------------------------------

import mongoose, { Schema } from 'mongoose';
require('mongoose-schema-jsonschema')(mongoose);

//--------------------------------------------------
//* Pantry only has single driver
//* Pantry items are an array of foods
//--------------------------------------------------

const pantrySchema = new Schema({
  driver: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    autopopulate: true,
  },
  pantryItems: [{
    type: Schema.Types.ObjectId,
    ref: 'food',
    autopopulate: true,
  }],
});

let jsonSchema = pantrySchema.jsonSchema();
console.dir(jsonSchema, {depth: null});

pantrySchema.plugin(require('mongoose-autopopulate'));


export default mongoose.model('pantry', pantrySchema);