import React from 'react';
import { Info } from 'lucide-react';
import { useCalculatorStore } from '../store/calculatorStore';

export default function BasicCalculator() {
  const { basicCalc, updateBasicCalc } = useCalculatorStore();

  return (
    <div className="bg-gradient-to-br from-white/50 to-blue-50/30 backdrop-blur-md p-6">
      <h2 className="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
        Basic Construction Calculator
      </h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="flex items-center space-x-2">
              <span>Plot Size (sq. yards)</span>
              <Info
                className="w-4 h-4 text-gray-400 cursor-help"
                data-tooltip-id="tooltip"
                data-tooltip-content="Enter the total area of your plot in square yards"
              />
            </label>
            <input
              type="number"
              value={basicCalc.plotSize || ''}
              onChange={(e) => updateBasicCalc({ plotSize: Math.max(0, Number(e.target.value) || 0) })}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label className="flex items-center space-x-2">
              <span>Number of Floors</span>
              <Info
                className="w-4 h-4 text-gray-400 cursor-help"
                data-tooltip-id="tooltip"
                data-tooltip-content="Select the number of floors you want to construct"
              />
            </label>
            <select
              value={basicCalc.floors}
              onChange={(e) => updateBasicCalc({ floors: Number(e.target.value) })}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} Floor{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-group">
            <label className="flex items-center space-x-2">
              <span>Construction Quality</span>
              <Info
                className="w-4 h-4 text-gray-400 cursor-help"
                data-tooltip-id="tooltip"
                data-tooltip-content="Select the quality level of construction materials and finishes"
              />
            </label>
            <select
              value={basicCalc.quality}
              onChange={(e) => updateBasicCalc({ quality: e.target.value })}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="standard">Standard Quality</option>
              <option value="premium">Premium Quality</option>
              <option value="luxury">Luxury Quality</option>
            </select>
          </div>

          <div className="form-group">
            <label className="flex items-center space-x-2">
              <span>Bathrooms per Floor</span>
              <Info
                className="w-4 h-4 text-gray-400 cursor-help"
                data-tooltip-id="tooltip"
                data-tooltip-content="Enter the number of bathrooms per floor"
              />
            </label>
            <input
              type="number"
              value={basicCalc.bathrooms || ''}
              onChange={(e) => updateBasicCalc({ bathrooms: Math.max(0, Number(e.target.value) || 0) })}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="flex items-center space-x-2">
              <span>Bedrooms per Floor</span>
              <Info
                className="w-4 h-4 text-gray-400 cursor-help"
                data-tooltip-id="tooltip"
                data-tooltip-content="Enter the number of bedrooms per floor"
              />
            </label>
            <input
              type="number"
              value={basicCalc.bedrooms || ''}
              onChange={(e) => updateBasicCalc({ bedrooms: Math.max(0, Number(e.target.value) || 0) })}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="flex items-center space-x-2">
              <span>Location Type</span>
              <Info
                className="w-4 h-4 text-gray-400 cursor-help"
                data-tooltip-id="tooltip"
                data-tooltip-content="Select the type of location for cost adjustment"
              />
            </label>
            <select
              value={basicCalc.locationType}
              onChange={(e) => updateBasicCalc({ locationType: e.target.value })}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="urban">Urban Area</option>
              <option value="suburban">Suburban Area</option>
              <option value="rural">Rural Area</option>
            </select>
          </div>

          <div className="form-group">
            <label className="flex items-center space-x-2">
              <span>Construction Timeline (months)</span>
              <Info
                className="w-4 h-4 text-gray-400 cursor-help"
                data-tooltip-id="tooltip"
                data-tooltip-content="Expected construction duration in months"
              />
            </label>
            <input
              type="number"
              value={basicCalc.timeline || ''}
              onChange={(e) => updateBasicCalc({ timeline: Math.max(1, Number(e.target.value) || 0) })}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="1"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={basicCalc.basement}
              onChange={(e) => updateBasicCalc({ basement: e.target.checked })}
              className="w-4 h-4 text-blue-600"
            />
            <label className="flex items-center space-x-2">
              <span>Include Basement</span>
              <Info
                className="w-4 h-4 text-gray-400 cursor-help"
                data-tooltip-id="tooltip"
                data-tooltip-content="Check if you want to include a basement"
              />
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={basicCalc.garage}
              onChange={(e) => updateBasicCalc({ garage: e.target.checked })}
              className="w-4 h-4 text-blue-600"
            />
            <label className="flex items-center space-x-2">
              <span>Include Garage</span>
              <Info
                className="w-4 h-4 text-gray-400 cursor-help"
                data-tooltip-id="tooltip"
                data-tooltip-content="Check if you want to include a garage"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}