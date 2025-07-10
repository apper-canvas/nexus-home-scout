import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { propertyService } from "@/services/api/propertyService";
import PropertyGrid from "@/components/organisms/PropertyGrid";
import PropertyList from "@/components/organisms/PropertyList";
import ViewToggle from "@/components/molecules/ViewToggle";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const SavedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [savedProperties, setSavedProperties] = useLocalStorage("savedProperties", []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentView, setCurrentView] = useState("grid");

  const loadSavedProperties = async () => {
    if (savedProperties.length === 0) {
      setProperties([]);
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const allProperties = await propertyService.getAll();
      const filtered = allProperties.filter(property => 
        savedProperties.includes(property.Id)
      );
      setProperties(filtered);
    } catch (err) {
      setError("Failed to load saved properties. Please try again.");
      console.error("Error loading saved properties:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = (propertyId) => {
    const newSavedProperties = savedProperties.filter(id => id !== propertyId);
    setSavedProperties(newSavedProperties);
    
    const property = properties.find(p => p.Id === propertyId);
    if (property) {
      toast.success("Property removed from favorites");
    }
  };

  const handleClearAll = () => {
    setSavedProperties([]);
    setProperties([]);
    toast.success("All saved properties cleared");
  };

  const handleBrowseProperties = () => {
    window.location.href = "/browse";
  };

  useEffect(() => {
    loadSavedProperties();
  }, [savedProperties]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="h-8 bg-gray-200 rounded w-48 mb-4 shimmer"></div>
          <div className="h-4 bg-gray-200 rounded w-32 shimmer"></div>
        </div>
        <Loading type={currentView} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error message={error} onRetry={loadSavedProperties} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">
            Saved Properties
          </h1>
          <p className="text-gray-600 mt-2">
            {properties.length} saved properties
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {properties.length > 0 && (
            <>
              <ViewToggle
                currentView={currentView}
                onViewChange={setCurrentView}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAll}
                className="text-error hover:text-error-600 hover:border-error"
              >
                <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </>
          )}
        </div>
      </div>

      {properties.length === 0 ? (
        <Empty
          title="No saved properties yet"
          description="Start browsing properties and save your favorites to see them here."
          actionText="Browse Properties"
          onAction={handleBrowseProperties}
          icon="Heart"
        />
      ) : (
        <>
          {currentView === "grid" ? (
            <PropertyGrid
              properties={properties}
              favorites={savedProperties}
              onToggleFavorite={handleToggleFavorite}
            />
          ) : (
            <PropertyList
              properties={properties}
              favorites={savedProperties}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SavedProperties;