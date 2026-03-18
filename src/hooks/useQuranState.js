import { useState, useEffect } from 'react';

/**
 * Custom hook for persisting Quran-related state in localStorage
 * @param {string} key - Storage key (will be prefixed with 'quran_')
 * @param {any} initialValue - Initial value if nothing in storage
 * @returns {Array} [state, setState] - Similar to useState
 */
export const useQuranState = (key, initialValue) => {
  const storageKey = `quran_${key}`;

  // Initialize state from localStorage or use initial value
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.error(`Error reading ${storageKey} from localStorage:`, error);
      return initialValue;
    }
  });

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
      console.error(`Error writing ${storageKey} to localStorage:`, error);
    }
  }, [storageKey, state]);

  return [state, setState];
};
