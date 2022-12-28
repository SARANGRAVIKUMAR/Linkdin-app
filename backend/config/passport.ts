'use strict';

import mongoose, { Document } from "mongoose";
import { collections } from "../database/collections";
import userSchema from "../database/models/userSchema";
import passport from "passport";
import { StrategyOptions, User } from "../helpers/interface";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { getModel } from "./db";
import logger from "./logger";

const jwtOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_ACCESS_SECRET,
};
export const authConfig = () => {
    try {
        passport.use(
            new Strategy(jwtOptions, async (payload: any, done: any) => {
                const UserDoc: mongoose.Model<Document> = getModel(
                    collections.user,
                    userSchema,
                );
                const user: User = await UserDoc.findOne({ email: payload.email })
                console.log(user);
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }

            })
        );
        return {
            initialize: function () { return passport.initialize(); },
            authenticate: function () { return passport.authenticate('jwt', { session: false }); }
        };
    } catch (error) {
        logger.error(error)

    }

};