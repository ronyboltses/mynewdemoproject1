import React, { useState } from 'react';
import { useAdminStore } from '../store/adminStore';
import { Building, Image, Calculator, Settings, FileText, Plus, Trash2 } from 'lucide-react';

export default function AdminPanel() {
  const { settings, updateSettings, addResource, removeResource } = useAdminStore();
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    category: '',
    url: '',
    type: 'pdf' as const,
  });

  // Ensure we have default values for nested objects
  const locationFactors = settings.assumptions?.locationFactors || {
    urban: 1.2,
    suburban: 1.0,
    rural: 0.8
  };

  const qualityFactors = settings.assumptions?.qualityFactors || {
    standard: 1.0,
    premium: 1.3,
    luxury: 1.6
  };

  // Helper function to ensure numeric values
  const handleNumericInput = (value: string, field: string, parent?: string) => {
    const numValue = value === '' ? 0 : Number(value);
    if (parent === 'assumptions') {
      updateSettings({
        assumptions: {
          ...settings.assumptions,
          [field]: numValue
        }
      });
    } else {
      updateSettings({ [field]: numValue });
    }
  };

  // Helper function to update location factors
  const updateLocationFactor = (type: 'urban' | 'suburban' | 'rural', value: number) => {
    updateSettings({
      assumptions: {
        ...settings.assumptions,
        locationFactors: {
          ...locationFactors,
          [type]: value
        }
      }
    });
  };

  // Helper function to update quality factors
  const updateQualityFactor = (type: 'standard' | 'premium' | 'luxury', value: number) => {
    updateSettings({
      assumptions: {
        ...settings.assumptions,
        qualityFactors: {
          ...qualityFactors,
          [type]: value
        }
      }
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateSettings({ logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      {/* Branding Settings */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center space-x-3 mb-6">
          <Settings className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Branding Settings</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Name
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => updateSettings({ siteName: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand Color
            </label>
            <input
              type="color"
              value={settings.brandColor}
              onChange={(e) => updateSettings({ brandColor: e.target.value })}
              className="w-full h-10 px-2 py-1 border rounded-lg"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo Upload
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Header
            </label>
            <input
              type="text"
              value={settings.reportHeader}
              onChange={(e) => updateSettings({ reportHeader: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Base Price Settings */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center space-x-3 mb-6">
          <Calculator className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Base Price Settings</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Base Price per Sq. Ft (PKR)
            </label>
            <input
              type="number"
              value={settings.pricePerSqFt || 0}
              onChange={(e) => handleNumericInput(e.target.value, 'pricePerSqFt')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Labor Cost per Day (PKR)
            </label>
            <input
              type="number"
              value={settings.laborCostPerDay || 0}
              onChange={(e) => handleNumericInput(e.target.value, 'laborCostPerDay')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foundation Cost per Sq. Ft (PKR)
            </label>
            <input
              type="number"
              value={settings.assumptions.foundationCostPerSqFt || 0}
              onChange={(e) => handleNumericInput(e.target.value, 'foundationCostPerSqFt', 'assumptions')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Material Prices */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center space-x-3 mb-6">
          <Building className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Material Prices</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brick Price (PKR)
            </label>
            <input
              type="number"
              value={settings.brickPrice || 0}
              onChange={(e) => handleNumericInput(e.target.value, 'brickPrice')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cement Price per Bag (PKR)
            </label>
            <input
              type="number"
              value={settings.cementPrice || 0}
              onChange={(e) => handleNumericInput(e.target.value, 'cementPrice')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Steel Price per Ton (PKR)
            </label>
            <input
              type="number"
              value={settings.steelPrice || 0}
              onChange={(e) => handleNumericInput(e.target.value, 'steelPrice')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sand Price per CFT (PKR)
            </label>
            <input
              type="number"
              value={settings.sandPrice || 0}
              onChange={(e) => handleNumericInput(e.target.value, 'sandPrice')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Utility Costs */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center space-x-3 mb-6">
          <Settings className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Utility Costs</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plumbing Cost per Sq. Ft (PKR)
            </label>
            <input
              type="number"
              value={settings.plumbingCostPerSqFt || 0}
              onChange={(e) => handleNumericInput(e.target.value, 'plumbingCostPerSqFt')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Electrical Cost per Sq. Ft (PKR)
            </label>
            <input
              type="number"
              value={settings.electricalCostPerSqFt || 0}
              onChange={(e) => handleNumericInput(e.target.value, 'electricalCostPerSqFt')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mortar Ratio
            </label>
            <input
              type="text"
              value={settings.mortarRatio}
              onChange={(e) => updateSettings({ mortarRatio: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 1:4"
            />
          </div>
        </div>
      </div>

      {/* Finishing Costs */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center space-x-3 mb-6">
          <Settings className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Finishing Costs</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Flooring Cost per Sq. Ft (PKR)
            </label>
            <input
              type="number"
              value={settings.assumptions.flooringCostPerSqFt || 0}
              onChange={(e) => handleNumericInput(e.target.value, 'flooringCostPerSqFt', 'assumptions')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Painting Cost per Sq. Ft (PKR)
            </label>
            <input
              type="number"
              value={settings.assumptions.paintingCostPerSqFt || 0}
              onChange={(e) => handleNumericInput(e.target.value, 'paintingCostPerSqFt', 'assumptions')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plastering Cost per Sq. Ft (PKR)
            </label>
            <input
              type="number"
              value={settings.assumptions.plasteringCostPerSqFt || 0}
              onChange={(e) => handleNumericInput(e.target.value, 'plasteringCostPerSqFt', 'assumptions')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Component Costs */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center space-x-3 mb-6">
          <Settings className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Component Costs</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Window Cost (PKR)
            </label>
            <input
              type="number"
              value={settings.assumptions.windowCost || 0}
              onChange={(e) => handleNumericInput(e.target.value, 'windowCost', 'assumptions')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Door Cost (PKR)
            </label>
            <input
              type="number"
              value={settings.assumptions.doorCost || 0}
              onChange={(e) => handleNumericInput(e.target.value, 'doorCost', 'assumptions')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kitchen Base Cost (PKR)
            </label>
            <input
              type="number"
              value={settings.assumptions.kitchenBaseCost || 0}
              onChange={(e) => handleNumericInput(e.target.value, 'kitchenBaseCost', 'assumptions')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Water Tank Cost (PKR)
            </label>
            <input
              type="number"
              value={settings.assumptions.waterTankCost || 0}
              onChange={(e) => handleNumericInput(e.target.value, 'waterTankCost', 'assumptions')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Parking Cost (PKR)
            </label>
            <input
              type="number"
              value={settings.assumptions.parkingCost || 0}
              onChange={(e) => handleNumericInput(e.target.value, 'parkingCost', 'assumptions')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Calculation Factors */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center space-x-3 mb-6">
          <Calculator className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Calculation Factors</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Material Cost Factor (0-1)
            </label>
            <input
              type="number"
              value={settings.assumptions.materialCostFactor || 0}
              onChange={(e) => handleNumericInput(e.target.value, 'materialCostFactor', 'assumptions')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
              max="1"
              step="0.1"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Labor Cost Factor (0-1)
            </label>
            <input
              type="number"
              value={settings.assumptions.laborCostFactor || 0}
              onChange={(e) => handleNumericInput(e.target.value, 'laborCostFactor', 'assumptions')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
              max="1"
              step="0.1"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Escape Premium (0-1)
            </label>
            <input
              type="number"
              value={settings.assumptions.fullEscapePremium || 0}
              onChange={(e) => handleNumericInput(e.target.value, 'fullEscapePremium', 'assumptions')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
              max="1"
              step="0.1"
            />
          </div>
        </div>
      </div>

      {/* Location & Quality Factors */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center space-x-3 mb-6">
          <Settings className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Location & Quality Factors</h2>
        </div>
        
        <div className="space-y-6">
          {/* Location Factors */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Location Factors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urban Area Factor
                </label>
                <input
                  type="number"
                  value={locationFactors.urban}
                  onChange={(e) => updateLocationFactor('urban', Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.1"
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Suburban Area Factor
                </label>
                <input
                  type="number"
                  value={locationFactors.suburban}
                  onChange={(e) => updateLocationFactor('suburban', Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.1"
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rural Area Factor
                </label>
                <input
                  type="number"
                  value={locationFactors.rural}
                  onChange={(e) => updateLocationFactor('rural', Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.1"
                />
              </div>
            </div>
          </div>

          {/* Quality Factors */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quality Factors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Standard Quality Factor
                </label>
                <input
                  type="number"
                  value={qualityFactors.standard}
                  onChange={(e) => updateQualityFactor('standard', Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.1"
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Premium Quality Factor
                </label>
                <input
                  type="number"
                  value={qualityFactors.premium}
                  onChange={(e) => updateQualityFactor('premium', Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.1"
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Luxury Quality Factor
                </label>
                <input
                  type="number"
                  value={qualityFactors.luxury}
                  onChange={(e) => updateQualityFactor('luxury', Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Features Costs */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center space-x-3 mb-6">
          <Settings className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Additional Features</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Basement Cost (PKR)
            </label>
            <input
              type="number"
              value={settings.assumptions.basementCost || 0}
              onChange={(e) => handleNumericInput(e.target.value, 'basementCost', 'assumptions')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Garage Cost (PKR)
            </label>
            <input
              type="number"
              value={settings.assumptions.garageCost || 0}
              onChange={(e) => handleNumericInput(e.target.value, 'garageCost', 'assumptions')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Timeline Settings */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center space-x-3 mb-6">
          <Settings className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Timeline Settings</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timeline Base Cost (PKR)
            </label>
            <input
              type="number"
              value={settings.assumptions.timelineBaseCost || 0}
              onChange={(e) => handleNumericInput(e.target.value, 'timelineBaseCost', 'assumptions')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timeline Factor per Month
            </label>
            <input
              type="number"
              value={settings.assumptions.timelineFactorPerMonth || 0}
              onChange={(e) => handleNumericInput(e.target.value, 'timelineFactorPerMonth', 'assumptions')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </div>

      {/* Resources Management */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Resources Management</h2>
        </div>

        <div className="space-y-6">
          {/* Add New Resource */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Add New Resource</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newResource.title}
                  onChange={(e) =>
                    setNewResource({ ...newResource, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter resource title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={newResource.category}
                  onChange={(e) =>
                    setNewResource({ ...newResource, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Checklists, Formulas, Guidelines"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={newResource.description}
                  onChange={(e) =>
                    setNewResource({ ...newResource, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter resource description"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PDF URL
                </label>
                <input
                  type="url"
                  value={newResource.url}
                  onChange={(e) =>
                    setNewResource({ ...newResource, url: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
/>                  