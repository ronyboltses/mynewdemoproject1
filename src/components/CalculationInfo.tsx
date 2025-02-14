import React from 'react';
import { Info } from 'lucide-react';

export default function CalculationInfo() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Info className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-800">Construction Cost Factors</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Built-Up Area</h3>
            <p className="text-sm text-gray-700">
              • 75% of plot area for 120-400 sq yards
              <br />
              • 50% for plots above 400 sq yards
            </p>
            <p className="text-xs text-gray-600 mt-2 italic">
              Based on local municipal regulations and planning guidelines
            </p>
          </div>

          <div className="bg-emerald-50 rounded-lg p-4">
            <h3 className="font-semibold text-emerald-900 mb-2">Base Construction Rates</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Base Construction: PKR 2,500/sq ft</li>
              <li>• Foundation Work: PKR 500/sq ft</li>
              <li>• Electrical Work: PKR 300/sq ft</li>
              <li>• Plumbing Work: PKR 200/sq ft</li>
            </ul>
            <p className="text-xs text-gray-600 mt-2 italic">
              Based on Pakistan Construction Cost Data and PEC guidelines
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-amber-50 rounded-lg p-4">
            <h3 className="font-semibold text-amber-900 mb-2">Finishing Costs</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Standard Flooring: PKR 150/sq ft</li>
              <li>• Standard Painting: PKR 15/sq ft (wall area)</li>
              <li>• Standard Plastering: PKR 30/sq ft (wall area)</li>
            </ul>
            <p className="text-xs text-gray-600 mt-2 italic">
              Based on market surveys and supplier catalogs
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-2">Additional Components</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Windows: PKR 10,000/window</li>
              <li>• Doors: PKR 8,000/door</li>
              <li>• Kitchen: PKR 50,000 base</li>
              <li>• Water Tank: PKR 40,000/tank</li>
              <li>• Parking Space: PKR 150,000 (300 sq ft)</li>
            </ul>
            <p className="text-xs text-gray-600 mt-2 italic">
              Based on vendor quotes and market averages
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mt-4">
        <h3 className="font-semibold text-gray-900 mb-2">Data Sources & Methodology</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Pakistan Engineering Council (PEC) Guidelines</li>
          <li>• Local Municipal Building Codes</li>
          <li>• Construction Industry Surveys</li>
          <li>• Market Rate Analysis</li>
          <li>• Vendor & Contractor Quotations</li>
        </ul>
      </div>
    </div>
  );
}