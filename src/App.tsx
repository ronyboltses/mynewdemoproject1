import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import Navbar from './components/Navbar';
import Calculator from './components/Calculator';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AboutPage from './pages/AboutPage';
import FactorsPage from './pages/FactorsPage';
import ToolsPage from './pages/ToolsPage';
import ResourcesPage from './pages/ResourcesPage';
import PaintCalculator from './components/calculators/PaintCalculator';
import WaterTankCalculator from './components/calculators/WaterTankCalculator';
import FlooringCalculator from './components/calculators/FlooringCalculator';
import ACCapacityCalculator from './components/calculators/ACCapacityCalculator';
import AreaCalculator from './components/calculators/AreaCalculator';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8 mt-24">
          <Routes>
            <Route path="/" element={<Calculator mode="advanced" />} />
            <Route path="/basic" element={<Calculator mode="basic" />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/factors" element={<FactorsPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/tools/paint" element={<PaintCalculator />} />
            <Route path="/tools/water-tank" element={<WaterTankCalculator />} />
            <Route path="/tools/flooring" element={<FlooringCalculator />} />
            <Route path="/tools/ac-capacity" element={<ACCapacityCalculator />} />
            <Route path="/tools/area" element={<AreaCalculator />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Tooltip id="tooltip" />
      </div>
    </BrowserRouter>
  );
}

export default App;