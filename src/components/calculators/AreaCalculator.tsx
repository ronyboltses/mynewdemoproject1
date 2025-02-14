import React, { useState } from 'react';
import { Ruler } from 'lucide-react';

type Shape = 'rectangle' | 'triangle' | 'circle' | 'trapezoid';

export default function AreaCalculator() {
  const [shape, setShape] = useState<Shape>('rectangle');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [radius, setRadius] = useState('');
  const [height, setHeight] = useState('');
  const [base1, setBase1] = useState('');
  const [base2, setBase2] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculateArea = () => {
    switch (shape) {
      case 'rectangle':
        const l = parseFloat(length);
        const w = parseFloat(width);
        if (l && w) setResult(l * w);
        break;
      case 'triangle':
        const b = parseFloat(base1);
        const h = parseFloat(height);
        if (b && h) setResult((b * h) / 2);
        break;
      case 'circle':
        const r = parseFloat(radius);
        if (r) setResult(Math.PI * r * r);
        break;
      case 'trapezoid':
        const b1 = parseFloat(base1);
        const b2 = parseFloat(base2);
        const th = parseFloat(height);
        if (b1 && b2 && th) setResult(((b1 + b2) * th) / 2);
        break;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Ruler className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Area Calculator</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shape
            </label>
            <select
              value={shape}
              onChange={(e) => setShape(e.target.value as Shape)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="rectangle">Rectangle</option>
              <option value="triangle">Triangle</option>
              <option value="circle">Circle</option>
              <option value="trapezoid">Trapezoid</option>
            </select>
          </div>

          {shape === 'rectangle' && (
            <div className="grid grid-cols-2 gap-4">
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
            </div>
          )}

          {shape === 'triangle' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Base (ft)
                </label>
                <input
                  type="number"
                  value={base1}
                  onChange={(e) => setBase1(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter base"
                />
              </div>
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
            </div>
          )}

          {shape === 'circle' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Radius (ft)
              </label>
              <input
                type="number"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter radius"
              />
            </div>
          )}

          {shape === 'trapezoid' && (
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Base 1 (ft)
                  </label>
                  <input
                    type="number"
                    value={base1}
                    onChange={(e) => setBase1(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter first base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Base 2 (ft)
                  </label>
                  <input
                    type="number"
                    value={base2}
                    onChange={(e) => setBase2(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter second base"
                  />
                </div>
              </div>
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
            </div>
          )}

          <button
            onClick={calculateArea}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Calculate Area
          </button>

          {result !== null && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Result:</h3>
              <p className="text-2xl font-bold text-gray-800">
                {result.toFixed(2)} sq. ft
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}