import express from 'express';
import * as cheatsCtrl from '../controllers/cheat';

const router = express.Router();
const baseUrl = '/api/v1';

router.get(`${baseUrl}/cheats`, cheatsCtrl.fetchAllCheats);
router.get(`${baseUrl}/cheats/:category`, cheatsCtrl.fetchByCategory);
router.get(`${baseUrl}/categories`, cheatsCtrl.fetchAllCategories);

export default router;
