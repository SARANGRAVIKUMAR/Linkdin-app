import { Router } from "express";
import { signUp, login, test, regenerateToken } from "../services/userService";
import { loginValidation, signUpValidation } from "../validators/userValidators";
import { validate } from "../validators";

import { authConfig } from "../config/passport";

const router = Router();

router.post('/sign-up', signUpValidation(), validate, signUp)
router.post('/login', loginValidation(), validate, login)
router.post('/generate-token', regenerateToken)

router.use(authConfig().authenticate())

router.post('/test',test)



export = router