"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import SectionHeader from '../section-header/SectionHeader'
import SocialAuth from '../social-auth/SocialAuth'
import Link from 'next/link'
import { sendVerificationEmail } from '@/lib/verify-email'
import { toast } from '../ui/use-toast'
import { signInSchema } from '@/validation/schema'
import { useAction } from 'next-safe-action/hooks'
import { authenticate } from '@/actions/user.actions'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { errorMessages } from '@/helpers/error-messages'
import { resolve } from 'path'


const SignIn = () => {
    const router = useRouter();
    const { ACCOUNT_NOT_VERIFIED } = errorMessages;

    const { execute, status, result } = useAction(authenticate, {
        onSuccess: ({ data }) => {
            console.log("DATA: ", data);
            if (!data?.success && data?.error) {
                if (data.type === ACCOUNT_NOT_VERIFIED.type) {
                    toast({ title: data.title, variant: "destructive", description: data?.error })
                    router.push("/verify")
                }
                toast({ title: data.title, variant: "destructive", description: data?.error })
            }
            toast({ title: "Signed In", description: "You are now signed in." })
            new Promise((resolve) => setTimeout(resolve, 3000))
            router.push("/")
        },
        onError: (data) => {
            console.error("Error: ", data)
            toast({ title: "Error", variant: "destructive", description: errorMessages.SERVER_ERROR.error })
        },
        onExecute: (data) => {
            console.log("Signing in...")
        }
    })
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof signInSchema>) {
        execute(values);
    }
    return (
        <div className=' flex flex-col'>
            <SectionHeader
                title='Sign In'
                description={
                    <>
                        Don&apos;t have an account? &nbsp;
                        <Link className='text-primary font-bold' href="/sign-up">Sign Up.</Link>
                    </>
                }
            />
            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your password" type="password" {...field} />
                                </FormControl>
                                <FormDescription>
                                    forgot your password?
                                    <Link href={"/verify"}>
                                        <Button variant={"link"} size={"sm"}>
                                            Reset
                                        </Button>
                                    </Link>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={status === "executing" ? true : false} className=' w-full' type="submit">
                        {status === "executing" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Sign In
                    </Button>
                </form>
            </Form>

        </div>

    )
}

export default SignIn

