import React, { useState } from 'react';

const PageInput = ({ value, onChange, totalPages = 604 }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    const pageNum = parseInt(inputValue);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      onChange(pageNum);
    } else {
      // Reset to current value if invalid
      setInputValue(value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  // Update input when value prop changes
  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="page-input-container">
      <label htmlFor="page-input">Page</label>
      <input
        id="page-input"
        type="number"
        className="page-input"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
        min="1"
        max={totalPages}
        title="Enter page number"
      />
      <span className="page-total">/ {totalPages}</span>
    </div>
  );
};

export default PageInput;
