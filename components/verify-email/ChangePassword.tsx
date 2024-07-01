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
import { toast } from '../ui/use-toast'
import Link from 'next/link'
import SectionHeader from '../section-header/SectionHeader'
import { changePassword } from '@/actions/verify.action'
import { useAction } from 'next-safe-action/hooks'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { changePasswordSchema } from '@/validation/schema'
import { errorMessages } from '@/helpers/error-messages'

export interface StepProps {
    next: () => void;
    prev: () => void;
}

const ChangePassword: React.FC<StepProps> = ({ next, prev }) => {
    const router = useRouter();
    const { execute, status, result } = useAction(changePassword, {
        onError: (data) => {
            console.log(data);
            toast({
                title: "Error",
                description: errorMessages.SERVER_ERROR.error,
                variant: "destructive",
            })
        },
        onSuccess: ({ data }) => {
            // console.log(data);
            if (!data?.success && data?.error) {
                toast({ title: data.title, variant: "destructive", description: data?.error })
                router.push("/sign-in");
            } else {
                toast({ title: data?.title, description: data?.message })
                new Promise((resolve) => setTimeout(resolve, 3000));
                router.push("/")
            }
        }
    });

    const form = useForm<z.infer<typeof changePasswordSchema>>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof changePasswordSchema>) {
        // Do something with the form values.
        execute(values);
    }

    return (
        <div>
            <SectionHeader
                title='New Password'
                description="Please enter your new password."
            />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col space-y-6">
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} placeholder='Enter new password' />
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
                                    <Input type="password" {...field} placeholder='confirm password' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className=' flex justify-end gap-2'>
                        <Link href={"/"}>
                            <Button variant={"light"} >
                                Cancel
                            </Button>
                        </Link>
                        <Button disabled={status === "executing" ? true : false} type="submit">
                            {status === "executing" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}


export default ChangePassword;

