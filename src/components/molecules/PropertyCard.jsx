import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const PropertyCard = ({ 
  property, 
  isFavorite, 
  onToggleFavorite, 
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

  const formatSquareFeet = (sqft) => {
    return new Intl.NumberFormat("en-US").format(sqft);
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(property.Id);
  };

  return (
    <div className={cn("property-card group", className)}>
      <Link to={`/property/${property.Id}`}>
        <div className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-hover transition-all duration-200">
          <div className="relative">
            <img
              src={property.images[0]}
              alt={property.title}
              className="property-image w-full h-48 object-cover transition-all duration-200"
            />
            <div className="absolute top-3 left-3">
              <Badge variant="default" className="property-type-badge">
                {property.type}
              </Badge>
            </div>
            <button
              onClick={handleFavoriteClick}
              className={cn(
                "favorite-button absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200",
                isFavorite 
                  ? "bg-red-500 text-white" 
                  : "bg-white/80 text-gray-600 hover:bg-white"
              )}
            >
              <ApperIcon 
                name={isFavorite ? "Heart" : "Heart"} 
                className={cn("w-5 h-5", isFavorite && "fill-current")}
              />
            </button>
          </div>
          
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-display font-semibold text-lg text-gray-900 line-clamp-2">
                {property.title}
              </h3>
            </div>
            
            <div className="price-highlight mb-3">
              {formatPrice(property.price)}
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-3 space-x-4">
              <div className="flex items-center">
                <ApperIcon name="Bed" className="w-4 h-4 mr-1" />
                <span>{property.bedrooms} bed</span>
              </div>
              <div className="flex items-center">
                <ApperIcon name="Bath" className="w-4 h-4 mr-1" />
                <span>{property.bathrooms} bath</span>
              </div>
              <div className="flex items-center">
                <ApperIcon name="Square" className="w-4 h-4 mr-1" />
                <span>{formatSquareFeet(property.squareFeet)} sqft</span>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <ApperIcon name="MapPin" className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="line-clamp-1">
                {property.address.street}, {property.address.city}, {property.address.state}
              </span>
            </div>
            
{property.phone && (
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <ApperIcon name="Phone" className="w-4 h-4 mr-1 flex-shrink-0" />
                <span>{property.phone}</span>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">
                Listed {format(new Date(property.listingDate), "MMM d, yyyy")}
              </div>
              <div className="flex items-center text-sm text-primary hover:text-primary-600 transition-colors">
                <span className="mr-1">View Details</span>
                <ApperIcon name="ChevronRight" className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;