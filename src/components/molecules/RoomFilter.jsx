import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";

const RoomFilter = ({ 
  bedrooms, 
  bathrooms, 
  onBedroomsChange, 
  onBathroomsChange, 
  className 
}) => {
  const roomOptions = [0, 1, 2, 3, 4, 5];

  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Bedrooms</h3>
        <div className="flex flex-wrap gap-2">
          {roomOptions.map((count) => (
            <button
              key={count}
              onClick={() => onBedroomsChange(count)}
              className={cn(
                "w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105",
                bedrooms === count
                  ? "bg-primary text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {count === 0 ? "Any" : count + "+"}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Bathrooms</h3>
        <div className="flex flex-wrap gap-2">
          {roomOptions.map((count) => (
            <button
              key={count}
              onClick={() => onBathroomsChange(count)}
              className={cn(
                "w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105",
                bathrooms === count
                  ? "bg-primary text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {count === 0 ? "Any" : count + "+"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomFilter;