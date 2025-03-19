import React, { useState, useEffect, useRef } from 'react';
import Sortable from 'sortablejs';
import CSSEditor from './CSSEditor';
import AddSectionButton from './components/AddSectionButton';

const EditSection = () => {
  // Define initial elements with CSS property
  const initialSection = [
    { 
      id: 'header', 
      type: 'text', 
      content: 'This is a Sortable Header',
      CSS: {
        fontSize: 'revert',
        color: 'revert',
        textAlign: 'revert',
        fontWeight: 'revert',
        textDecoration: 'revert',

      } 
    },
    { 
      id: 'paragraph', 
      type: 'text', 
      content: 'This is a paragraph that you can rearrange when in edit mode. Click the edit button above to enable sorting functionality.',
      CSS: {
        fontSize: 'revert',
        color: 'revert',
        textAlign: 'revert',
        textDecoration: 'revert',
      } 
    },
    { 
      id: 'button', 
      type: 'button', 
      content: 'Click Me',
      CSS: {
        fontSize: 'revert',
        color: 'revert',
        textAlign: 'revert',
        backgroundColor: 'revert',
        textDecoration: 'revert',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      } 
    },
  ];

  // State
  const [elements, setElements] = useState(initialSection);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingElement, setEditingElement] = useState(null);
  const sortableContainerRef = useRef(null);
  const sortableInstanceRef = useRef(null);

  // Load saved layout from localStorage on component mount
  useEffect(() => {
    const savedLayout = localStorage.getItem('sortableSectionLayout');
    if (savedLayout) {
      try {
        setElements(JSON.parse(savedLayout));
      } catch (e) {
        console.error('Failed to parse saved layout:', e);
      }
    }
  }, []);

  // Initialize or destroy Sortable instance when edit mode changes
  useEffect(() => {
    if (isEditMode && sortableContainerRef.current) {
      // Initialize Sortable
      sortableInstanceRef.current = Sortable.create(sortableContainerRef.current, {
        animation: 150,
        ghostClass: 'sortable-ghost',
        chosenClass: 'sortable-chosen',
        dragClass: 'sortable-drag',
        handle: '.drag-handle',
        onEnd: (evt) => {
          // Update state when items are reordered
          const oldIndex = evt.oldIndex;
          const newIndex = evt.newIndex;
          
          setElements(prevElements => {
            const result = [...prevElements];
            const [removed] = result.splice(oldIndex, 1);
            result.splice(newIndex, 0, removed);
            return result;
          });
        }
      });
    } else if (sortableInstanceRef.current) {
      // Destroy Sortable instance when exiting edit mode
      sortableInstanceRef.current.destroy();
      sortableInstanceRef.current = null;
      // Clear editing element when exiting edit mode
      setEditingElement(null);
    }

    return () => {
      // Cleanup on unmount
      if (sortableInstanceRef.current) {
        sortableInstanceRef.current.destroy();
        sortableInstanceRef.current = null;
      }
    };
  }, [isEditMode]);

  // Toggle edit mode and save layout
  const toggleEditMode = () => {
    if (isEditMode) {
      // Save to localStorage when exiting edit mode
      localStorage.setItem('sortableSectionLayout', JSON.stringify(elements));
    }
    setIsEditMode(!isEditMode);
  };

  // Update CSS property for an element
  const updateElementCSS = (elementId, property, value) => {
    setElements(prevElements => 
      prevElements.map(element => 
        element.id === elementId 
          ? { 
              ...element, 
              CSS: { 
                ...element.CSS, 
                [property]: value 
              } 
            } 
          : element
      )
    );
  };

  // Toggle editing panel for an element
  const toggleEditing = (elementId) => {
    setEditingElement(editingElement === elementId ? null : elementId);
  };

  // Render appropriate content based on element id
  const renderContent = (element) => {
    const style = element.CSS || {};
    
    switch (element.id) {
      case 'header':
        return <h2 style={style}>{element.content}</h2>;
      case 'paragraph':
        return <p style={style}>{element.content}</p>;
      case 'button':
        return <button className="btn" style={style}>{element.content}</button>;
      default:
        return null;
    }
  };

  // CSS Editor component


  return (
    <div className="sortable-section" style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <button 
          onClick={toggleEditMode}
          style={{
            padding: '4px 6px',
            backgroundColor: 'transparent',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          {isEditMode ? '💾' : ''}
        </button>
        <AddSectionButton elements={elements} setElements={setElements} toggleEditMode={toggleEditMode} initialSection={initialSection} />
      </div>

      <div ref={sortableContainerRef}>
        {elements.map((element, index) => (
          <div 
            key={element.id} 
            data-id={element.id}
            style={{ 
              position: 'relative',
             
              padding: '10px',
              border: isEditMode ? '1px dashed #ccc' : '1px solid transparent',
              borderRadius: '4px',
              backgroundColor: 'white',
              transition: 'all 0.2s ease',
              width: 'auto',
              display: `${element.type === 'button' ? 'flex' : 'block'}`,
              flexDirection: 'row',
              justifyContent: `${element.CSS?.justifyContent || 'center'}`,
            }}
            className="sortable-item"
          >
            {isEditMode && (
              <>
                <div 
                  className="drag-handle"
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    cursor: 'grab',
                    padding: '2px 5px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '3px',
                    fontSize: '12px'
                  }}
                >
                  ⋮⋮
                </div>
                <button
                  onClick={() => toggleEditing(element.id)}
                  style={{
                    position: 'absolute',
                    top: '30px',
                    right: '5px',
                    cursor: 'pointer',
                    padding: '2px 5px',
                    backgroundColor: editingElement === element.id ? '#2196F3' : '#e0e0e0',
                    color: editingElement === element.id ? 'white' : 'black',
                    border: 'none',
                    borderRadius: '3px',
                    fontSize: '12px'
                  }}
                >
                  Edit
                </button>
              </>
            )}
            {renderContent(element)}
            
            {isEditMode && editingElement === element.id && (
              <CSSEditor element={element} updateElementCSS={updateElementCSS} />
            )}
          </div>
        ))}
      </div>
      <p style={{
        fontSize: '14px',
        textAlign: 'left',
        marginTop: '100px',
      }}>
        This section uses Sortable.js to enable drag-and-drop functionality for reordering elements. Click the "Edit" button above to enter edit mode and rearrange the elements. You can also click the "Edit" button on each element to adjust some of its CSS properties.
      </p>
    </div>
  );
};

export default EditSection;