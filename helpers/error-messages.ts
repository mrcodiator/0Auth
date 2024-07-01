
export const errorMessages: Record<string, MessageType> = {
    MISSING_FIELDS: { type: "MISSING_FIELDS", code: 400, title: "Missing Fields", error: "Please fill out all fields.", success: false },
    USER_EXISTS: { type: "USER_EXISTS", code: 409, title: "User Exists", error: "A user with this email already exists.", success: false },
    INVALID_CREDENTIALS: { type: "INVALID_CREDENTIALS", code: 401, title: "Invalid Credentials", error: "The email or password you entered is incorrect.", success: false },
    ACCOUNT_NOT_VERIFIED: { type: "ACCOUNT_NOT_VERIFIED", code: 401, title: "Account Not Verified", error: "Please verify your account before logging in.", success: false },
    NOT_LOGGED_IN: { type: "NOT_LOGGED_IN", code: 401, title: "Not Logged In", error: "Please log in to continue.", success: false },
    INVALID_EMAIL: { type: "INVALID_EMAIL", code: 400, title: "Invalid Email", error: "Please enter a valid email address.", success: false },
    USER_NOT_FOUND: { type: "USER_NOT_FOUND", code: 404, title: "User Not Found", error: "No user found with this email.", success: false },
    INVALID_TOKEN: { type: "INVALID_TOKEN", code: 400, title: "Invalid Token", error: "The token you entered is invalid.", success: false },
    TOKEN_EXPIRED: { type: "TOKEN_EXPIRED", code: 410, title: "Token Expired", error: "The token you entered has expired. Please try again.", success: false },
    PASSWORD_CHANGE_ERROR: { type: "PASSWORD_CHANGE_ERROR", code: 404, title: "Password Change Error", error: "The password could not be changed. Please try again later.", success: false },
    SERVER_ERROR: { type: "SERVER_ERROR", code: 500, title: "Server Error", error: "Something went wrong. Please try again later.", success: false },
    GENERAL_ERROR: { type: "GENERAL_ERROR", code: 500, title: "General Error", error: "Something went wrong. Please try again later.", success: false },
    SESSION_ON: { type: "SESSION_ON", code: 400, title: "Session On", error: "You are already logged in.", success: false },
};


