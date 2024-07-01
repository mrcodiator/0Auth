import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import prisma from "./lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Google from "next-auth/providers/google"
import { redirect } from "next/navigation"

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    pages: {
        error: "/sign-up", // Custom error page path
        signIn: "/sign-in",
        verifyRequest: "/verify",
    },
    // debug: process.env.NODE_ENV === 'development',
    // logger: {
    //     error: (code, ...message) => console.error(code, message),
    //     warn: (code, ...message) => console.warn(code, message),
    //     debug: (code, ...message) => console.debug(code, message),
    // },
    experimental: {
        enableWebAuthn: true,
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.AUTH_SECRET,
    providers: [
        Google({
            allowDangerousEmailAccountLinking: true,
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                isVerify: { label: "Is Verified", type: "boolean", default: false }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error("Invalid credentials")
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                })

                if (!user || !user.password) {
                    throw new Error('User not found or password not set')
                }
                if (credentials.isVerify === "true") {
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                    }
                }

                const isPasswordValid = await compare(credentials.password as string, user.password)
                if (!isPasswordValid) {
                    throw new Error("Invalid password")
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                }
            },
        }),
    ],
    callbacks: {
        signIn: async ({ user, account, profile }) => {
            try {
                if (account && profile?.email && account.provider === "google") {
                    const existingUser = await prisma.user.findUnique({
                        where: { email: profile.email },
                    });

                    if (!existingUser) {
                        await prisma.user.create({
                            data: {
                                email: profile.email,
                                name: profile.name || "",
                                image: profile.picture || "",
                                isVerified: true,
                            },
                        });
                    }
                }
                return true;
            } catch (error) {
                console.error(error);
                return "/";
            }

        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
            }
            return session
        }
    },
})

