import { useState } from 'react';
import {
  BsPlayFill,
  BsPauseFill,
  BsSkipForwardFill,
  BsSkipBackwardFill,
  BsShuffle,
  BsRepeat,
  BsRepeat1,
  BsArrowClockwise,
  BsArrowCounterclockwise
} from 'react-icons/bs';
import { RepeatMode } from '../../enums/RepeatMode';

const SEEK_VALUE = 5;

interface Props {
  audioRef: React.RefObject<HTMLAudioElement>;
  handleNextTrack: () => void;
  handlePrevTrack: () => void;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  handlePlay: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

const Controls = ({ audioRef, handlePrevTrack, handleNextTrack, isPlaying, setIsPlaying, handlePlay, setProgress }: Props) => {
  const [repeatMode, setRepeatMode] = useState(RepeatMode.Off);
  const [shuffleToggled, setShuffleToggled] = useState(false);

  const handleRepeatMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRepeatMode(repeatMode + (1 % Object.keys(RepeatMode).length));
  };

  const handleShuffle = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShuffleToggled((toggle) => !toggle);
  };

  const handleSeek = (e: React.MouseEvent<HTMLButtonElement>, secondsToSkip: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += secondsToSkip;
      setProgress(audioRef.current.currentTime * 1000);
    }
  };

  return (
    <>
      <div className="controls">
        <button className={'shuffle-button' + (shuffleToggled ? ' enabled' : '')} onClick={handleShuffle}>
          <BsShuffle />
        </button>
        <button className="seek-backward-button" onClick={(e) => handleSeek(e, -1 * SEEK_VALUE)}>
          <BsArrowCounterclockwise />
        </button>
        <button className="skip-button" onClick={(e) => handlePrevTrack()}>
          <BsSkipBackwardFill />
        </button>
        <button className="play-button" onClick={handlePlay}>
          {isPlaying ? <BsPauseFill /> : <BsPlayFill />}
        </button>
        <button className="skip-button" onClick={(e) => handleNextTrack()}>
          <BsSkipForwardFill />
        </button>
        <button className="seek-forward-button" onClick={(e) => handleSeek(e, SEEK_VALUE)}>
          <BsArrowClockwise />
        </button>
        <button className={'repeat-button' + (repeatMode === RepeatMode.Off ? '' : ' enabled')} onClick={handleRepeatMode}>
          {repeatMode === RepeatMode.RepeatOne ? <BsRepeat1 /> : <BsRepeat />}
        </button>
      </div>
    </>
  );
};

export default Controls;
