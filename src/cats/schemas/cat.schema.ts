import * as mongoose from 'mongoose';

export const CatSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
  },
});
