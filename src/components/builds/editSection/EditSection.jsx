import React, { useEffect, useMemo, useRef, useState } from 'react';
import Sortable from 'sortablejs';
import CSSEditor from './CSSEditor';
import AddSectionButton from './components/AddSectionButton';

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
    },
  },
  {
    id: 'paragraph',
    type: 'text',
    content:
      'This is a paragraph that you can rearrange when in edit mode. Click the edit button above to enable sorting functionality.',
    CSS: {
      fontSize: 'revert',
      color: 'revert',
      textAlign: 'revert',
      textDecoration: 'revert',
    },
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
    },
  },
];

const sectionTemplate = {
  type: 'text',
  content: 'New text section',
  CSS: {
    fontSize: '16px',
    color: '#f6efe6',
    textAlign: 'left',
    textDecoration: 'none',
  },
};

const EditSection = () => {
  const [elements, setElements] = useState(initialSection);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingElement, setEditingElement] = useState(null);
  const sortableContainerRef = useRef(null);
  const sortableInstanceRef = useRef(null);

  useEffect(() => {
    const savedLayout = localStorage.getItem('sortableSectionLayout');
    if (savedLayout) {
      try {
        setElements(JSON.parse(savedLayout));
      } catch (error) {
        console.error('Failed to parse saved layout:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (isEditMode && sortableContainerRef.current) {
      sortableInstanceRef.current = Sortable.create(sortableContainerRef.current, {
        animation: 150,
        ghostClass: 'sortable-ghost',
        chosenClass: 'sortable-chosen',
        dragClass: 'sortable-drag',
        handle: '.drag-handle',
        onEnd: (event) => {
          const { oldIndex, newIndex } = event;
          if (oldIndex === newIndex) {
            return;
          }

          setElements((prevElements) => {
            const result = [...prevElements];
            const [removed] = result.splice(oldIndex, 1);
            result.splice(newIndex, 0, removed);
            return result;
          });
        },
      });
    } else if (sortableInstanceRef.current) {
      sortableInstanceRef.current.destroy();
      sortableInstanceRef.current = null;
      setEditingElement(null);
    }

    return () => {
      if (sortableInstanceRef.current) {
        sortableInstanceRef.current.destroy();
        sortableInstanceRef.current = null;
      }
    };
  }, [isEditMode]);

  const hasUnsavedChanges = useMemo(() => isEditMode, [isEditMode]);

  function toggleEditMode() {
    if (isEditMode) {
      localStorage.setItem('sortableSectionLayout', JSON.stringify(elements));
    }

    setIsEditMode((prevState) => !prevState);
  }

  function updateElementCSS(elementId, property, value) {
    setElements((prevElements) =>
      prevElements.map((element) =>
        element.id === elementId
          ? {
              ...element,
              CSS: {
                ...element.CSS,
                [property]: value,
              },
            }
          : element,
      ),
    );
  }

  function toggleEditing(elementId) {
    setEditingElement((currentElement) => (currentElement === elementId ? null : elementId));
  }

  function addSection() {
    const sectionId = `section-${Date.now()}`;

    setElements((prevElements) => [
      ...prevElements,
      {
        ...sectionTemplate,
        id: sectionId,
      },
    ]);
  }

  function renderContent(element) {
    const style = element.CSS || {};

    if (element.type === 'button') {
      return (
        <button className="btn" style={{ color: 'rgba(246,239,230,0.94)', ...style }}>
          {element.content}
        </button>
      );
    }

    if (element.id === 'header') {
      return <h2 style={{ color: 'rgba(246,239,230,0.94)', margin: 0, ...style }}>{element.content}</h2>;
    }

    return <p style={{ color: 'rgba(246,239,230,0.84)', margin: 0, ...style }}>{element.content}</p>;
  }

  return (
    <div
      className="sortable-section"
      style={{
        maxWidth: '760px',
        margin: '0 auto',
        padding: '20px',
        position: 'relative',
        borderRadius: '3px',
        background: 'linear-gradient(180deg, rgba(35, 29, 23, 0.96), rgba(18, 14, 10, 0.96))',
        border: '1px solid color-mix(in srgb, var(--build-accent) 18%, transparent)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ margin: 0, color: 'rgba(246,239,230,0.94)' }}>Editable section builder</h2>
          <p style={{ margin: '6px 0 0', color: 'rgba(246,239,230,0.72)' }}>Drag blocks around and fine-tune the CSS for each element.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={toggleEditMode}
            style={{
              padding: '8px 12px',
              backgroundColor: hasUnsavedChanges ? 'color-mix(in srgb, var(--build-accent) 40%, rgba(35,29,23,0.96))' : 'rgba(255,255,255,0.06)',
              color: 'rgba(245, 239, 232, 0.92)',
              border: '1px solid color-mix(in srgb, var(--build-accent) 18%, transparent)',
              borderRadius: '3px',
              cursor: 'pointer',
            }}
          >
            {isEditMode ? 'Save layout' : 'Enter edit mode'}
          </button>
          <AddSectionButton addSection={addSection} toggleEditMode={toggleEditMode} />
        </div>
      </div>

      <div ref={sortableContainerRef} style={{ display: 'grid', gap: '12px' }}>
        {elements.map((element) => (
          <div
            key={element.id}
            data-id={element.id}
            style={{
              position: 'relative',
              padding: '16px',
              border: isEditMode ? '1px dashed color-mix(in srgb, var(--build-accent) 34%, transparent)' : '1px solid color-mix(in srgb, var(--build-accent) 18%, transparent)',
              borderRadius: '3px',
              backgroundColor: 'rgba(19, 22, 26, 0.96)',
              transition: 'all 0.2s ease',
              width: 'auto',
              display: element.type === 'button' ? 'flex' : 'block',
              flexDirection: 'row',
              justifyContent: `${element.CSS?.justifyContent || 'center'}`,
            }}
            className="sortable-item"
          >
            {isEditMode ? (
              <>
                <div
                  className="drag-handle"
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    cursor: 'grab',
                    padding: '4px 6px',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    borderRadius: '3px',
                    fontSize: '12px',
                  }}
                >
                  ⋮⋮
                </div>
                <button
                  onClick={() => toggleEditing(element.id)}
                  style={{
                    position: 'absolute',
                    top: '42px',
                    right: '10px',
                    cursor: 'pointer',
                    padding: '4px 8px',
                    backgroundColor: editingElement === element.id ? 'color-mix(in srgb, var(--build-accent) 40%, rgba(35,29,23,0.96))' : 'rgba(255,255,255,0.06)',
                    color: '#f6efe6',
                    border: 'none',
                    borderRadius: '3px',
                    fontSize: '12px',
                  }}
                >
                  Edit
                </button>
              </>
            ) : null}
            {renderContent(element)}

            {isEditMode && editingElement === element.id ? (
              <CSSEditor element={element} updateElementCSS={updateElementCSS} />
            ) : null}
          </div>
        ))}
      </div>
      <p
        style={{
          fontSize: '14px',
          textAlign: 'left',
          marginTop: '24px',
          opacity: 0.8,
        }}
      >
        This section uses Sortable.js to enable drag-and-drop functionality for reordering elements. Enter edit mode to move
        sections around, then save the layout back to local storage.
      </p>
    </div>
  );
};

export default EditSection;
