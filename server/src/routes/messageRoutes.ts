import express from 'express';
import {auth} from "../middleware/auth";
import { sendMessage, fetchMessage } from "../controllers/messageControllers";

const router = express.Router();

// Route to send the message to the recipient
router.route("/").post(auth, sendMessage);
// Route to retrieve all the message
router.route("/:chatId").get(auth, fetchMessage);

module.exports = router;