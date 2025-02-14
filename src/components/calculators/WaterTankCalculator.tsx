import React, { useState } from 'react';
import { Container } from 'lucide-react';

type TankShape = 'rectangular' | 'cylindrical';

export default function WaterTankCalculator() {
  const [shape, setShape] = useState<TankShape>('rectangular');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [diameter, setDiameter] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculateVolume = () => {
    if (shape === 'rectangular') {
      const l = parseFloat(length);
      const w = parseFloat(width);
      const h = parseFloat(height);
      if (l && w && h) {
        setResult(l * w * h * 28.317); // Convert cubic feet to liters
      }
    } else {
      const d = parseFloat(diameter);
      const h = parseFloat(height);
      if (d && h) {
        const radius = d / 2;
        setResult(Math.PI * radius * radius * h * 28.317); // Convert cubic feet to liters
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Container className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Water Tank Calculator</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tank Shape
            </label>
            <select
              value={shape}
              onChange={(e) => setShape(e.target.value as TankShape)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="rectangular">Rectangular</option>
              <option value="cylindrical">Cylindrical</option>
            </select>
          </div>

          {shape === 'rectangular' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Length (ft)
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
                  Width (ft)
                </label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter width"
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diameter (ft)
              </label>
              <input
                type="number"
                value={diameter}
                onChange={(e) => setDiameter(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter diameter"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Height (ft)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter height"
            />
          </div>

          <button
            onClick={calculateVolume}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Calculate
          </button>

          {result && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Results:</h3>
              <div>
                <p className="text-sm text-gray-600">Tank Capacity:</p>
                <p className="text-lg font-semibold text-gray-800">
                  {Math.ceil(result).toLocaleString()} Liters
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}