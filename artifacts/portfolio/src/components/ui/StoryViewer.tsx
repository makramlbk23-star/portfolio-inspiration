/**
 * StoryViewer — Instagram-Stories-style full-screen image viewer.
 *
 * Architecture:
 *   StoryViewer       – full-screen overlay, keyboard/touch/mouse handling, focus trap
 *   ├ ProgressBar     – segmented top bar with auto-filling animation
 *   ├ StoryImage      – crossfade image with skeleton + preload logic
 *   └ CaptionOverlay  – bottom gradient scrim with caption text
 *
 * Usage:
 *   <StoryViewer
 *     stories={stories}
 *     initialIndex={0}
 *     isOpen={open}
 *     onClose={() => setOpen(false)}
 *   />
 */

import { useState, useEffect, useRef, useCallback, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────
export interface StorySlide {
  src: string;
  caption?: string;
}

export interface StoryGroup {
  id: string;
  title: string;
  images: StorySlide[];
  link?: string; // optional CTA
}

export interface StoryViewerProps {
  stories: StoryGroup[];
  /** Which story group to start on */
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  /** ms per slide (default 5000) */
  duration?: number;
  /** When the last image of the last group finishes:
   *  'close' (default) = close viewer
   *  'loop'  = wrap back to first group */
  onEnd?: 'close' | 'loop';
}

// ─── ProgressBar ────────────────────────────────────────────────
const ProgressBar: FC<{
  total: number;
  current: number;
  /** 0-1 fill fraction of the active segment */
  progress: number;
}> = ({ total, current, progress }) => (
  <div className="flex gap-1 px-3 pt-3 pb-1 w-full z-30">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className="h-[3px] flex-1 rounded-full bg-white/25 overflow-hidden"
      >
        <div
          className="h-full bg-white rounded-full transition-[width] duration-100 ease-linear"
          style={{
            width:
              i < current
                ? '100%'        // past segments fully filled
                : i === current
                  ? `${progress * 100}%`  // active segment animating
                  : '0%',       // future segments empty
          }}
        />
      </div>
    ))}
  </div>
);

// ─── StoryImage (crossfade + skeleton + preload) ────────────────
const StoryImage: FC<{
  src: string;
  onLoaded: () => void;
}> = ({ src, onLoaded }) => {
  const [loaded, setLoaded] = useState(false);

  // Reset loaded state when src changes
  useEffect(() => {
    setLoaded(false);
  }, [src]);

  return (
    <>
      {/* Skeleton while loading */}
      {!loaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background">
          <div className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.img
          key={src}
          src={src}
          alt=""
          onLoad={() => {
            setLoaded(true);
            onLoaded();
          }}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: loaded ? 1 : 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover select-none"
          draggable={false}
        />
      </AnimatePresence>
    </>
  );
};

// ─── CaptionOverlay ─────────────────────────────────────────────
const CaptionOverlay: FC<{ caption?: string; link?: string }> = ({ caption, link }) => {
  if (!caption && !link) return null;
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
      {/* gradient scrim */}
      <div className="h-48 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 space-y-3 pointer-events-auto">
        {caption && (
          <motion.p
            key={caption}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-white text-base md:text-lg font-medium drop-shadow-lg leading-relaxed"
          >
            {caption}
          </motion.p>
        )}
        {link && (
          <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
          >
            View Project →
          </motion.a>
        )}
      </div>
    </div>
  );
};

// ─── Preloader (invisible, eagerly fetches next image) ──────────
function usePreload(src: string | undefined) {
  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.src = src;
  }, [src]);
}

// ─── Main StoryViewer ───────────────────────────────────────────
export function StoryViewer({
  stories,
  initialIndex = 0,
  isOpen,
  onClose,
  duration = 5000,
  onEnd = 'close',
}: StoryViewerProps) {
  // ── State ──
  const [groupIdx, setGroupIdx] = useState(initialIndex);
  const [slideIdx, setSlideIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [imageReady, setImageReady] = useState(false);

  // For swipe-down dismiss
  const [dragY, setDragY] = useState(0);
  const touchStartY = useRef(0);

  // Focus trap refs
  const overlayRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const group = stories[groupIdx];
  const slide = group?.images[slideIdx];
  const totalSlides = group?.images.length ?? 0;

  // Figure out what the *next* image is so we can preload it
  const nextSrc = (() => {
    if (slideIdx < totalSlides - 1) return group.images[slideIdx + 1]?.src;
    if (groupIdx < stories.length - 1) return stories[groupIdx + 1]?.images[0]?.src;
    return undefined;
  })();
  usePreload(nextSrc);

  // ── Reset on open / initialIndex change ──
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      setGroupIdx(initialIndex);
      setSlideIdx(0);
      setProgress(0);
      setImageReady(false);
    }
  }, [isOpen, initialIndex]);

  // ── Focus trap ──
  useEffect(() => {
    if (isOpen) {
      overlayRef.current?.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  // ── Lock body scroll when open ──
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ── Progress timer (16ms tick ≈ 60fps) ──
  useEffect(() => {
    if (!isOpen || paused || !imageReady) return;

    const interval = 16; // ~60fps
    const step = interval / duration;
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 1) {
          // Auto-advance
          advanceSlide();
          return 0;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, paused, imageReady, duration, slideIdx, groupIdx]);

  // ── Navigation helpers ──
  const advanceSlide = useCallback(() => {
    if (slideIdx < totalSlides - 1) {
      // Next image in same group
      setSlideIdx((s) => s + 1);
      setProgress(0);
      setImageReady(false);
    } else if (groupIdx < stories.length - 1) {
      // Next group
      setGroupIdx((g) => g + 1);
      setSlideIdx(0);
      setProgress(0);
      setImageReady(false);
    } else {
      // End of all stories
      if (onEnd === 'loop') {
        setGroupIdx(0);
        setSlideIdx(0);
        setProgress(0);
        setImageReady(false);
      } else {
        onClose();
      }
    }
  }, [slideIdx, totalSlides, groupIdx, stories.length, onEnd, onClose]);

  const goBack = useCallback(() => {
    if (slideIdx > 0) {
      setSlideIdx((s) => s - 1);
      setProgress(0);
      setImageReady(false);
    } else if (groupIdx > 0) {
      const prevGroup = stories[groupIdx - 1];
      setGroupIdx((g) => g - 1);
      setSlideIdx(prevGroup.images.length - 1);
      setProgress(0);
      setImageReady(false);
    } else {
      onClose();
    }
  }, [slideIdx, groupIdx, stories, onClose]);

  // ── Keyboard ──
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          advanceSlide();
          break;
        case 'ArrowLeft':
          goBack();
          break;
      }
    },
    [onClose, advanceSlide, goBack]
  );

  // ── Tap zones (left 40% / right 40%) ──
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = x / rect.width;

      if (pct < 0.4) {
        goBack();
      } else if (pct > 0.6) {
        advanceSlide();
      }
      // Middle 20% = no-op (prevents accidental taps)
    },
    [goBack, advanceSlide]
  );

  // ── Pause on hold ──
  const handlePointerDown = useCallback(() => setPaused(true), []);
  const handlePointerUp = useCallback(() => setPaused(false), []);

  // ── Touch swipe-down to dismiss ──
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    setPaused(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const dy = e.touches[0].clientY - touchStartY.current;
    setDragY(Math.max(0, dy)); // only allow downward
  }, []);

  const handleTouchEnd = useCallback(() => {
    setPaused(false);
    if (dragY > 120) {
      onClose();
    }
    setDragY(0);
  }, [dragY, onClose]);

  if (!isOpen || !group || !slide) return null;

  const dismissOpacity = Math.max(0, 1 - dragY / 300);
  const dismissScale = Math.max(0.85, 1 - dragY / 1500);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={`Story viewer: ${group.title}`}
          onKeyDown={handleKeyDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 outline-none"
          style={{ opacity: dismissOpacity }}
        >
          {/* Story container — phone-aspect on desktop, full on mobile */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: dismissScale, opacity: 1, y: dragY }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full h-full md:w-[420px] md:h-[90vh] md:max-h-[800px] md:rounded-2xl overflow-hidden bg-background cursor-pointer select-none"
            onClick={handleClick}
            onMouseDown={handlePointerDown}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* ── Progress bar ── */}
            <div className="absolute top-0 left-0 right-0 z-30">
              <ProgressBar
                total={totalSlides}
                current={slideIdx}
                progress={progress}
              />

              {/* Title + Close */}
              <div className="flex items-center justify-between px-4 py-2">
                <p className="text-white text-sm font-bold tracking-wide drop-shadow-lg truncate">
                  {group.title}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors text-white"
                  aria-label="Close story viewer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── Image ── */}
            <StoryImage
              src={slide.src}
              onLoaded={() => setImageReady(true)}
            />

            {/* ── Caption + CTA ── */}
            <CaptionOverlay caption={slide.caption} link={group.link} />

            {/* ── Pause indicator ── */}
            <AnimatePresence>
              {paused && imageReady && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
                >
                  <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-6 rounded-full bg-white" />
                      <div className="w-1.5 h-6 rounded-full bg-white" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Slide counter ── */}
            <div className="absolute top-14 right-4 z-30 text-white/60 text-xs font-mono">
              {slideIdx + 1}/{totalSlides}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default StoryViewer;
