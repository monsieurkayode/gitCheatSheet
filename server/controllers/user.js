import { STATUS_CODES } from 'http';
import User from '../models/user';
import errorHandler from '../helpers/errorHandler';
import generateToken from '../helpers/generateToken';

export const createUser = async (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password: password.trim() });

  try {
    const user = await newUser.save();
    const token = generateToken({
      user: { id: user.id, username: user.username }
    });

    return res.status(201).send({
      status: STATUS_CODES[201],
      message: 'User registration successful',
      token
    });
  } catch (error) {
    return errorHandler(400, error, res);
  }
};

export const authenticateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const authenticated = user ? user.authenticate(password) : false;

    if (!authenticated) {
      return res.status(401).send({
        status: STATUS_CODES[401],
        message: 'Invalid authentication details'
      });
    }

    const token = generateToken({
      user: { id: user.id, username: user.username }
    });

    return res.status(200).send({
      status: STATUS_CODES[200],
      message: 'User authentication success',
      token
    });
  } catch (error) {
    return errorHandler(400, error, res);
  }
};

export default createUser;
