
'use server';
import { getUserDetails } from '@/actions/user.actions';
import { auth } from '@/auth';
import HeroSection from '@/components/hero-section/HeroSection';
import ProfileComponent from '@/components/profile/ProfileComponent';
import { redirect } from 'next/navigation';
import React from 'react'

const Page = async () => {
    const { user, error } = await getUserDetails();
    if (error || !user) {
        return <HeroSection />
    }

    return (
        <div className='container mx-auto p-5'>
            <ProfileComponent
                name={user?.name || ""}
                email={user?.email || ""}
                image={user?.image || ""}
            />
        </div>
    )
}

export default Page;

