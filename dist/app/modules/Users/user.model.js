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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_constant_1 = require("./user.constant");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
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
        select: 0,
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
}, { timestamps: true });
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_hash_sold));
        next();
    });
});
exports.User = (0, mongoose_1.model)('user', UserSchema);
