import { useStore } from '@nanostores/react';
import { audioStore } from '../../stores/audioStore.store';

interface Props {
  audioRef: React.RefObject<HTMLAudioElement>;
  progressRef: React.RefObject<HTMLInputElement>;
}

const ProgressBar = ({ audioRef, progressRef }: Props) => {
  const $audioState = useStore(audioStore);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) audioRef.current.currentTime = (parseInt(e.target.value) / 100) * audioRef.current.duration || 0;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
    audioStore.setKey('isSeeking', true);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    audioStore.setKey('isSeeking', false);
  };

  function formatTime(milliseconds = 0) {
    if (isNaN(milliseconds)) return '0:00';
    const seconds = Math.floor(milliseconds / 1000);
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toFixed(0).toString().padStart(2, '0')}`;
  }

  return (
    <>
      <div className="progress">
        <div className="time-elapsed">{formatTime($audioState.progress)}</div>
        <input
          className="progress-bar"
          role="slider"
          ref={progressRef}
          type="range"
          defaultValue="0"
          onInput={handleProgressChange}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
        <div className="total-time">{formatTime($audioState.duration)}</div>
      </div>
    </>
  );
};

export default ProgressBar;
