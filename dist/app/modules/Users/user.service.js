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
exports.userServices = void 0;
const apiErrors_1 = __importDefault(require("../../../errors/apiErrors"));
const post_model_1 = require("../post/post.model");
const user_model_1 = require("./user.model");
const createUser = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    userInfo.role = 'user';
    const result = yield user_model_1.User.create(userInfo);
    return result;
});
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({});
    return result;
});
const getFriends = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ _id: userId }, { followers: 1, _id: 0 }).populate('followers');
    console.log({ result });
    return result;
});
const userFeedPost = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    const followers = user === null || user === void 0 ? void 0 : user.followers;
    const posts = yield post_model_1.Post.find({
        $or: [{ user: userId }, { user: { $in: followers } }],
    })
        .populate('user')
        .sort('-createdAt');
    console.log({ posts });
    return posts;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndDelete(id);
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.updateOne({ _id: id }, payload, { new: true });
    return result;
});
const userFollowing = (userId, followerId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const user = yield user_model_1.User.findById(userId);
    const followerUser = yield user_model_1.User.findById(followerId);
    console.log({
        user,
        followerUser,
    });
    if (!user) {
        throw new apiErrors_1.default(404, "user doesn't exist");
    }
    if (!followerUser) {
        throw new apiErrors_1.default(404, "follower user doesn't exist");
    }
    if ((_a = user === null || user === void 0 ? void 0 : user.followers) === null || _a === void 0 ? void 0 : _a.includes(followerUser._id)) {
        throw new apiErrors_1.default(404, 'User is already being followed');
    }
    (_b = user === null || user === void 0 ? void 0 : user.followers) === null || _b === void 0 ? void 0 : _b.push(followerUser._id);
    (_c = followerUser === null || followerUser === void 0 ? void 0 : followerUser.following) === null || _c === void 0 ? void 0 : _c.push(user._id);
    yield user.save();
    yield followerUser.save();
    return {
        result: 'successfully followed the user',
    };
});
const unFollowingUser = (userId, followerId) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    const user = yield user_model_1.User.findById(userId);
    const followerUser = yield user_model_1.User.findById(followerId);
    console.log({
        user,
        followerUser,
    });
    if (!user) {
        throw new apiErrors_1.default(404, "user doesn't exist");
    }
    if (!followerUser) {
        throw new apiErrors_1.default(404, "follower user doesn't exist");
    }
    if (!((_d = user === null || user === void 0 ? void 0 : user.followers) === null || _d === void 0 ? void 0 : _d.includes(followerUser._id))) {
        throw new apiErrors_1.default(404, 'User is not being followed');
    }
    user.followers = user.followers.filter(followedUserId => followedUserId.toString() !== followerId);
    followerUser.following = (_e = followerUser === null || followerUser === void 0 ? void 0 : followerUser.following) === null || _e === void 0 ? void 0 : _e.filter(followingUserId => followingUserId.toString() !== userId);
    yield user.save();
    yield followerUser.save();
    return {
        result: 'successfully  unFollowed the user',
    };
});
exports.userServices = {
    createUser,
    getAllUser,
    getSingleUser,
    deleteUser,
    updateUser,
    userFollowing,
    unFollowingUser,
    getFriends,
    userFeedPost,
};
