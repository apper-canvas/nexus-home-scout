import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import BrowseProperties from "@/components/pages/BrowseProperties";
import PropertyDetail from "@/components/pages/PropertyDetail";
import MapView from "@/components/pages/MapView";
import SavedProperties from "@/components/pages/SavedProperties";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BrowseProperties />} />
          <Route path="browse" element={<BrowseProperties />} />
          <Route path="property/:id" element={<PropertyDetail />} />
          <Route path="map" element={<MapView />} />
          <Route path="saved" element={<SavedProperties />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="!z-[9999]"
      />
    </div>
  );
}

export default App;