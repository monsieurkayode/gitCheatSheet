/* eslint-disable no-underscore-dangle */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import User from '../models/user';
import Category from '../models/category';
import CheatSheet from '../models/cheatSheet';
import cheatData from '../../global/cheats';

const seedCheats = async () => {
  const count = await CheatSheet.estimatedDocumentCount();
  const admin = await User.findOne({ username: 'admin' });

  if (count === 0) {
    console.log('🍺 Seeding database...');
    for (const category in cheatData) {
      const newCategory = new Category({ name: category });
      for (const cheatSheet of cheatData[category]) {
        const cheat = new CheatSheet({
          ...cheatSheet,
          user: admin._id,
          category: newCategory._id,
          published: true
        });
        cheat.save();
        newCategory.cheatSheets.push(cheat);
      }
      newCategory.save();
    }
    console.log('🍺 Database seeding complete...');
  }
};

export default seedCheats;
