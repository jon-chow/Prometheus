import { useCallback, useEffect, useState, useRef } from 'react';
import { BsPlayFill, BsPauseFill, BsSkipForwardFill, BsSkipBackwardFill, BsShuffle, BsRepeat, BsRepeat1, BsArrowClockwise, BsArrowCounterclockwise } from 'react-icons/bs';
import '../styles/Bottombar.scss';

import { tracks } from '../data/tracks';
import VolumeSlider from './VolumeSlider';

interface Props {}

export enum RepeatMode {
  Off = 0,
  Repeat = 1,
  RepeatOne = 2
}

const SEEK_VALUE = 5;

const Bottombar = ({}: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const playingRef = useRef<number>();

  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0]);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [repeatMode, setRepeatMode] = useState(RepeatMode.Off);
  const [shuffleToggled, setShuffleToggled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const repeat = useCallback(() => {
    if (audioRef.current && progressRef.current) {
      const currentTime = audioRef.current.currentTime * 1000;
      setProgress(currentTime);
      progressRef.current.value = currentTime.toString();
      progressRef.current.style.setProperty(
        '--range-progress',
        `${(parseInt(progressRef.current.value) / duration) * 100}%`
      );

      playingRef.current = requestAnimationFrame(repeat);
    }
  }, [audioRef, duration, progressRef, setProgress]);

  const handleRepeatMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRepeatMode(repeatMode + (1 % 3));
  };

  const handleShuffle = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShuffleToggled(!shuffleToggled);
  };

  const handlePlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current)
      audioRef.current.currentTime = parseInt(e.target.value) / 100 * audioRef.current.duration;
  };

  const seek = (e: React.MouseEvent<HTMLButtonElement>, secondsToSkip: number) => {
    if (audioRef.current)
      audioRef.current.currentTime += secondsToSkip;
  }

  const nextTrack = () => {
    if (repeatMode === RepeatMode.RepeatOne) return;

    if (shuffleToggled) {
      // TODO: Set up shuffle algorithm
    } else {
      setCurrentTrack(tracks[(currentTrack.order + 1) % tracks.length]);
    }
  };

  const prevTrack = () => {
    if (repeatMode === RepeatMode.RepeatOne) return;

    if (shuffleToggled) {
      // TODO: Set up shuffle algorithm
    } else {
      setCurrentTrack(tracks[(currentTrack.order - 1 + tracks.length) % tracks.length]);
    }
  };

  function formatTime(milliseconds=0) {
    const seconds = Math.floor(milliseconds / 1000);
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toFixed(0).toString().padStart(2, '0')}`;
  }

  function normalizeProgress() {
    if (audioRef.current)
      return (audioRef.current.currentTime / audioRef.current.duration) * 100;
    return 0;
  }

  const onLoadedMetadata = () => {
    console.log("Test");
    // const time = audioRef.current.duration * 1000;
    // setDuration(time);
    // progressRef.current.max = time.toString();
    // console.log(formatTime(time));
  };

  return (
    <>
      <audio src={currentTrack.src} ref={audioRef} onLoadedMetadata={onLoadedMetadata} />
      <div className="bottombar">
        <div className="left">
          <div className="art-cover">
            <img src={currentTrack.thumbnail.src} />
            <div className="art-cover-overlay">
              <button className="play-button" onClick={handlePlay}>
                {isPlaying ? <BsPauseFill /> : <BsPlayFill />}
              </button>
            </div>
          </div>
          <div className="song-info">
            <div className="song-name">{currentTrack.title}</div>
            <div className="artist-name">{currentTrack.author}</div>
          </div>
        </div>

        <div className="center">
          <div className="player">
            <div className="controls">
              <button className={'shuffle-button' + (shuffleToggled ? ' enabled' : '')} onClick={handleShuffle}>
                <BsShuffle />
              </button>
              <button className="seek-backward-button" onClick={(e) => seek(e, -1 * SEEK_VALUE)}>
                <BsArrowCounterclockwise />
              </button>
              <button className="skip-button" onClick={(e) => prevTrack()}>
                <BsSkipBackwardFill />
              </button>
              <button className="play-button" onClick={handlePlay}>
                {isPlaying ? <BsPauseFill /> : <BsPlayFill />}
              </button>
              <button className="skip-button" onClick={(e) => nextTrack()}>
                <BsSkipForwardFill />
              </button>
              <button className="seek-forward-button" onClick={(e) => seek(e, SEEK_VALUE)}>
                <BsArrowClockwise />
              </button>
              <button className={'repeat-button' + (repeatMode === RepeatMode.Off ? '' : ' enabled')} onClick={handleRepeatMode}>
                {repeatMode === RepeatMode.RepeatOne ? <BsRepeat1 /> : <BsRepeat />}
              </button>
            </div>

            <div className="progress">
              <div className="time-elapsed">
                {formatTime(progress)}
              </div>
              <input
                className="progress-bar"
                ref={progressRef}
                type="range"
                defaultValue="0"
                onChange={handleProgressChange}
                style={{
                  background: `linear-gradient(to right, #7a90ff ${normalizeProgress()}%, #aaa ${normalizeProgress()}%)`
                }}
              />
              <div className="total-time">
                {formatTime(duration)}
              </div>
            </div>
          </div>
        </div>

        <div className="right">
          <VolumeSlider audioRef={audioRef} />
        </div>
      </div>
    </>
  );
};

export default Bottombar;
