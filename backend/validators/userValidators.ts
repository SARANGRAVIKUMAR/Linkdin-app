import { EMAIL, PASSWORD } from "./validator"


export const signUpValidation = () => {
    return [ EMAIL(), PASSWORD(),PASSWORD("confirmPassword") ]
}

export const loginValidation = () => {
    return [ EMAIL(), PASSWORD() ]
}