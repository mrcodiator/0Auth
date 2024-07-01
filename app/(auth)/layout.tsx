import { auth } from '@/auth'
import SocialAuth from '@/components/social-auth/SocialAuth'
import { redirect } from 'next/navigation'
import React from 'react'

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()
  if (session) redirect("/")
  return (
    <div className=' h-full flex-1 w-full flex flex-col justify-center items-center p-5'>
      <div className='max-w-[370px] w-full flex flex-col'>
        {children}
        <SocialAuth />
      </div>
    </div>
  )
}

export default layout
