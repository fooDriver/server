//--------------------------------------
//* Pantry Schema
//--------------------------------------

import mongoose from 'mongoose';

//--------------------------------------------------
//* Pantry only has single driver
//* Pantry items are an array of foods
//--------------------------------------------------

const pantrySchema = new mongoose.Schema({
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

pantrySchema.plugin(require('mongoose-autopopulate'));


export default mongoose.model('pantry', pantrySchema);