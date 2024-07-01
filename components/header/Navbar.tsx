'use server';
import React from 'react'
import { ModeToggle } from '@/components/ModeToggle'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { auth } from '@/auth'
import AuthMenu from './AuthMenu';

const Navbar = async () => {
    const session = await auth()

    return (
        <div className="border-b border-b">
            <div className='container flex items-center justify-between px-5 py-4'>
                <div className='flex items-center'>
                    <Link href="/" className="text-xl font-semibold">0Auth</Link>
                </div>
                <div className='flex justify-end items-center space-x-3'>
                    <ModeToggle />
                    <AuthMenu session={session} />
                </div>
            </div>
        </div>
    )
}

export default Navbar