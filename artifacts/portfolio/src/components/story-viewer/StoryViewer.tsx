import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Project } from './types';
import { StoryContent } from './StoryContent';
import { ArrowLeft, ArrowRight } from 'lucide-react';


interface StoryViewerProps {
  projects: Project[];
  startIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement>;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({
  projects,
  startIndex = 0,
  isOpen,
  onClose,
  triggerRef,
}) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(startIndex);
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentProjectIndex(startIndex);
    }
  }, [isOpen, startIndex]);

  const handleNextProject = useCallback(() => {
    setCurrentProjectIndex((prev) => Math.min(prev + 1, projects.length - 1));
  }, [projects.length]);

  const handlePrevProject = useCallback(() => {
    setCurrentProjectIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      // The left/right arrow navigation is handled inside StoryContent
    },
    [onClose]
  );
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Focus trapping
  useEffect(() => {
    if (isOpen) {
      const previouslyFocusedElement = document.activeElement as HTMLElement;
      viewerRef.current?.focus();
      return () => {
        triggerRef?.current?.focus() ?? previouslyFocusedElement?.focus();
      };
    }
  }, [isOpen, triggerRef]);


  if (typeof document === 'undefined') {
    return null;
  }

  const currentProject = projects[currentProjectIndex];

  return createPortal(
    <AnimatePresence>
      {isOpen && currentProject && (
        <motion.div
          ref={viewerRef}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          tabIndex={-1}
        >
          {/* Main Story Content */}
          <div className="relative w-full max-w-md h-full max-h-[90vh] aspect-[9/16] shadow-2xl">
             <AnimatePresence mode="wait">
                <motion.div
                    key={currentProject.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                >
                    <StoryContent
                        project={currentProject}
                        onClose={onClose}
                        onNextProject={handleNextProject}
                        onPrevProject={handlePrevProject}
                        isFirstProject={currentProjectIndex === 0}
                        isLastProject={currentProjectIndex === projects.length - 1}
                    />
                </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev/Next Project Buttons for Desktop */}
          {currentProjectIndex > 0 && (
            <button 
              onClick={handlePrevProject} 
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 rounded-full p-2 text-white hover:bg-white/20 transition-colors"
            >
              <ArrowLeft />
            </button>
          )}
          {currentProjectIndex < projects.length - 1 && (
             <button 
              onClick={handleNextProject} 
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 rounded-full p-2 text-white hover:bg-white/20 transition-colors"
            >
              <ArrowRight />
            </button>
          )}

        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
