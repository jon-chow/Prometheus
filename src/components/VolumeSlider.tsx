import { useState, useEffect } from 'react';
import { IoVolumeHigh, IoVolumeMedium, IoVolumeLow, IoVolumeOff, IoVolumeMute } from 'react-icons/io5';

interface Props {
  audioRef: React.RefObject<HTMLAudioElement>,
}

const VolumeSlider = ({ audioRef }: Props) => {
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted, audioRef]);

  
  const handleMute = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isMuted) setIsMuted(false);
    setVolume(parseInt(e.target.value) / 100);
  };

  function checkVolume() {
    return isMuted ? 0 : volume * 100;
  }

  return (
    <>
      <div className="volume" title={`${(volume * 100).toFixed(0).toString()}%`}>
        <button className="volume-icon" onClick={handleMute}>
          {isMuted ? (
            <IoVolumeMute />
          ) : volume === 0 ? (
            <IoVolumeOff />
          ) : volume < 0.33 ? (
            <IoVolumeLow />
          ) : volume < 0.67 ? (
            <IoVolumeMedium />
          ) : (
            <IoVolumeHigh />
          )}
        </button>
        <input
          className="volume-bar"
          type="range"
          min="0"
          max="100"
          value={checkVolume()}
          onInput={handleVolumeChange}
          id="volume"
          style={{
            background: `linear-gradient(to right, #7a90ff ${checkVolume()}%, #aaa ${checkVolume()}%)`
          }}
        />
      </div>
    </>
  );
}

export default VolumeSlider;
