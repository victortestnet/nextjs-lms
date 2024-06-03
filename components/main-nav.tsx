"use client";

import { UserButton, useAuth } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import React from 'react';
import { SearchInput } from '@/components/search-input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { isTeacher } from '@/lib/teacher';

export const MainNav = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className='hidden md:block'>
          <SearchInput />
        </div>
      )}
      <div className='flex gap-x-2 ml-auto'>
        {isTeacherPage || isCoursePage ? (
          <Link href="/" className='flex'>
            <Button size="sm" variant="ghost">
              <LogOut className='w-4 h-4 mr-2' />
              Student
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher Mode
            </Button>
          </Link>
        ) : null}
        <UserButton afterSignOutUrl='/' />
      </div>
    </>
  )
}
