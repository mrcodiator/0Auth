'use server';
import { auth, signIn } from "@/auth";
import prisma from "@/lib/db";
import { actionClient } from "@/lib/safe-action";
import { changePasswordSchema } from "@/validation/schema";
import { hash } from "bcryptjs";
import * as z from "zod";
import { errorMessages } from "@/helpers/error-messages";
import { successMessages } from "@/helpers/success-message";
import { sendEmailWithMailtrap, sendEmailWithResend } from "@/lib/verify-email";

export const sendCode = actionClient
    .schema(z.object({
        email: z.string().email({ message: "Invalid email address" }),
    }))
    .action(async ({ parsedInput: { email } }) => {
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
            },
        });

        if (!user) {
            return errorMessages.USER_NOT_FOUND
        }
        const code = Math.floor(100000 + Math.random() * 900000);
        // console.log("CODE: ", code);

        const newToken = await prisma.verificationToken.create({
            data: {
                token: String(code),
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                userId: user.id,
            },
        })

        const sendToken = await sendEmailWithMailtrap({ email, code: newToken.token });
        // const sendToken = await sendEmailWithResend({ email, code: newToken.token });

        if (!sendToken) {
            return errorMessages.SERVER_ERROR
        }

        return successMessages.VERIFICATION_CODE_SENT
    })

export const verifyCode = actionClient
    .schema(z.object({
        token: z.string().min(6, { message: "Invalid token" }),
    }))
    .action(async ({ parsedInput: { token } }) => {
        const session = await auth();
        const verificationToken = await prisma.verificationToken.findFirst({
            where: {
                token: token
            }
        });

        if (!verificationToken) {
            return errorMessages.INVALID_TOKEN
        }

        if (verificationToken.expires < new Date()) {
            return errorMessages.TOKEN_EXPIRED
        }

        const user = await prisma.user.update({
            where: {
                id: verificationToken.userId
            },
            data: {
                isVerified: true
            }
        })

        await prisma.verificationToken.delete({
            where: {
                identifier: verificationToken.identifier
            }
        })

        if (!session) {
            await signIn("credentials", {
                email: user.email,
                password: user.password,
                isVerify: true
            });
            // console.log("AUTH_DATA: ", result);
        }


        return successMessages.USER_VERIFIED
    })

export const changePassword = actionClient
    .schema(changePasswordSchema)
    .action(async ({ parsedInput: { newPassword: password } }) => {
        const session = await auth();
        const existingUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email || "",
            },
        })
        // console.log(existingUser);
        const hashPass = await hash(password, 12);

        const user = await prisma.user.update({
            where: {
                id: existingUser?.id
            },
            data: {
                password: hashPass
            }
        })

        if (!user) {
            return errorMessages.USER_NOT_FOUND
        }
        return successMessages.PASSWORD_CHANGED
    })

export const generateCode = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
        },
    });

    if (!user) {
        return { ...errorMessages.USER_NOT_FOUND, token: null }
    }

    const token = Math.floor(100000 + Math.random() * 900000);
    console.log(token);

    const newToken = await prisma.verificationToken.create({
        data: {
            token: String(token),
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            userId: user.id,
        },
    })

    return { ...successMessages.VERIFICATION_CODE_SENT, token: newToken.token }
}