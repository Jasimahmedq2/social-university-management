"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRoutes = void 0;
const express_1 = __importDefault(require("express"));
const message_controller_1 = require("./message.controller");
const router = express_1.default.Router();
router.get('/get-message', message_controller_1.MessageControllers.getMessages);
router.post('/create-message', message_controller_1.MessageControllers.createMessage);
exports.messageRoutes = router;
