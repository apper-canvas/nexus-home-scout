import React from "react";
import { cn } from "@/utils/cn";

const Loading = ({ className, type = "grid" }) => {
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-card overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200 shimmer"></div>
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-200 rounded shimmer"></div>
        <div className="h-8 bg-gray-200 rounded w-32 shimmer"></div>
        <div className="flex space-x-4">
          <div className="h-4 bg-gray-200 rounded w-16 shimmer"></div>
          <div className="h-4 bg-gray-200 rounded w-16 shimmer"></div>
          <div className="h-4 bg-gray-200 rounded w-20 shimmer"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-48 shimmer"></div>
        <div className="flex justify-between items-center">
          <div className="h-3 bg-gray-200 rounded w-24 shimmer"></div>
          <div className="h-4 bg-gray-200 rounded w-20 shimmer"></div>
        </div>
      </div>
    </div>
  );

  const SkeletonListItem = () => (
    <div className="bg-white rounded-xl shadow-card overflow-hidden animate-pulse">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-64 sm:flex-shrink-0">
          <div className="w-full h-48 bg-gray-200 shimmer"></div>
        </div>
        <div className="flex-1 p-6 space-y-3">
          <div className="h-6 bg-gray-200 rounded shimmer"></div>
          <div className="h-8 bg-gray-200 rounded w-32 shimmer"></div>
          <div className="flex space-x-4">
            <div className="h-4 bg-gray-200 rounded w-16 shimmer"></div>
            <div className="h-4 bg-gray-200 rounded w-16 shimmer"></div>
            <div className="h-4 bg-gray-200 rounded w-20 shimmer"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-48 shimmer"></div>
          <div className="h-4 bg-gray-200 rounded w-full shimmer"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 shimmer"></div>
          <div className="flex justify-between items-center">
            <div className="h-3 bg-gray-200 rounded w-24 shimmer"></div>
            <div className="h-4 bg-gray-200 rounded w-20 shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (type === "list") {
    return (
      <div className={cn("space-y-4", className)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonListItem key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {Array.from({ length: 9 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default Loading;