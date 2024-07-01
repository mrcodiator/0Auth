'use client';
import { editProfile } from '@/actions/user.actions';
import { profileSchema } from '@/validation/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import React from 'react'
import { useForm } from 'react-hook-form';
import * as z from 'zod';
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
import SectionHeader from '../section-header/SectionHeader';
import { toast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { errorMessages } from '@/helpers/error-messages';

const EditProfileComponent = ({ user }: { user: any }) => {
    const router = useRouter()
    const { execute, status, result } = useAction(editProfile, {
        onSuccess: ({ data }) => {
            if (!data?.success && data?.error) {
                toast({ title: data?.title, variant: "destructive", description: data?.error });
            }
            toast({ title: data?.title, description: data?.message });
            router.push("/")

        },
        onError: (data) => {
            console.error("Error: ", data)
            toast({ title: "Error", variant: "destructive", description: errorMessages.SERVER_ERROR.error })
        },
        onExecute: (data) => {
            console.log("Editing profile...")
        }
    })

    const form = useForm<z.infer<typeof profileSchema>>(
        {
            resolver: zodResolver(profileSchema),
            defaultValues: {
                name: user?.name || "",
                image: user?.image || "",
            }
        }
    )

    async function onSubmit(values: z.infer<typeof profileSchema>) {
        execute(values);
    }

    return (
        <div className='flex flex-col max-w-md w-full'>
            <SectionHeader
                title='Edit Profile'
                description={"Update your profile here."}
            />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
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
                        name='image'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your image url" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type='submit'>
                        Update
                    </Button>
                </form>
            </Form>

        </div>
    )
}

export default EditProfileComponent
