"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostValidation = void 0;
const zod_1 = require("zod");
const createPostZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        images: zod_1.z.array(zod_1.z.string()).optional(),
        videos: zod_1.z.array(zod_1.z.string()).optional(),
        audios: zod_1.z.array(zod_1.z.string()).optional(),
        caption: zod_1.z.string().optional(),
    }),
});
const createCommentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        text: zod_1.z.string({
            required_error: 'text is required',
        }),
    }),
});
exports.PostValidation = {
    createPostZodSchema,
    createCommentZodSchema,
};
