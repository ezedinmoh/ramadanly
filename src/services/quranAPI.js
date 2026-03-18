// Quran.com API v4 - Arabic Text with English Translation
const BASE_URL = 'https://api.quran.com/api/v4';

// Translation IDs
const TRANSLATIONS = {
  english: 131 // Dr. Mustafa Khattab, the Clear Quran
};

export const quranAPI = {
  async getVerses(pageNumber) {
    try {
      console.log('🔄 Fetching page:', pageNumber);
      
      // Fetch Arabic text with English translation
      const url = `${BASE_URL}/verses/by_page/${pageNumber}?words=true&translations=${TRANSLATIONS.english}&fields=text_uthmani`;
      console.log('📡 URL:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log('📦 Full Response:', data);
      
      if (data.verses && data.verses[0]) {
        console.log('✅ First verse details:', {
          verse_key: data.verses[0].verse_key,
          text_uthmani: data.verses[0].text_uthmani,
          text_length: data.verses[0].text_uthmani?.length,
          has_translation: !!data.verses[0].translations?.[0],
          translation_text: data.verses[0].translations?.[0]?.text?.substring(0, 50)
        });
      } else {
        console.warn('⚠️ No verses in response');
      }
      
      return data;
    } catch (error) {
      console.error('❌ API Error:', error);
      throw error;
    }
  },

  async getSpecificAyah(surahNumber, ayahNumber) {
    try {
      const url = `${BASE_URL}/verses/by_key/${surahNumber}:${ayahNumber}?words=true&translations=${TRANSLATIONS.english}&fields=text_uthmani`;
      console.log('📡 Fetching specific ayah:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log('📦 Ayah response:', data);
      
      return data;
    } catch (error) {
      console.error('❌ Error fetching ayah:', error);
      throw error;
    }
  }
};

export { TRANSLATIONS };
