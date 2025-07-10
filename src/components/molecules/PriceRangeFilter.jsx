import React from "react";
import { cn } from "@/utils/cn";
import Label from "@/components/atoms/Label";
import Slider from "@/components/atoms/Slider";

const PriceRangeFilter = ({ 
  minPrice, 
  maxPrice, 
  onMinPriceChange, 
  onMaxPriceChange, 
  className 
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-sm font-medium text-gray-700">Price Range</h3>
      
      <div className="space-y-3">
        <div>
          <Label htmlFor="min-price" className="text-xs text-gray-600">
            Minimum Price: {formatPrice(minPrice)}
          </Label>
          <Slider
            id="min-price"
            min={0}
            max={5000000}
            step={50000}
            value={minPrice}
            onChange={onMinPriceChange}
            className="mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="max-price" className="text-xs text-gray-600">
            Maximum Price: {formatPrice(maxPrice)}
          </Label>
          <Slider
            id="max-price"
            min={0}
            max={5000000}
            step={50000}
            value={maxPrice}
            onChange={onMaxPriceChange}
            className="mt-2"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{formatPrice(minPrice)}</span>
        <span>-</span>
        <span>{formatPrice(maxPrice)}</span>
      </div>
    </div>
  );
};

export default PriceRangeFilter;