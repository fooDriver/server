//--------------------------------------
//* Food Schema
//--------------------------------------

import mongoose, { Schema } from 'mongoose';

//--------------------------------------------------
//* Pantry schema will pull from here
//--------------------------------------------------

const foodSchema = new Schema({
  food: { type: String, required: true, unique: true },
});

export default mongoose.model('food', foodSchema);