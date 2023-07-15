"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    image: {
        type: String,
    },
    caption: {
        type: String,
    },
    likes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'user',
            default: [],
        },
    ],
    comments: {
        type: [
            {
                user: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'user',
                    required: true,
                },
                text: {
                    type: String,
                    required: true,
                },
            },
        ],
        default: [],
    },
}, { timestamps: true });
PostSchema.pre('save', function (next) {
    const { image, caption } = this;
    if (!image && !caption) {
        throw new Error('Either the image or caption field must be provided.');
    }
    next();
});
exports.Post = (0, mongoose_1.model)('post', PostSchema);
