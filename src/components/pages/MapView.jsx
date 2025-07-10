import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { propertyService } from "@/services/api/propertyService";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const MapView = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedProperties, setSavedProperties] = useLocalStorage("savedProperties", []);

  const loadProperties = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await propertyService.getAll();
      setProperties(data);
    } catch (err) {
      setError("Failed to load properties. Please try again.");
      console.error("Error loading properties:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = (propertyId) => {
    const newSavedProperties = savedProperties.includes(propertyId)
      ? savedProperties.filter(id => id !== propertyId)
      : [...savedProperties, propertyId];
    
    setSavedProperties(newSavedProperties);
    
    const property = properties.find(p => p.Id === propertyId);
    if (property) {
      toast.success(
        savedProperties.includes(propertyId)
          ? "Property removed from favorites"
          : "Property added to favorites"
      );
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  useEffect(() => {
    loadProperties();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6 shimmer"></div>
          <div className="h-96 bg-gray-200 rounded-xl mb-6 shimmer"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg shimmer"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error message={error} onRetry={loadProperties} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-gray-900">
          Properties Map View
        </h1>
        <p className="text-gray-600 mt-2">
          Explore {properties.length} properties on the map
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-card overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-primary-50 to-primary-100 relative">
              <div className="w-full h-96 flex items-center justify-center relative">
                <div className="text-center">
                  <ApperIcon name="Map" className="w-20 h-20 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Interactive Map
                  </h3>
                  <p className="text-gray-600 max-w-md">
                    This would display an interactive map with property markers. 
                    Click on any property below to view its location.
                  </p>
                </div>
                
                {/* Simulated Map Markers */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {properties.slice(0, 8).map((property, index) => (
                    <div
                      key={property.Id}
                      className={`absolute map-marker cursor-pointer pointer-events-auto ${
                        selectedProperty?.Id === property.Id ? "z-10" : ""
                      }`}
                      style={{
                        left: `${20 + (index % 4) * 20}%`,
                        top: `${30 + Math.floor(index / 4) * 30}%`,
                        transform: "translate(-50%, -50%)"
                      }}
                      onClick={() => setSelectedProperty(property)}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg ${
                        selectedProperty?.Id === property.Id
                          ? "bg-accent scale-125"
                          : "bg-primary hover:bg-primary-600"
                      }`}>
                        {formatPrice(property.price).slice(0, -3)}k
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Property Details Sidebar */}
        <div className="space-y-6">
          {selectedProperty ? (
            <div className="bg-white rounded-xl shadow-card overflow-hidden">
              <div className="relative">
                <img
                  src={selectedProperty.images[0]}
                  alt={selectedProperty.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="default" className="property-type-badge">
                    {selectedProperty.type}
                  </Badge>
                </div>
                <button
                  onClick={() => handleToggleFavorite(selectedProperty.Id)}
                  className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${
                    savedProperties.includes(selectedProperty.Id)
                      ? "bg-red-500 text-white"
                      : "bg-white/80 text-gray-600 hover:bg-white"
                  }`}
                >
                  <ApperIcon 
                    name="Heart" 
                    className={`w-5 h-5 ${savedProperties.includes(selectedProperty.Id) ? "fill-current" : ""}`}
                  />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-2">
                  {selectedProperty.title}
                </h3>
                
                <div className="price-highlight mb-3">
                  {formatPrice(selectedProperty.price)}
                </div>
                
                <div className="flex items-center text-sm text-gray-600 mb-3 space-x-4">
                  <div className="flex items-center">
                    <ApperIcon name="Bed" className="w-4 h-4 mr-1" />
                    <span>{selectedProperty.bedrooms} bed</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Bath" className="w-4 h-4 mr-1" />
                    <span>{selectedProperty.bathrooms} bath</span>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <ApperIcon name="MapPin" className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span className="line-clamp-1">
                    {selectedProperty.address.street}, {selectedProperty.address.city}
                  </span>
                </div>
                
                <Link
                  to={`/property/${selectedProperty.Id}`}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
                >
                  View Details
                  <ApperIcon name="ChevronRight" className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-card p-6 text-center">
              <ApperIcon name="MousePointer" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Select a Property
              </h3>
              <p className="text-gray-600">
                Click on any property marker on the map to view its details.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Property List */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          All Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {properties.map((property) => (
            <div
              key={property.Id}
              className={`bg-white rounded-lg shadow-card p-4 cursor-pointer transition-all duration-200 hover:shadow-hover ${
                selectedProperty?.Id === property.Id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedProperty(property)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 line-clamp-1">
                    {property.title}
                  </h3>
                  <div className="text-sm text-primary font-semibold">
                    {formatPrice(property.price)}
                  </div>
                </div>
                <Badge variant="outline" className="text-xs ml-2">
                  {property.type}
                </Badge>
              </div>
              
              <div className="flex items-center text-xs text-gray-600 mb-2">
                <ApperIcon name="Bed" className="w-3 h-3 mr-1" />
                <span>{property.bedrooms}</span>
                <ApperIcon name="Bath" className="w-3 h-3 ml-3 mr-1" />
                <span>{property.bathrooms}</span>
              </div>
              
              <div className="flex items-center text-xs text-gray-600">
                <ApperIcon name="MapPin" className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="line-clamp-1">
                  {property.address.city}, {property.address.state}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapView;