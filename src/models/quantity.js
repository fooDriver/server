//--------------------------------------
//* Quantity Schema
//--------------------------------------

import mongoose, { Schema } from 'mongoose';

//--------------------------------------------------
//* Pantry only has single driver
//* Pantry items are an array of foods
//--------------------------------------------------

const quantitySchema = new Schema({
  quantity: { type: Number, required: true },
  food: {
    type: Schema.Types.ObjectId,
    ref: 'food',
    autopopulate: true,
  },
});

quantitySchema.plugin(require('mongoose-autopopulate'));

export default mongoose.model('amount', quantitySchema);