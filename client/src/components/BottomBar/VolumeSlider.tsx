import { useEffect } from 'react';
import { IoVolumeHigh, IoVolumeMedium, IoVolumeLow, IoVolumeOff, IoVolumeMute } from 'react-icons/io5';
import { useStore } from '@nanostores/react';
import { audioStore } from '../../stores/audioStore.store';

interface Props {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const VolumeSlider = ({ audioRef }: Props) => {
  const $audioState = useStore(audioStore);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = $audioState.volume;
      audioRef.current.muted = $audioState.isMuted;
    }
  }, [$audioState.volume, $audioState.isMuted]);

  const handleMute = (e: React.MouseEvent<HTMLButtonElement>) => {
    audioStore.setKey('isMuted', !$audioState.isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ($audioState.isMuted) $audioState.isMuted = false;
    audioStore.setKey('volume', parseInt(e.target.value) / 100);
  };

  function checkVolume() {
    return $audioState.isMuted ? 0 : $audioState.volume * 100;
  }

  return (
    <>
      <div className="volume" title={`${($audioState.volume * 100).toFixed(0).toString()}%`}>
        <button className="volume-icon" onClick={handleMute} title={$audioState.isMuted ? 'Unmute' : 'Mute'}>
          {$audioState.isMuted ? (
            <IoVolumeMute />
          ) : $audioState.volume === 0 ? (
            <IoVolumeOff />
          ) : $audioState.volume < 0.33 ? (
            <IoVolumeLow />
          ) : $audioState.volume < 0.67 ? (
            <IoVolumeMedium />
          ) : (
            <IoVolumeHigh />
          )}
        </button>
        <input
          className="volume-bar"
          role="slider"
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
};

export default VolumeSlider;
