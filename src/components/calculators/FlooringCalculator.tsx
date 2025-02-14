import React, { useState } from 'react';
import { LayoutGrid } from 'lucide-react';

export default function FlooringCalculator() {
  const [roomLength, setRoomLength] = useState('');
  const [roomWidth, setRoomWidth] = useState('');
  const [doorWidth, setDoorWidth] = useState('');
  const [skirting, setSkirting] = useState('');
  const [tileLength, setTileLength] = useState('');
  const [tileWidth, setTileWidth] = useState('');
  const [result, setResult] = useState<{
    tiles: number;
    skirting: number;
    extraTiles: number;
  } | null>(null);

  const calculateFlooring = () => {
    const rl = parseFloat(roomLength);
    const rw = parseFloat(roomWidth);
    const dw = parseFloat(doorWidth) || 0;
    const sk = parseFloat(skirting) || 0;
    const tl = parseFloat(tileLength);
    const tw = parseFloat(tileWidth);

    if (rl && rw && tl && tw) {
      const roomArea = (rl * rw) - (dw * 0.5); // Subtracting door area
      const tileArea = (tl * tw) / 144; // Converting to sq ft
      const tilesNeeded = Math.ceil(roomArea / tileArea);
      const skirtingLength = 2 * (rl + rw) - dw;
      const skirtingTiles = sk ? Math.ceil(skirtingLength / (tl / 12)) : 0;
      
      setResult({
        tiles: tilesNeeded,
        skirting: skirtingTiles,
        extraTiles: Math.ceil(tilesNeeded * 0.1) // 10% extra for cuts and waste
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <LayoutGrid className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Flooring Calculator</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Length (ft)
              </label>
              <input
                type="number"
                value={roomLength}
                onChange={(e) => setRoomLength(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter room length"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Width (ft)
              </label>
              <input
                type="number"
                value={roomWidth}
                onChange={(e) => setRoomWidth(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter room width"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Door Width (ft)
              </label>
              <input
                type="number"
                value={doorWidth}
                onChange={(e) => setDoorWidth(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter door width"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skirting Height (inches)
              </label>
              <input
                type="number"
                value={skirting}
                onChange={(e) => setSkirting(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter skirting height"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tile Length (inches)
              </label>
              <input
                type="number"
                value={tileLength}
                onChange={(e) => setTileLength(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter tile length"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tile Width (inches)
              </label>
              <input
                type="number"
                value={tileWidth}
                onChange={(e) => setTileWidth(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter tile width"
              />
            </div>
          </div>

          <button
            onClick={calculateFlooring}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Calculate
          </button>

          {result && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Results:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Floor Tiles Needed:</p>
                  <p className="text-lg font-semibold text-gray-800">{result.tiles} pieces</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Skirting Tiles:</p>
                  <p className="text-lg font-semibold text-gray-800">{result.skirting} pieces</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Extra Tiles (10%):</p>
                  <p className="text-lg font-semibold text-gray-800">{result.extraTiles} pieces</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}