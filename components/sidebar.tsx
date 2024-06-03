import React from 'react'
import { Logo } from '@/components/logo'
import { SidebarRoutes } from '@/components/sidebar-routes'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <div className='h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm'>
      <div className='p-6 flex'>
        <Link href="/" className='flex'>
          <Logo />
        </Link>
      </div>
      <div className='flex flex-col w-full'>
        <SidebarRoutes />
      </div>
    </div>
  )
}
