//--------------------------------------
//* Food Schema
//--------------------------------------

import mongoose from 'mongoose';

//--------------------------------------------------
//* Pantry schema will pull from here
//--------------------------------------------------

const foodSchema = new mongoose.Schema({
  food: { type: String, required: true, unique: true },
});

export default mongoose.model('food', foodSchema);