import { Schema, model } from 'mongoose';
import { IUser } from './user.interfaces';
import { UserRoleConstant } from './user.constant';
// import bcrypt from 'bcrypt';
// import config from '../../../config';

const UserSchema = new Schema<IUser>(
  {
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
      enum: UserRoleConstant,
      required: true,
    },
    profilePic: {
      type: String,
      default:
        'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png',
    },
    bio: {
      type: String,
      default: 'write about yourself here',
    },
    followers: {
      type: [{ type: Schema.Types.ObjectId, ref: 'user' }],
      default: [],
    },
    following: {
      type: [{ type: Schema.Types.ObjectId, ref: 'user' }],
      default: [],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpiration: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// UserSchema.pre('save', async function (next) {
//   this.password = await bcrypt.hash(
//     this.password,
//     Number(config.bcrypt_hash_sold)
//   );
//   next();
// });

export const User = model<IUser>('user', UserSchema);
