'use server';
import React from 'react'
import { ModeToggle } from '@/components/ModeToggle'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { auth } from '@/auth'
import AuthMenu from './AuthMenu';
import { Github } from 'lucide-react';

const Navbar = async () => {
    const session = await auth()

    return (
        <div className="border-b">
            <div className='container flex items-center justify-between px-5 py-4'>
                <div className='flex items-center'>
                    <Link href="/" className="text-xl font-semibold">0Auth</Link>
                </div>
                <div className='flex justify-end items-center space-x-3'>
                    <ModeToggle />
                    <Link href={"https://github.com/mrcodiator/0Auth"}>
                        <Button variant={"outline"} size={"icon"}>
                            <Github className='h-4 w-4' />
                        </Button>
                    </Link>
                    <AuthMenu session={session} />
                </div>
            </div>
        </div>
    )
}

export default Navbar