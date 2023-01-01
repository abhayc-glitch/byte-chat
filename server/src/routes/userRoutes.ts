import express from 'express';
import {auth} from "../middleware/auth";

import {signin, signup, getUser, getUserFriends, addremoveFriend} from '../controllers/userControllers'

const router = express.Router();

router.post("/auth/signup", signup)
router.post("/signin", signin)

router.get("/:id", auth, getUser)
router.get("/:id/friends", auth, getUserFriends)


router.patch("/:id/:friendsId", auth, addremoveFriend)
export default router;