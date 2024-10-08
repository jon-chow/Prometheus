import { useCallback, useEffect, useRef } from 'react';
import { BsPlayFill, BsPauseFill } from 'react-icons/bs';
import { useStore } from '@nanostores/react';
import { useAudioContext } from '../../contexts/AudioContext';
import { audioStore } from '../../stores/audioStore.store';
import './BottomBar.scss';

import VolumeSlider from './VolumeSlider';
import Controls from './Controls';
import ProgressBar from './ProgressBar';

export interface BottomBarProps {}

const BottomBar = ({}: BottomBarProps) => {
  const { audioRef, handlePlay } = useAudioContext();
  const progressRef = useRef<HTMLInputElement>(null);
  const playingRef = useRef<number>();

  const $audioState = useStore(audioStore);

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
  }, [audioRef, $audioState.duration, $audioState.isPlaying, repeat]);

  return (
    <>
      <div className="bottombar">
        <div className="left">
          <div className="art-cover">
            <img src={$audioState.currentTrack?.thumbnailSource} alt="thumbnail" />
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
            <Controls />
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
