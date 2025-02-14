import React from 'react';
import { Calculator, PaintBucket, Container, LayoutGrid, Thermometer, Ruler, Scale, Wrench, Shovel } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CalculatorTool {
  name: string;
  icon: React.ElementType;
  description: string;
  path: string;
}

const tools: CalculatorTool[] = [
  {
    name: "Construction Cost",
    icon: Calculator,
    description: "Calculate total construction costs",
    path: "/"
  },
  {
    name: "Paint Calculator",
    icon: PaintBucket,
    description: "Calculate paint quantities and coverage",
    path: "/tools/paint"
  },
  {
    name: "Water Tank",
    icon: Container,
    description: "Calculate water tank capacity",
    path: "/tools/water-tank"
  },
  {
    name: "Flooring",
    icon: LayoutGrid,
    description: "Calculate flooring materials and tiles",
    path: "/tools/flooring"
  },
  {
    name: "AC Capacity",
    icon: Thermometer,
    description: "Calculate required AC capacity",
    path: "/tools/ac-capacity"
  },
  {
    name: "Area Calculator",
    icon: Ruler,
    description: "Calculate area of different shapes",
    path: "/tools/area"
  },
  {
    name: "Material Weight",
    icon: Scale,
    description: "Calculate construction material weights",
    path: "/tools/weight"
  },
  {
    name: "Plumbing",
    icon: Wrench,
    description: "Calculate plumbing requirements",
    path: "/tools/plumbing"
  },
  {
    name: "Earth Work",
    icon: Shovel,
    description: "Calculate excavation volumes",
    path: "/tools/earth-work"
  }
];

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Construction Calculators</h1>
        <p className="text-xl text-gray-600">
          Specialized tools for precise construction calculations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.name}
              to={tool.path}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 group-hover:from-blue-600/10 group-hover:to-indigo-600/10 transition-all duration-300" />
              <div className="relative p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}