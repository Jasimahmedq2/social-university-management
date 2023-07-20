"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageControllers = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const message_service_1 = require("./message.service");
const getMessages = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { senderId, receiverId } = req.query;
    if (typeof senderId === 'string' && typeof receiverId === 'string') {
        const result = yield message_service_1.MessageServices.getMessages(senderId, receiverId);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: 'retrieve the whole message',
            data: result,
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: 400,
            success: false,
            message: 'senderId and receiverId must be provided as strings',
        });
    }
}));
const createMessage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messageInfo = __rest(req.body, []);
    const result = yield message_service_1.MessageServices.createMessage(messageInfo);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'created a message',
        data: result,
    });
}));
exports.MessageControllers = {
    getMessages,
    createMessage,
};
