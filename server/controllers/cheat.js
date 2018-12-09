import { STATUS_CODES } from 'http';
import errorHandler from '../helpers/errorHandler';
import CheatSheet from '../models/cheatSheet';
import Category from '../models/category';

export const fetchAllCheats = async (req, res) => {
  try {
    const cheatSheets = await CheatSheet
      .find({ published: true }).populate('category', 'name');

    return res.status(200).send({
      status: STATUS_CODES[200],
      cheatSheets
    });
  } catch (error) {
    return errorHandler(500, error, res);
  }
};

export const fetchByCategory = async (req, res) => {
  try {
    const category = await Category
      .find({ name: req.params.category.toLowerCase() })
      .populate({ path: 'cheatSheets', match: { published: true } });

    const cheatSheets = category.length > 0
      ? category[0].cheatSheets : category;

    return res.status(200).send({
      status: STATUS_CODES[200],
      cheatSheets
    });
  } catch (error) {
    return errorHandler(500, error, res);
  }
};

export const fetchAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().select('name');

    return res.status(200).send({
      status: STATUS_CODES[200],
      categories
    });
  } catch (error) {
    return errorHandler(500, error, res);
  }
};
