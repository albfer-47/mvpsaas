import React, { useState } from 'react';
import RichTextEditor from '../components/editor/RichTextEditor';
import DraggableEditor from '../components/editor/DraggableEditor';
import PdfPreview from '../components/preview/PdfPreview';
import TemplateSelector from '../components/templates/TemplateSelector';

interface ElementType {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'list' | 'table' | 'divider';
  content: string;
}

const PdfEditorPage: React.FC = () => {
  const [title, setTitle] = useState<string>('Untitled Document');
  const [content, setContent] = useState<string>('<p>Start editing your document...</p>');
  const [author, setAuthor] = useState<string>('Your Name');
  const [elements, setElements] = useState<ElementType[]>([
    { id: 'el-1', type: 'heading', content: 'My Document' },
    { id: 'el-2', type: 'paragraph', content: 'Start editing your content here...' }
  ]);
  const [editorMode, setEditorMode] = useState<'rich' | 'drag'>('rich');
  const [showTemplateSelector, setShowTemplateSelector] = useState<boolean>(true);

  const handleTemplateSelect = (template: any) => {
    setTitle(template.name);
    setContent(template.content);
    setShowTemplateSelector(false);
    
    // Convert template content to elements for drag editor
    const basicElements: ElementType[] = [
      { id: 'el-title', type: 'heading', content: template.name },
      { id: 'el-content', type: 'paragraph', content: template.content.replace(/<[^>]*>/g, '') }
    ];
    setElements(basicElements);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleElementsChange = (newElements: ElementType[]) => {
    setElements(newElements);
    
    // This is a simplified approach - in a real app you'd need more sophisticated HTML generation
    let generatedContent = '';
    newElements.forEach(element => {
      switch(element.type) {
        case 'heading':
          generatedContent += `<h2>${element.content}</h2>`;
          break;
        case 'paragraph':
          generatedContent += `<p>${element.content}</p>`;
          break;
        case 'list':
          generatedContent += `<ul><li>${element.content}</li></ul>`;
          break;
        case 'divider':
          generatedContent += '<hr />';
          break;
        default:
          generatedContent += `<p>${element.content}</p>`;
      }
    });
    
    setContent(generatedContent);
  };

  return (
    <div className="pdf-editor-page bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-blue-600">PDF Market Intelligence</h1>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Save
              </button>
              <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
                Export
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {showTemplateSelector ? (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <TemplateSelector onSelectTemplate={handleTemplateSelect} />
          </div>
        ) : (
          <>
            <div className="mb-6">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-3xl font-bold border-0 border-b-2 border-gray-200 focus:border-blue-600 focus:ring-0 bg-transparent"
                placeholder="Document Title"
              />
            </div>
            
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/2">
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Editor</h2>
                    <div className="flex border rounded overflow-hidden">
                      <button 
                        className={`px-4 py-2 ${editorMode === 'rich' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                        onClick={() => setEditorMode('rich')}
                      >
                        Rich Text
                      </button>
                      <button 
                        className={`px-4 py-2 ${editorMode === 'drag' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                        onClick={() => setEditorMode('drag')}
                      >
                        Drag & Drop
                      </button>
                    </div>
                  </div>
                  
                  {editorMode === 'rich' ? (
                    <RichTextEditor initialValue={content} onChange={handleContentChange} />
                  ) : (
                    <DraggableEditor elements={elements} onElementsChange={handleElementsChange} />
                  )}
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Document Settings</h2>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Your Name"
                    />
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Preview</h2>
                  <PdfPreview title={title} content={content} author={author} />
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default PdfEditorPage;
