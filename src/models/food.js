//--------------------------------------
//* Food Schema
//--------------------------------------

import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  food: { type: String, required: true, unique: true },
});

export default mongoose.model('food', foodSchema);