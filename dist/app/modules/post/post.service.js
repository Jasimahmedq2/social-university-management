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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostServices = void 0;
const post_model_1 = require("./post.model");
const apiErrors_1 = __importDefault(require("../../../errors/apiErrors"));
const cratePost = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.user = id;
    const result = yield post_model_1.Post.create(payload);
    return result;
});
const getAllPost = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.find({})
        .populate('user')
        .populate('comments.user')
        .sort({ createdAt: -1 });
    return result;
});
const getUserAllPost = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.find({ user: userId })
        .populate('user')
        .populate('comments.user')
        .sort({ createdAt: -1 });
    return result;
});
const getSinglePost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.findOne({ _id: postId })
        .populate('user')
        .populate('comments.user');
    return result;
});
const createCommentToPost = (postId, userId, text) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.Post.findOne({ _id: postId });
    if (!post) {
        throw new apiErrors_1.default(404, "post doesn't exist");
    }
    const newComment = {
        user: userId,
        text: text,
    };
    post.comments.push(newComment);
    const result = yield post.save();
    return result;
});
const postLikeDislike = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.Post.findOne({ _id: postId });
    if (!post) {
        throw new apiErrors_1.default(404, "post doesn't exist");
    }
    console.log({
        post: post,
        userId: userId,
        postId: postId,
    });
    const userIndex = post.likes.indexOf(userId);
    if (userIndex === -1) {
        post.likes.push(userId);
    }
    else {
        post.likes.splice(userIndex, 1);
    }
    const result = yield post.save();
    return result;
});
const deletePost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.deleteOne({ _id: postId });
    return result;
});
const updatePost = (postId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.updateOne({ _id: postId }, payload, { new: true });
    return result;
});
exports.PostServices = {
    cratePost,
    createCommentToPost,
    postLikeDislike,
    deletePost,
    updatePost,
    getAllPost,
    getSinglePost,
    getUserAllPost,
};
