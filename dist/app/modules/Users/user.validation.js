"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userZodValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'firstName is required',
            }),
            lastName: zod_1.z.string({
                required_error: 'lastName  is required',
            }),
        }),
        email: zod_1.z
            .string({
            required_error: 'email is required',
        })
            .email(),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
        profilePic: zod_1.z.string().optional(),
    }),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z
            .object({
            firstName: zod_1.z
                .string({
                required_error: 'firstName is required',
            })
                .optional(),
            lastName: zod_1.z
                .string({
                required_error: 'lastName is required',
            })
                .optional(),
        })
            .optional(),
        email: zod_1.z
            .string({
            required_error: 'email is required',
        })
            .email()
            .optional(),
        password: zod_1.z
            .string({
            required_error: 'password is required',
        })
            .optional(),
        profilePic: zod_1.z.string().optional(),
    })
        .optional(),
});
exports.userZodValidation = {
    createUserZodSchema,
    updateUserZodSchema,
};
