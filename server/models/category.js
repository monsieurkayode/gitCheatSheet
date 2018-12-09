import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  cheatSheets: [{ type: Schema.Types.ObjectId, ref: 'CheatSheet' }]
});

export default mongoose.model('Category', categorySchema);
