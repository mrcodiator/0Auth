import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const HeroSection = () => {
    return (
        <div className="container max-w-3xl flex-1 h-full mx-auto flex flex-col items-center justify-center text-center">
            <p className="text-4xl capitalize font-bold tracking-tight md:text-6xl">
                The best way to manage your team
            </p>
            <p className="mt-6 md:text-sm leading-8 text-muted-foreground">
                Our platform simplifies team management by providing a centralized hub for communication, task management, and collaboration. With easy-to-use tools and features and enhance team collaboration.
            </p>
            <div className="flex flex-wrap justify-center gap-5 mt-8">
                <Link href="/sign-up">
                    <Button size={"lg"}>Sign Up</Button>
                </Link>
                <Link href="/sign-in">
                    <Button size={"lg"} variant="light">
                        Sign In
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default HeroSection

