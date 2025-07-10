import React, { useState } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search by location, address, or property features...", 
  className 
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch?.("");
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <ApperIcon name="Search" className="w-5 h-5 text-gray-400" />
        </div>
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-20 h-12 text-base shadow-sm"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-16 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          >
            <ApperIcon name="X" className="w-4 h-4" />
          </button>
        )}
        <div className="absolute inset-y-0 right-0 flex items-center pr-1">
          <Button
            type="submit"
            size="sm"
            className="h-10 px-4"
          >
            <ApperIcon name="Search" className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;