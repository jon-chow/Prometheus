import { useCallback, useEffect, useRef } from 'react';
import { BsPlayFill, BsPauseFill } from 'react-icons/bs';
import { useStore } from '@nanostores/react';
import { audioStore } from '../../stores/audioStore.store';
import '../../styles/BottomBar.scss';

import VolumeSlider from './VolumeSlider';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import { RepeatMode } from '../../enums/RepeatMode';

interface Props {}

const BottomBar = ({}: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const playingRef = useRef<number>();

  const $audioState = useStore(audioStore);

  const handlePlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    if ($audioState.currentTrackIndex !== null) audioStore.setKey('isPlaying', !$audioState.isPlaying);
  };

  const handleNextTrack = () => {
    if ($audioState.repeatMode === RepeatMode.RepeatOne) {
      (audioRef.current as HTMLAudioElement).currentTime = 0;
      return;
    }

    const next = (($audioState.currentTrackIndex ?? -1) + 1) % $audioState.trackList.length;
    audioStore.setKey('currentTrackIndex', next);
    audioStore.setKey('currentTrack', $audioState.trackList[next]);
  };

  const handlePrevTrack = () => {
    if ($audioState.repeatMode === RepeatMode.RepeatOne) {
      (audioRef.current as HTMLAudioElement).currentTime = 0;
      return;
    }

    const prev = (($audioState.currentTrackIndex ?? 1) - 1 + $audioState.trackList.length) % $audioState.trackList.length;
    audioStore.setKey('currentTrackIndex', prev);
    audioStore.setKey('currentTrack', $audioState.trackList[prev]);
  };

  const handleOnEnded = () => {
    if ($audioState.isPlaying)
      if ($audioState.repeatMode === RepeatMode.Off) {
        $audioState.currentTrackIndex !== $audioState.trackList.length - 1 ? handleNextTrack() : audioStore.setKey('isPlaying', false);
      } else if ($audioState.repeatMode === RepeatMode.Repeat) {
        handleNextTrack();
      }
  };

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
    if (audioRef.current) $audioState.isPlaying ? audioRef.current.play() : audioRef.current.pause();
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
      {$audioState.currentTrack?.src !== '' && (
        <audio
          src={$audioState.currentTrack?.src}
          ref={audioRef}
          preload="metadata"
          onLoadedMetadata={onLoadedMetadata}
          onEnded={(e) => handleOnEnded()}
          loop={$audioState.repeatMode === RepeatMode.RepeatOne}
        />
      )}
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
            <Controls audioRef={audioRef} handleNextTrack={handleNextTrack} handlePrevTrack={handlePrevTrack} handlePlay={handlePlay} />
            <ProgressBar audioRef={audioRef} progressRef={progressRef} />
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
