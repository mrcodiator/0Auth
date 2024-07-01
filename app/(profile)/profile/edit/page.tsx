'use server';
import { getUserDetails } from '@/actions/user.actions';
import { auth } from '@/auth'
import EditProfileComponent from '@/components/profile/EditProfileComponent'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
    const { user, error } = await getUserDetails();
    if (error || !user) {
        return redirect("/")
    }

    return (
        <div className=' container flex-1 h-full w-full p-5 mx-auto flex flex-col items-center justify-center'>
            <EditProfileComponent user={user} />
        </div>
    )
}

export default page
