import React from 'react';

interface ProgressBarProps {
  progress: number;
  active: boolean;
  
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, active }) => {
  return (
    <div className="h-0.5 bg-white/30 rounded-full flex-1">
      <div
        className="h-full bg-white rounded-full"
        style={{ width: `${active ? progress : 100}%`, transition: active ? 'width 0.1s linear' : 'none' }}
      />
    </div>
  );
};
