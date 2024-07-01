import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import SignOut from './SignOut'

const AuthMenu = ({ session }: any) => {

    return (
        <div>
            {session ? (
                <SignOut />
            ) : (
                <Link href="/sign-up">
                    <Button>Sign Up</Button>
                </Link>
            )
            }
        </div >
    )
}

export default AuthMenu
