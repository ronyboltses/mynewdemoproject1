import React from 'react';
import { useAdminStore } from '../store/adminStore';
import { Info, DollarSign, Building, Ruler } from 'lucide-react';

export default function FactorsPage() {
  const { settings } = useAdminStore();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Construction Cost Factors</h1>
        <p className="text-xl text-gray-600">
          Understanding the elements that influence construction costs
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Building className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Built-Up Area Guidelines</h2>
        </div>
        
        <div className="prose prose-blue max-w-none">
          <p>
            The built-up area is calculated based on local municipal regulations and planning
            guidelines:
          </p>
          <ul>
            <li>For plots between 120-400 square yards: 75% of plot area</li>
            <li>For plots above 400 square yards: 50% of plot area</li>
          </ul>
          <p className="text-sm text-gray-600 italic">
            These guidelines ensure proper space utilization while maintaining necessary
            setbacks and open areas.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <DollarSign className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-bold text-gray-800">Base Construction Costs</h2>
          </div>
          
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <span className="text-gray-600">Base Construction</span>
              <span className="font-semibold">PKR {settings.pricePerSqFt}/sq ft</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-600">Foundation Work</span>
              <span className="font-semibold">
                PKR {settings.assumptions.foundationCostPerSqFt}/sq ft
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-600">Electrical Work</span>
              <span className="font-semibold">
                PKR {settings.electricalCostPerSqFt}/sq ft
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-600">Plumbing Work</span>
              <span className="font-semibold">
                PKR {settings.plumbingCostPerSqFt}/sq ft
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Ruler className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">Material Requirements</h2>
          </div>
          
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <span className="text-gray-600">Bricks per Sq. Ft</span>
              <span className="font-semibold">{settings.assumptions.bricksPerSqFt}</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-600">Cement Bags per Sq. Ft</span>
              <span className="font-semibold">
                {settings.assumptions.cementBagsPerSqFt}
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-600">Steel per Sq. Ft</span>
              <span className="font-semibold">
                {settings.assumptions.steelPerSqFt} tons
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-8 shadow-lg">
        <div className="flex items-center space-x-3 mb-6">
          <Info className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Data Sources</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Primary Sources</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Pakistan Engineering Council (PEC) Guidelines</li>
              <li>• Local Municipal Building Codes</li>
              <li>• Construction Industry Surveys</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Market Research</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Vendor & Contractor Quotations</li>
              <li>• Material Supplier Catalogs</li>
              <li>• Regional Cost Analysis Reports</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}