import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { Project } from './types';
import { useStory } from './useStory';
import { ProgressBar } from './ProgressBar';

interface StoryContentProps {
  project: Project;
  onClose: () => void;
  onNextProject: () => void;
  onPrevProject: () => void;
  isFirstProject: boolean;
  isLastProject: boolean;
  duration?: number;
}

export const StoryContent: React.FC<StoryContentProps> = ({
  project,
  onClose,
  onNextProject,
  onPrevProject,
  isFirstProject,
  isLastProject,
  duration = 5000,
}) => {
  const {
    currentIndex,
    progress,
    goToNext,
    goToPrevious,
    pause,
    resume,
    handleImageLoad,
  } = useStory({
    imageCount: project.images.length,
    duration,
    onComplete: () => {
      if (!isLastProject) {
        onNextProject();
      } else {
        onClose();
      }
    },
    autoAdvance: true,
  });
  
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    goToNext();
  };
  
  const handlePrevious = () => {
    setDirection(-1);
    if (currentIndex === 0 && !isFirstProject) {
        onPrevProject();
    } else {
        goToPrevious();
    }
  };


  const currentImage = project.images[currentIndex];
  const nextImageSrc = project.images[currentIndex + 1]?.src;

  // Preload the next image
  useEffect(() => {
    if (nextImageSrc) {
      const img = new Image();
      img.src = nextImageSrc;
    }
  }, [nextImageSrc]);

  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full h-full flex flex-col" onMouseDown={pause} onMouseUp={resume} onTouchStart={pause} onTouchEnd={resume}>
      {/* Progress Bars */}
      <div className="absolute top-4 left-4 right-4 flex items-center gap-1 z-10">
        {project.images.map((_, index) => (
          <ProgressBar
            key={index}
            progress={index === currentIndex ? progress : (index < currentIndex ? 100: 0)}
            active={index === currentIndex}
          />
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-10 text-white">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-lg">{project.title}</h3>
        </div>
        <button onClick={onClose} className="p-2">
          <X size={24} />
        </button>
      </div>

      {/* Image Display */}
      <div className="flex-1 relative overflow-hidden bg-black">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={currentImage.src}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            onLoad={handleImageLoad}
            className="w-full h-full object-contain"
          />
        </AnimatePresence>
      </div>
      
       {/* Navigation areas */}
       <div className="absolute inset-0 flex justify-between">
          <div className="w-[40%]" onClick={handlePrevious} />
          <div className="w-[40%]" onClick={handleNext} />
      </div>


      {/* Caption */}
      {currentImage.caption && (
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
          <p className="text-white text-center text-lg">{currentImage.caption}</p>
        </div>
      )}

       {/* Project Link */}
       {project.link && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="bg-white/20 text-white backdrop-blur-md py-2 px-4 rounded-lg hover:bg-white/30 transition-colors">
                View Project
            </a>
        </div>
      )}
    </div>
  );
};
