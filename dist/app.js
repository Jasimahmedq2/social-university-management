"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const route_1 = require("./app/route");
const globalMIddlewar_1 = __importDefault(require("./app/middlewar/globalMIddlewar"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
// import http from 'http';
// import socketio from 'socket.io';
// import { Message } from './app/modules/message/message.model';
const app = (0, express_1.default)();
// const server = http.createServer(app);
// const io = socketio(server, {
//   cors: {
//     origin: '*',
//   },
// });
app.use(express_1.default.json());
app.use((0, express_1.urlencoded)({ extended: true }));
app.use(body_parser_1.default.json());
app.use('/src/uploads/', express_1.default.static('src/uploads'));
app.use((0, cookie_parser_1.default)());
// app.use(cookieParser());
const corsOptions = {
    origin: ['https://nextgen-social-media.netlify.app', 'http://localhost:3000'],
    credentials: true,
};
// socket io
// io.on('connection', socket => {
//   console.log('New client connected:', socket.id);
//   socket.on('joinRoom', (roomId: any) => {
//     socket.join(roomId);
//   });
//   socket.on('sendMessage', async (message: { roomId: any }) => {
//     const newMessage = new Message(message);
//     await newMessage.save();
//     io.to(message.roomId).emit('message', newMessage);
//   });
//   socket.on('disconnect', () => {
//     console.log('Client disconnected:', socket.id);
//   });
// });
app.use((0, cors_1.default)(corsOptions));
app.get('/', (req, res) => {
    res.json('db running perfectly');
});
app.use('/api/v1', route_1.MainRouter);
app.use(globalMIddlewar_1.default);
// not found route
app.use((req, res, next) => {
    res.status(404).json({
        statusCode: 404,
        message: 'Route Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'the route not exist',
            },
        ],
    });
});
exports.default = app;
