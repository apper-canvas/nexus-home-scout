import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const ViewToggle = ({ 
  currentView, 
  onViewChange, 
  className 
}) => {
  const views = [
    { value: "grid", label: "Grid", icon: "Grid3x3" },
    { value: "list", label: "List", icon: "List" },
    { value: "map", label: "Map", icon: "Map" }
  ];

  return (
    <div className={cn("flex items-center space-x-1 bg-gray-100 rounded-lg p-1", className)}>
      {views.map((view) => (
        <button
          key={view.value}
          onClick={() => onViewChange(view.value)}
          className={cn(
            "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
            currentView === view.value
              ? "bg-white text-primary shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          <ApperIcon name={view.icon} className="w-4 h-4" />
          <span className="hidden sm:inline">{view.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ViewToggle;