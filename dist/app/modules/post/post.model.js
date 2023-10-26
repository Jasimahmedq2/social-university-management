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
    images: [
        {
            type: String,
        },
    ],
    videos: [
        {
            type: String,
        },
    ],
    audios: [
        {
            type: String,
        },
    ],
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
    const { images, videos, audios, caption } = this;
    if ((!images || images.length === 0) &&
        (!videos || videos.length === 0) &&
        (!audios || audios.length === 0) &&
        !caption) {
        throw new Error('Either the images, videos, audios, or caption field must be provided.');
    }
    next();
});
exports.Post = (0, mongoose_1.model)('post', PostSchema);
