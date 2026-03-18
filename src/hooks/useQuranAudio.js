import { useState, useEffect, useRef, useCallback } from 'react';
import { getAyahAudioUrl, getAyahsAudioUrls, RECITERS } from '../services/quranAudioAPI';

export const useQuranAudio = (ayahs) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
  const [reciter, setReciter] = useState(RECITERS['Abdul Basit']);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [volume, setVolume] = useState(1.0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(null);
  
  const audioRef = useRef(null);
  const audioUrlsRef = useRef([]);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.preload = 'auto';

    // Audio event listeners
    const audio = audioRef.current;

    const handleEnded = () => {
      // Play next ayah
      if (currentAyahIndex < ayahs.length - 1) {
        setCurrentAyahIndex(prev => prev + 1);
      } else {
        // End of page
        setIsPlaying(false);
        setCurrentAyahIndex(0);
      }
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleError = (e) => {
      console.error('Audio playback error:', e);
      setError('Failed to load audio. Please try again.');
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
    };
  }, [ayahs.length, currentAyahIndex]);

  // Update audio URLs when ayahs or reciter changes
  useEffect(() => {
    if (ayahs.length > 0) {
      audioUrlsRef.current = getAyahsAudioUrls(ayahs, reciter);
    }
  }, [ayahs, reciter]);

  // Load and play current ayah
  useEffect(() => {
    if (isPlaying && audioUrlsRef.current[currentAyahIndex]) {
      const audio = audioRef.current;
      const audioData = audioUrlsRef.current[currentAyahIndex];
      
      audio.src = audioData.url;
      audio.playbackRate = playbackSpeed;
      audio.volume = volume;
      
      audio.play().catch(err => {
        console.error('Playback failed:', err);
        setError('Playback failed. Please try again.');
        setIsPlaying(false);
      });
    }
  }, [isPlaying, currentAyahIndex, playbackSpeed, volume]);

  // Play/Pause toggle
  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      setError(null);
    }
  }, [isPlaying]);

  // Play specific ayah
  const playAyah = useCallback((index) => {
    if (index >= 0 && index < ayahs.length) {
      setCurrentAyahIndex(index);
      setIsPlaying(true);
      setError(null);
    }
  }, [ayahs.length]);

  // Stop playback
  const stop = useCallback(() => {
    audioRef.current?.pause();
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentAyahIndex(0);
    setProgress(0);
  }, []);

  // Skip to next ayah
  const skipNext = useCallback(() => {
    if (currentAyahIndex < ayahs.length - 1) {
      setCurrentAyahIndex(prev => prev + 1);
    }
  }, [currentAyahIndex, ayahs.length]);

  // Skip to previous ayah
  const skipPrevious = useCallback(() => {
    if (currentAyahIndex > 0) {
      setCurrentAyahIndex(prev => prev - 1);
    }
  }, [currentAyahIndex]);

  // Change reciter
  const changeReciter = useCallback((newReciter) => {
    const wasPlaying = isPlaying;
    setIsPlaying(false);
    setReciter(newReciter);
    if (wasPlaying) {
      setTimeout(() => setIsPlaying(true), 100);
    }
  }, [isPlaying]);

  // Change playback speed
  const changeSpeed = useCallback((speed) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, []);

  // Change volume
  const changeVolume = useCallback((vol) => {
    const newVolume = Math.max(0, Math.min(1, vol));
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  // Seek to position
  const seek = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  }, []);

  return {
    isPlaying,
    currentAyahIndex,
    currentAyah: ayahs[currentAyahIndex],
    reciter,
    playbackSpeed,
    volume,
    progress,
    duration,
    error,
    togglePlayPause,
    playAyah,
    stop,
    skipNext,
    skipPrevious,
    changeReciter,
    changeSpeed,
    changeVolume,
    seek
  };
};
