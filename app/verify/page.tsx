'use client'
import VerifyEmailComponent from '@/components/verify-email/VerifyEmailComponent'
import React from 'react'
import { VerifyFormProvider } from '@/context/verifyContext'


const page = () => {
    return (
        <div className=' h-full flex-1 w-full flex flex-col justify-center items-center p-5'>
            <VerifyFormProvider>
                <VerifyEmailComponent />
            </VerifyFormProvider>
        </div>
    )
}

export default page
