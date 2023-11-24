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
const nodemailer_1 = __importDefault(require("nodemailer"));
const uuid_1 = require("uuid");
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: config_1.default.my_email,
        pass: config_1.default.my_password,
    },
});
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.password = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.bcrypt_hash_sold));
    payload.role = 'user';
    const createSecret = yield jwtHelpers_1.jwtHelpers.createToken({ email: payload.email }, config_1.default.jwt.access_secret, config_1.default.jwt.access_expire);
    const isExistUser = yield user_model_1.User.findOne({
        email: payload.email,
    });
    if (isExistUser && isExistUser.isVerified) {
        throw new apiErrors_1.default(400, 'already you have a account please login');
    }
    else if (isExistUser) {
        const mailOptions = {
            from: config_1.default.my_email,
            to: payload.email,
            subject: 'verify your email',
            html: `
    <P>Hello there, please verify your email</p>
    <a href="http://localhost:3000/verify/${createSecret}/" target="_blank">Click here to verify your email</a>`,
        };
        const result = yield transporter.sendMail(mailOptions);
        return result;
    }
    else {
        yield user_model_1.User.create(payload);
        const mailOptions = {
            from: config_1.default.my_email,
            to: payload.email,
            subject: 'verify your email',
            html: `
    <P>Hello there, please verify your email</p>
    <a href="http://localhost:3000/verify/${createSecret}/" target="_blank">Click here to verify your email</a>`,
        };
        const result = yield transporter.sendMail(mailOptions);
        console.log({ createSecret });
        return result;
    }
});
const loginUser = (loginInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = loginInfo;
    const isUserExist = yield user_model_1.User.findOne({ email: email });
    if (!isUserExist) {
        throw new apiErrors_1.default(404, "user doesn't exist");
    }
    if (!isUserExist.isVerified) {
        throw new apiErrors_1.default(401, 'please verify your email first, then try to login');
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
        user: {
            userId: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id.toString(),
            email: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email,
            name: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.name,
            profilePic: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.profilePic,
        },
    };
});
const verifyEmailAndUpdateStatus = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.access_secret);
    if (!verifyToken || !verifyToken.email) {
        throw new apiErrors_1.default(401, 'maybe your verification time is expired, please try again');
    }
    const email = verifyToken.email;
    const result = yield user_model_1.User.findOneAndUpdate({ email }, { $set: { isVerified: true } });
    return result;
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
const resetPasswordRequest = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: email });
    if (!user) {
        throw new apiErrors_1.default(404, "user doesn't exist");
    }
    const resetToken = (0, uuid_1.v4)();
    const resetTokenExpiration = new Date();
    resetTokenExpiration.setHours(resetTokenExpiration.getHours() + 1);
    // Save reset token and expiration time to the user
    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;
    yield user.save();
    const resetUrl = `https://book-catalog-frontend.netlify.app/set-password/${resetToken}`;
    const mailOptions = {
        from: 'jasim.dev48@gmail.com',
        to: email,
        subject: 'Reset Password',
        html: `<p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
    <p>Please click on the following link to reset your password:</p>
    <a href="${resetUrl}">Reset Password</a>
    <p>If you did not request this, please ignore this email, and your password will remain unchanged.</p>`,
    };
    // Send the email
    const result = yield transporter.sendMail(mailOptions);
    return result;
});
const resetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { resetToken, password } = payload;
    console.log({ payload });
    try {
        const user = yield user_model_1.User.findOne({
            resetToken: resetToken,
            resetTokenExpiration: { $gt: new Date() },
        });
        console.log({ user });
        if (!user) {
            throw new apiErrors_1.default(404, 'Invalid or expired reset token');
        }
        // Hash the new password
        const hashedPassword = yield bcrypt_1.default.hash(password, Number(config_1.default.bcrypt_hash_sold));
        console.log({ hashedPassword });
        // Update the user's password and reset token fields
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiration = null;
        const result = yield user.save();
        return result;
    }
    catch (error) {
        console.log({ error });
    }
});
exports.AuthServices = {
    createUser,
    loginUser,
    refreshToken,
    resetPasswordRequest,
    resetPassword,
    verifyEmailAndUpdateStatus,
};
