import { useState, useEffect } from "react";

export function useFilters(initialFilters = {}) {
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 5000000,
    propertyTypes: [],
    bedroomsMin: 0,
    bathroomsMin: 0,
    squareFeetMin: 0,
    features: [],
    ...initialFilters
  });

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      priceMin: 0,
      priceMax: 5000000,
      propertyTypes: [],
      bedroomsMin: 0,
      bathroomsMin: 0,
      squareFeetMin: 0,
      features: []
    });
  };

  const hasActiveFilters = () => {
    return (
      filters.priceMin > 0 ||
      filters.priceMax < 5000000 ||
      filters.propertyTypes.length > 0 ||
      filters.bedroomsMin > 0 ||
      filters.bathroomsMin > 0 ||
      filters.squareFeetMin > 0 ||
      filters.features.length > 0
    );
  };

  return {
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters
  };
}