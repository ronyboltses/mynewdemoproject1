import React from 'react';
import { useCalculatorStore } from '../store/calculatorStore';
import { useAdminStore } from '../store/adminStore';
import { 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  Wrench, 
  Hammer, 
  Lightbulb, 
  Droplets, 
  PaintBucket, 
  Brush, 
  AppWindow as Window, 
  DoorOpen, 
  ChefHat, 
  Container, 
  Car, 
  Warehouse, 
  Ruler, 
  HardHat, 
  DollarSign, 
  BarChart3, 
  PieChart, 
  LineChart 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  PieChart as RePieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface ResultItemProps {
  label: string;
  value: string;
  tooltip: string;
}

const ResultItem: React.FC<ResultItemProps> = ({ label, value, tooltip }) => (
  <div className="relative group">
    <p className="text-sm text-gray-600">{label}</p>
    <p className="gradient-text text-2xl font-bold">{value}</p>
    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900/90 backdrop-blur-sm text-white text-sm rounded-lg whitespace-normal max-w-xs z-10">
      {tooltip}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900/90 rotate-45"></div>
    </div>
  </div>
);

interface DetailedResults {
  totalArea: number;
  totalCost: number;
  materialCost: number;
  laborCost: number;
  timelineMonths: number;
  details: {
    foundation?: number;
    walls?: number;
    electrical?: number;
    plumbing?: number;
    flooring?: number;
    painting?: number;
    plastering?: number;
    windows?: number;
    doors?: number;
    kitchens?: number;
    waterTanks?: number;
    parking?: number;
    materials: {
      bricks: number;
      cement: number;
      steel: number;
      sand: number;
    };
  };
}

const COLORS = {
  foundation: '#3b82f6',
  walls: '#10b981',
  electrical: '#f59e0b',
  plumbing: '#06b6d4',
  flooring: '#8b5cf6',
  painting: '#ef4444',
  plastering: '#f97316',
  windows: '#0ea5e9',
  doors: '#6366f1',
  kitchens: '#f43f5e',
  waterTanks: '#14b8a6',
  parking: '#6b7280',
  materials: '#8b5cf6',
  labor: '#2563eb'
};

export default function CalculationResults() {
  const { mode, basicCalc, advancedCalc } = useCalculatorStore();
  const { settings } = useAdminStore();
  const [calculationResults, setCalculationResults] = React.useState<DetailedResults | null>(null);
  const [showDetails, setShowDetails] = React.useState(false);

  const calculateResults = () => {
    try {
      let results: DetailedResults;
      
      if (mode === 'basic') {
        // Ensure all values have defaults
        const plotSize = basicCalc.plotSize || 0;
        const floors = basicCalc.floors || 1;
        const area = plotSize * 9; // Convert to square feet
        const builtUpArea = area * (area <= 3600 ? 
          (settings.assumptions?.builtUpAreaFactor || 0.75) : 
          (settings.assumptions?.largePlotFactor || 0.5));
        const totalArea = builtUpArea * floors;
        
        // Calculate material quantities with defaults
        const bricksNeeded = totalArea * (settings.assumptions?.bricksPerSqFt || 8);
        const cementNeeded = totalArea * (settings.assumptions?.cementBagsPerSqFt || 0.4);
        const steelNeeded = totalArea * (settings.assumptions?.steelPerSqFt || 0.007);
        const sandNeeded = cementNeeded * (settings.assumptions?.sandPerBag || 4.5);
        
        // Calculate costs with defaults
        const baseCost = totalArea * (settings.pricePerSqFt || 2500);
        const materialCost = baseCost * (settings.assumptions?.materialCostFactor || 0.7);
        const laborCost = baseCost * (settings.assumptions?.laborCostFactor || 0.3);
        
        const foundationCost = (settings.assumptions?.foundationCostPerSqFt || 500) * totalArea;
        const electricalCost = (settings.electricalCostPerSqFt || 300) * totalArea;
        const plumbingCost = (settings.plumbingCostPerSqFt || 200) * totalArea;
        
        const totalCost = baseCost + (basicCalc.basement ? foundationCost : 0) + 
                         (basicCalc.garage ? (settings.assumptions?.parkingCost || 150000) : 0);
        
        results = {
          totalArea: Number(totalArea.toFixed(2)),
          totalCost: Number(totalCost.toFixed(2)),
          materialCost: Number(materialCost.toFixed(2)),
          laborCost: Number(laborCost.toFixed(2)),
          timelineMonths: basicCalc.timeline || 12,
          details: {
            foundation: foundationCost,
            electrical: electricalCost,
            plumbing: plumbingCost,
            materials: {
              bricks: bricksNeeded,
              cement: cementNeeded,
              steel: steelNeeded,
              sand: sandNeeded
            }
          }
        };
      } else {
        const length = advancedCalc.length || 0;
        const width = advancedCalc.width || 0;
        const floors = advancedCalc.floors || 1;
        const totalArea = length * width * floors;
        
        // Calculate material quantities
        const bricksNeeded = totalArea * (settings.assumptions?.bricksPerSqFt || 8);
        const cementNeeded = totalArea * (settings.assumptions?.cementBagsPerSqFt || 0.4);
        const steelNeeded = totalArea * (settings.assumptions?.steelPerSqFt || 0.007);
        const sandNeeded = cementNeeded * (settings.assumptions?.sandPerBag || 4.5);
        
        // Calculate component costs
        const foundationCost = (settings.assumptions?.foundationCostPerSqFt || 500) * totalArea;
        const wallsCost = bricksNeeded * (settings.brickPrice || 30);
        const electricalCost = (settings.electricalCostPerSqFt || 300) * totalArea;
        const plumbingCost = (settings.plumbingCostPerSqFt || 200) * totalArea;
        const flooringCost = (settings.assumptions?.flooringCostPerSqFt || 150) * totalArea;
        const paintingCost = (settings.assumptions?.paintingCostPerSqFt || 15) * totalArea * 2.5;
        const plasteringCost = (settings.assumptions?.plasteringCostPerSqFt || 30) * totalArea * 2.5;
        
        const windowsCost = (advancedCalc.windows || 0) * (settings.assumptions?.windowCost || 10000);
        const doorsCost = (advancedCalc.doors || 0) * (settings.assumptions?.doorCost || 8000);
        const kitchensCost = (advancedCalc.kitchens || 0) * (settings.assumptions?.kitchenBaseCost || 50000);
        const waterTanksCost = (advancedCalc.tanks || 0) * (settings.assumptions?.waterTankCost || 40000);
        const parkingCost = advancedCalc.parking ? (settings.assumptions?.parkingCost || 150000) : 0;
        
        const baseCost = totalArea * (settings.pricePerSqFt || 2500);
        const totalCost = baseCost + windowsCost + doorsCost + kitchensCost + 
                         waterTanksCost + parkingCost;
        
        const materialCost = totalCost * (settings.assumptions?.materialCostFactor || 0.7);
        const laborCost = totalCost * (settings.assumptions?.laborCostFactor || 0.3);
        
        results = {
          totalArea: Number(totalArea.toFixed(2)),
          totalCost: Number(totalCost.toFixed(2)),
          materialCost: Number(materialCost.toFixed(2)),
          laborCost: Number(laborCost.toFixed(2)),
          timelineMonths: Math.max(1, Math.ceil(totalArea / (settings.assumptions?.laborProductivityPerDay || 100) / 30)),
          details: {
            foundation: foundationCost,
            walls: wallsCost,
            electrical: electricalCost,
            plumbing: plumbingCost,
            flooring: flooringCost,
            painting: paintingCost,
            plastering: plasteringCost,
            windows: windowsCost,
            doors: doorsCost,
            kitchens: kitchensCost,
            waterTanks: waterTanksCost,
            parking: parkingCost,
            materials: {
              bricks: bricksNeeded,
              cement: cementNeeded,
              steel: steelNeeded,
              sand: sandNeeded
            }
          }
        };
      }
      
      setCalculationResults(results);
    } catch (error) {
      console.error('Calculation error:', error);
      setCalculationResults(null);
    }
  };

  const prepareChartData = () => {
    if (!calculationResults) return [];

    const details = calculationResults.details;
    return [
      { name: 'Foundation', value: details.foundation || 0, color: COLORS.foundation },
      { name: 'Walls', value: details.walls || 0, color: COLORS.walls },
      { name: 'Electrical', value: details.electrical || 0, color: COLORS.electrical },
      { name: 'Plumbing', value: details.plumbing || 0, color: COLORS.plumbing },
      { name: 'Flooring', value: details.flooring || 0, color: COLORS.flooring },
      { name: 'Painting', value: details.painting || 0, color: COLORS.painting },
      { name: 'Plastering', value: details.plastering || 0, color: COLORS.plastering },
      { name: 'Windows', value: details.windows || 0, color: COLORS.windows },
      { name: 'Doors', value: details.doors || 0, color: COLORS.doors },
      { name: 'Kitchens', value: details.kitchens || 0, color: COLORS.kitchens },
      { name: 'Water Tanks', value: details.waterTanks || 0, color: COLORS.waterTanks },
      { name: 'Parking', value: details.parking || 0, color: COLORS.parking }
    ].filter(item => item.value > 0);
  };

  const preparePieData = () => {
    if (!calculationResults) return [];
    return [
      { name: 'Material Cost', value: calculationResults.materialCost, color: COLORS.materials },
      { name: 'Labor Cost', value: calculationResults.laborCost, color: COLORS.labor }
    ];
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="gradient-text text-xl font-bold">Calculation Results</h2>
        <button
          onClick={calculateResults}
          className="glass-button px-6 py-2 rounded-lg"
        >
          Calculate
        </button>
      </div>

      {calculationResults ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ResultItem
              label="Total Area"
              value={`${calculationResults.totalArea.toLocaleString()} sq. ft`}
              tooltip="The total covered area of your construction"
            />
            <ResultItem
              label="Total Cost"
              value={`PKR ${calculationResults.totalCost.toLocaleString()}`}
              tooltip="Estimated total cost including all features"
            />
            <ResultItem
              label="Timeline"
              value={`${calculationResults.timelineMonths} months`}
              tooltip="Estimated construction duration"
            />
          </div>

          <div className="glass-card p-6 rounded-lg">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between text-lg font-semibold text-gray-700 mb-4"
            >
              <span>Detailed Breakdown</span>
              {showDetails ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            {showDetails && (
              <div className="space-y-6">
                {/* Cost Distribution Chart */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 gradient-text flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Cost Distribution
                  </h3>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={prepareChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip formatter={(value) => `PKR ${Number(value).toLocaleString()}`} />
                        <Legend />
                        <Bar dataKey="value" name="Cost">
                          {prepareChartData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Material vs Labor Cost Pie Chart */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 gradient-text flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-blue-600" />
                    Cost Distribution (Material vs Labor)
                  </h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie
                          data={preparePieData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {preparePieData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `PKR ${Number(value).toLocaleString()}`} />
                        <Legend />
                      </RePieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Cost Components */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 gradient-text flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    Cost Components
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {calculationResults.details.foundation && (
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Hammer className="w-4 h-4 text-blue-600" />
                          <span>Foundation Work</span>
                        </div>
                        <span className="font-semibold">
                          PKR {calculationResults.details.foundation.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {calculationResults.details.walls && (
                      <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-emerald-600" />
                          <span>Walls Construction</span>
                        </div>
                        <span className="font-semibold">
                          PKR {calculationResults.details.walls.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {calculationResults.details.electrical && (
                      <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-amber-600" />
                          <span>Electrical Work</span>
                        </div>
                        <span className="font-semibold">
                          PKR {calculationResults.details.electrical.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {calculationResults.details.plumbing && (
                      <div className="flex justify-between items-center p-3 bg-cyan-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Droplets className="w-4 h-4 text-cyan-600" />
                          <span>Plumbing Work</span>
                        </div>
                        <span className="font-semibold">
                          PKR {calculationResults.details.plumbing.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {calculationResults.details.flooring && (
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Ruler className="w-4 h-4 text-purple-600" />
                          <span>Flooring</span>
                        </div>
                        <span className="font-semibold">
                          PKR {calculationResults.details.flooring.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {calculationResults.details.painting && (
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <PaintBucket className="w-4 h-4 text-red-600" />
                          <span>Painting</span>
                        </div>
                        <span className="font-semibold">
                          PKR {calculationResults.details.painting.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {calculationResults.details.plastering && (
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Brush className="w-4 h-4 text-orange-600" />
                          <span>Plastering</span>
                        </div>
                        <span className="font-semibold">
                          PKR {calculationResults.details.plastering.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {calculationResults.details.windows && (
                      <div className="flex justify-between items-center p-3 bg-sky-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Window className="w-4 h-4 text-sky-600" />
                          <span>Windows</span>
                        </div>
                        <span className="font-semibold">
                          PKR {calculationResults.details.windows.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {calculationResults.details.doors && (
                      <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <DoorOpen className="w-4 h-4 text-indigo-600" />
                          <span>Doors</span>
                        </div>
                        <span className="font-semibold">
                          PKR {calculationResults.details.doors.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {calculationResults.details.kitchens && (
                      <div className="flex justify-between items-center p-3 bg-rose-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <ChefHat className="w-4 h-4 text-rose-600" />
                          <span>Kitchens</span>
                        </div>
                        <span className="font-semibold">
                          PKR {calculationResults.details.kitchens.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {calculationResults.details.waterTanks && (
                      <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Container className="w-4 h-4 text-teal-600" />
                          <span>Water Tanks</span>
                        </div>
                        <span className="font-semibold">
                          PKR {calculationResults.details.waterTanks.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {calculationResults.details.parking && (
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-gray-600" />
                          <span>Parking Area</span>
                        </div>
                        <span className="font-semibold">
                          PKR {calculationResults.details.parking.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Material Requirements */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 gradient-text flex items-center gap-2">
                    <Warehouse className="w-5 h-5 text-blue-600" />
                    Material Requirements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-600" />
                        <span>Bricks Required</span>
                      </div>
                      <span className="font-semibold">
                        {Math.ceil(calculationResults.details.materials.bricks).toLocaleString()} pieces
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Container className="w-4 h-4 text-gray-600" />
                        <span>Cement Required</span>
                      </div>
                      <span className="font-semibold">
                        {Math.ceil(calculationResults.details.materials.cement).toLocaleString()} bags
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <HardHat className="w-4 h-4 text-gray-600" />
                        <span>Steel Required</span>
                      </div>
                      <span className="font-semibold">
                        {calculationResults.details.materials.steel.toFixed(2)} tons
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Container className="w-4 h-4 text-gray-600" />
                        <span>Sand Required</span>
                      </div>
                      <span className="font-semibold">
                        {Math.ceil(calculationResults.details.materials.sand).toLocaleString()} cft
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cost Summary */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 gradient-text flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    Cost Summary
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-green-600" />
                        <span>Material Cost</span>
                      </div>
                      <span className="font-semibold">
                        PKR {calculationResults.materialCost.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <PieChart className="w-4 h-4 text-blue-600" />
                        <span>Labor Cost</span>
                      </div>
                      <span className="font-semibold">
                        PKR {calculationResults.laborCost.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          Click calculate to see the estimated costs
        </div>
      )}
    </div>
  );
}