/* eslint-disable no-console */
import dotenv from 'dotenv';
import User from '../models/user';

dotenv.config();

const setupAdmin = async (cb) => {
  const count = await User.estimatedDocumentCount();

  if (count === 0) {
    console.log('🍺 Setting up admin user...');

    await User.create({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD
    });

    console.log('🍺 Admin user setup complete...');

    if (typeof cb === 'function') cb();
  }
};

export default setupAdmin;
