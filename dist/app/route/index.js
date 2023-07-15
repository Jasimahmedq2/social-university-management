"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/Users/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const post_route_1 = require("../modules/post/post.route");
const router = express_1.default.Router();
const MainRoutes = [
    {
        path: '/users',
        element: user_route_1.userRoutes,
    },
    {
        path: '/auth',
        element: auth_route_1.authRoutes,
    },
    {
        path: '/post',
        element: post_route_1.postRoutes,
    },
];
MainRoutes.forEach(route => router.use(route.path, route.element));
exports.MainRouter = router;
