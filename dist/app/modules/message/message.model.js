"use strict";
// models/message.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    sender: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true },
    receiver: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true },
    content: { type: String, required: true },
}, { timestamps: true });
exports.Message = (0, mongoose_1.model)('message', messageSchema);
