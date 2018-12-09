import mongoose, { Schema } from 'mongoose';

const cheatSheetSchema = new Schema({
  header: { type: String, trim: true, required: true },
  commands: [{ type: String, trim: true, required: true }],
  description: { type: String, trim: true, required: true },
  keywords: Array,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  published: { type: Boolean, default: false }
});

export default mongoose.model('CheatSheet', cheatSheetSchema);
