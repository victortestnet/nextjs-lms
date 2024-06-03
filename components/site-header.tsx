import React from 'react'
import { MainNav } from './main-nav'
import { MobileNav } from './mobile-nav'

const SiteHeader = () => {
  return (
    <div className='p-4 border-b h-full flex items-center bg-center shadow-sm'>
      <MobileNav />
      <MainNav />
    </div>
  )
}

export default SiteHeader