import express from 'express';
import * as userCtrl from '../controllers/user';
import * as validate from '../middlewares/validateUser';

const router = express.Router();
const baseUrl = '/api/v1';

router.post(
  `${baseUrl}/register`,
  validate.validateUser,
  validate.checkDuplicate,
  userCtrl.createUser
);
router.post(`${baseUrl}/login`, userCtrl.authenticateUser);

export default router;
