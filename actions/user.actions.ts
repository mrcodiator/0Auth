'use server';
import prisma from "@/lib/db";
import { profileSchema, signInSchema, signUpSchema } from "@/validation/schema";
import * as z from "zod";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { compare, hash } from "bcryptjs";
import { auth, signIn, signOut } from "@/auth";
import { errorMessages } from "@/helpers/error-messages";
import { successMessages } from "@/helpers/success-message";

export const createUser = actionClient
    .schema(signUpSchema)
    .action(async ({ parsedInput: { name, email, password } }) => {
        if (!email || !password) {
            return errorMessages.MISSING_FIELDS;
        }
        // check if user exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        // return if user exists
        if (existingUser) {
            return errorMessages.ACCOUNT_CREATED;
        }
        const hashedPassword = await hash(password, 12)

        await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        });
        revalidatePath("/")

        return successMessages.ACCOUNT_CREATED;
    });

export const authenticate = actionClient
    .schema(signInSchema)
    .action(async ({ parsedInput: { email, password } }) => {
        if (!email || !password) {
            return errorMessages.MISSING_FIELDS;
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        // console.log("CHECK_USER: ", user);

        if (!user) return errorMessages.USER_EXISTS;

        const comparePassword = await compare(password, user.password as string)

        if (!comparePassword) {
            return errorMessages.INVALID_CREDENTIALS;
        }


        if (!user.isVerified) return errorMessages.ACCOUNT_NOT_VERIFIED;

        const session = await auth();
        if (session) {
            return errorMessages.SESSION_ON
        }

        const data = await signIn("credentials", {
            email: email,
            password: password,
            isVerify: false
        });

        revalidatePath("/")

        return successMessages.LOGIN_SUCCESS;
    });


export const editProfile = actionClient
    .schema(profileSchema)
    .action(async ({ parsedInput: { name, image } }) => {
        const session = await auth();
        if (!session?.user?.email) return errorMessages.NOT_LOGGED_IN;
        const user = await prisma.user.update({
            where: {
                email: session?.user?.email as string
            },
            data: {
                name: name,
                image: image
            }
        })
        console.log("USER: ", user);
        revalidatePath("/")
        return successMessages.PROFILE_UPDATED;
    })

export async function getUserDetails() {
    try {
        const session = await auth();
        if (!session?.user?.email) return errorMessages.NOT_LOGGED_IN;
        const user = await prisma.user.findUnique({
            where: {
                email: session?.user?.email
            }
        })

        return { user };
    } catch (error) {
        console.log(error);
        return errorMessages.GENERAL_ERROR;
    }
}

