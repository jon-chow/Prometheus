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
import { useStore } from '@nanostores/react';
import { audioStore } from '../../stores/audioStore.store';
import { RepeatMode } from '../../enums/RepeatMode';

const SEEK_VALUE = 5;

interface Props {
  audioRef: React.RefObject<HTMLAudioElement>;
  handleNextTrack: () => void;
  handlePrevTrack: () => void;
  handlePlay: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Controls = ({ audioRef, handlePrevTrack, handleNextTrack, handlePlay }: Props) => {
  const $audioState = useStore(audioStore);

  const handleRepeatMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    audioStore.setKey('repeatMode', ($audioState.repeatMode + 1) % (Object.keys(RepeatMode).length / 2));
  };

  const handleShuffle = (e: React.MouseEvent<HTMLButtonElement>) => {
    audioStore.setKey('isShuffle', !$audioState.isShuffle );
  };

  const handleSeek = (e: React.MouseEvent<HTMLButtonElement>, secondsToSkip: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += secondsToSkip;
      audioStore.setKey('progress', audioRef.current.currentTime * 1000);
    }
  };

  return (
    <>
      <div className="controls">
        <button className={'shuffle-button' + ($audioState.isShuffle ? ' enabled' : '')} onClick={handleShuffle}>
          <BsShuffle />
        </button>
        <button className="seek-backward-button" onClick={(e) => handleSeek(e, -1 * SEEK_VALUE)}>
          <BsArrowCounterclockwise />
        </button>
        <button className="skip-button" onClick={(e) => handlePrevTrack()}>
          <BsSkipBackwardFill />
        </button>
        <button className="play-button" onClick={handlePlay}>
          {$audioState.isPlaying ? <BsPauseFill /> : <BsPlayFill />}
        </button>
        <button className="skip-button" onClick={(e) => handleNextTrack()}>
          <BsSkipForwardFill />
        </button>
        <button className="seek-forward-button" onClick={(e) => handleSeek(e, SEEK_VALUE)}>
          <BsArrowClockwise />
        </button>
        <button className={'repeat-button' + ($audioState.repeatMode === RepeatMode.Off ? '' : ' enabled')} onClick={handleRepeatMode}>
          {$audioState.repeatMode === RepeatMode.RepeatOne ? <BsRepeat1 /> : <BsRepeat />}
        </button>
      </div>
    </>
  );
};

export default Controls;
