import React from 'react';
import { useCalculatorStore } from '../store/calculatorStore';
import BasicCalculator from './BasicCalculator';
import AdvancedCalculator from './AdvancedCalculator';
import CalculationResults from './CalculationResults';
import ThreeDModel from './ThreeDModel';

export default function Calculator() {
  const { mode, setMode } = useCalculatorStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white/50 to-indigo-50/50 py-8 backdrop-blur-sm">
      <div className="container mx-auto px-4 space-y-8">
        <div className="flex justify-center">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-2 inline-flex space-x-2">
            <button
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                mode === 'basic'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                  : 'bg-transparent text-gray-600 hover:bg-white/50'
              }`}
              onClick={() => setMode('basic')}
            >
              Basic Calculator
            </button>
            <button
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                mode === 'advanced'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                  : 'bg-transparent text-gray-600 hover:bg-white/50'
              }`}
              onClick={() => setMode('advanced')}
            >
              Advanced Calculator
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {mode === 'advanced' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-white/20">
                <AdvancedCalculator />
              </div>
              <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-white/20 p-6">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">3D House Preview</h3>
                <ThreeDModel />
              </div>
            </div>
          ) : (
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-white/20">
              <BasicCalculator />
            </div>
          )}
          
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-white/20">
            <CalculationResults />
          </div>
        </div>
      </div>
    </div>
  );
}