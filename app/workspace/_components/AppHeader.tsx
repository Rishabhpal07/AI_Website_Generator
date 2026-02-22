import { ModeToggle } from '@/app/_components/themeButton'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

function AppHeader() {
  return (
    <div className='flex items-center justify-between p-4 shadow'>
      <SidebarTrigger/>
      <div className='flex gap-7'>
        <ModeToggle/>
        <UserButton/> 
        </div>
    </div>
  )
}

export default AppHeader
