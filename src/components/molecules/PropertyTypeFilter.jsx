import React from "react";
import { cn } from "@/utils/cn";
import Badge from "@/components/atoms/Badge";

const PropertyTypeFilter = ({ 
  selectedTypes, 
  onTypeChange, 
  className 
}) => {
  const propertyTypes = [
    { value: "house", label: "House" },
    { value: "apartment", label: "Apartment" },
    { value: "condo", label: "Condo" },
    { value: "townhouse", label: "Townhouse" },
    { value: "land", label: "Land" },
    { value: "commercial", label: "Commercial" }
  ];

  const toggleType = (type) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    onTypeChange(newTypes);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-sm font-medium text-gray-700">Property Type</h3>
      <div className="flex flex-wrap gap-2">
        {propertyTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => toggleType(type.value)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105",
              selectedTypes.includes(type.value)
                ? "bg-primary text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PropertyTypeFilter;