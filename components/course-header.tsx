"use client";

import { Chapter, Course, UserProgress } from "@prisma/client"

import { MainNav } from "@/components/main-nav";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CourseMobileSidebar } from "./course-mobile-sidebar";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
};


export const CourseNavbar = ({
  course,
  progressCount,
}: CourseNavbarProps) => {
  const router = useRouter();

  return (
    <div className="p-6 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar
        course={course}
        progressCount={progressCount}
      />
        <Link href="/">
          <Button variant="ghost">
            <ArrowLeft className="w-4 h-4" />
            Go back
          </Button>
        </Link>
      <MainNav />      
    </div>
  )
}