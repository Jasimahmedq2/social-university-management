"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    db_connect: process.env.DATABASE_STRING,
    port: process.env.PORT,
    default_pass: process.env.ADMIN_PASS,
    env: process.env.NODE_ENV,
    bcrypt_hash_sold: process.env.BCRYPT_HASH_SOLD,
    jwt: {
        access_secret: process.env.ACCESS_SECRET,
        access_expire: process.env.ACCESS_EXPIRE,
        refresh_secret: process.env.REFRESH_SECRET,
        refresh_expire: process.env.REFRESH_EXPIRE,
    },
};
