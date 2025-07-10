import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import PriceRangeFilter from "@/components/molecules/PriceRangeFilter";
import PropertyTypeFilter from "@/components/molecules/PropertyTypeFilter";
import RoomFilter from "@/components/molecules/RoomFilter";
import SortFilter from "@/components/molecules/SortFilter";

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  onResetFilters, 
  hasActiveFilters,
  sortBy,
  onSortChange,
  isOpen,
  onClose,
  className 
}) => {
  const handlePriceMinChange = (value) => {
    onFilterChange("priceMin", value);
  };

  const handlePriceMaxChange = (value) => {
    onFilterChange("priceMax", value);
  };

  const handlePropertyTypeChange = (types) => {
    onFilterChange("propertyTypes", types);
  };

  const handleBedroomsChange = (value) => {
    onFilterChange("bedroomsMin", value);
  };

  const handleBathroomsChange = (value) => {
    onFilterChange("bathroomsMin", value);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 lg:relative lg:translate-x-0 lg:shadow-none lg:bg-gray-50",
        isOpen ? "translate-x-0" : "-translate-x-full",
        className
      )}>
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <div className="flex items-center space-x-2">
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onResetFilters}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Reset
                  </Button>
                )}
                <button
                  onClick={onClose}
                  className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Content */}
          <div className="p-4 space-y-6">
            <SortFilter
              sortBy={sortBy}
              onSortChange={onSortChange}
            />

            <div className="border-t border-gray-200 pt-6">
              <PriceRangeFilter
                minPrice={filters.priceMin}
                maxPrice={filters.priceMax}
                onMinPriceChange={handlePriceMinChange}
                onMaxPriceChange={handlePriceMaxChange}
              />
            </div>

            <div className="border-t border-gray-200 pt-6">
              <PropertyTypeFilter
                selectedTypes={filters.propertyTypes}
                onTypeChange={handlePropertyTypeChange}
              />
            </div>

            <div className="border-t border-gray-200 pt-6">
              <RoomFilter
                bedrooms={filters.bedroomsMin}
                bathrooms={filters.bathroomsMin}
                onBedroomsChange={handleBedroomsChange}
                onBathroomsChange={handleBathroomsChange}
              />
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">Popular Features</h3>
                <div className="space-y-2">
                  {[
                    "Swimming Pool",
                    "Garage",
                    "Fireplace",
                    "Air Conditioning",
                    "Hardwood Floors",
                    "Updated Kitchen"
                  ].map((feature) => (
                    <label key={feature} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.features.includes(feature)}
                        onChange={(e) => {
                          const newFeatures = e.target.checked
                            ? [...filters.features, feature]
                            : filters.features.filter(f => f !== feature);
                          onFilterChange("features", newFeatures);
                        }}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                      />
                      <span className="ml-2 text-sm text-gray-700">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;