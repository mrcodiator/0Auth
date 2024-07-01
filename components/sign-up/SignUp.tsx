"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from '../ui/checkbox'
import SectionHeader from '../section-header/SectionHeader'
import SocialAuth from '../social-auth/SocialAuth'
import Link from 'next/link'
import { createUser } from '@/actions/user.actions'
import { toast } from '../ui/use-toast'
import { useAction } from "next-safe-action/hooks";
import { signUpSchema } from '@/validation/schema';
import { Loader2 } from "lucide-react"
import { useRouter } from 'next/navigation'
import { errorMessages } from '@/helpers/error-messages'



const SignUp = () => {
    const router = useRouter();
    const { execute, status, result } = useAction(createUser, {
        onSuccess: ({ data }) => {
            if (!data?.success && data?.error) {
                if (data.type === errorMessages.ACCOUNT_NOT_VERIFIED.type) {
                    toast({ title: "Please verify your email.", description: data?.error })
                    router.push("/verify")
                }
                toast({ title: data.title, variant: "destructive", description: data?.error })
            }
            if (data?.success) {
                toast({ title: data.title, description: data?.message })
                new Promise((resolve) => setTimeout(resolve, 3000))
                router.push("/verify")
            }
        },
        onError: (data) => {
            toast({ title: "Error", variant: "destructive", description: errorMessages.SERVER_ERROR.error })
        },
        onExecute: (data) => {
            console.log("Creating user...");
        }
    });


    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            termsAndConditions: false,
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof signUpSchema>) {
        execute(values);
    }
    return (
        <div className='flex flex-col'>
            <SectionHeader
                title='Sign Up'
                description={
                    <>
                        Already have an account? <Link className='text-primary font-bold' href={"/sign-in"}>Sign In.</Link>
                    </>
                }
            />
            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6  w-full">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Confirm your password" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="termsAndConditions"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <FormLabel className="flex items-center space-x-2">
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />


                                        <span>I agree to the terms and conditions</span>
                                    </FormLabel>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={status === "executing" ? true : false} className=' w-full' type="submit">
                        {status === "executing" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Sign Up
                    </Button>
                </form>
            </Form>

        </div>

    )
}

export default SignUp

