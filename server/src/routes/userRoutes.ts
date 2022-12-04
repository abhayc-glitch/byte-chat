import express from 'express';

import {signin, signup} from '../controllers/userControllers'

const router = express.Router();

router.post("/signup", signin)
router.post("/signin", signup)

export default router;