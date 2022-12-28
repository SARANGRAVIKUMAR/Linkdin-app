import { Constants } from './../helpers/constants';
import { Request, Response } from "express";
import mongoose, { Document } from "mongoose";
import bcrypt from 'bcryptjs';
import { getModel } from "../config/db";
import jwt from 'jsonwebtoken';
import { collections } from "../database/collections";
import userSchema from "../database/models/userSchema";
import { User } from "../helpers/interface";
import { code, msg } from "../helpers/constants";
import { authenticateUser, comparePasswords, createToken } from "../helpers/utility";
import logger from "../config/logger";
import { ObjectId } from "mongodb";



export const signUp = async (request: Request, response: Response) => {
    try {
        const { email, name, password, confirmPassword } = request.body;


        const isSamePassword = comparePasswords(password, confirmPassword);
        if (!isSamePassword) {
            response.status(code.BAD_REQUEST).json({ error: msg.passwordNotMatch })
        }

        const UserDoc: mongoose.Model<Document> = getModel(
            collections.user,
            userSchema,
        );

        let user: User = await UserDoc.findOne({ email })
        if (user) {
            return response.status(code.BAD_REQUEST).json({ error: msg.userExist })
        }
        user.name = name;
        user.email = email;
        user.password = bcrypt.hashSync(password, 10);
        const data = await user.save();
        response.status(code.SUCCESS).json({ success: msg.success })
    } catch (error) {
        logger.error(error);
        response.status(code.BAD_REQUEST).json({ error: msg.unKnownError })
    }
}

export const login = async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body;
        const UserDoc: mongoose.Model<Document> = getModel(
            collections.user,
            userSchema,
        );

        let user: User = await UserDoc.findOne({ email })

        if (!user) {
            response.status(code.BAD_REQUEST).json({ error: msg.userNotFound })
        }
        const isUserAuthenticated = await authenticateUser(email, password);

        if (isUserAuthenticated) {
            const token = await createToken(user);
            user.refreshToken = token.refreshToken;
            user.save();
            return response.status(code.SUCCESS).json({ token })
        } else {
            return response.status(code.BAD_REQUEST).json({ error: msg.invalidPassword })
        }

    } catch (error) {
        logger.error(error);
        response.status(code.BAD_REQUEST).json({ error: msg.unKnownError })
    }
}

export const test = async (request: Request, response: Response) => {
    try {
        response.status(code.SUCCESS).json("data")
    } catch (error) {
        console.log(error)
        logger.error(error);
        response.status(code.BAD_REQUEST).json({ error: msg.unKnownError })
    }
}

export const regenerateToken = async (request: Request, response: Response) => {
    try {
        const refreshToken = request.body.refreshToken
        logger.info({ refreshToken })
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err: any, payload: any) => {
            if (err) {
                console.log(err)
            }
            console.log({ payload })
            const UserDoc: mongoose.Model<Document> = getModel(
                collections.user,
                userSchema,
            );
            const currentTime = Date.now();
            if (currentTime > (payload.exp*1000)) {
                return response.status(code.BAD_REQUEST).json({
                    error: msg.refreshTokenExpired
                })
            }
            let user: User = await UserDoc.findOne({
                _id: new ObjectId(payload.id),
                refreshToken,
            })
            if (!user) {
                return response.status(code.BAD_REQUEST).json({ error: msg.refreshTokenExpired })

            }

            const tokens = await createToken(user);
            user.refreshToken = tokens.refreshToken
            user.save();
            return response.status(code.SUCCESS).json({ tokens })
        })
    } catch (error) {
        console.log(error)
        logger.error(error);
        return response.status(code.BAD_REQUEST).json({ error: msg.unKnownError })
    }
}