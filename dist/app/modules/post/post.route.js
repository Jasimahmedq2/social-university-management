"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewar/auth"));
const enums_1 = require("../../../enums/enums");
const validateRequest_1 = __importDefault(require("../../middlewar/validateRequest"));
const post_validation_1 = require("./post.validation");
const post_controller_1 = require("./post.controller");
const multer_1 = __importDefault(require("../../middlewar/multer"));
const router = express_1.default.Router();
router.post('/create-post', (0, auth_1.default)(enums_1.UserRole.USER), (0, validateRequest_1.default)(post_validation_1.PostValidation.createPostZodSchema), multer_1.default.fields([
    { name: 'images', maxCount: 5 },
    { name: 'videos', maxCount: 5 },
    { name: 'audios', maxCount: 5 },
]), post_controller_1.PostControllers.createPost);
router.get('/get-posts', (0, auth_1.default)(enums_1.UserRole.USER), post_controller_1.PostControllers.getAllPost);
router.get('/get-user-profile-post/:userId', (0, auth_1.default)(enums_1.UserRole.USER), post_controller_1.PostControllers.getUserAllPost);
router.get('/get-post/:postId', (0, auth_1.default)(enums_1.UserRole.USER), post_controller_1.PostControllers.getSinglePost);
router.post('/create-comment/:postId', (0, auth_1.default)(enums_1.UserRole.USER), (0, validateRequest_1.default)(post_validation_1.PostValidation.createCommentZodSchema), post_controller_1.PostControllers.createCommentToPost);
router.post('/like-dislike/:postId', (0, auth_1.default)(enums_1.UserRole.USER), post_controller_1.PostControllers.postLikeDislike);
router.delete('/delete-post/:postId', (0, auth_1.default)(enums_1.UserRole.USER), post_controller_1.PostControllers.deletePost);
router.patch('/update-post/:postId', (0, auth_1.default)(enums_1.UserRole.USER), post_controller_1.PostControllers.updatePost);
exports.postRoutes = router;
