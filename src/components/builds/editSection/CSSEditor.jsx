import React from 'react'
import TextAdjuster from './components/TextAdjuster';
import FontSlider from './components/FontSlider';

export default function CSSEditor({ element, updateElementCSS }){
  return (
    <div className="css-editor" style={{
      position: 'absolute',
      top: '0',
      right: '-250px',
      width: '230px',
      backgroundColor: '#f5f5f5',
      padding: '10px',
      borderRadius: '4px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      zIndex: 10
    }}>
      <h4 style={{ marginTop: '0', marginBottom: '10px' }}>Edit Styles</h4>
      
      {/* FONT SIZE SLIDER */}
      {/* <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', textAlign: 'left' }}>
          Font Size: {(element.CSS?.fontSize || '16px').replace('px', '')}px
        </label>
        <input 
          type="range" 
          min="5" 
          max="60" 
          value={(element.CSS?.fontSize || '16px').replace('px', '')} 
          onChange={(e) => updateElementCSS(element.id, 'fontSize', `${e.target.value}px`)}
          style={{ width: '100%' }}
        />
      </div> */}
      <FontSlider element={element} updateElementCSS={updateElementCSS} />
      
       {/* FONT COLOR PICKER */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', textAlign: 'left' }}>
          Color
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input 
            type="color" 
            value={element.CSS?.color || '#000000'} 
            onChange={(e) => updateElementCSS(element.id, 'color', e.target.value)}
          />
          <span>{element.CSS?.color || '#000000'}</span>
        </div>
      </div>
      
       {/* TEXT ALIGNMENT */}
       <TextAdjuster element={element} updateElementCSS={updateElementCSS} />
    </div>
  );
};