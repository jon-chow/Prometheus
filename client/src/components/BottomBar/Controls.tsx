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
import { useAudioContext } from '../../contexts/AudioContext';
import { audioStore } from '../../stores/audioStore.store';
import { RepeatMode } from '../../classes/implements/AudioState';

interface Props {}

const Controls = ({}: Props) => {
  const { handleNextTrack, handlePrevTrack, handlePlay, handleSeek, handleShuffle, handleRepeatMode } = useAudioContext();

  const $audioState = useStore(audioStore);

  return (
    <>
      <div className="controls">
        <button className="shuffle-button" data-active={$audioState.isShuffle} onClick={handleShuffle} title="Shuffle">
          <BsShuffle />
        </button>
        <button className="seek-backward-button" onClick={(e) => handleSeek(-5)} title="Seek (-5s)">
          <BsArrowCounterclockwise />
        </button>
        <button className="skip-button" onClick={(e) => handlePrevTrack()} title="Previous Track">
          <BsSkipBackwardFill />
        </button>
        <button className="play-button" onClick={(e) => handlePlay()} title={$audioState.isPlaying ? 'Pause' : 'Play'}>
          {$audioState.isPlaying ? <BsPauseFill /> : <BsPlayFill />}
        </button>
        <button className="skip-button" onClick={(e) => handleNextTrack()} title="Next Track">
          <BsSkipForwardFill />
        </button>
        <button className="seek-forward-button" onClick={(e) => handleSeek()} title="Seek (+5s)">
          <BsArrowClockwise />
        </button>
        <button className="repeat-button" data-active={$audioState.repeatMode !== RepeatMode.Off} onClick={handleRepeatMode} title="Repeat">
          {$audioState.repeatMode === RepeatMode.RepeatOne ? <BsRepeat1 /> : <BsRepeat />}
        </button>
      </div>
    </>
  );
};

export default Controls;
