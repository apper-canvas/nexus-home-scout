import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/organisms/Header";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const Layout = () => {
  const [currentView, setCurrentView] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [savedProperties] = useLocalStorage("savedProperties", []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onSearch={handleSearch}
        currentView={currentView}
        onViewChange={handleViewChange}
        savedCount={savedProperties.length}
      />
      <main className="flex-1">
        <Outlet context={{ 
          searchTerm, 
          currentView, 
          onViewChange: handleViewChange 
        }} />
      </main>
    </div>
  );
};

export default Layout;