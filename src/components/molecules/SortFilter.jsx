import React from "react";
import { cn } from "@/utils/cn";
import Select from "@/components/atoms/Select";
import Label from "@/components/atoms/Label";

const SortFilter = ({ 
  sortBy, 
  onSortChange, 
  className 
}) => {
  const sortOptions = [
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "date-new", label: "Newest First" },
    { value: "date-old", label: "Oldest First" },
    { value: "size-large", label: "Size: Large to Small" },
    { value: "size-small", label: "Size: Small to Large" }
  ];

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor="sort-select" className="text-sm font-medium text-gray-700">
        Sort by
      </Label>
      <Select
        id="sort-select"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="w-full"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default SortFilter;