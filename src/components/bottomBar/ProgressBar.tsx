interface Props {
  audioRef: React.RefObject<HTMLAudioElement>;
  progress: number;
  progressRef: React.RefObject<HTMLInputElement>;
  duration: string | undefined;
}

const ProgressBar = ({ audioRef, progress, progressRef, duration }: Props) => {
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current)
      audioRef.current.currentTime = (parseInt(e.target.value) / 100) * audioRef.current.duration;
  };

  function formatTime(milliseconds = 0) {
    if (isNaN(milliseconds)) return '0:00';
    const seconds = Math.floor(milliseconds / 1000);
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toFixed(0).toString().padStart(2, '0')}`;
  }

  return (
    <>
      <div className="progress">
        <div className="time-elapsed">{formatTime(progress)}</div>
        <input className="progress-bar" ref={progressRef} type="range" defaultValue="0" onInput={handleProgressChange} />
        <div className="total-time">{duration || '0:00'}</div>
      </div>
    </>
  );
};

export default ProgressBar;
