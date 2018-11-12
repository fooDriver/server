//--------------------------------------
//* Pantry Schema
//--------------------------------------

import mongoose from 'mongoose';

//--------------------------------------------------
//* Pantry only has single driver
//* Pantry items are an array of foods
//--------------------------------------------------

const pantrySchema = new mongoose.Schema({
  driver: { type: Schema.Types.ObjectId, ref: 'users' },
  pantryItems: [{ type: Schema.Types.ObjectId, ref: 'food' }],
});

export default mongoose.model('pantry', pantrySchema);