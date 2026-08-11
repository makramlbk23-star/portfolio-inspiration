import { useState, useEffect, useCallback, useRef } from 'react';

interface UseStoryProps {
  imageCount: number;
  duration: number;
  onComplete: () => void;
  autoAdvance: boolean;
}

export const useStory = ({ imageCount, duration, onComplete, autoAdvance }: UseStoryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const animationFrameId = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);
  const elapsedTime = useRef(0);

  const goToNext = useCallback(() => {
    if (currentIndex < imageCount - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
      elapsedTime.current = 0;
      setIsLoaded(false);
    } else {
      onComplete();
    }
  }, [currentIndex, imageCount, onComplete]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
      elapsedTime.current = 0;
      setIsLoaded(false);
    } else {
      // Potentially close or go to previous project
      onComplete();
    }
  }, [currentIndex, onComplete]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  useEffect(() => {
    if (!autoAdvance || isPaused || !isLoaded) {
      if(animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      return;
    }

    const animate = (timestamp: number) => {
      if (startTime.current === null) {
        startTime.current = timestamp;
      }

      const currentElapsedTime = timestamp - startTime.current;
      const totalElapsedTime = elapsedTime.current + currentElapsedTime;
      const newProgress = Math.min((totalElapsedTime / duration) * 100, 100);
      
      setProgress(newProgress);

      if (totalElapsedTime >= duration) {
        goToNext();
      } else {
        animationFrameId.current = requestAnimationFrame(animate);
      }
    };
    
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      startTime.current = null;
      elapsedTime.current += performance.now() - (startTime.current || performance.now());
    };
  }, [isPaused, isLoaded, autoAdvance, duration, goToNext]);
  
  // Reset timer when index changes
  useEffect(() => {
    setProgress(0);
    elapsedTime.current = 0;
    startTime.current = null;
    setIsLoaded(false);
  },[currentIndex])


  const handleImageLoad = () => {
    setIsLoaded(true);
    setProgress(0);
    elapsedTime.current = 0;
    startTime.current = null;
  };

  return {
    currentIndex,
    progress,
    isPaused,
    goToNext,
    goToPrevious,
    pause,
    resume,
    handleImageLoad,
    setCurrentIndex,
  };
};
