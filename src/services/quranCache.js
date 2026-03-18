// Quran data caching service for offline support
const CACHE_KEY_PREFIX = 'quran_cache_';
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export const quranCache = {
  /**
   * Get data from cache
   * @param {string} key - Cache key
   * @returns {any|null} Cached data or null if not found/expired
   */
  get(key) {
    try {
      const cached = localStorage.getItem(CACHE_KEY_PREFIX + key);
      if (!cached) return null;
      
      const { data, timestamp } = JSON.parse(cached);
      
      // Check if cache has expired
      if (Date.now() - timestamp > CACHE_EXPIRY) {
        this.remove(key);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error reading from cache:', error);
      return null;
    }
  },

  /**
   * Set data to cache
   * @param {string} key - Cache key
   * @param {any} data - Data to cache
   */
  set(key, data) {
    try {
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY_PREFIX + key, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error writing to cache:', error);
      // If localStorage is full, clear old cache entries
      if (error.name === 'QuotaExceededError') {
        this.clearOldEntries();
        // Try again
        try {
          localStorage.setItem(CACHE_KEY_PREFIX + key, JSON.stringify({ data, timestamp: Date.now() }));
        } catch (retryError) {
          console.error('Failed to cache after cleanup:', retryError);
        }
      }
    }
  },

  /**
   * Remove specific cache entry
   * @param {string} key - Cache key
   */
  remove(key) {
    try {
      localStorage.removeItem(CACHE_KEY_PREFIX + key);
    } catch (error) {
      console.error('Error removing from cache:', error);
    }
  },

  /**
   * Clear all Quran cache entries
   */
  clear() {
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(CACHE_KEY_PREFIX))
        .forEach(key => localStorage.removeItem(key));
      console.log('Cache cleared successfully');
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  },

  /**
   * Clear old cache versions (for migration)
   */
  clearOldVersions() {
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(CACHE_KEY_PREFIX) && !key.includes('_v2_'))
        .forEach(key => {
          console.log('Removing old cache entry:', key);
          localStorage.removeItem(key);
        });
      console.log('Old cache versions cleared');
    } catch (error) {
      console.error('Error clearing old cache versions:', error);
    }
  },

  /**
   * Clear old/expired cache entries
   */
  clearOldEntries() {
    try {
      const now = Date.now();
      Object.keys(localStorage)
        .filter(key => key.startsWith(CACHE_KEY_PREFIX))
        .forEach(key => {
          try {
            const cached = localStorage.getItem(key);
            if (cached) {
              const { timestamp } = JSON.parse(cached);
              if (now - timestamp > CACHE_EXPIRY) {
                localStorage.removeItem(key);
              }
            }
          } catch (error) {
            // If parsing fails, remove the corrupted entry
            localStorage.removeItem(key);
          }
        });
    } catch (error) {
      console.error('Error clearing old cache entries:', error);
    }
  },

  /**
   * Get cache statistics
   * @returns {Object} Cache stats
   */
  getStats() {
    try {
      const keys = Object.keys(localStorage).filter(key => key.startsWith(CACHE_KEY_PREFIX));
      let totalSize = 0;
      let validEntries = 0;
      let expiredEntries = 0;

      keys.forEach(key => {
        const item = localStorage.getItem(key);
        if (item) {
          totalSize += item.length;
          try {
            const { timestamp } = JSON.parse(item);
            if (Date.now() - timestamp > CACHE_EXPIRY) {
              expiredEntries++;
            } else {
              validEntries++;
            }
          } catch (error) {
            expiredEntries++;
          }
        }
      });

      return {
        totalEntries: keys.length,
        validEntries,
        expiredEntries,
        totalSize: (totalSize / 1024).toFixed(2) + ' KB'
      };
    } catch (error) {
      console.error('Error getting cache stats:', error);
      return null;
    }
  }
};
