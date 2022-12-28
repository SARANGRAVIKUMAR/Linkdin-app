import bcrypt from 'bcryptjs';
import mongoose, { Document } from "mongoose";
const jwt = require('jsonwebtoken')
import { getModel } from "../config/db";
import { collections } from "../database/collections";
import schemaUser from "../database/models/userSchema";
import { User } from "./interface";
import { Constants } from './constants';

export const authenticateUser = async (
    email: string,
    password: string,
): Promise<User> => {
    const UserDoc: mongoose.Model<Document> = getModel(
        collections.user,
        schemaUser,
    );
    if (UserDoc !== null) {
        const user = await UserDoc.findOne({ email, deleted: false }) as User;
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                return user;
            }
        }
    }
    return null;
}

export const comparePasswords = (password: string, confirmPassword: string) => {
    if (password === confirmPassword) {
        return true
    }
    return false
}

export const createToken = (user: User) => {
    const accessPayload = {
        id: user._id,
        name: user.name,
        email: user.email,
    }
    const refreshPayload = {
        id: user.id,
    };

    const accessToken = jwt.sign(accessPayload, process.env.JWT_ACCESS_SECRET, { expiresIn: Constants.accessExpiryTime });
    const refreshToken = jwt.sign(refreshPayload, process.env.JWT_REFRESH_SECRET, { expiresIn: Constants.refreshExpiryTime });
    return { accessToken, refreshToken }
}