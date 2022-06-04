import { Document, Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import { Gender, Genders, Role, Status, UserRole, UserStatus } from '../utils/constants';

export interface User extends Document {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    address?: String,
    phone?: String,
    emailConfirmed?: boolean;
    status?: Status;
    createdAt?: Date;
    updatedAt?: Date;
    lastSeen?: Date;
    avatar?: string;
    avatarKey?: string;
    gender: Gender;
    role: UserRole;
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
    matchPassword(password: string): boolean;
    getResetPasswordToken(): string;
}

const UserSchema = new Schema<User>({
    email: {
        type: String,
        required: [true, 'Email address is required!'],
        lowecase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address!'],
        trim: true
    },

    firstName: {
        type: String,
        uppercase: true,
        required: [true, 'First name is required!'],
        trim: true
    },

    lastName: {
        type: String,
        uppercase: true,
        required: [true, 'Last name is required!'],
        trim: true
    },

    password: {
        type: String,
        required: [true, 'Password is required!'],
        minlength: [8, 'Password must be at least 8 characters long!'],
        select: false,
        trim: true
    },

    address: {
        type: String,
        trim: true
    },

    phone: {
        type: String,
        trim: true
    },

    role: {
        type: String,
        required: true,
        enum: [Role.ADMIN, Role.USER, Role.SELLER],
        uppercase: true,
        trim: true
    },

    emailConfirmed: {
        type: Boolean,
        default: false
    },

    status: {
        type: String,
        required: [true, 'Status is required!'],
        upperCase: true,
        trim: true,
        default: UserStatus.ACTIVE
    },

    lastSeen: {
        type: Date
    },

    avatar: {
        type: String,
    },

    avatarKey: {
        type: String,
    },

    gender: {
        type: String,
        required: [true, 'Gender is required!'],
        enum: [Genders.MALE, Genders.FEMALE],
        uppercase: true,
        trim: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    resetPasswordToken: String,

    resetPasswordExpire: Date
});

// Encrypt user password using brcypt
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password!, salt);
    next();
});

// Sig JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    // const secret: Secret = !;
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPassword token field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000 // 10 minutes
    
    return resetToken;
}

UserSchema.index({'$**': 'text'});
export default model<User>('User', UserSchema);