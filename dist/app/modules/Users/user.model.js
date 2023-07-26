"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_constant_1 = require("./user.constant");
// import bcrypt from 'bcrypt';
// import config from '../../../config';
const UserSchema = new mongoose_1.Schema({
    name: {
        firstName: {
            type: String,
            required: [true, 'first name is required'],
        },
        lastName: {
            type: String,
            required: [true, 'last name is required'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'password  is required'],
    },
    role: {
        type: String,
        enum: user_constant_1.UserRoleConstant,
        required: true,
    },
    profilePic: {
        type: String,
        default: 'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png',
    },
    bio: {
        type: String,
        default: 'write about yourself here',
    },
    followers: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'user' }],
        default: [],
    },
    following: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'user' }],
        default: [],
    },
    resetToken: {
        type: String,
        default: null,
    },
    resetTokenExpiration: {
        type: Date,
        default: null,
    },
}, { timestamps: true });
// UserSchema.pre('save', async function (next) {
//   this.password = await bcrypt.hash(
//     this.password,
//     Number(config.bcrypt_hash_sold)
//   );
//   next();
// });
exports.User = (0, mongoose_1.model)('user', UserSchema);
