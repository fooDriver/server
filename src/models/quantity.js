//--------------------------------------
//* Quantity Schema
//--------------------------------------

import mongoose, { Schema } from 'mongoose';

//--------------------------------------------------
//* Pantry only has single driver
//* Pantry items are an array of foods
//--------------------------------------------------

const quantitySchema = new Schema({
  pantry: {
    type: Schema.Types.ObjectId,
    ref: 'pantry',
    autopopulate: true,
  },
  food: {
    type: Schema.Types.ObjectId,
    ref: 'food',
    autopopulate: true,
  },
  quantity: Number,
});

quantitySchema.plugin(require('mongoose-autopopulate'));

export default mongoose.model('amount', quantitySchema);