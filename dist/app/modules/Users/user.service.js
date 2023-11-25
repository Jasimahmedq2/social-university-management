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
// const createUser = async (userInfo: IUser) => {
//   userInfo.password = await bcrypt.hash(
//     userInfo.password,
//     Number(config.bcrypt_hash_sold)
//   );
//   userInfo.role = 'user';
//   const result = await User.create(userInfo);
//   return result;
// };
const getAllUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({ _id: { $ne: userId } }).sort({
        updatedAt: -1,
    });
    return result;
});
const getFriends = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ _id: userId }, { followers: 1, _id: 0 }).populate('followers');
    console.log({ result });
    return result;
});
const getSuggestedFriends = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const currentUser = yield user_model_1.User.findById(userId);
    const currentFriends = (_a = currentUser === null || currentUser === void 0 ? void 0 : currentUser.followers) !== null && _a !== void 0 ? _a : [];
    const currentFollowing = (_b = currentUser === null || currentUser === void 0 ? void 0 : currentUser.following) !== null && _b !== void 0 ? _b : [];
    let result;
    if (currentFriends) {
        result = yield user_model_1.User.find({
            _id: { $nin: [...currentFriends, ...currentFollowing, userId] },
        }, { name: 1, profilePic: 1 });
    }
    else {
        result = yield user_model_1.User.find({
            _id: { $ne: userId },
        }, { name: 1, profilePic: 1 });
    }
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
const getSingleUserWithId = (id) => __awaiter(void 0, void 0, void 0, function* () {
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
    var _c, _d, _e;
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
    if ((_c = followerUser === null || followerUser === void 0 ? void 0 : followerUser.followers) === null || _c === void 0 ? void 0 : _c.includes(user === null || user === void 0 ? void 0 : user._id)) {
        throw new apiErrors_1.default(404, 'User is already being followed');
    }
    (_d = followerUser === null || followerUser === void 0 ? void 0 : followerUser.followers) === null || _d === void 0 ? void 0 : _d.push(user._id);
    (_e = user === null || user === void 0 ? void 0 : user.following) === null || _e === void 0 ? void 0 : _e.push(followerUser._id);
    yield user.save();
    yield followerUser.save();
    return {
        result: 'successfully followed the user',
    };
});
const unFollowingUser = (userId, followerId) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
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
    if (!((_f = followerUser === null || followerUser === void 0 ? void 0 : followerUser.followers) === null || _f === void 0 ? void 0 : _f.includes(user._id))) {
        throw new apiErrors_1.default(404, 'User is not being followed');
    }
    followerUser.followers = followerUser.followers.filter(followedUserId => followedUserId.toString() !== userId);
    user.following = (_g = user === null || user === void 0 ? void 0 : user.following) === null || _g === void 0 ? void 0 : _g.filter(followingUserId => followingUserId.toString() !== followerId);
    yield user.save();
    yield followerUser.save();
    return {
        result: 'successfully  unFollowed the user',
    };
});
exports.userServices = {
    getAllUser,
    getSingleUser,
    getSingleUserWithId,
    deleteUser,
    updateUser,
    userFollowing,
    unFollowingUser,
    getFriends,
    getSuggestedFriends,
    userFeedPost,
};
