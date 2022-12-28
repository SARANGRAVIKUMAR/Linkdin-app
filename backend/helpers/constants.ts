export const PORT = 8000;

export const msg = {
    success: {
        message: 'Success!',
    },
    emailRequired: {
        code: 100,
        message: 'Please provide an Email.',
    },
    emailNotValid: {
        code: 101,
        message: 'Please provide a valid Email.',
    },
    emailMaxError: {
        code: 102,
        message: 'Email Max Length has been reached.',
    },
    emailMinError: {
        code: 103,
        message: 'Email Max Length has been reached.',
    },
    passwordRequired: {
        code: 104,
        message: 'Password is required.',
    },
    passwordMinError: {
        code: 105,
        message: 'Password length is below minimum.',
    },
    passwordMaxError: {
        code: 106,
        message: 'Password length exceed maximum.',
    },
    invalidPassword: {
        code: 107,
        message: 'Password is Invalid.',
    },
    userExist: {
        code: 108,
        message: 'User with this email already exist.',
    },
    unKnownError: {
        code: 109,
        message: 'Something went wrong.Please try again later.',
    },
    userNotFound: {
        code: 110,
        message: 'User with this email does not exist.',
    },
    passwordNotMatch: {
        code: 111,
        message: 'Password and confirm password do not match.',
    },
    refreshTokenExpired: {
        code: 112,
        message: 'Refresh token expired, Please login again to continue.',
    },
}

export const Constants = {
    maxLengthOfEmail: 50,
    minLengthOfEmail: 3,
    minPasswordLength: 6,
    maxLengthOfPassword: 20,

    accessExpiryTime: 15 * 60, // 15 minutes in seconds
    refreshExpiryTime: 24 * 2 * 60 * 60,  // 2 days in seconds
    passwordRegex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-{}]).{6,20}$/,

}

export const code = {
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    UNSUPPORTED_MEDIA_TYPE: 415,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    SERVER_ERROR: 503,
    SUCCESS: 200,
    FORBIDDEN: 403,
    DUPLICATE_KEY: 11000,
    METHOD_NOT_ALLOWED: 405,
    INTERNAL_SERVER_ERROR: 500,
};