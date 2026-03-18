// Quran Audio API Service
// Uses EveryAyah.com API for Quran recitation

// Available reciters with their IDs
export const RECITERS = {
  'Abdul Basit': 'Abdul_Basit_Murattal_192kbps',
  'Mishary Rashid Alafasy': 'Alafasy_128kbps',
  'Saad Al-Ghamdi': 'Ghamadi_40kbps',
  'Mahmoud Khalil Al-Hussary': 'Husary_128kbps',
  'Ahmed Al-Ajamy': 'Ahmed_ibn_Ali_al-Ajamy_128kbps_ketaballah.net',
  'Muhammad Siddiq Al-Minshawi': 'Minshawy_Murattal_128kbps'
};

const BASE_URL = 'https://everyayah.com/data';

/**
 * Get audio URL for a specific ayah
 * @param {number} surah - Surah number (1-114)
 * @param {number} ayah - Ayah number
 * @param {string} reciter - Reciter ID from RECITERS object
 * @returns {string} Audio URL
 */
export const getAyahAudioUrl = (surah, ayah, reciter = RECITERS['Abdul Basit']) => {
  // Format: surah number (3 digits) + ayah number (3 digits)
  const surahFormatted = String(surah).padStart(3, '0');
  const ayahFormatted = String(ayah).padStart(3, '0');
  
  return `${BASE_URL}/${reciter}/${surahFormatted}${ayahFormatted}.mp3`;
};

/**
 * Get audio URLs for a range of ayahs (for continuous playback)
 * @param {Array} ayahs - Array of ayah objects with surah and ayah numbers
 * @param {string} reciter - Reciter ID
 * @returns {Array} Array of audio URLs
 */
export const getAyahsAudioUrls = (ayahs, reciter = RECITERS['Abdul Basit']) => {
  return ayahs.map(ayah => ({
    verseKey: ayah.verseKey,
    url: getAyahAudioUrl(ayah.surah, ayah.ayah, reciter),
    surah: ayah.surah,
    ayah: ayah.ayah
  }));
};

/**
 * Preload audio for better performance
 * @param {string} url - Audio URL
 * @returns {Promise} Promise that resolves when audio is loaded
 */
export const preloadAudio = (url) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.addEventListener('canplaythrough', () => resolve(audio), { once: true });
    audio.addEventListener('error', reject, { once: true });
    audio.src = url;
  });
};

/**
 * Get reciter list for UI
 * @returns {Array} Array of reciter objects
 */
export const getRecitersList = () => {
  return Object.entries(RECITERS).map(([name, id]) => ({
    name,
    id
  }));
};
