import React from 'react';
import { useAdminStore } from '../store/adminStore';
import { FileText, Download, Clock, Tag } from 'lucide-react';

export default function ResourcesPage() {
  const { settings } = useAdminStore();

  const categories = Array.from(
    new Set(settings.resources.map((r) => r.category))
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Technical Resources</h1>
        <p className="text-xl text-gray-600">
          Access our collection of construction guides, checklists, and reference materials
        </p>
      </div>

      {categories.map((category) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Tag className="w-6 h-6 mr-2 text-blue-600" />
            {category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {settings.resources
              .filter((resource) => resource.category === category)
              .map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {resource.description}
                        </p>
                      </div>
                      <div className="ml-4">
                        <FileText className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatDate(resource.dateAdded)}
                    </div>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      {settings.resources.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Resources Available
          </h3>
          <p className="text-gray-500">
            Resources will appear here once added by an administrator.
          </p>
        </div>
      )}
    </div>
  );
}