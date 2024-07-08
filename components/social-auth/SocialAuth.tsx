import React from 'react'
import { IoLogoFacebook, IoLogoGithub, IoLogoGoogle } from "react-icons/io5"
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { signIn } from '@/auth'
import { redirect } from 'next/navigation'

const SocialAuth = () => {
    return (
        <div className='flex flex-col space-y-3 py-4 border-t'>
            <div className="relative text-center">
                <Separator className="absolute top-[12px] w-full" />
                <span className="relative inline-block px-4 bg-background text-sm font-semibold">Or continue with...</span>
            </div>
            <div className="flex space-x-4 justify-center">
                <form action="">
                    <Button size="icon" className=' rounded-full' variant="ghost" type='submit'>
                        <IoLogoFacebook className="h-5 w-5" />
                    </Button>
                </form>
                <form action="">
                    <Button size="icon" className=' rounded-full' variant="ghost" type='submit'>
                        <IoLogoGithub className="h-5 w-5 " />
                    </Button>
                </form>
                <form
                    action={async () => {
                        "use server"
                        await signIn("google", { redirect: true })
                        // If sign-in is successful, redirect to home page
                        // return redirect("/")
                    }}
                >
                    <Button size="icon" className=' rounded-full' variant="ghost">
                        <IoLogoGoogle className="h-5 w-5" />
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default SocialAuth
