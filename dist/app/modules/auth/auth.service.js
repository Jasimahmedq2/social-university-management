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
exports.AuthServices = void 0;
const config_1 = __importDefault(require("../../../config"));
const apiErrors_1 = __importDefault(require("../../../errors/apiErrors"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const user_model_1 = require("../Users/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginUser = (loginInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = loginInfo;
    const isUserExist = yield user_model_1.User.findOne({ email: email });
    if (!isUserExist) {
        throw new apiErrors_1.default(404, "user doesn't exist");
    }
    const comparePass = yield bcrypt_1.default.compare(password, isUserExist.password);
    if (!comparePass) {
        throw new apiErrors_1.default(500, "password doesn't matched");
    }
    const accessToken = yield jwtHelpers_1.jwtHelpers.createToken({
        email: isUserExist.email,
        role: isUserExist.role,
        userId: isUserExist._id,
    }, config_1.default.jwt.access_secret, config_1.default.jwt.access_expire);
    const refreshToken = yield jwtHelpers_1.jwtHelpers.createToken({
        email: isUserExist.email,
        role: isUserExist.role,
        userId: isUserExist._id,
    }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expire);
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
    };
});
const refreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedUser = null;
    try {
        verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(refreshToken, config_1.default.jwt.refresh_secret);
    }
    catch (error) {
        throw new apiErrors_1.default(401, 'unValidated');
    }
    const { userId } = verifiedUser;
    const userExist = yield user_model_1.User.findOne({ _id: userId });
    if (!userExist) {
        throw new apiErrors_1.default(404, "user doesn't exist");
    }
    const newAccessToken = yield jwtHelpers_1.jwtHelpers.createToken({ email: userExist.email, userId: userExist._id, role: userExist.role }, config_1.default.jwt.access_secret, config_1.default.jwt.access_expire);
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthServices = {
    loginUser,
    refreshToken,
};
