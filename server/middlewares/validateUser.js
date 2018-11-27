import errorHandler from '../helpers/errorHandler';
import { validateUserForm } from '../../shared/validator';
import User from '../models/user';

export const validateUser = (req, res, next) => {
  const { errors, isValid } = validateUserForm(req.body);

  if (isValid) return next();
  return errorHandler(422, errors, res);
};

export const checkDuplicate = (req, res, next) => {
  const { username } = req.body;
  const query = User.where({ username: username.trim().toLowerCase() });

  return query.countDocuments((err, count) => {
    if (err) return errorHandler(500, 'An error occured', res);

    if (count >= 1) {
      return errorHandler(
        409, `${req.body.username.trim()} already chosen`, res
      );
    }
    next();
  });
};
