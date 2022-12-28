import { Request } from "express";
import { msg, Constants } from "../helpers/constants";

const { body, param, query } = require('express-validator')

export const EMAIL = () => {
    return body('email')
        .trim().not().isEmpty().withMessage(msg.emailRequired)
        .isEmail().withMessage(msg.emailNotValid)
        .isLength({ min: Constants.minLengthOfEmail }).withMessage(msg.emailMinError)
        .isLength({ max: Constants.maxLengthOfEmail }).withMessage(msg.emailMaxError)
}

export const PASSWORD = (fieldName="password") => {
    return body(fieldName)
        .trim().not().isEmpty().withMessage(msg.passwordRequired)
        .isLength({ min: Constants.minPasswordLength }).withMessage(msg.passwordMinError)
        .isLength({ max: Constants.maxLengthOfPassword }).withMessage(msg.passwordMaxError)
        .matches(Constants.passwordRegex).withMessage(msg.invalidPassword)
}