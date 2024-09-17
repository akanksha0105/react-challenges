import React, { useState } from 'react';

const CustomTooltip = ({ content }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={{ position: 'relative', display: 'inline-block' }} // To position the tooltip properly
    >
      <span>{content}</span>
      {showTooltip && (
        <div className="tooltip" style={{
          position: 'absolute',
          top: '100%', // Tooltip below the content
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'black',
          color: 'white',
          padding: '5px',
          borderRadius: '5px',
          whiteSpace: 'nowrap',
          zIndex: 1
        }}>
          {content}
        </div>
      )}
    </div>
  );
};

export default CustomTooltip;
