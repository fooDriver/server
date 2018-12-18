//--------------------------------------
//* Quantity Schema
//--------------------------------------

import mongoose, { Schema } from 'mongoose';

//--------------------------------------------------
//* Pantry only has single driver
//* Pantry items are an array of foods
//--------------------------------------------------

const quantitySchema = new Schema({
  food: {
    type: Schema.Types.ObjectId,
    ref: 'food',
    autopopulate: true,
  },
  quantity: Number,
});

quantitySchema.plugin(require('mongoose-autopopulate'));

export default mongoose.model('amount', quantitySchema);