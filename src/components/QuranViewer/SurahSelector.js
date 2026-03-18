import React from 'react';
import { allSurahs } from '../../data/quranData';

const SurahSelector = ({ value, onChange, language = 'english' }) => {
  const getSurahName = (surah) => {
    switch (language) {
      case 'arabic':
        return surah.nameArabic;
      case 'amharic':
        return surah.nameAmharic;
      default:
        return surah.nameEnglish;
    }
  };

  return (
    <select
      className="surah-selector"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      title="Select Surah"
    >
      {allSurahs.map(surah => (
        <option key={surah.number} value={surah.number}>
          {surah.number}. {getSurahName(surah)}
        </option>
      ))}
    </select>
  );
};

export default SurahSelector;
