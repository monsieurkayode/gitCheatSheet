import mongoose, { Schema } from 'mongoose';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    lowercase: true,
    trim: true,
    minlength: [3, 'Username length too short'],
    maxlength: [30, 'Username length too long'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password not strong enough']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// eslint-disable-next-line func-names
userSchema.pre('save', function (next) {
  const hashedPassword = this.encryptPassword(this.password);
  this.password = hashedPassword;
  next();
});

userSchema.methods = {
  authenticate(plainText) {
    if (!plainText || !this.password) return false;
    return compareSync(plainText.trim(), this.password);
  },
  encryptPassword(password) {
    if (!password) return '';
    return hashSync(password, genSaltSync());
  }
};

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
