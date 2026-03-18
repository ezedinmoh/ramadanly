import { useState, useEffect } from 'react';
import { quranAPI, TRANSLATIONS } from '../services/quranAPI';
import { quranCache } from '../services/quranCache';

/**
 * Hook for fetching Quran verses with English translation
 */
export const useQuranData = (page) => {
  const [ayahs, setAyahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!page || page < 1 || page > 604) {
        setError('Invalid page');
        setLoading(false);
        return;
      }

      console.log('🔄 useQuranData: Starting fetch for page:', page);
      setLoading(true);
      setError(null);

      try {
        const cacheKey = `page_${page}_v6_english_fixed`;
        
        // SKIP CACHE FOR NOW - Force fresh API call
        console.log('⚠️ Skipping cache, forcing fresh API call...');
        
        // Get verses with English translation
        const data = await quranAPI.getVerses(page);
        
        if (!data || !data.verses || data.verses.length === 0) {
          throw new Error('No verses found in API response');
        }

        console.log('📝 Processing', data.verses.length, 'verses');
        console.log('📦 Raw first verse from API:', data.verses[0]);

        // Transform to our format
        const transformed = data.verses.map((verse, index) => {
          const [surahNum, ayahNum] = verse.verse_key.split(':');
          
          // Get English translation
          const englishTrans = verse.translations?.find(t => t.resource_id === TRANSLATIONS.english);
          
          const result = {
            surah: parseInt(surahNum),
            ayah: parseInt(ayahNum),
            text: verse.text_uthmani || '',
            translation: englishTrans?.text || '',
            page: verse.page_number || page,
            juz: verse.juz_number || 1,
            verseKey: verse.verse_key
          };
          
          // Log first verse transformation
          if (index === 0) {
            console.log('✨ First verse transformation:', {
              input: {
                verse_key: verse.verse_key,
                text_uthmani: verse.text_uthmani,
                text_length: verse.text_uthmani?.length,
                has_translations_array: !!verse.translations,
                translations_count: verse.translations?.length,
                translation_resource_id: englishTrans?.resource_id,
                translation_text: englishTrans?.text?.substring(0, 100)
              },
              output: {
                verseKey: result.verseKey,
                hasText: !!result.text,
                hasTranslation: !!result.translation,
                translationPreview: result.translation?.substring(0, 100)
              }
            });
          }
          
          return result;
        });

        console.log('✅ Successfully transformed', transformed.length, 'verses');
        
        // Validate that we have text
        const hasText = transformed.every(v => v.text && v.text.length > 0);
        if (!hasText) {
          console.error('❌ Some verses are missing text!');
          throw new Error('API returned verses without text');
        }
        
        // Check translations
        const withTranslations = transformed.filter(v => v.translation && v.translation.length > 0).length;
        console.log(`📊 Verses with translations: ${withTranslations}/${transformed.length}`);
        
        if (withTranslations === 0) {
          console.warn('⚠️ No translations found! Check API response.');
        }
        
        // Cache the transformed data
        quranCache.set(cacheKey, transformed);
        console.log('💾 Data cached successfully');
        
        setAyahs(transformed);
        setLoading(false);
        
      } catch (err) {
        console.error('❌ Fetch error:', err);
        setError(err.message || 'Failed to load Quran data');
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return { ayahs, loading, error };
};
