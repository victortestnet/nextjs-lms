import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (pathname === "/" && href === "/") ||
  pathname === href || pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm hover:bg-gray-100 rounded-lg duration-200 font-medium pl-6 transition-all ",
        isActive && "bg-gray-100 rounded-lg font-medium text-primary"
      )}
    >
      <div className='flex items-center gap-x-2 py-4'>
        <Icon 
          size={22}
          className={cn("text-slate-500", isActive && "text-primary")}
        />
        {label}
      </div>
      <div className={cn("transition-all",
        isActive && "opacity-100"
      )}>

      </div>
    </button>
  )
}

export default SidebarItem;