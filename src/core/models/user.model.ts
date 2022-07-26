import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    userId: string;
    profile: {
        money: number;
    }
}

const UserSchema: Schema = new Schema({
    userId: { type: String, required: true },
    profile: {
        type: Object, default: {
            money: 0
        }
    }
});

export default mongoose.model<IUser>('users', UserSchema);