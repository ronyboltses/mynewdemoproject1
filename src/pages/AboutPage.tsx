import React from 'react';
import { Building2, Calculator, Users, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Why Choose Our Calculator?</h1>
        <p className="text-xl text-gray-600">
          Empowering accurate construction cost estimation through data-driven calculations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-lg hover-card">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold">Industry Standards</h2>
          </div>
          <p className="text-gray-600">
            Our calculations are based on current Pakistan Engineering Council (PEC) guidelines
            and real market rates, ensuring accuracy and reliability.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg hover-card">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Calculator className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold">Comprehensive Analysis</h2>
          </div>
          <p className="text-gray-600">
            From basic estimates to detailed breakdowns, we provide thorough cost analysis
            for your construction projects.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg hover-card">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold">Expert Consultation</h2>
          </div>
          <p className="text-gray-600">
            Developed in consultation with construction experts and contractors to ensure
            practical and reliable estimates.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg hover-card">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Sparkles className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-xl font-semibold">Regular Updates</h2>
          </div>
          <p className="text-gray-600">
            We continuously update our rates and factors to reflect current market conditions
            and construction costs.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Our Commitment to Accuracy</h2>
        <p className="text-gray-700 leading-relaxed">
          We understand that accurate cost estimation is crucial for construction projects.
          Our calculator combines industry expertise with real-time market data to provide
          you with reliable estimates. Whether you're planning a small renovation or a large
          construction project, our tool helps you make informed decisions with confidence.
        </p>
      </div>
    </div>
  );
}