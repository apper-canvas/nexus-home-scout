import React from "react";
import { cn } from "@/utils/cn";
import PropertyCard from "@/components/molecules/PropertyCard";

const PropertyGrid = ({ 
  properties, 
  favorites, 
  onToggleFavorite, 
  className 
}) => {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
      className
    )}>
      {properties.map((property) => (
        <PropertyCard
          key={property.Id}
          property={property}
          isFavorite={favorites.includes(property.Id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default PropertyGrid;