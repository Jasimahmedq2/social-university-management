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
exports.userControllers = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_service_1 = require("./user.service");
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = __rest(req.body, []);
    const result = yield user_service_1.userServices.createUser(userInfo);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'successfully created an user',
        data: result,
    });
}));
const getAllUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userServices.getAllUser();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'successfully get all user',
        data: result,
    });
}));
const getFriends = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield user_service_1.userServices.getFriends(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'successfully get all friends',
        data: result,
    });
}));
const getSuggestedFriends = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.userId;
    const result = yield user_service_1.userServices.getSuggestedFriends(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'successfully get all suggested friends',
        data: result,
    });
}));
const userFeedPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userId = (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.userId;
    const result = yield user_service_1.userServices.userFeedPost(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'successfully get all feed post',
        data: result,
    });
}));
const getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const id = (_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d.userId;
    const result = yield user_service_1.userServices.getSingleUser(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'successfully get a user',
        data: result,
    });
}));
const getSingleUserWithId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield user_service_1.userServices.getSingleUserWithId(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'successfully get a user',
        data: result,
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.userServices.deleteUser(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'successfully deleted a user',
        data: result,
    });
}));
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedInfo = __rest(req.body, []);
    const result = yield user_service_1.userServices.updateUser(id, updatedInfo);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'successfully updated the user',
        data: result,
    });
}));
const userFollowing = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const userId = (_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e.userId;
    const { followerId } = req.params;
    console.log({
        userId,
        followerId,
    });
    const result = yield user_service_1.userServices.userFollowing(userId, followerId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'successfully followed the user',
        data: result,
    });
}));
const unFollowingUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const userId = (_f = req === null || req === void 0 ? void 0 : req.user) === null || _f === void 0 ? void 0 : _f.userId;
    const { followerId } = req.params;
    console.log({
        userId,
        followerId,
    });
    const result = yield user_service_1.userServices.unFollowingUser(userId, followerId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'successfully unFollowed the user',
        data: result,
    });
}));
exports.userControllers = {
    createUser,
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
