export const successMessages: Record<string, MessageType> = {
    ACCOUNT_CREATED: { type: "ACCOUNT_CREATED", code: 201, title: "Account Created", message: "Account created! Please verify your account now.", success: true },
    LOGIN_SUCCESS: { type: "LOGIN_SUCCESS", code: 200, title: "Logged In", message: "Logged in successfully.", success: true },
    PROFILE_UPDATED: { type: "PROFILE_UPDATED", code: 200, title: "Profile Updated", message: "Profile updated successfully.", success: true },
    VERIFICATION_CODE_SENT: { type: "VERIFICATION_CODE_SENT", code: 200, title: "Verification Code Sent", message: "A verification code has been sent to your email.", success: true },
    USER_VERIFIED: { type: "USER_VERIFIED", code: 200, title: "Account Verified", message: "You can change your password or sign in now.", success: true },
    PASSWORD_CHANGED: { type: "PASSWORD_CHANGED", code: 200, title: "Password Changed", message: "Password changed successfully.", success: true },
};

