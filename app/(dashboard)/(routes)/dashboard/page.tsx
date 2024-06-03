import { getDashboardCourses } from '@/actions/get-dashboard-courses';
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'
import { InfoCard } from '@/components/info-card';
import { Clock } from 'lucide-react';
import { CoursesList } from '@/components/course-list';

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const {
    completedCourses,
    coursesInProgress,
  } = await getDashboardCourses(userId);

  return (
    <div className='p-6 space-y-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <InfoCard 
          icon={Clock}
          label='In Progress'
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard 
          icon={Clock}
          label='Completed'
          numberOfItems={completedCourses.length}
          variant='success'
        />
      </div>
      <CoursesList 
        items={[...coursesInProgress, ...completedCourses]}
      />
    </div>
  )
}
