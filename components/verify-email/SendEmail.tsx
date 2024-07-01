'use client';
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
import { toast } from '../ui/use-toast';
import SectionHeader from '../section-header/SectionHeader';
import { useAction } from 'next-safe-action/hooks';
import { sendCode } from '@/actions/verify.action';
import { Loader2 } from 'lucide-react';
import { errorMessages } from '@/helpers/error-messages';

export interface StepProps {
    next: () => void;
    prev: () => void;
}

const formSchema = z.object({
    email: z.string().min(2, {
        message: "Email must be at least 2 characters.",
    }).email({
        message: "Invalid email address",
    }),
})

const SendEmail: React.FC<StepProps> = ({ next, prev }) => {
    const { execute, result, status } = useAction(sendCode, {
        onError: (data) => {
            toast({ title: "Error", variant: "destructive", description: errorMessages.SERVER_ERROR.error })
        },
        onSuccess: ({ data }) => {
            if (!data?.success && data?.error) {
                toast({ title: data.title, variant: "destructive", description: data?.error })
            } else {
                toast({ title: data?.title, description: data?.message });
                new Promise((resolve) => setTimeout(resolve, 5000));
                next();
            }
        },
        onExecute: (data) => {
            console.log("Sending code...")
        }
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        execute(values);

    }
    return (
        <div>
            <SectionHeader
                title="Verify your email"
                description={"Please enter your email address. We will send you an email with a link to verify your account."}
            />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={status === "executing" ? true : false} className=' w-full' type="submit">
                        {status === "executing" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Send Code
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default SendEmail

