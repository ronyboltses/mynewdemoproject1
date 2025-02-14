import React, { useState } from 'react';
import { Thermometer } from 'lucide-react';

export default function ACCapacityCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [persons, setPersons] = useState('');
  const [maxTemp, setMaxTemp] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculateCapacity = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    const p = parseInt(persons);
    const t = parseInt(maxTemp);

    if (l && w && h && p && t) {
      // Enhanced BTU calculation formula considering summer temperature
      const roomVolume = l * w * h;
      const baseCapacity = roomVolume * 20;
      const personLoad = p * 400;
      const tempFactor = Math.max(0, t - 24) * 150; // Increased factor for summer temperatures
      const sunExposureFactor = baseCapacity * 0.1; // Additional 10% for sun exposure
      
      const totalBTU = baseCapacity + personLoad + tempFactor + sunExposureFactor;
      const tons = totalBTU / 12000; // Convert BTU to Tons
      
      setResult(tons);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Thermometer className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">AC Capacity Calculator</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Length (ft)
              </label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter length"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Width (ft)
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter width"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Height (ft)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter height"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Persons
              </label>
              <input
                type="number"
                value={persons}
                onChange={(e) => setPersons(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter number of persons"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Summer Temperature (°C)
              </label>
              <input
                type="number"
                value={maxTemp}
                onChange={(e) => setMaxTemp(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter maximum summer temperature"
              />
            </div>
          </div>

          <button
            onClick={calculateCapacity}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Calculate
          </button>

          {result && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Required AC Capacity:</h3>
              <p className="text-2xl font-bold text-gray-800">
                {result.toFixed(1)} Tons
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Recommended AC size: {Math.ceil(result)} Tons
              </p>
              <div className="mt-4 text-sm text-gray-600">
                <p>Note: This calculation includes factors for:</p>
                <ul className="list-disc list-inside mt-1">
                  <li>Room volume</li>
                  <li>Number of occupants</li>
                  <li>Summer temperature impact</li>
                  <li>Sun exposure</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}