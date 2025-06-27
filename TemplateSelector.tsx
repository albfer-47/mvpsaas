import React, { useState } from 'react';

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  content: string;
}

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('blank');
  
  // Templates pré-definidos
  const templates: Template[] = [
    {
      id: 'blank',
      name: 'Blank Document',
      description: 'Start with a clean slate',
      thumbnail: '/templates/blank.png',
      content: '<h1>My Document</h1><p>Start typing here...</p>'
    },
    {
      id: 'ebook',
      name: 'E-book',
      description: 'Professional e-book layout with chapters',
      thumbnail: '/templates/ebook.png',
      content: '<h1>My E-book Title</h1><h2>Subtitle</h2><p>Chapter 1: Introduction</p><p>This e-book will guide you through...</p>'
    },
    {
      id: 'report',
      name: 'Market Report',
      description: 'Data-driven market analysis report',
      thumbnail: '/templates/report.png',
      content: '<h1>Market Analysis Report</h1><h2>Executive Summary</h2><p>This report analyzes the current trends in...</p>'
    },
    {
      id: 'checklist',
      name: 'Checklist',
      description: 'Interactive checklist for processes',
      thumbnail: '/templates/checklist.png',
      content: '<h1>My Checklist</h1><ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>'
    },
    {
      id: 'guide',
      name: 'How-to Guide',
      description: 'Step-by-step instructional guide',
      thumbnail: '/templates/guide.png',
      content: '<h1>Complete Guide</h1><h2>Introduction</h2><p>This guide will help you to...</p>'
    },
    {
      id: 'lead-magnet',
      name: 'Lead Magnet',
      description: 'Optimized for lead generation',
      thumbnail: '/templates/lead-magnet.png',
      content: '<h1>5 Essential Tips for Success</h1><p>Discover the secrets that experts use to...</p>'
    }
  ];

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const template = templates.find(t => t.id === templateId);
    if (template) {
      onSelectTemplate(template);
    }
  };

  return (
    <div className="template-selector">
      <h2 className="text-xl font-semibold mb-4">Choose a Template</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div 
            key={template.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedTemplateId === template.id 
                ? 'border-blue-600 bg-blue-50 shadow-md' 
                : 'hover:border-blue-300 hover:bg-gray-50'
            }`}
            onClick={() => handleSelectTemplate(template.id)}
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded mb-3 flex items-center justify-center">
              {/* Placeholder for template thumbnail */}
              <div className="text-4xl text-gray-400">
                {template.id === 'blank' && '📄'}
                {template.id === 'ebook' && '📚'}
                {template.id === 'report' && '📊'}
                {template.id === 'checklist' && '✅'}
                {template.id === 'guide' && '📝'}
                {template.id === 'lead-magnet' && '🧲'}
              </div>
            </div>
            <h3 className="font-medium text-lg">{template.name}</h3>
            <p className="text-sm text-gray-600">{template.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
