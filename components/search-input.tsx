"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        categoryId: currentCategoryId,
        title: debouncedValue,
      }
    }, { skipEmptyString: true, skipNull: true });

    router.push(url);
  }, [debouncedValue, currentCategoryId, router, pathname])

  return (
    <div className="relative">
      <Search
        className="h-4 w-4 absolute top-3 left-3 text-slate-600"
      />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100"
        placeholder="Search for a course"
      />
    </div>
  )
}