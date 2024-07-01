"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/use-toast";
import { StepProps } from "./SendEmail";
import SectionHeader from "../section-header/SectionHeader";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { verifyCode } from "@/actions/verify.action";
import { errorMessages } from "@/helpers/error-messages";

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
});

const VerifyToken: React.FC<StepProps> = ({ next, prev }) => {
    const { execute, result, status } = useAction(verifyCode, {
        onError: (data) => {
            // console.log(data);
            toast({ title: "Error", variant: "destructive", description: errorMessages.SERVER_ERROR.error })
        },
        onSuccess: ({ data }) => {
            if (!data?.success && data?.error) {
                toast({ title: data?.title, variant: "destructive", description: data?.error })
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

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        execute({ token: data.pin });
    }

    return (
        <div>
            <SectionHeader
                title="Enter One-Time Password"
                description="Please enter the one-time password sent to your email."
            />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col space-y-6">
                    <FormField
                        control={form.control}
                        name="pin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>One-Time Password</FormLabel>
                                <FormControl>
                                    <InputOTP className="w-full" maxLength={6} {...field}>
                                        <InputOTPGroup className="w-full flex justify-between">
                                            <InputOTPSlot className="flex-1" index={0} />
                                            <InputOTPSlot className="flex-1" index={1} />
                                            <InputOTPSlot className="flex-1 " index={2} />
                                            <InputOTPSlot className="flex-1" index={3} />
                                            <InputOTPSlot className="flex-1" index={4} />
                                            <InputOTPSlot className="flex-1" index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormDescription>
                                    Please enter the one-time password sent to your phone.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className=' flex justify-end gap-2'>
                        <Button variant={"light"} onClick={prev} >
                            Resend
                        </Button>
                        <Button disabled={status === "executing" ? true : false} type="submit">
                            {status === "executing" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Verify
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default VerifyToken;
