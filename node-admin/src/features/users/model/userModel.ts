import { date } from 'joi';
import mongoose from 'mongoose';
export interface IUserSchema {
    username: string;
    password: string;
    email: string;
    dob: string;
    gender: string;
    createdAt: string;
}
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export const UserModel = mongoose.model<IUserSchema>('User', userSchema);
