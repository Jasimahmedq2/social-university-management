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
exports.PostControllers = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const post_service_1 = require("./post.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const createPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const userId = user === null || user === void 0 ? void 0 : user.userId;
    const postInfo = __rest(req.body, []);
    const result = yield post_service_1.PostServices.cratePost(userId, postInfo);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'successfully created a post',
        data: result,
    });
}));
const getAllPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_service_1.PostServices.getAllPost();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'successfully get all post',
        data: result,
    });
}));
const getUserAllPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield post_service_1.PostServices.getUserAllPost(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'successfully get user all post',
        data: result,
    });
}));
const getSinglePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    const result = yield post_service_1.PostServices.getSinglePost(postId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'successfully get a post',
        data: result,
    });
}));
const createCommentToPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const userId = user === null || user === void 0 ? void 0 : user.userId;
    const { postId } = req.params;
    const { text } = req.body;
    const result = yield post_service_1.PostServices.createCommentToPost(postId, userId, text);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'successfully created a comment',
        data: result,
    });
}));
const postLikeDislike = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const userId = user === null || user === void 0 ? void 0 : user.userId;
    const { postId } = req.params;
    const result = yield post_service_1.PostServices.postLikeDislike(postId, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'success',
        data: result,
    });
}));
const deletePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    const result = yield post_service_1.PostServices.deletePost(postId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'success deleted a post',
        data: result,
    });
}));
const updatePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    const postInfo = __rest(req.body, []);
    console.log({ postId, postInfo });
    const result = yield post_service_1.PostServices.updatePost(postId, postInfo);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'success deleted a post',
        data: result,
    });
}));
exports.PostControllers = {
    createPost,
    createCommentToPost,
    postLikeDislike,
    deletePost,
    updatePost,
    getAllPost,
    getSinglePost,
    getUserAllPost,
};
