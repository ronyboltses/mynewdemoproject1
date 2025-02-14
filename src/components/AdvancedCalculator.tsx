import React from 'react';
import { Info, Plus, Trash } from 'lucide-react';
import { useCalculatorStore } from '../store/calculatorStore';
import type { Room } from '../types';

export default function AdvancedCalculator() {
  const { advancedCalc, updateAdvancedCalc } = useCalculatorStore();

  const addRoom = () => {
    const newRoom: Room = { length: 0, width: 0, type: 'bedroom' };
    updateAdvancedCalc({
      rooms: [...advancedCalc.rooms, newRoom],
    });
  };

  const removeRoom = (index: number) => {
    updateAdvancedCalc({
      rooms: advancedCalc.rooms.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="bg-gradient-to-br from-white/50 to-blue-50/30 backdrop-blur-md p-6">
      <h2 className="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
        Advanced Construction Calculator
      </h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="flex items-center space-x-2">
              <span>Plot Length (ft)</span>
              <Info
                className="w-4 h-4 text-gray-400 cursor-help"
                data-tooltip-id="tooltip"
                data-tooltip-content="Enter the length of your plot in feet"
              />
            </label>
            <input
              type="number"
              value={advancedCalc.length === 0 ? '' : advancedCalc.length}
              onChange={(e) => updateAdvancedCalc({ length: Number(e.target.value) || 0 })}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="flex items-center space-x-2">
              <span>Plot Width (ft)</span>
              <Info
                className="w-4 h-4 text-gray-400 cursor-help"
                data-tooltip-id="tooltip"
                data-tooltip-content="Enter the width of your plot in feet"
              />
            </label>
            <input
              type="number"
              value={advancedCalc.width === 0 ? '' : advancedCalc.width}
              onChange={(e) => updateAdvancedCalc({ width: Number(e.target.value) || 0 })}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-group">
            <label className="flex items-center space-x-2">
              <span>Number of Floors</span>
              <Info
                className="w-4 h-4 text-gray-400 cursor-help"
                data-tooltip-id="tooltip"
                data-tooltip-content="Select the number of floors for your building"
              />
            </label>
            <select
              value={advancedCalc.floors}
              onChange={(e) => updateAdvancedCalc({ floors: parseInt(e.target.value) })}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} Floor{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="flex items-center space-x-2">
              <span>Number of Windows</span>
              <Info
                className="w-4 h-4 text-gray-400 cursor-help"
                data-tooltip-id="tooltip"
                data-tooltip-content="Enter the number of windows per floor"
              />
            </label>
            <input
              type="number"
              value={advancedCalc.windows === 0 ? '' : advancedCalc.windows}
              onChange={(e) => updateAdvancedCalc({ windows: Number(e.target.value) || 0 })}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="flex items-center space-x-2">
              <span>Number of Doors</span>
              <Info
                className="w-4 h-4 text-gray-400 cursor-help"
                data-tooltip-id="tooltip"
                data-tooltip-content="Enter the total number of doors needed"
              />
            </label>
            <input
              type="number"
              value={advancedCalc.doors === 0 ? '' : advancedCalc.doors}
              onChange={(e) => updateAdvancedCalc({ doors: Number(e.target.value) || 0 })}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-group">
            <label className="flex items-center space-x-2">
              <span>Number of Kitchens</span>
              <Info
                className="w-4 h-4 text-gray-400 cursor-help"
                data-tooltip-id="tooltip"
                data-tooltip-content="Enter the number of kitchens"
              />
            </label>
            <input
              type="number"
              value={advancedCalc.kitchens === 0 ? '' : advancedCalc.kitchens}
              onChange={(e) => updateAdvancedCalc({ kitchens: Number(e.target.value) || 0 })}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="flex items-center space-x-2">
              <span>Number of Lounges</span>
              <Info
                className="w-4 h-4 text-gray-400 cursor-help"
                data-tooltip-id="tooltip"
                data-tooltip-content="Enter the number of lounges"
              />
            </label>
            <input
              type="number"
              value={advancedCalc.lounges === 0 ? '' : advancedCalc.lounges}
              onChange={(e) => updateAdvancedCalc({ lounges: Number(e.target.value) || 0 })}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="flex items-center space-x-2">
              <span>Number of Water Tanks</span>
              <Info
                className="w-4 h-4 text-gray-400 cursor-help"
                data-tooltip-id="tooltip"
                data-tooltip-content="Enter the number of water tanks needed"
              />
            </label>
            <input
              type="number"
              value={advancedCalc.tanks === 0 ? '' : advancedCalc.tanks}
              onChange={(e) => updateAdvancedCalc({ tanks: Number(e.target.value) || 0 })}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Rooms</h3>
            <button
              onClick={addRoom}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              <span>Add Room</span>
            </button>
          </div>

          {advancedCalc.rooms.map((room, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
              <div className="form-group">
                <label>Room Type</label>
                <select
                  value={room.type}
                  onChange={(e) => {
                    const newRooms = [...advancedCalc.rooms];
                    newRooms[index] = { ...room, type: e.target.value };
                    updateAdvancedCalc({ rooms: newRooms });
                  }}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="bedroom">Bedroom</option>
                  <option value="bathroom">Bathroom</option>
                  <option value="study">Study Room</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Length (ft)</label>
                <input
                  type="number"
                  value={room.length === 0 ? '' : room.length}
                  onChange={(e) => {
                    const newRooms = [...advancedCalc.rooms];
                    newRooms[index] = {
                      ...room,
                      length: Number(e.target.value) || 0,
                    };
                    updateAdvancedCalc({ rooms: newRooms });
                  }}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>

              <div className="form-group relative">
                <label>Width (ft)</label>
                <input
                  type="number"
                  value={room.width === 0 ? '' : room.width}
                  onChange={(e) => {
                    const newRooms = [...advancedCalc.rooms];
                    newRooms[index] = {
                      ...room,
                      width: Number(e.target.value) || 0,
                    };
                    updateAdvancedCalc({ rooms: newRooms });
                  }}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
                <button
                  onClick={() => removeRoom(index)}
                  className="absolute top-0 right-0 p-2 text-red-500 hover:text-red-700"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-group">
            <label>Flooring Type</label>
            <select
              value={advancedCalc.flooringType}
              onChange={(e) =>
                updateAdvancedCalc({ flooringType: e.target.value })
              }
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="standard">Standard Tiles</option>
              <option value="premium">Premium Tiles</option>
              <option value="marble">Marble</option>
              <option value="wooden">Wooden Flooring</option>
            </select>
          </div>

          <div className="form-group">
            <label>Paint Type</label>
            <select
              value={advancedCalc.paintType}
              onChange={(e) =>
                updateAdvancedCalc({ paintType: e.target.value })
              }
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>

          <div className="form-group">
            <label>Plaster Type</label>
            <select
              value={advancedCalc.plasterType}
              onChange={(e) =>
                updateAdvancedCalc({ plasterType: e.target.value })
              }
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={advancedCalc.parking}
              onChange={(e) =>
                updateAdvancedCalc({ parking: e.target.checked })
              }
              className="w-4 h-4 text-blue-600"
            />
            <label className="flex items-center space-x-2">
              <span>Include Parking Space</span>
              <Info
                className="w-4 h-4 text-gray-400 cursor-help"
                data-tooltip-id="tooltip"
                data-tooltip-content="Check if you want to include a parking space"
              />
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={advancedCalc.isFullEscape}
              onChange={(e) =>
                updateAdvancedCalc({ isFullEscape: e.target.checked })
              }
              className="w-4 h-4 text-blue-600"
            />
            <label className="flex items-center space-x-2">
              <span>Full Escape House</span>
              <Info
                className="w-4 h-4 text-gray-400 cursor-help"
                data-tooltip-id="tooltip"
                data-tooltip-content="Check for full escape house design, uncheck for standard design"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}