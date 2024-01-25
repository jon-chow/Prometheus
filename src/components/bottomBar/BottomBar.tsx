import { useCallback, useEffect, useRef } from 'react';
import { BsPlayFill, BsPauseFill } from 'react-icons/bs';
import { useStore } from '@nanostores/react';
import { audioStore } from '../../stores/audioStore.store';
import '../../styles/BottomBar.scss';

import VolumeSlider from './VolumeSlider';
import Controls from './Controls';
import ProgressBar from './ProgressBar';

interface Props {
  tracks: Track[];
}

const BottomBar = ({ tracks }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const playingRef = useRef<number>();

  const $audioState = useStore(audioStore);

  const handlePlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    audioStore.setKey('isPlaying', !$audioState.isPlaying);
  };

  const handleNextTrack = () => {
    const next = (($audioState.currentTrackIndex ?? -1) + 1) % tracks.length;
    audioStore.setKey('currentTrackIndex', next);
    audioStore.setKey('currentTrack', tracks[next]);
  };

  const handlePrevTrack = () => {
    const prev = (($audioState.currentTrackIndex ?? 1) - 1 + tracks.length) % tracks.length;
    audioStore.setKey('currentTrackIndex', prev);
    audioStore.setKey('currentTrack', tracks[prev]);
  };

  const handleOnEnded = () => {
    if ($audioState.isPlaying) {
      handleNextTrack();
    }
  }

  const repeat = useCallback(() => {
    if (audioRef.current && progressRef.current) {
      const currentTime = audioRef.current.currentTime * 1000;
      const normalizedTime = (currentTime / audioRef.current.duration) * 0.1;
      audioStore.setKey('progress', currentTime);
      progressRef.current.value = normalizedTime.toString();
      progressRef.current.style.setProperty('background', `linear-gradient(to right, #7a90ff ${normalizedTime}%, #aaa ${normalizedTime}%)`);
      playingRef.current = requestAnimationFrame(repeat);
    }
  }, [audioRef, $audioState.duration]);

  useEffect(() => {
    if (audioRef.current)
      ($audioState.isPlaying) ? audioRef.current.play() : audioRef.current.pause();
    playingRef.current = requestAnimationFrame(repeat);
    return () => cancelAnimationFrame(playingRef.current as number);
  }, [audioRef, $audioState.isPlaying, repeat]);

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      audioStore.setKey('duration', audioRef.current.duration * 1000);
      audioRef.current.volume = $audioState.volume;
    }
  };

  return (
    <>
      {
        ($audioState.currentTrack?.src !== '') && (
          <audio
            src={$audioState.currentTrack?.src}
            ref={audioRef}
            preload="metadata"
            onLoadedMetadata={onLoadedMetadata}
            onEnded={(e) => handleOnEnded()}
          />
        )
      }
      <div className="bottombar">
        <div className="left">
          <div className="art-cover">
            <img src={$audioState.currentTrack?.thumbnail.src} />
            <div className="art-cover-overlay">
              <button className="play-button" onClick={handlePlay}>
                {$audioState.isPlaying ? <BsPauseFill /> : <BsPlayFill />}
              </button>
            </div>
          </div>
          <div className="song-info">
            <div className="song-name">{$audioState.currentTrack?.title}</div>
            <div className="artist-name">{$audioState.currentTrack?.author}</div>
          </div>
        </div>

        <div className="center">
          <div className="player">
            <Controls
              audioRef={audioRef}
              handleNextTrack={handleNextTrack}
              handlePrevTrack={handlePrevTrack}
              handlePlay={handlePlay}
            />
            <ProgressBar
              audioRef={audioRef}
              progressRef={progressRef}
            />
          </div>
        </div>

        <div className="right">
          <VolumeSlider audioRef={audioRef} />
        </div>
      </div>
    </>
  );
};

export default BottomBar;
