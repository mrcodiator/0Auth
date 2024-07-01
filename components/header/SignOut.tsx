import React from 'react'
import { Button } from '../ui/button'
import { toast } from '../ui/use-toast'
import { signOut } from '@/auth'
import { redirect } from 'next/navigation'

const SignOut = () => {
    const handleSignOut = async () => {
        'use server'
        await signOut({ redirect: true, redirectTo: "/" });
    }

    return (
        <form action={handleSignOut}>
            <Button type="submit">
                Sign Out
            </Button>
        </form>
    )
}

export default SignOut