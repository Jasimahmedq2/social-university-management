import express from 'express';
import { MessageControllers } from './message.controller';
const router = express.Router();

router.get('/get-message', MessageControllers.getMessages);
router.post('/create-message', MessageControllers.createMessage);

export const messageRoutes = router;
