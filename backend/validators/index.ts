import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator"

import {code}  from "../helpers/constants"

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    return res.status(code.BAD_REQUEST).send({ error: errors.array()[ 0 ].msg });
}