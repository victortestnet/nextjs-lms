import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import React from 'react';
import { BookOpen } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";
import { CourseProgress } from "@/components/course-progress";
import { formatPrice } from "@/lib/format";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const prisma = new PrismaClient();

interface CourseIdProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number | null;
  progress: number;
  category: string;
  description: string;
}

const fetchCourseDetails = async (courseId: string): Promise<CourseIdProps | null> => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        category: true,
        chapters: true,
      },
    });

    if (!course) {
      return null;
    }

    // Calculate or set a default value for progress
    const progress = 0; // Placeholder logic for progress calculation

    return {
      id: course.id,
      title: course.title,
      imageUrl: course.imageUrl ?? '/placeholder-image.jpg', // Ensure imageUrl is a valid string
      chaptersLength: course.chapters.length,
      price: course.price,
      progress,
      category: course.category?.name ?? "Uncategorized",
      description: course.description ?? '',
    };
  } catch (error) {
    console.error('Error fetching course details:', error);
    return null;
  }
};

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const course = await fetchCourseDetails(params.courseId);

  if (!course) {
    return <div>No course found.</div>;
  }

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6">
      <div className="relative w-full md:w-2/3 aspect-video rounded-md overflow-hidden">
        <Image
          layout="fill"
          className="object-cover"
          alt={course.title}
          src={course.imageUrl} // imageUrl is guaranteed to be a valid string
        />
      </div>
      <div className="flex flex-col w-full md:w-1/3">
        <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
        <p className="text-xs text-muted-foreground mb-2">{course.category}</p>
        <p className="text-md font-medium text-slate-700 mb-4">{course.description}</p>
        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
          <div className="flex items-center gap-x-1 text-slate-500">
            <IconBadge size="sm" icon={BookOpen} />
            <span>{course.chaptersLength} {course.chaptersLength === 1 ? "Chapter" : "Chapters"}</span>
          </div>
        </div>
        <CourseProgress
          variant={course.progress === 100 ? "success" : "default"}
          size="sm"
          value={course.progress}
        />
        <p className="text-md md:text-sm font-medium text-slate-700 mt-4">
          {course.price !== null ? `$${course.price.toFixed(2)}` : "Price not available"}
        </p>
        <div>
          <Link href={`/courses/${course.id}`} passHref>
            <Button className='mt-8 w-full'>
              Start watching this course
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
