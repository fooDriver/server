//--------------------------------------
//* Food Schema
//--------------------------------------

import mongoose, { Schema } from 'mongoose';
require('mongoose-schema-jsonschema')(mongoose);

//--------------------------------------------------
//* Pantry schema will pull from here
//--------------------------------------------------

const foodSchema = new Schema({
  food: { type: String, required: true, unique: true },
});

let jsonSchema = foodSchema.jsonSchema();
console.dir(jsonSchema, {depth: null});

export default mongoose.model('food', foodSchema);