import React from 'react';

const JuzSelector = ({ value, onChange }) => {
  const juzOptions = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <select
      className="juz-selector"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      title="Select Juz"
    >
      {juzOptions.map(juz => (
        <option key={juz} value={juz}>
          Juz {juz}
        </option>
      ))}
    </select>
  );
};

export default JuzSelector;
