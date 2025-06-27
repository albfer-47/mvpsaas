import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';

interface ElementType {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'list' | 'table' | 'divider';
  content: string;
}

interface DraggableEditorProps {
  elements: ElementType[];
  onElementsChange: (elements: ElementType[]) => void;
}

const DraggableEditor: React.FC<DraggableEditorProps> = ({ elements, onElementsChange }) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(elements);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onElementsChange(items);
  };

  const renderElementContent = (element: ElementType) => {
    switch (element.type) {
      case 'heading':
        return <h2 className="text-xl font-bold">{element.content}</h2>;
      case 'paragraph':
        return <p>{element.content}</p>;
      case 'image':
        return <img src={element.content} alt="Content" className="max-w-full h-auto" />;
      case 'list':
        return <ul className="list-disc pl-5"><li>{element.content}</li></ul>;
      case 'table':
        return <div className="border border-gray-300 p-2">Table: {element.content}</div>;
      case 'divider':
        return <hr className="my-4" />;
      default:
        return <p>{element.content}</p>;
    }
  };

  return (
    <div className="draggable-editor">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="elements">
          {(provided: DroppableProvided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="min-h-[300px] border border-gray-300 rounded p-4"
            >
              {elements.map((element, index) => (
                <Draggable key={element.id} draggableId={element.id} index={index}>
                  {(provided: DraggableProvided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-white p-3 mb-3 border border-gray-200 rounded shadow-sm hover:shadow flex items-center"
                    >
                      <div className="mr-3 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      </div>
                      <div className="flex-grow">
                        {renderElementContent(element)}
                      </div>
                      <div className="ml-2 text-gray-400">
                        <button className="p-1 hover:text-blue-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button className="p-1 hover:text-red-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              
              {elements.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  Drag elements here or add new elements
                </div>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add Heading
        </button>
        <button className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add Paragraph
        </button>
        <button className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add Image
        </button>
        <button className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add List
        </button>
        <button className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add Table
        </button>
        <button className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add Divider
        </button>
      </div>
    </div>
  );
};

export default DraggableEditor;
