"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewar/validateRequest"));
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middlewar/auth"));
const enums_1 = require("../../../enums/enums");
const router = express_1.default.Router();
// router.post(
//   '/create-user',
//   validateRequest(userZodValidation.createUserZodSchema),
//   userControllers.createUser
// );
router.get('/get-users', (0, auth_1.default)('user'), user_controller_1.userControllers.getAllUser);
router.get('/get-friends', (0, auth_1.default)(enums_1.UserRole.USER), user_controller_1.userControllers.getFriends);
router.get('/get-suggestedFriends', (0, auth_1.default)(enums_1.UserRole.USER), user_controller_1.userControllers.getSuggestedFriends);
router.get('/get-feed', (0, auth_1.default)(enums_1.UserRole.USER), user_controller_1.userControllers.userFeedPost);
router.delete('/delete-user/:id', user_controller_1.userControllers.deleteUser);
router.get('/get-user', (0, auth_1.default)(enums_1.UserRole.USER), user_controller_1.userControllers.getSingleUser);
router.get('/get-user/:userId', (0, auth_1.default)(enums_1.UserRole.USER), user_controller_1.userControllers.getSingleUserWithId);
router.patch('/update-user/:id', (0, validateRequest_1.default)(user_validation_1.userZodValidation.updateUserZodSchema), user_controller_1.userControllers.updateUser);
router.post('/follow/:followerId', (0, auth_1.default)(enums_1.UserRole.USER), user_controller_1.userControllers.userFollowing);
router.post('/unFollow/:followerId', (0, auth_1.default)(enums_1.UserRole.USER), user_controller_1.userControllers.unFollowingUser);
exports.userRoutes = router;
