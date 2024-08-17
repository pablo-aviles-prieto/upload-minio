import { Schema, model, Document, Model } from 'mongoose';
import { modelExists } from '@/utils/check-model-exists';
import { UserRole, UserStatus } from '@/types/user';
import { v4 as uuidv4 } from 'uuid';
import { ThemeOptions } from '@/utils/const';

// TODO: Check that lastLoginDate is updated when logged in
export interface User extends Document {
  _id: string;
  email: string;
  password: string;
  signupDate: string;
  lastLoginDate: string;
  role: UserRole;
  scopes: string[];
  status: UserStatus;
  theme: ThemeOptions;
}

const UserSchema = new Schema<User>({
  _id: { type: String, default: uuidv4 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  signupDate: { type: String, default: new Date().toISOString() },
  lastLoginDate: { type: String, default: new Date().toISOString() },
  role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
  scopes: { type: [String], default: [] },
  status: {
    type: String,
    enum: Object.values(UserStatus),
    default: UserStatus.ACTIVE,
  },
  theme: {
    type: String,
    enum: Object.values(ThemeOptions),
    default: ThemeOptions.SYSTEM,
  },
});

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc: Document, ret: Record<string, any>) => {
    ret.id = ret._id; // Add a new field 'id' with the value of '_id'
    if ('password' in doc) {
      delete ret.password;
    }
    if ('_id' in doc) {
      delete ret._id; // Remove the '_id' field
    }
  },
});

UserSchema.pre<User>('save', function (next) {
  if (!this._id) {
    this._id = uuidv4();
  }
  next();
});

const UserModel: Model<User> = modelExists('user')
  ? model<User>('user')
  : model<User>('user', UserSchema);

export default UserModel;
