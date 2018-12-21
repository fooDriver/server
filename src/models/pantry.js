//--------------------------------------
//* Pantry Schema
//--------------------------------------

import mongoose, { Schema } from 'mongoose';

//--------------------------------------------------
//* Pantry only has single driver
//* Pantry items are an array of foods
//--------------------------------------------------

const pantrySchema = new Schema({
  driver: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  pantryItems: [{
    type: Schema.Types.ObjectId,
    ref: 'amount',
    autopopulate: true,
  }],
});

pantrySchema.plugin(require('mongoose-autopopulate'));


export default mongoose.model('pantry', pantrySchema);