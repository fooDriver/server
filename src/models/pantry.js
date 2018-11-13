//--------------------------------------
//* Pantry Schema
//--------------------------------------

import mongoose, { Schema } from 'mongoose';

//--------------------------------------------------
//* Pantry only has single driver
//* Pantry items are an array of foods
//--------------------------------------------------

const pantrySchema = new Schema({
  pantryItems: [{
    type: Schema.Types.ObjectId,
    ref: 'food',
    autopopulate: true,
  }],
});

//pantrySchema.pre('create', function(next))

pantrySchema.plugin(require('mongoose-autopopulate'));


export default mongoose.model('pantry', pantrySchema);